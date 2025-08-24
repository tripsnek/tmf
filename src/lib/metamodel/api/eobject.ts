import { EStructuralFeature } from './estructural-feature';
import { EClass } from './eclass';

/**
 * The base interface for all model objects in TMF. Provides reflection capabilities,
 * containment relationships, bidirectional reference management, and generic access to features.
 * 
 * EObject represents any instance of a model class and provides the fundamental operations
 * for working with EMF-style models including navigation, serialization, and dynamic access.
 */
export interface EObject {
  /** Returns the metaclass that describes this object's type and features. */
  eClass(): EClass;

  // setEClass(eClass: EClass) : void;

  /** Returns the object that contains this object, or undefined if this is a root object. */
  eContainer(): EObject;

  /** Sets the container of this object. Used internally by TMF to maintain containment relationships. */
  setEContainer(eContainer?: EObject, containingFeatureId?: number) : void;

  /**
   * Invoked on setting a new reference with an EOpposite to enforce the removal
   * on the other end of the old reference.
   * @param otherEnd
   * @param featureId
   */
  eInverseRemove(otherEnd: EObject, featureId: number) : void;

  /**
   * Invoked on setting a new reference with an EOpposite to enforce the addition
   * on the other end of the new reference.
   * @param otherEnd
   * @param featureId
   */
  eInverseAdd(otherEnd: EObject, featureId: number) : void;

  /** Returns the structural feature in the container that holds this object. */
  eContainingFeature() : EStructuralFeature | undefined;

  //TODO: what does this even mean?
  // eContainmentFeature() : EStructuralFeature | undefined;

  /** Returns all objects directly contained by this object. */
  eContents(): EObject[];

  /** Returns this object and all objects transitively contained by this object. */
  eAllContents(): EObject[];

  //================================================================================
  // Serializable ID strategy strategy

  /** Returns a unique identifier combining the class name and ID attribute value. */
  fullId(): string;

  //================================================================================
  // Generic getting/setting

  /** Gets the value of the specified feature. */
  eGet(feature: EStructuralFeature | number): any;

  /** Sets the value of the specified feature. */
  eSet(feature: EStructuralFeature | number, value: any): void;

  /** Returns true if the specified feature has been explicitly set. */
  eIsSet(feature: EStructuralFeature | number): boolean;

  /** Unsets the specified feature, reverting it to its default value. */
  eUnset(feature: EStructuralFeature | number): void;

  /** Returns true if this object is a proxy that needs to be resolved. */
  eIsProxy() : boolean;

  /** Sets whether this object is a proxy. */
  eSetProxy(proxy: boolean): void;
}
