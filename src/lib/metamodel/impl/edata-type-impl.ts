import { EPackage } from '../api/epackage.js';
import { EClass } from '../api/eclass.js';
import { EClassifierImpl } from './eclassifier-impl.js';
import { EDataType } from '../api/edata-type.js';

export class EDataTypeImpl extends EClassifierImpl implements EDataType {
  public constructor(owner?: EPackage, name?: string) {
    super(owner, name);
  }
}
