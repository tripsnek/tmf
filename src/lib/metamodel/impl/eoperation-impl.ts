import { EClassifier } from '../api/eclassifier.js';
import { EClass } from '../api/eclass.js';
import { EParameter } from '../api/eparameter.js';
import { EList } from '../api/elist.js';
import { BasicEList } from '../basicelist.js';
import { ETypedElementImpl } from './etyped-element-impl.js';
import { EOperation } from '../api/eoperation.js';
import { EObject } from '../api/eobject.js';

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
