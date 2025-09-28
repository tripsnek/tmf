import { EObject } from '../metamodel/api/eobject.js';
import { EClass } from '../metamodel/api/eclass.js';
import { EPackage } from '../metamodel/api/epackage.js';
import { EReference } from '../metamodel/api/ereference.js';
import { EStructuralFeature } from '../metamodel/api/estructural-feature.js';
import { BasicEList } from '../metamodel/basicelist.js';
import { EList } from '../metamodel/api/elist.js';
import { EAttribute } from '../metamodel/api/eattribute.js';
import { TUtils } from '../tutils.js';
import { EClassImpl } from '../metamodel/impl/eclass-impl.js';
import { EReferenceImpl } from '../metamodel/impl/ereference-impl.js';

/**
 * Utilities for converting between EObjects and JSON. Usage:
 *
 * (1) TJson.makeJson(EObject) - converts an EObject to JSON.
 * (2) TJson.makeEObject(json) - deserializes EObject encoded with (1).
 * (3) TJson.makeJsonArray(EObject[]) - converts an array of EObjects to a JSON Array.
 * (4) TJson.makeEObjectArray(json) - converts a JSON Array to an array of EObjects.
 *
 * You may also configure which EClasses are eligible for conversion with
 * 'addPackages(EPackage[])' and 'setPackages(EPackage[])'.
 * 
 */
export class TJson {
  //the name of the special JSON field that indicates each object's type
  public static JSON_FIELD_TYPESCRIPT_TYPE = '@type';

  //These will be automatically added by the PackageInitializer when a Package is "touched"
  static packages : EPackage[] = [];
  public static setPackages(packages: EPackage[]) {
    this.packages = packages;
  }

  //automatically used by package initializers to add JSON serialization support when they are touched
  public static addPackages(packages: EPackage[]){
    for(const p of packages){
      if(!this.packages.includes(p)) this.packages.push(p);
    }
  }

  //the currently registered EPackages
  public static getPackages():EPackage[]{
    return TJson.packages;
  }

  // Simple check - warn if no packages registered
  private static warnIfNotInitialized(): void {
    if (this.packages.length === 0) {
      console.warn(
        'TJson: No packages registered. Call the package initializer using ' + 
        '<MyRootPackage>PackageInitializer.registerAll() before using TJson'
      );
    }
  }

  /**
   * Converts a TMF EObject to JSON.
   *
   * @param obj
   */
  public static makeJson(obj: EObject): any {
    this.warnIfNotInitialized();
    const context = new SerializationContext(obj);
    return this.eObjectToJsonAux(obj, new Map<EObject, any>(), false, context);
  }

  /**
   * Converts an object in JSON Object into a TMF EObject.
   * Creates proxy objects for unresolved non-containment references.
   *
   * @param json
   * @return
   */
  public static makeEObject(jsonObj: any): EObject | undefined {
    this.warnIfNotInitialized();
    
    const serializedReferences = new Array<SerializedReference>();

    //build containment heirarchy
    const eobj = this.jsonToEObject(jsonObj, serializedReferences);
    if(!eobj) return undefined;

    // Create deserialization context
    const context = new DeserializationContext(eobj);

    //deserialize references, collecting unresolved ones
    const unresolvedRefs = new Array<SerializedReference>();
    serializedReferences.forEach((ref) => {
      if (!ref.deserialize(context)) {
        unresolvedRefs.push(ref);
      }
    });

    // Create proxies for unresolved references
    unresolvedRefs.forEach((ref) => {
      this.createAndSetProxy(ref, context);
    });

    return eobj;
  }

