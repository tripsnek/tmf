import { EEnumLiteral } from './eenum-literal.js';
import { EList } from './elist.js';
import { EDataType } from './edata-type.js';

/**
 * Represents an enumeration type with a fixed set of named constants.
 * Each enumeration contains a collection of EEnumLiteral instances
 * that define the possible values.
 */
export interface EEnum extends EDataType {
  /** Returns the list of enumeration literals defined in this enum. */
  getELiterals(): EList<EEnumLiteral>;
  
  /** Adds a new enumeration literal to this enum. */
  addLiteral(value: EEnumLiteral): void;
  
  /** Returns the enumeration literal with the specified literal value. */
  getEEnumLiteralByLiteral(literal: string): EEnumLiteral | undefined;
  
  /** Returns the enumeration literal with the specified numeric value. */
  getEEnumLiteral(value: number): EEnumLiteral | undefined;
  
  /** Returns the enumeration literal with the specified name. */
  getEEnumLiteral(value: string): EEnumLiteral | undefined;
  
  /** Returns the enumeration literal with the specified numeric value or name. */
  getEEnumLiteral(value: number | string): EEnumLiteral | undefined;
}
