import { EDataType } from '../api/edata-type.js';
import { EClass } from '../api/eclass.js';
import { EAttribute } from '../api/eattribute.js';
import { EStructuralFeatureImpl } from './estructural-feature-impl.js';

export class EAttributeImpl
  extends EStructuralFeatureImpl
  implements EAttribute
{
  private representsId: boolean = false;
  // private eAttributeType!: EDataType;

  public constructor(
    name?: string,
    containingEClass?: EClass,
    attrType?: EDataType
  ) {
    super(name, attrType);
    // this.eAttributeType = attrType!;
    this.setEContainingClass(containingEClass);
  }

  // public getEAttributeType(): EDataType {
  //   return this.eAttributeType;
  // }

  public isId(): boolean {
    return this.representsId;
  }

  public setId(value: boolean): void {
    this.representsId = value;
  }
}
