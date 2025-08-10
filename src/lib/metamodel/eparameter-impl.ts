import { EOperation } from './eoperation';
import { ETypedElementImpl } from './etyped-element-impl';
import { EClass } from './eclass';
import { EClassifier } from './eclassifier';
import { EParameter } from './eparameter';

export class EParameterImpl extends ETypedElementImpl implements EParameter {
  private eOperation: EOperation;

  public constructor(
    eClass?: EClass,
    name?: string,
    eType?: EClassifier,
    eOperation?: EOperation
  ) {
    super(eClass, name, eType);
    this.eOperation = eOperation;
  }

  public getEOperation(): EOperation {
    return this.eOperation;
  }

  public isOptional(): boolean {
    return this.getLowerBound() === 0 && this.getUpperBound() === 1;
  }
}
