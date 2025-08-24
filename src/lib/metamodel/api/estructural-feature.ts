import { ETypedElement } from './etyped-element';
import { EClass } from './eclass';

/**
 * Base interface for structural features of a class (attributes and references).
 * Defines properties like default values, mutability, and containment relationships.
 */
export interface EStructuralFeature extends ETypedElement {
  // isDerived(): boolean;

  // setDerived(value: boolean): void;

  /** Returns true if this feature should not be persisted. */
  isTransient(): boolean;

  /** Sets whether this feature should be persisted. */
  setTransient(value: boolean): void;

  // isUnsettable(): boolean;

  // setUnsettable(value: boolean): void;

  /** Returns true if this feature's value is not stored but computed dynamically. */
  isVolatile(): boolean;

  /** Sets whether this feature's value is computed dynamically. */
  setVolatile(value: boolean): void;

  /** Sets the unique ID of this feature within its containing class. */
  setFeatureID(value: number): void;

  /** Returns the unique ID of this feature within its containing class. */
  getFeatureID(): number;

  // isList(): boolean;

  /** Returns true if this feature represents a containment relationship. */
  isContainment(): boolean;

  // getContainerClass(): string | null;

  /** Returns the default value for this feature. */
  getDefaultValue(): any;

  /** Sets the default value for this feature. */
  setDefaultValue(value: any): void;

  /** Returns the literal string representation of the default value. */
  getDefaultValueLiteral(): string;

  /** Sets the literal string representation of the default value. */
  setDefaultValueLiteral(value: string): void;

  /** Returns the class that contains this feature. */
  getEContainingClass(): EClass;

  /** Sets the class that contains this feature. */
  setEContainingClass(owner: EClass | undefined): void;

  /** Returns true if the value of this feature can be changed after initialization. */
  isChangeable(): boolean;

  /** Sets whether the value of this feature can be changed after initialization. */
  setChangeable(value: boolean): void;
}
