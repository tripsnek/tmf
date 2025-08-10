import { EStructuralFeature } from './estructural-feature';
import { EClass } from './eclass';

export interface EObject {
  eClass(): EClass;

  setEClass(eClass: EClass);

  eContainer(): EObject;

  // This method is probably to be invoked by setting a containment field
  // This should really only be invoked by generated code!
  setEContainer(eContainer: EObject, containingFeatureId: number);

  /**
   * Invoked on setting a new reference with an EOpposite to enforce the removal
   * on the other end of the old reference.
   * @param otherEnd
   * @param featureId
   */
  eInverseRemove(otherEnd: EObject, featureId: number);

  /**
   * Invoked on setting a new reference with an EOpposite to enforce the addition
   * on the other end of the new reference.
   * @param otherEnd
   * @param featureId
   */
  eInverseAdd(otherEnd: EObject, featureId: number);

  eContainingFeature();

  eContainmentFeature();

  eContents(): EObject[];

  //TODO: Should this be a fancy TreeIterator that traverses the heirarchy?
  eAllContents(): EObject[];

  //================================================================================
  // Serializable DId strategy

  /**
   * Encodes type name and EAttributes marked as ID into a String.
   */
  fullId(): string;

  //================================================================================
  // Generic getting/setting

  eGet(feature: EStructuralFeature | number): any;

  eSet(feature: EStructuralFeature | number, value: any): void;

  eIsSet(feature: EStructuralFeature | number): boolean;

  eUnset(feature: EStructuralFeature | number): void;
}