  /**
   * Creates a proxy object for an unresolved reference and sets it on the source object.
   * 
   * @param ref The unresolved serialized reference
   * @param context The deserialization context
   */
  private static createAndSetProxy(ref: SerializedReference, context: DeserializationContext): void {
    // Handle SerializedReferenceWithObject specially
    let fromObj: EObject | undefined;
    
    if (ref instanceof SerializedReferenceWithObject) {
      fromObj = (ref as SerializedReferenceWithObject).fromObj;
      if (!fromObj || !ref.toId) return;
    } else {
      if (!ref.fromId || !ref.toId) return;
      fromObj = context.resolveId(ref.fromId);
      if (!fromObj) return;
    }

    // Path-based IDs that couldn't be resolved are internal inconsistencies
    if (ref.toId.startsWith('@path:')) {
      console.warn(`Cannot create proxy for unresolved path-based reference: ${ref.toId}`);
      return;
    }

    const feature = fromObj.eClass().getEStructuralFeature(ref.refName);
    if (!feature || !(feature instanceof EReferenceImpl)) return;

    // Check if proxy already exists for this target
    let proxy = context.resolveId(ref.toId);
    if (!proxy) {
      proxy = this.createProxy(ref.toId, feature as EReference);
      if (proxy) {
        // Add proxy to the index so future references to it can be resolved
        context.getIndex().set(ref.toId, proxy);
      }
    }

    if (proxy) {
      // Set the reference
      if (feature.isMany()) {
        fromObj.eGet(feature).add(proxy);
      } else {
        fromObj.eSet(feature, proxy);
      }
    }
  }

  /**
   * Creates a proxy EObject for an unresolved reference.
   * 
   * @param fullId The full ID of the target object (format: "ClassName_actualId")
   * @param reference The reference feature to determine the target EClass
   * @returns A proxy EObject or undefined if creation failed
   */
  private static createProxy(fullId: string, reference: EReference): EObject | undefined {
    // Path-based IDs cannot be proxied (they're internal references that should have been resolved)
    if (fullId.startsWith('@path:')) {
      console.warn(`Cannot create proxy for path-based ID: ${fullId}`);
      return undefined;
    }
    
    // Parse the fullId to extract class name and actual ID
    const underscoreIndex = fullId.indexOf('_');
    if (underscoreIndex === -1) {
      console.warn(`Invalid fullId format for proxy creation: ${fullId}`);
      return undefined;
    }
    
    const className = fullId.substring(0, underscoreIndex);
    const actualId = fullId.substring(underscoreIndex + 1);
    
    // Get the target EClass from the reference type
    const targetEClass = reference.getEType() as EClass;
    if (!targetEClass) {
      console.warn(`No target EClass found for reference: ${reference.getName()}`);
      return undefined;
    }
    
    // Verify the class name matches (safety check)
    if (targetEClass.getName() !== className) {
      console.warn(`Class name mismatch for proxy: expected ${className}, got ${targetEClass.getName()}`);
      // Continue anyway - the reference type is authoritative
    }
    
    // Find the appropriate EPackage and factory
    for (const pkg of this.packages) {
      const classifiers = pkg.getEClassifiers();
      for (const classifier of classifiers) {
        if (classifier === targetEClass) {
          try {
            // Create the proxy object
            const proxy = pkg.getEFactoryInstance().create(targetEClass);
            
            // Set the ID attribute if it exists
            const idAttribute = targetEClass.getEIDAttribute();
            if (idAttribute) {
              try {
                // Parse the ID value to the correct type using TUtils
                const parsedId = TUtils.parseAttrValFromString(idAttribute, actualId);
                proxy.eSet(idAttribute, parsedId);
              } catch (error) {
                console.warn(`Failed to parse ID value for proxy: ${actualId}`, error);
              }
            }
            
            // Mark as proxy
            proxy.eSetProxy(true);
            
            // console.debug(`Created proxy object for ${fullId}`);
            return proxy;
          } catch (error) {
            console.error(`Failed to create proxy for ${fullId}:`, error);
            return undefined;
          }
        }
      }
    }
    
    console.warn(`No EPackage found containing EClass ${targetEClass.getName()} for proxy creation`);
    return undefined;
  }

