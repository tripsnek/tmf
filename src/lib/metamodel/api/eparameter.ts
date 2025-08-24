import { EOperation } from './eoperation';
import { ETypedElementImpl } from '../etyped-element-impl';

/**
 * Represents a parameter of an operation. Parameters have a name, type,
 * multiplicity constraints, and belong to a specific operation.
 */
export interface EParameter extends ETypedElementImpl {
  /** Returns the operation that contains this parameter. */
  getEOperation(): EOperation;

  /** Sets the operation that contains this parameter. */
  setEOperation(op: EOperation): void;

  /** Returns true if this parameter is optional (has a default value or is nullable). */
  isOptional(): boolean;
}
