import { EClass } from './eclass';
import { EParameter } from './eparameter';
import { EList } from './elist';
import { ETypedElement } from './etyped-element';
export interface EOperation extends ETypedElement {
  getOperationID(): number;
  setOperationID(operationID: number);
  getEContainingClass(): EClass;
  setEContainingClass(owner: EClass): void;
  getEParameters(): EList<EParameter>;
}
