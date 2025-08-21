import { EClassifier } from './metamodel/eclassifier';
import { EObject } from './metamodel/eobject';
import { EEnum } from './metamodel/eenum';
import { v4 as uuid } from 'uuid';
import { EcorePackage } from './metamodel/ecorepackage';
import { EAttribute } from './metamodel/eattribute';
import { EStructuralFeature } from './metamodel/estructural-feature';
import { EReference } from './metamodel/ereference';
import { TJson } from './json/tjson';
import { EEnumImpl } from './metamodel/eenum-impl';
import { EDataTypeImpl } from './metamodel/edata-type-impl';
import { EList } from './metamodel/elist';
import { EClass } from './metamodel/eclass';
import { EPackage } from './metamodel/epackage';
import { EClassImpl } from './metamodel/eclass-impl';

/**
 * Various utilities for interacting with TMF-modeled data objects, some
 * of which are relied upon by core TMF components (e.g. TJson) and generated
 * source code.
 */
export class TUtils {
  //All primitive EDataTypes supported by TMF
  public static PRIMITIVES = [
    'EString',
    'EBoolean',
    'EDouble',
    'EDoubleObject',
    'EFloat',
    'EFloatObject',
    'EInt',
    'EIntegerObject',
    'EDate',
  ];

  /**
   * Ensures all objects have IDs.
   * @param obj
   */
  static generateIdsForAllContained(obj: EObject) {
    for (const e of obj.eAllContents()) this.genIdIfNotExists(e);
  }
  /**
   * Sets an ID for the given object on it's ID EAttribute. If
   * an ID is already specified, does nothing.
   *
   * @param obj
   */
  static genIdIfNotExists(obj: EObject) {
    //TODO: Support IDs other than string uuids
    if (obj && obj.eClass().getEIDAttribute() && !obj.fullId()) {
      obj.eSet(obj.eClass().getEIDAttribute() as EAttribute, uuid());
    }
  }

  /**
   * If an ID is specified on the object, returns a new TId instance with that ID value. If not, a
   * new ID is assigned and that TId returned.
   *
   * @param obj
   */
  static getOrCreateIdForObject(obj: EObject): string {
    this.genIdIfNotExists(obj);
    return obj.fullId();
  }

  /**
   * Gets the Typescript name for a given EClassifier, including
   * translation of primitive EDataType names (e.g. EBoolean -> boolean).
   * @param type
   */
  public static getTypescriptName(type: EClassifier) {
    if (!type) return 'null';
    let typeStr = type.getName();
    if (!(type instanceof EEnumImpl) && type instanceof EDataTypeImpl)
      typeStr = TUtils.toTypeScriptPrimitive(type);
    return typeStr;
  }

  /**
   * Gets the TypeScript primitive type for a given TMF EClassifier that represents a
   * primitive type.
   * @param classifier
   */
  static toTypeScriptPrimitive(classifier: EClassifier): string {
    if (!classifier || !classifier.getName()) return 'any';
    switch (classifier.getName().toLowerCase()) {
      case 'estring': {
        return 'string';
        break;
      }
      case 'eboolean': {
        return 'boolean';
        break;
      }
      case 'edouble': {
        return 'number';
        break;
      }
      case 'edoubleobject': {
        return 'number';
        break;
      }
      case 'efloat': {
        return 'number';
        break;
      }
      case 'efloatobject': {
        return 'number';
        break;
      }
      case 'eint': {
        return 'number';
        break;
      }
      case 'eintegerobject': {
        return 'number';
        break;
      }
      case 'edate': {
        return 'Date';
        break;
      }
      case 'earray': {
        return '[]';
      }
      default: {
        return 'any';
      }
    }
  }


  static lookupNamedField(
    object: EObject,
    fieldName: string
  ): EStructuralFeature | undefined {
    const curClass = object.eClass();
    const field = curClass.getEStructuralFeature(fieldName);

    if (!field) {
      console.log(curClass.getName(), ' has no field named', fieldName);
      return undefined;
    }
    return field;
  }

  static getNamedFieldValue(object: EObject, fieldName: string): any {
    const field = this.lookupNamedField(object, fieldName);
    if (field) return object.eGet(field);
    return undefined;
  }

  static setNamedFieldValue(object: EObject, fieldName: string, newValue: any) {
    const field = this.lookupNamedField(object, fieldName);
    if (field) object.eSet(field, newValue);
    return undefined;
  }

  /**
   * Parses a value for an EAttribute from it's JSON representation.
   *
   * @param attr
   * @param jsonVal
   */
  public static parseAttrValFromString(attr: EAttribute, stringVal: any): any {
    return this.parseValueFromString(
      attr.getEType() as EClassifier,
      stringVal + ''
    );
  }

