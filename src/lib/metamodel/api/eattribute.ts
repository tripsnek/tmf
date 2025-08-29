import { EStructuralFeature } from './estructural-feature.js';
import { EDataType } from './edata-type.js';

/**
 * Represents a data attribute of a class. Attributes hold primitive or
 * serializable values such as strings, numbers, or enums, as opposed 
 * to references which hold other model objects.
 */
export interface EAttribute extends EStructuralFeature {
  // getEAttributeType(): EDataType;

  /** Returns true if this attribute serves as a unique identifier for instances. */
  isId(): boolean;

  /** Sets whether this attribute serves as a unique identifier. */
  setId(value: boolean): void;
}
