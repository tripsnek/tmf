import { EClassifier } from './eclassifier';
import { EClass } from './eclass';
import { ETypedElement } from './etyped-element';
import { ENamedElementImpl } from './enamed-element-impl';

export class ETypedElementImpl
  extends ENamedElementImpl
  implements ETypedElement
{
  public static UNBOUNDED_MULTIPLICITY = -1;
  public static UNSPECIFIED_MULTIPLICITY = 0;

  // private ordered = false;
  private unique = false;
  private eType!: EClassifier;
  private lowerBound: number = ETypedElementImpl.UNSPECIFIED_MULTIPLICITY;
  private upperBound: number = ETypedElementImpl.UNSPECIFIED_MULTIPLICITY;

  public constructor(name?: string, eType?: EClassifier) {
    super( name);
    if (eType) this.eType = eType;
  }

  public getLowerBound(): number {
    return this.lowerBound;
  }

  public setLowerBound(value: number): void {
    this.lowerBound = value;
  }

  public getUpperBound(): number {
    return this.upperBound;
  }

  public setUpperBound(value: number): void {
    this.upperBound = value;
  }

  public isUnique(): boolean {
    return this.unique;
  }

  public setUnique(value: boolean): void {
    this.unique = value;
  }

  public getEType(): EClassifier {
    return this.eType;
  }

  public setEType(value: EClassifier): void {
    this.eType = value;
  }

  public isMany(): boolean {
    return (
      this.upperBound > 1 ||
      this.upperBound === ETypedElementImpl.UNBOUNDED_MULTIPLICITY
    );
  }

  // public isOrdered(): boolean {
  //   return this.ordered;
  // }

  // public setOrdered(value: boolean): void {
  //   this.ordered = value;
  // }

  public isRequired(): boolean {
    return this.lowerBound > 0;
  }
}