  public static parseValueFromString(attrType: EClassifier, stringVal: string) {
    let tVal = null;
    //if an empty string was set for the field, just return null
    if (
      !stringVal ||
      (stringVal.toString().trim() === '' &&
        attrType !== EcorePackage.Literals.E_STRING)
    ) {
      return null;
    }

    if (attrType === EcorePackage.Literals.E_STRING) {
      tVal = stringVal.toString();
    } else if (
      attrType === EcorePackage.Literals.E_DOUBLE ||
      attrType === EcorePackage.Literals.E_DOUBLE_OBJECT
    ) {
      tVal = Number.parseFloat(stringVal.toString());
    } else if (
      attrType === EcorePackage.Literals.E_FLOAT ||
      attrType === EcorePackage.Literals.E_FLOAT_OBJECT
    ) {
      tVal = Number.parseFloat(stringVal.toString());
    } else if (
      attrType === EcorePackage.Literals.E_BOOLEAN ||
      attrType === EcorePackage.Literals.E_BOOLEAN_OBJECT
    ) {
      tVal = stringVal.toString() === 'true';
    } else if (
      attrType === EcorePackage.Literals.E_SHORT ||
      attrType === EcorePackage.Literals.E_SHORT_OBJECT
    ) {
      tVal = Number.parseInt(stringVal.toString(), 10);
    } else if (
      attrType === EcorePackage.Literals.E_INT ||
      attrType === EcorePackage.Literals.E_INTEGER_OBJECT
    ) {
      tVal = Number.parseInt(stringVal.toString(), 10);
    } else if (
      attrType === EcorePackage.Literals.E_LONG ||
      attrType === EcorePackage.Literals.E_LONG_OBJECT
    ) {
      tVal = Number.parseInt(stringVal.toString(), 10);
    } else if (attrType === EcorePackage.Literals.E_DATE) {
      tVal = new Date(Date.parse(stringVal));
    } else if (attrType instanceof EEnumImpl) {
      const eenum = <EEnum>attrType;
      const literal = eenum.getEEnumLiteral(stringVal.toString());
      if (literal != null) {
        tVal = literal.getLiteral();
      } else {
        console.warn(
          'Could not parse literal value ' +
            stringVal.toString() +
            ' for ' +
            eenum.getName()
        );
      }
    }
    return tVal;
  }

  /**
   * Creates a deep copy of an Root and it's containment hierarchy, with optional
   * lists for specifying specific EReferences to traverse or prune during the copy. New
   * IDs will be assigned to all copied entities. Internal references will be preserved where possible.
   *
   * @param toClone - root of container containment hierarchy to copy
   * @param prune -  EReferences not to traverse during copy. If specified, these
   *                                    references will not be traversed during copy
   * @param traverse - EReferences to traverse during copy. If specified, no EReference
   *                                      will be traversed unless it is in this list.
   * @param target - Allows specification of an entity into which to copy data, which does not have
   *                        to be of the same type as the copied entity (non-overlapping structure will be ignored).
   * @returns the copy
   */
  static clone<T extends EObject>(
    toClone: T,
    prune?: EReference[],
    traverse?: EReference[],
    target?: T,
    oldToNewEntities?: Map<EObject, EObject>
  ): T {
    //create new instance
    const newContainer = target
      ? target
      : <T>(
          toClone
            .eClass()
            .getEPackage()
            .getEFactoryInstance()
            .create(toClone.eClass())
        );

    //map of old entities to new entities that will be filled in during the duplication
    const oldToNew = oldToNewEntities
      ? oldToNewEntities
      : new Map<EObject, EObject>();

    //recursive duplication of containment hierachy
    this.cloneInto<T>(
      toClone,
      newContainer,
      prune ? prune : [],
      traverse ? traverse : [],
      oldToNew
    );

    //re-establish container internal references for all entities in the
    //container, including the container root itself
    const allOldEntities = toClone.eAllContents();
    allOldEntities.push(toClone);
    for (const oldEntity of allOldEntities) {
      const newEntity = oldToNew.get(oldEntity);
      if (newEntity) {
        for (const eref of newEntity.eClass().getEAllReferences()) {
          //only look at container internal references
          if (!eref.isContainment() && !eref.isTransient()) {
            const oldRefVal = oldEntity.eGet(eref);
            if (oldRefVal) {
              //handle many-valued references
              if (eref.isMany()) {
                const newRefList = newEntity.eGet(eref);
                if (newRefList) {
                  for (const oldRef of oldRefVal) {
                    const newRef = oldToNew.get(oldRef);
                    if (newRef) newRefList.add(newRef);
                    else if (oldRef) newRefList.add(oldRef);
                  }
                }
              }
              //handle single-valued references
              else {
                const newVal = oldToNew.get(oldRefVal);
                if (newVal) newEntity.eSet(eref, newVal);
                else newEntity.eSet(eref, oldRefVal);
              }
            }
          }
        }
      }
    }
    return newContainer;
  }

