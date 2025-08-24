import { EClass } from './api/eclass';
import { EReference } from './api/ereference';
import { EStructuralFeatureImpl } from './estructural-feature-impl';

export class EReferenceImpl
  extends EStructuralFeatureImpl
  implements EReference
{
  // private eRefType!: EClass;
  private eOpposite!: EReference;
  private containment: boolean = false;
  public constructor(
    name?: string,
    eContainingClass?: EClass,
    eReferenceType?: EClass
  ) {
    super(name, eReferenceType);
    // if (eReferenceType) this.eRefType = eReferenceType;
    if (eContainingClass) this.setEContainingClass(eContainingClass);
  }

  // public getEReferenceType(): EClass {
  //   return this.eRefType;
  // }

  public isContainer(): boolean {
    return this.getEOpposite() !== undefined && this.getEOpposite()!.isContainment();
  }

  public override isContainment(): boolean {
    return this.containment;
  }

  public setContainment(containment: boolean): void {
    this.containment = containment;
  }

  // public isResolveProxies(): boolean {
  //   return false;
  // }

  // public setResolveProxies(value: boolean): void {}

  public getEOpposite(): EReference | undefined {
    return this.eOpposite;
  }

  public setEOpposite(value: EReference): void {
    this.eOpposite = value;
  }
}
