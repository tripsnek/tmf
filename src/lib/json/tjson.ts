import { EObject } from '../metamodel/eobject';
import { EClass } from '../metamodel/eclass';
import { EPackage } from '../metamodel/epackage';
import { EReference } from '../metamodel/ereference';
import { EStructuralFeature } from '../metamodel/estructural-feature';
import { BasicEList } from '../metamodel/basicelist';
import { EList } from '../metamodel/elist';
import { EAttribute } from '../metamodel/eattribute';
import { TUtils } from '../tutils';
import { SerializedReference } from './serialized-reference';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EReferenceImpl } from '../metamodel/ereference-impl';

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
        'TJson: No packages registered. Call TJson.setPackages([...]) or ' +
        'import and touch your package (e.g., MyPackage.eINSTANCE) before using TJson.'
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
    return this.eObjectToJsonAux(obj, new Map<EObject, any>(), false);
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

    //build index of all contained objects
    const idsToObjs = new Map<string, EObject>();
    eobj.eAllContents().forEach((elem) => {
      idsToObjs.set(elem.fullId(), elem);
    });

    //deserialize references, collecting unresolved ones
    const unresolvedRefs = new Array<SerializedReference>();
    serializedReferences.forEach((ref) => {
      if (!ref.deserialize(idsToObjs)) {
        unresolvedRefs.push(ref);
      }
    });

    // Create proxies for unresolved references
    unresolvedRefs.forEach((ref) => {
      this.createAndSetProxy(ref, idsToObjs);
    });

    return eobj;
  }

  /**
   * Creates a proxy object for an unresolved reference and sets it on the source object.
   * 
   * @param ref The unresolved serialized reference
   * @param idsToObjs Map of all resolved objects
   */
  private static createAndSetProxy(ref: SerializedReference, idsToObjs: Map<string, EObject>): void {
    const fromObj = idsToObjs.get(ref.fromId);
    if (!fromObj) return;

    const feature = fromObj.eClass().getEStructuralFeature(ref.refName);
    if (!feature || !(feature instanceof EReferenceImpl)) return;

    // Check if proxy already exists for this target
    let proxy = idsToObjs.get(ref.toId);
    if (!proxy) {
      proxy = this.createProxy(ref.toId, feature as EReference);
      if (proxy) {
        // Add proxy to the index so future references to it can be resolved
        idsToObjs.set(ref.toId, proxy);
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
          containeTJsonObj.put(
            this.JSON_FIELD_TYPESCRIPT_TYPE,
            ref.getEType()!.getName()
          );
        }
        const referencedEmfObj = this.jsonToEObject(
          containeTJsonObj,
          serializedRefs
        );
        tObj.eSet(ref, referencedEmfObj);
      } else {
        serializedRefs.push(
          SerializedReference.create(
            tObj.fullId(),
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
          serializedRefs.push(
            SerializedReference.create(
              tObj.fullId(),
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
    attributesOnly: boolean
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
      this.referencesToJson(obj, serializedSoFar, jsonObj);
    }
    return jsonObj;
  }

  private static referencesToJson(
    obj: EObject,
    serializedSoFar: Map<EObject, any>,
    jsonObj: {}
  ) {
    for (const ref of obj.eClass().getEAllReferences()) {
      if (!ref.isVolatile() && !ref.isTransient()) {
        //multi-valued references
        if (ref.isMany()) {
          this.manyValuedReferenceToJson(obj, ref, serializedSoFar, jsonObj);
        }
        //single-valued references
        else {
          this.singleValuedRefToJson(obj, ref, serializedSoFar, jsonObj);
        }
      }
    }
  }

  private static manyValuedReferenceToJson(
    obj: EObject,
    ref: EReference,
    serializedSoFar: Map<EObject, any>,
    jsonObj: any
  ) {
    const jsonFieldName = this.getJsonFieldName(ref);
    const referencedColl = <BasicEList<any>>obj.eGet(ref);
    const jsonArray = [];
    for (const referencedObj of referencedColl) {
      if (referencedObj != null) {
        if (ref.isContainment()) {
          const referenceTJsonObj = this.eObjectToJsonAux(
            <EObject>referencedObj,
            serializedSoFar,
            !ref.isContainment()
          );
          if (referenceTJsonObj != null) jsonArray.push(referenceTJsonObj);
        } else {
          const serializedRef = new SerializedReference(
            TUtils.getOrCreateIdForObject(obj).toString(),
            TUtils.getOrCreateIdForObject(referencedObj).toString(),
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
    jsonObj: any
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
          !ref.isContainment()
        );
      }
      //otherwise, we generate a serialized pointer to the referenced object
      else {
        if (
          obj.eClass().getEIDAttribute() &&
          referencedObj.eClass().getEIDAttribute()
        ) {
          referenceTJsonObj = new SerializedReference(
            TUtils.getOrCreateIdForObject(obj).toString(),
            TUtils.getOrCreateIdForObject(referencedObj).toString(),
            jsonFieldName
          ).serialize();
        }
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