  /**
   * Converts a TMF EObject array to JSON array.
   *
   * @param obj
   */
  public static makeJsonArray(objs: EObject[]): any[] {
    this.warnIfNotInitialized();
    
    const jsonArray: any[] = [];
    if (objs) {
      objs.forEach((element) => {
        jsonArray.push(this.makeJson(element));
      });
    }
    return jsonArray;
  }

 /**
   * Converts an object in JSON Array into am array of TMF EObjects.
   *
   * @param json
   * @return
   */
  public static makeEObjectArray(jsonArray: any[]): EObject[] {
    this.warnIfNotInitialized();
    
    const eobjArray: EObject[] = [];
    jsonArray.forEach((element) => {
      const eobj = this.makeEObject(element);
      if (eobj) eobjArray.push(eobj);
    });
    return eobjArray;
  }

  private static jsonToEObject(
    jsonObj: any,
    serializedRefs: Array<SerializedReference>
  ): EObject | undefined {
    if (jsonObj == null) {
      throw new Error(
        'ERROR: null value for JSON Object. Cannot convert to EObject.'
      );
    }

    //get the type indicator and instantiate the TMF Object
    const objectType = <string>jsonObj[this.JSON_FIELD_TYPESCRIPT_TYPE];
    if (objectType == null) {
      console.error(
        'ERROR: No value for ' +
          this.JSON_FIELD_TYPESCRIPT_TYPE +
          ' was specified for the JSON object: ' +
          jsonObj
      );
      return undefined;
    }

    let eClass: EClass | undefined;
    let eObj: EObject | undefined;
    for (const pkg of this.packages) {
      eClass = this.eClassByNameCaseInsensitive(objectType, pkg);
      if (eClass) {
        eObj = pkg.getEFactoryInstance().create(eClass);
        break;
      }
    }
    if (eClass && eObj) {
      //handle all primitive attributes
      this.setPrimitiveValuesOnJson(jsonObj, eObj);
      //handle all references
      for (const ref of eObj.eClass().getEAllReferences()) {
        this.deserializeReferencedObjects(jsonObj, eObj, ref, serializedRefs);
      }
    }
    return eObj;
  }

  private static deserializeReferencedObjects(
    jsonObj: any,
    dObj: EObject,
    ref: EReference,
    serializedRefs: Array<SerializedReference>
  ): void {
    const jsonFieldName = this.getJsonFieldName(ref);
    //multi-valued references
    if (ref.isMany()) {
      this.deserializeManyValuedReference(
        jsonObj,
        jsonFieldName,
        ref,
        dObj,
        serializedRefs
      );
    } //single-valued references
    else {
      this.deserializeSingleValuedReference(
        jsonObj,
        jsonFieldName,
        ref,
        dObj,
        serializedRefs
      );
    }
  }

  private static deserializeSingleValuedReference(
    jsonObj: any,
    jsonFieldName: string,
    ref: EReference,
    tObj: EObject,
    serializedRefs: Array<SerializedReference>
  ) {
    const referencedObj = jsonObj[jsonFieldName];
    if (referencedObj) {
      if (ref.isContainment()) {
        const containeTJsonObj = referencedObj;
        if (!containeTJsonObj[this.JSON_FIELD_TYPESCRIPT_TYPE]) {
          containeTJsonObj[this.JSON_FIELD_TYPESCRIPT_TYPE] = ref.getEType()!.getName();
        }
        const referencedEmfObj = this.jsonToEObject(
          containeTJsonObj,
          serializedRefs
        );
        tObj.eSet(ref, referencedEmfObj);
      } else {
        // Store the object itself, not its ID - we'll resolve IDs later
        serializedRefs.push(
          new SerializedReferenceWithObject(
            tObj,
            referencedObj,
            ref.getName()
          )
        );
      }
    }
  }

