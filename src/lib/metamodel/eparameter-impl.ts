import { EOperation } from './eoperation';
import { ETypedElementImpl } from './etyped-element-impl';
import { EClass } from './eclass';
import { EClassifier } from './eclassifier';
import { EParameter } from './eparameter';
import { EObject } from './eobject';

export class EParameterImpl extends ETypedElementImpl implements EParameter {
  private eOperation!: EOperation;

  public constructor(
    name?: string,
    eType?: EClassifier,
    eOperation?: EOperation
  ) {
    super(name, eType);
    if (eOperation) this.eOperation = eOperation;
  }
  public setEOperation(op: EOperation): void {
    this.eOperation = op;
  }

  public getEOperation(): EOperation {
    return this.eOperation;
  }

  public isOptional(): boolean {
    return this.getLowerBound() === 0 && this.getUpperBound() === 1;
  }

  public override eContainer(): EObject {
    return this.eOperation;
  }
}
