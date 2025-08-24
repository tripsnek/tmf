import { EClassifier } from './eclassifier';

/**
 * Represents a primitive or serializable data type in the metamodel.
 * Used for attributes that hold values like strings, numbers, booleans,
 * or other serializable data rather than references to model objects.
 */
export interface EDataType extends EClassifier {}