  private static deserializeManyValuedReference(
    jsonObj: any,
    jsonFieldName: string,
    ref: EReference,
    tObj: EObject,
    serializedRefs: Array<SerializedReference>
  ) {
    const jsonArray = <any[]>jsonObj[jsonFieldName];
    if (jsonArray) {
      jsonArray.forEach((containedTJsonObj, index) => {
        if (ref.isContainment()) {
          if (!containedTJsonObj[this.JSON_FIELD_TYPESCRIPT_TYPE]) {
            containedTJsonObj[this.JSON_FIELD_TYPESCRIPT_TYPE] = ref
              .getEType()!
              .getName();
          }
          const containedDObj = this.jsonToEObject(
            containedTJsonObj,
            serializedRefs
          );
          tObj.eGet(ref).add(containedDObj);
        } else {
          // Store the object itself, not its ID - we'll resolve IDs later
          serializedRefs.push(
            new SerializedReferenceWithObject(
              tObj,
              containedTJsonObj,
              ref.getName()
            )
          );
        }
      });
    }
  }

  protected static eObjectToJsonAux(
    obj: EObject,
    serializedSoFar: Map<EObject, any>,
    attributesOnly: boolean,
    context: SerializationContext
  ): any {
    //make sure there is really an object to convert
    if (obj == null) {
      return null;
    }

    const jsonObj : any = {};

    //Generate IDs for all Entities in the heirarchy which do not have them
    if (!TUtils.getOrCreateIdForObject(obj)) TUtils.genIdIfNotExists(obj);

    //add a type indicator for everything (the class name)
    jsonObj[this.JSON_FIELD_TYPESCRIPT_TYPE] = obj.eClass().getName();
    //handle all primitive attributes
    this.attributesToJson(obj, jsonObj);
    //handle all references
    if (!attributesOnly) {
      this.referencesToJson(obj, serializedSoFar, jsonObj, context);
    }
    return jsonObj;
  }

  private static referencesToJson(
    obj: EObject,
    serializedSoFar: Map<EObject, any>,
    jsonObj: {},
    context: SerializationContext
  ) {
    for (const ref of obj.eClass().getEAllReferences()) {
      if (!ref.isVolatile() && !ref.isTransient()) {
        //multi-valued references
        if (ref.isMany()) {
          this.manyValuedReferenceToJson(obj, ref, serializedSoFar, jsonObj, context);
        }
        //single-valued references
        else {
          this.singleValuedRefToJson(obj, ref, serializedSoFar, jsonObj, context);
        }
      }
    }
  }

  private static manyValuedReferenceToJson(
    obj: EObject,
    ref: EReference,
    serializedSoFar: Map<EObject, any>,
    jsonObj: any,
    context: SerializationContext
  ) {
    const jsonFieldName = this.getJsonFieldName(ref);
    const jsonArray = [];
    for (const referencedObj of <EList<EObject>>obj.eGet(ref)) {
      if (referencedObj != null) {
        if (ref.isContainment()) {
          const referenceTJsonObj = this.eObjectToJsonAux(
            <EObject>referencedObj,
            serializedSoFar,
            !ref.isContainment(),
            context
          );
          if (referenceTJsonObj != null) jsonArray.push(referenceTJsonObj);
        } else {
          const fromId = context.getStableId(obj);
          const toId = context.getStableId(referencedObj);
          const serializedRef = new SerializedReference(
            fromId,
            toId,
            jsonFieldName
          ).serialize();
          jsonArray.push(serializedRef);
        }
      }
    }
    jsonObj[jsonFieldName] = jsonArray;
  }

  private static singleValuedRefToJson(
    obj: EObject,
    ref: EReference,
    serializedSoFar: Map<EObject, any>,
    jsonObj: any,
    context: SerializationContext
  ) {
    const jsonFieldName = this.getJsonFieldName(ref);
    const referencedObj = <EObject>obj.eGet(ref);
    if (referencedObj != null) {
      let referenceTJsonObj = null;
      //if the object is 'contained', we generate it's full representation
      if (ref.isContainment()) {
        referenceTJsonObj = this.eObjectToJsonAux(
          referencedObj,
          serializedSoFar,
          !ref.isContainment(),
          context
        );
      }
      //otherwise, we generate a serialized pointer to the referenced object
      else {
        const fromId = context.getStableId(obj);
        const toId = context.getStableId(referencedObj);
        referenceTJsonObj = new SerializedReference(
          fromId,
          toId,
          jsonFieldName
        ).serialize();
      }
      if (referenceTJsonObj != null) jsonObj[jsonFieldName] = referenceTJsonObj;
    }
  }

