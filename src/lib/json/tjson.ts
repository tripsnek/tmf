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

/**
 * Utilities for converting between EObjects and JSON. Usage:
 *
 * (1) TJson.makeJson(EObject) - converts an EObject to JSON.
 * (2) TJson.makeEObject(json) - deserializes EObject encoded with (1).
 * (3) TJson.makeJsonArray(EObject[]) - converts an array of EObjects to a JSON Array.
 * (4) TJson.makeEObjectArray(json) - converts a JSON Array to an array of EObjects.
 *
 */
export class TJson {
  //the name of the special JSON field that indicates each object's type
  public static JSON_FIELD_TYPESCRIPT_TYPE = '@type';

  //TODO: Need to inject these on application boot
  static packages : EPackage[] = [];
  public static setPackages(packages: EPackage[]) {
    this.packages = packages;
  }

  /**
   * Converts a TMF EObject to JSON.
   *
   * @param obj
   */
  public static makeJson(obj: EObject): any {
    return this.eObjectToJsonAux(obj, new Map<EObject, any>(), false);
  }

  /**
   * Converts an object in JSON Object into a TMF EObject.
   *
   * @param json
   * @return
   */
  public static makeEObject(jsonObj: any): EObject | undefined{
    const serializedReferences = new Array<SerializedReference>();

    //build containment heirarchy
    const eobj = this.jsonToEObject(jsonObj, serializedReferences);
    if(!eobj) return undefined;

    //build index of all contained objects
    const idsToObjs = new Map<string, EObject>();
    eobj.eAllContents().forEach((elem) => {
      idsToObjs.set(elem.fullId(), elem);
    });

    //deserialize references
    serializedReferences.forEach((ref) => {
      ref.deserialize(idsToObjs);
    });
    return eobj;
  }

  /**
   * Converts a TMF EObject array to JSON array.
   *
   * @param obj
   */
  public static makeJsonArray(objs: EObject[]): any[] {
    const jsonArray : any[] = [];
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
    const eobjArray : EObject[] = [];
    jsonArray.forEach((element) => {
      const eobj = this.makeEObject(element);
      if(eobj)
       eobjArray.push(eobj);
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
      // if (ref.isContainment()) {
      //   dObj.eSet(ref, dCollection);
      // }
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
    //FAILSAFE: make sure the same object is never serialized twice - otherwise could get infinite loops
    // if(serializedSoFar.containsKey(o))
    //   return null;
    // serializedSoFar.put(o, jsonObj);

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
