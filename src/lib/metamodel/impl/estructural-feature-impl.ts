import { EClassifier } from '../api/eclassifier.js';
import { EClass } from '../api/eclass.js';
import { ETypedElementImpl } from './etyped-element-impl.js';
import { EStructuralFeature } from '../api/estructural-feature.js';
import { EObject } from '../api/eobject.js';

export class EStructuralFeatureImpl
  extends ETypedElementImpl
  implements EStructuralFeature
{
  protected featureID = -1;
  private transient = false;
  // private unsettable = true;
  // private derived: boolean = false;
  private defaultValueLiteral!: string;
  private defaultValue: any;

  private eContainingClass!: EClass;
  private changeable = true;
  private volatile = false;

  //**********************************************************************

  public constructor(name?: string, eType?: EClassifier) {
    super(name, eType);
  }

  // public isDerived(): boolean {
  //   return this.derived;
  // }

  // public setDerived(value: boolean): void {
  //   this.derived = value;
  // }

  public isTransient(): boolean {
    return this.transient;
  }

  public setTransient(value: boolean): void {
    this.transient = value;
  }

  // public isUnsettable(): boolean {
  //   return this.unsettable;
  // }

  // public setUnsettable(value: boolean): void {
  //   this.unsettable = value;
  // }

  public isVolatile(): boolean {
    return this.volatile;
  }

  public setVolatile(value: boolean): void {
    this.volatile = value;
  }

  public setFeatureID(value: number): void {
    this.featureID = value;
  }

  public getFeatureID(): number {
    return this.featureID;
  }

  // public isList() {
  //   return (
  //     this.getUpperBound() === EStructuralFeatureImpl.UNBOUNDED_MULTIPLICITY &&
  //     this.isOrdered() &&
  //     !this.isUnique()
  //   );
  // }
  // public isSet() {
  //   return (
  //     this.getUpperBound() === EStructuralFeatureImpl.UNBOUNDED_MULTIPLICITY &&
  //     !this.isOrdered() &&
  //     this.isUnique()
  //   );
  // }
  /**
   * Needed for BasicEList, which cannot import EReference without inducing
   * a circular import.
   */
  public isContainment(): boolean {
    return false;
  }

  // public getContainerClass(): string | null {
  //   // TODO: Note that EClass.getInstanceClass() is not yet implemented...
  //   // return this._eContainingClass.getInstanceClass();
  //   return null;
  // }

  public getDefaultValue(): any {
    return this.defaultValue;
  }

  public setDefaultValue(value: any): void {
    this.defaultValue = value;
  }

  public getDefaultValueLiteral(): string {
    return this.defaultValueLiteral;
  }

  public setDefaultValueLiteral(value: string): void {
    this.defaultValueLiteral = value;
  }

  public getEContainingClass(): EClass {
    return this.eContainingClass;
  }

  //TODO: GET RID OF THIS. Should not be public, should be handled by EOpposite
  // NOTE: Parallel to EOperation
  public setEContainingClass(owner: EClass | undefined): void {
    if (owner) this.eContainingClass = owner;
  }

  public isChangeable(): boolean {
    return this.changeable;
  }

  public setChangeable(value: boolean): void {
    this.changeable = value;
  }
  public override eContainer(): EObject {
    return this.eContainingClass;
  }
}
