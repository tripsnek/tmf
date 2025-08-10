import { EOperation } from './eoperation';
import { ETypedElementImpl } from './etyped-element-impl';

export interface EParameter extends ETypedElementImpl {
  getEOperation(): EOperation;

  isOptional(): boolean;
}
