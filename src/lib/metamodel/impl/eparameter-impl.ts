import { EOperation } from '../api/eoperation.js';
import { ETypedElementImpl } from './etyped-element-impl.js';
import { EClass } from '../api/eclass.js';
import { EClassifier } from '../api/eclassifier.js';
import { EParameter } from '../api/eparameter.js';
import { EObject } from '../api/eobject.js';

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
