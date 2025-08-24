import { EPackage } from './api/epackage';
import { EClass } from './api/eclass';
import { EClassifierImpl } from './eclassifier-impl';
import { EDataType } from './api/edata-type';

export class EDataTypeImpl extends EClassifierImpl implements EDataType {
  public constructor(owner?: EPackage, name?: string) {
    super(owner, name);
  }
}
