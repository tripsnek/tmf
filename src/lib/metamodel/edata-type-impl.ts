import { EPackage } from './epackage';
import { EClass } from './eclass';
import { EClassifierImpl } from './eclassifier-impl';
import { EDataType } from './edata-type';

export class EDataTypeImpl extends EClassifierImpl implements EDataType {
  public constructor(eClass?: EClass, owner?: EPackage, name?: string) {
    super(eClass, owner, name);
  }
}
