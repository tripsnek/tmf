import { ENamedElement } from './enamed-element';
import { EClassifier } from './eclassifier';

/**
 * Base interface for metamodel elements that have a type and multiplicity.
 * Used by EAttribute, EReference, and EParameter to define their data type
 * and cardinality constraints.
 */
export interface ETypedElement extends ENamedElement {
  /** Returns the minimum number of values for this element (0 means optional). */
  getLowerBound(): number;

  /** Sets the minimum number of values for this element. */
  setLowerBound(value: number): void;

  /** Returns the maximum number of values for this element (-1 means unbounded). */
  getUpperBound(): number;

  /** Sets the maximum number of values for this element. */
  setUpperBound(value: number): void;

  // /** Returns true if duplicate values are not allowed in collections. */
  // isUnique(): boolean;

  // /** Sets whether duplicate values are allowed in collections. */
  // setUnique(value: boolean): void;

  /** Returns the type classifier for this element. */
  getEType(): EClassifier;

  /** Sets the type classifier for this element. */
  setEType(value: EClassifier): void;

  /** Returns true if this element can contain multiple values (upperBound != 1). */
  isMany(): boolean;

  // isOrdered(): boolean;

  // setOrdered(value: boolean): void;

  /** Returns true if this element is required (lowerBound >= 1). */
  isRequired(): boolean;
}