  private static attributesToJson(obj: EObject, jsonObj: any) {
    for (const attr of obj.eClass().getEAllAttributes()) {
      if (!attr.isVolatile() && !attr.isTransient()) {
        const jsonFieldName = this.getJsonFieldName(attr);
        const origVal = obj.eGet(attr);
        const convertedVal = this.primitiveValueToJson(attr, origVal);
        jsonObj[jsonFieldName] = convertedVal;
      }
    }
  }

  /**
   * Converts a primitive value (or a Date) for use inside JSON.
   *
   * @param val
   * @return
   */
  public static primitiveValueToJson(attr: EAttribute, val: any): any {
    //serialize many-valued eattributes
    if (attr.isMany()) {
      const toRet = [];
      for (const v of <BasicEList<any>>val) {
        toRet.push(v instanceof Date ? v.toJSON() : v);
      }
      return toRet;
    }
    if (val instanceof Date) {
      return val.toJSON();
    }
    return val;
  }

  public static getJsonFieldName(feature: EStructuralFeature): string {
    return feature.getName();
  }

  public static eClassByNameCaseInsensitive(
    objectType: string,
    pkg: EPackage
  ): EClass {
    let dClass = <EClass>pkg.getEClassifier(objectType);
    if (dClass) {
      //case insensitive checking of names
      for (const eclass of pkg.getEClassifiers()) {
        if (
          eclass instanceof EClassImpl &&
          eclass.getName().toLowerCase() === objectType.toLowerCase()
        ) {
          dClass = eclass;
        }
      }
    }
    return dClass;
  }

  /**
   * Sets all primitive (EAttribute) values on the eobject, given a
   * JSONObject with the same fields.
   *
   * @param propsObj
   * @param eObj
   */
  public static setPrimitiveValuesOnJson(propsObj: any, eObj: EObject): void {
    for (const attr of eObj.eClass().getEAllAttributes()) {
      const jsonFieldName = this.getJsonFieldName(attr);
      const jsonVal = propsObj[jsonFieldName];
      if (jsonVal || jsonVal === 0) {
        if (attr.isMany()) {
          const array = <any[]>jsonVal;
          const coll = <EList<EObject>>eObj.eGet(attr);
          for (const o of array) {
            coll.add(TUtils.parseAttrValFromString(attr, o));
          }
        } else {
          const tVal = TUtils.parseAttrValFromString(attr, jsonVal);
          if (tVal || tVal === 0) {
            eObj.eSet(attr, tVal);
          } else {
            console.warn(
              'JSON parse failed for ' +
                eObj.eClass().getName() +
                '.' +
                attr.getName() +
                ' with value ' +
                jsonVal.toString()
            );
          }
        }
      }
    }
  }
}

export class SerializedReference {
  fromId: string;
  toId: string;
  refName: string;

  constructor(from: string, to: string, ref: string) {
    this.fromId = from;
    this.toId = to;
    this.refName = ref;
  }

  public static create(
    fromDId: string,
    toDId: string,
    fromRef: string
  ): SerializedReference {
    return new SerializedReference(fromDId, toDId, fromRef);
  }

  /**
   * Swizzles the object to JSON.
   */
  public serialize(): any {
    return this.toId;
  }

