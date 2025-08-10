import { EClass } from './eclass';
import { EReference } from './ereference';
import { EStructuralFeatureImpl } from './estructural-feature-impl';

export class EReferenceImpl
  extends EStructuralFeatureImpl
  implements EReference
{
  private eRefType: EClass;
  private eOpposite: EReference;
  private containment: boolean;
  public constructor(
    eClass?: EClass,
    name?: string,
    eContainingClass?: EClass,
    eReferenceType?: EClass
  ) {
    super(eClass, name, eReferenceType);
    this.eRefType = eReferenceType;
    this.setEContainingClass(eContainingClass);
  }

  public getEReferenceType(): EClass {
    return this.eRefType;
  }

  public isContainer(): boolean {
    return this.getEOpposite() && this.getEOpposite().isContainment();
  }

  public isContainment(): boolean {
    return this.containment;
  }

  public setContainment(containment: boolean) {
    this.containment = containment;
  }

  public isResolveProxies(): boolean {
    return false;
  }

  public setResolveProxies(value: boolean): void {}

  public getEOpposite(): EReference {
    return this.eOpposite;
  }

  public setEOpposite(value: EReference): void {
    this.eOpposite = value;
  }
}
