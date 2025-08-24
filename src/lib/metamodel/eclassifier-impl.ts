import { EPackage } from './api/epackage';
import { EClass } from './api/eclass';
import { ENamedElementImpl } from './enamed-element-impl';
import { EClassifier } from './api/eclassifier';

export abstract class EClassifierImpl
  extends ENamedElementImpl
  implements EClassifier
{
  private classifierId = -1;
  // private instanceClassName!: string;
  // private instanceTypeName!: string;
  private ePackage!: EPackage;

  public constructor(public owner?: EPackage, name?: string) {
    super(name);
  }

  public getEPackage(): EPackage {
    return this.ePackage;
  }

  public setEPackage(pkg: EPackage): void {
    //TODO: should handle inverse reference on both ends
    this.ePackage = pkg;
  }

  // public getInstanceClassName(): string {
  //   return this.instanceClassName;
  // }

  // public setInstanceClassName(value: string): void {
  //   this.instanceClassName = value;
  // }

  public getClassifierId(): number {
    return this.classifierId;
  }

  public setClassifierId(id: number): void {
    this.classifierId = id;
  }

  // public getInstanceTypeName(): string {
  //   return this.instanceTypeName;
  // }

  // public setInstanceTypeName(value: string): void {
  //   this.instanceTypeName = value;
  // }

  // public getETypeParameters() {
  //   throw new Error('Not implemented');
  // }

  // public getInstanceClass(): string {
  //   //not implemented
  //   return this.getName();
  // }

  // public setInstanceClass(value: string): void {
  //   //not implemented
  // }

  public getRootPackage(): EPackage | undefined {
    if (!this.getEPackage()) return undefined;
    return this.getEPackage().getRootPackage();
  }

  public override eContainer(): EPackage  {
    return this.ePackage;
  }
}