  /**
   * Restores the swizzled reference.
   *
   * @param context The deserialization context
   * @returns true if the reference was successfully resolved, false if target object not found
   */
  public deserialize(context: DeserializationContext): boolean {
    const fromObj = context.resolveId(this.fromId);
    const toObj = context.resolveId(this.toId);
    
    if (fromObj && toObj) {
      const feature = fromObj.eClass().getEStructuralFeature(this.refName);

      //enforce the reference
      if (fromObj && toObj && feature) {
        if (feature.isMany()) fromObj.eGet(feature).add(toObj);
        else fromObj.eSet(feature, toObj);
        return true;
      }
    }
    return false;
  }
}

/**
 * Context object for managing state during serialization
 */
class SerializationContext {
  private tempIdCounter = 0;
  private objectToTempId = new Map<EObject, string>();
  private readonly root: EObject;

  constructor(root: EObject) {
    this.root = root;
  }

  /**
   * Gets or creates a stable identifier for an object.
   * Uses the object's ID if available, otherwise creates a path-based identifier.
   */
  getStableId(obj: EObject): string {
    // First try to get the actual ID
    const actualId = TUtils.getOrCreateIdForObject(obj);
    if (actualId) {
      return actualId;
    }

    // Check if we already created a temp ID for this object
    const existingTempId = this.objectToTempId.get(obj);
    if (existingTempId) {
      return existingTempId;
    }

    // Create and cache a path-based identifier
    const pathId = this.createPathBasedId(obj);
    this.objectToTempId.set(obj, pathId);
    return pathId;
  }

  /**
   * Creates a path-based identifier for an object based on its containment path.
   * Format: "@path:ClassName:/feature1[index]/feature2[index]/..."
   */
  private createPathBasedId(obj: EObject): string {
    if (obj === this.root) {
      return `@path:${obj.eClass().getName()}:@root`;
    }

    const path: string[] = [];
    let current = obj;
    
    while (current && current !== this.root) {
      const container = current.eContainer();
      if (!container) break;
      
      // Find which containment feature holds this object
      for (const ref of container.eClass().getEAllReferences()) {
        if (ref.isContainment()) {
          const value = container.eGet(ref);
          if (ref.isMany()) {
            const list = value as EList<EObject>;
            const index = list.indexOf(current);
            if (index >= 0) {
              path.unshift(`${ref.getName()}[${index}]`);
              break;
            }
          } else if (value === current) {
            path.unshift(ref.getName());
            break;
          }
        }
      }
      current = container;
    }
    
    return `@path:${obj.eClass().getName()}:/${path.join('/')}`;
  }
}

/**
 * Context object for managing state during deserialization
 */
class DeserializationContext {
  private pathToObject = new Map<string, EObject>();
  private readonly root: EObject;
  private idsToObjs = new Map<string, EObject>();

  constructor(root: EObject) {
    this.root = root;
    this.buildIndex();
  }

  /**
   * Builds an index of all contained objects using both real IDs and path-based IDs
   */
  private buildIndex(): void {
    // Add root
    const rootId = this.getStableId(this.root);
    this.idsToObjs.set(rootId, this.root);
    
    // Add all contained objects
    this.root.eAllContents().forEach((elem) => {
      const id = this.getStableId(elem);
      this.idsToObjs.set(id, elem);
    });
  }

  /**
   * Gets the stable ID for an object (for indexing purposes during deserialization)
   */
  getStableId(obj: EObject): string {
    const actualId = TUtils.getOrCreateIdForObject(obj);
    if (actualId) {
      return actualId;
    }
    return this.createPathBasedId(obj);
  }

  /**
   * Creates a path-based identifier (same logic as SerializationContext)
   */
  private createPathBasedId(obj: EObject): string {
    if (obj === this.root) {
      return `@path:${obj.eClass().getName()}:@root`;
    }

    const path: string[] = [];
    let current = obj;
    
    while (current && current !== this.root) {
      const container = current.eContainer();
      if (!container) break;
      
      for (const ref of container.eClass().getEAllReferences()) {
        if (ref.isContainment()) {
          const value = container.eGet(ref);
          if (ref.isMany()) {
            const list = value as EList<EObject>;
            const index = list.indexOf(current);
            if (index >= 0) {
              path.unshift(`${ref.getName()}[${index}]`);
              break;
            }
          } else if (value === current) {
            path.unshift(ref.getName());
            break;
          }
        }
      }
      current = container;
    }
    
    return `@path:${obj.eClass().getName()}:/${path.join('/')}`;
  }

