import { EClassifier } from '../api/eclassifier';
import { EClass } from '../api/eclass';
import { EParameter } from '../api/eparameter';
import { EList } from '../api/elist';
import { BasicEList } from '../basicelist';
import { ETypedElementImpl } from './etyped-element-impl';
import { EOperation } from '../api/eoperation';
import { EObject } from '../api/eobject';

export class EOperationImpl extends ETypedElementImpl implements EOperation {
  private eParameters: EList<EParameter> = new BasicEList();
  private operationID = -1;
  private eContainingClass!: EClass;

  public constructor(
    name?: string,
    eContainingClass?: EClass,
    eType?: EClassifier
  ) {
    super(name, eType);
    if (eContainingClass) this.setEContainingClass(eContainingClass);
  }

  public getOperationID(): number {
    return this.operationID;
  }

  public setOperationID(operationID: number): void {
    this.operationID = operationID;
  }

  public getEContainingClass(): EClass {
    return this.eContainingClass;
  }
  public setEContainingClass(owner: EClass | undefined): void {
    if (owner) this.eContainingClass = owner;
  }

  public getEParameters(): EList<EParameter> {
    return this.eParameters;
  }

  public override eContainer(): EObject  {
    return this.eContainingClass;
  }
}
