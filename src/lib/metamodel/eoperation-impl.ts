import { EClassifier } from './eclassifier';
import { EClass } from './eclass';
import { EParameter } from './eparameter';
import { EList } from './elist';
import { BasicEList } from './basicelist';
import { ETypedElementImpl } from './etyped-element-impl';
import { EOperation } from './eoperation';
import { EObject } from './eobject';

export class EOperationImpl extends ETypedElementImpl implements EOperation {
  private eParameters: EList<EParameter> = new BasicEList();
  private operationID = -1;
  private eContainingClass: EClass;

  public constructor(
    eClass?: EClass,
    name?: string,
    eContainingClass?: EClass,
    eType?: EClassifier
  ) {
    super(eClass, name, eType);
    this.setEContainingClass(eContainingClass);
  }

  public getOperationID(): number {
    return this.operationID;
  }

  public setOperationID(operationID: number) {
    this.operationID = operationID;
  }

  public getEContainingClass(): EClass {
    return this.eContainingClass;
  }
  public setEContainingClass(owner: EClass): void {
    this.eContainingClass = owner;
  }

  public getEParameters(): EList<EParameter> {
    return this.eParameters;
  }

  public eContainer(): EObject  {
    return this.eContainingClass;
  }
}
