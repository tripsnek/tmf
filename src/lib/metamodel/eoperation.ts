import { EClass } from './eclass';
import { EParameter } from './eparameter';
import { EList } from './elist';
import { ETypedElement } from './etyped-element';

/**
 * Represents an operation (method) that can be defined on a class.
 * Operations have parameters, return types, and are identified by
 * a unique ID within their containing class.
 */
export interface EOperation extends ETypedElement {
  /** Returns the unique ID of this operation within its containing class. */
  getOperationID(): number;
  
  /** Sets the unique ID of this operation within its containing class. */
  setOperationID(operationID: number) : void;
  
  /** Returns the class that contains this operation. */
  getEContainingClass(): EClass;
  
  /** Sets the class that contains this operation. */
  setEContainingClass(owner: EClass): void;
  
  /** Returns the list of parameters for this operation. */
  getEParameters(): EList<EParameter>;
}
