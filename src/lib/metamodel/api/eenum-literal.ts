import { EEnum } from './eenum';
import { ENamedElementImpl } from '../impl/enamed-element-impl';

/**
 * Represents a single constant value within an enumeration.
 * Each literal has a name, a string literal representation, 
 * a numeric value, and an associated instance object.
 */
export interface EEnumLiteral extends ENamedElementImpl {
  /** Returns the enumeration that contains this literal. */
  getEEnum(): EEnum;
  
  /** Sets the enumeration that contains this literal. */
  setEEnum(eenum: EEnum): void;
  
  /** Returns the string representation of this enumeration literal. */
  getLiteral(): string;
  
  /** Sets the string representation of this enumeration literal. */
  setLiteral(value: string): void;
  
  /** Returns the numeric value associated with this enumeration literal. */
  getValue(): number;
  
  /** Sets the numeric value associated with this enumeration literal. */
  setValue(value: number): void;
  
  /** Returns the runtime instance object for this enumeration literal. */
  getInstance(): any;
  
  /** Sets the runtime instance object for this enumeration literal. */
  setInstance(value: any): void;
}