  private static cloneInto<T extends EObject>(
    copyFrom: T,
    copyInto: T,
    pruneOnlyTheseReferences: EReference[],
    traverseOnlyTheseReferences: EReference[],
    oldToNew?: Map<EObject, EObject>
  ) {
    for (const attr of copyInto.eClass().getEAllAttributes()) {
      if (!attr.isVolatile()) {
        copyInto.eSet(attr, copyFrom.eGet(attr));
      }
    }

    //assign new ID to entity
    if (copyInto.eClass().getEIDAttribute())
      copyInto.eSet(copyInto.eClass().getEIDAttribute() as EAttribute, uuid());

    //register old to new entity in Map, if specified
    if (oldToNew) oldToNew.set(copyFrom, copyInto);

    //recurse containments
    for (const ref of copyInto.eClass().getEAllReferences()) {
      //determine if reference should be traversed
      let traverse = true;

      //do not traverse pruned references
      if (traverse && pruneOnlyTheseReferences) {
        for (const toPrune of pruneOnlyTheseReferences) {
          if (toPrune === ref) traverse = false;
        }
      }
      //do not traverse references not in the traverse list (if it is specified)
      if (traverse && traverseOnlyTheseReferences) {
        traverse = false;
        for (const toPrune of traverseOnlyTheseReferences) {
          if (toPrune === ref) traverse = true;
        }
      }

      //recursively copy the containment
      if (traverse) {
        if (ref.isContainment()) {
          //many-valued containment
          if (ref.isMany()) {
            const list = copyInto.eGet(ref);
            for (const toCopy of copyFrom.eGet(ref)) {
              list.add(
                this.clone(
                  toCopy,
                  pruneOnlyTheseReferences,
                  traverseOnlyTheseReferences,
                  null,
                  oldToNew
                )
              );
            }
          }

          //single valued containment
          else {
            const toCopy = copyFrom.eGet(ref);
            if (toCopy) {
              copyInto.eSet(
                ref,
                this.clone(
                  toCopy,
                  pruneOnlyTheseReferences,
                  traverseOnlyTheseReferences,
                  null,
                  oldToNew
                )
              );
            }
          }
        }
        //simply assign non-containment references if they have no eopposite
        else if (
          !ref.getEOpposite() &&
          !ref.isContainer() &&
          !ref.isVolatile()
        ) {
          if (ref.isMany()) {
            const list = copyInto.eGet(ref);
            for (const member of copyFrom.eGet(ref)) list.add(member);
          } else copyInto.eSet(ref, copyFrom.eGet(ref));
        }
      }
    }
    return copyInto;
  }

  public static carbonCopy<T extends EObject>(obj: T): T {
    return TJson.makeEObject(TJson.makeJson(obj)) as T;
  }

  /**
   * Overwrites all attributes values, and replaces all containments with
   * carbon copies. Non-containment references are left alone.
   *
   * @param currentState
   * @param newState
   */
  public static shallowUpdate(currentState: EObject, newState: EObject) {
    //copy all EAttributes at the roote level
    for (const attr of newState.eClass().getEAllAttributes()) {
      if (!attr.isVolatile()) {
        currentState.eSet(attr, newState.eGet(attr));
      }
    }

    //replace all contained instances
    for (const ref of newState.eClass().getEAllContainments()) {
      if (ref.isMany()) {
        const newContained = newState.eGet(ref);
        if (newContained) currentState.eSet(ref, this.carbonCopy(newContained));
        else currentState.eSet(ref, null);
      } else {
        const currentContained = currentState.eGet(ref) as EList<EObject>;
        currentContained.clear();
        const newContainedList = newState.eGet(ref) as EList<EObject>;
        for (const newContained of newContainedList) {
          currentContained.add(this.carbonCopy(newContained));
        }
      }
    }
  }

  /**
   * Returns the package and transitive closure of all contained subpackages.
   * 
   * @param pkg
   * @returns 
   */
  public static allPackagesRecursive(pkg: EPackage, addTo?: EPackage[]) : EPackage[] {
    let pkgs = addTo ? addTo : [];
    pkgs.push(pkg);
    for(const sp of pkg.getESubPackages()){
      this.allPackagesRecursive(sp,pkgs);
    }
    return pkgs;
  }

  public static getRootEClasses(root: EPackage): EClass[] {
    if (!root) return [];

    const allPkgs: EPackage[] = this.allPackagesRecursive(root);
    const allClasses: EClass[] = [];
    const containedClasses = new Set<EClass>();


    // First, collect all non-abstract, non-interface classes
    for (const ePackage of allPkgs) {
      ePackage.getEClassifiers().forEach((classifier) => {
        if (
          classifier instanceof EClassImpl &&
          !classifier.isAbstract() &&
          !classifier.isInterface()
        ) {
          allClasses.push(classifier);
        }
      });
    }

    // Then, find which classes are contained by others
    allClasses.forEach((eClass) => {
      eClass.getEAllReferences().forEach((ref) => {
        if (ref.isContainment()) {
          const targetType = ref.getEType();
          if (targetType instanceof EClassImpl) {
            containedClasses.add(targetType);
            // Also add all subtypes
            allClasses.forEach((otherClass) => {
              if (otherClass.getEAllSuperTypes().contains(targetType)) {
                containedClasses.add(otherClass);
              }
            });
          }
        }
      });
    });

    // Return classes that are not contained by any other class
    return allClasses.filter((c) => !containedClasses.has(c)).reverse();
  }
}