  /**
   * Resolves a path-based identifier to an object within the containment hierarchy.
   */
  resolvePathBasedId(pathId: string): EObject | undefined {
    // Check cache first
    const cached = this.pathToObject.get(pathId);
    if (cached) return cached;

    if (!pathId.startsWith('@path:')) {
      return undefined;
    }
    
    const parts = pathId.substring(6).split(':');
    if (parts.length !== 2) return undefined;
    
    const [className, pathStr] = parts;
    
    if (pathStr === '@root') {
      const result = this.root.eClass().getName() === className ? this.root : undefined;
      if (result) this.pathToObject.set(pathId, result);
      return result;
    }
    
    // Parse the path
    const pathSegments = pathStr?.substring(1).split('/').filter(s => s.length > 0) || [];
    let current = this.root;
    
    for (const segment of pathSegments) {
      const match = segment.match(/^(.+?)(?:\[(\d+)\])?$/);
      if (!match) return undefined;
      
      const featureName = match[1];
      const index = match[2] ? parseInt(match[2]) : undefined;
      
      if(!featureName) return undefined;
      const feature = current.eClass().getEStructuralFeature(featureName);
      if (!feature || !(feature instanceof EReferenceImpl) || !feature.isContainment()) {
        return undefined;
      }
      
      const value = current.eGet(feature);
      if (feature.isMany()) {
        if (index === undefined) return undefined;
        const list = value as EList<EObject>;
        if (index >= list.size()) return undefined;
        current = list.get(index);
      } else {
        if (!value) return undefined;
        current = value as EObject;
      }
    }
    
    // Verify the class name matches
    const result = current.eClass().getName() === className ? current : undefined;
    if (result) this.pathToObject.set(pathId, result);
    return result;
  }

  /**
   * Gets the index map for looking up objects by ID
   */
  getIndex(): Map<string, EObject> {
    return this.idsToObjs;
  }

  /**
   * Resolves an ID to an object, handling both regular and path-based IDs
   */
  resolveId(id: string): EObject | undefined {
    // Try direct lookup first
    let obj = this.idsToObjs.get(id);
    
    // If not found and it's a path-based ID, try resolving it
    if (!obj && id.startsWith('@path:')) {
      obj = this.resolvePathBasedId(id);
      if (obj) {
        // Cache it for future lookups
        this.idsToObjs.set(id, obj);
      }
    }
    
    return obj;
  }
}


/**
 * Specialized SerializedReference for deserialization that holds the actual objects
 * instead of IDs, since we don't know the IDs yet during construction.
 */
class SerializedReferenceWithObject extends SerializedReference {
  fromObj: EObject;
  toIdOrPath: string;

  constructor(fromObj: EObject, toIdOrPath: string, refName: string) {
    super('', toIdOrPath, refName);
    this.fromObj = fromObj;
    this.toIdOrPath = toIdOrPath;
  }

  public override deserialize(context: DeserializationContext): boolean {
    // Get the stable ID for the from object now that the hierarchy is complete
    const fromId = context.getStableId(this.fromObj);
    
    // The toIdOrPath is the serialized ID from the JSON
    const toObj = context.resolveId(this.toIdOrPath);
    
    if (this.fromObj && toObj) {
      const feature = this.fromObj.eClass().getEStructuralFeature(this.refName);
      
      if (feature) {
        if (feature.isMany()) {
          this.fromObj.eGet(feature).add(toObj);
        } else {
          this.fromObj.eSet(feature, toObj);
        }
        return true;
      }
    }
    return false;
  }
}