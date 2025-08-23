import { EClass } from './eclass';
import { EStructuralFeature } from './estructural-feature';

import { EObject } from './eobject';
import { EAttribute } from './eattribute';
// import { EcorePackage } from './ecorepackage';

export abstract class EObjectImpl implements EObject {
  // private _eClass: EClass;
  private _eContainer!: EObject;
  private _eContainingFeature!: number;

  private _eIsProxy: boolean = false;

  public constructor() {
    // this._eClass = eClass!;
  }

  public eClass(): EClass {
    return undefined!;
  }

  // public setEClass(eClass: EClass) {
  //   this._eClass = eClass;
  // }

  public eContainer(): EObject {
    return this._eContainer;
  }

  public eInverseRemove(otherEnd: EObject, featureId: number) {
    const feature = this.eClass().getEStructuralFeature(featureId);
    if(feature){
    if (feature?.isMany()) {
      this.eGet(feature).remove(otherEnd);
    } else {
      this.eSet(feature, null);
    }
  }
  }

  public eInverseAdd(otherEnd: EObject, featureId: number) {
    const feature = this.eClass().getEStructuralFeature(featureId);
    if(feature){
    if (feature.isMany()) {
      this.eGet(feature).add(otherEnd);
    } else {
      this.eSet(feature, otherEnd);
    }
  }
  }

  // TODO: Protected is probably not right
  // This method is probably to be invoked by setting a containment field
  // This should really only be invoked by generated code!
  public setEContainer(eContainer: EObject, containingFeatureId: number) {
    //remove from old container, if it is different
    const oldContainer = this.eContainer();
    if (oldContainer && eContainer) {
      if (
        oldContainer !== eContainer ||
        containingFeatureId !== this._eContainingFeature
      ) {
        if (
          !oldContainer.eClass().getEStructuralFeature(this._eContainingFeature)?.isMany()
        ) {
          if (oldContainer.eGet(this._eContainingFeature)) {
            oldContainer.eSet(this._eContainingFeature, null);
          }
        } else {
          oldContainer.eGet(this._eContainingFeature).remove(this);
        }
      }
    }
    this.eBasicSetContainer(eContainer, containingFeatureId);
  }

  protected eBasicSetContainer(
    eContainer: EObject,
    containingFeatureId: number
  ) {
    this._eContainer = eContainer;
    this._eContainingFeature = containingFeatureId;
  }

  //================================================================================
  // Serializable Id strategy

  fullId(): string {
    //TODO: support encoding of multiple ID attributes
    //if the ID attribute does not exist or is not set, return null - do not pretend there is a unique ID
    if (!this.eClass().getEIDAttribute()) return '';
    if(!this.eClass().getEIDAttribute()) return '';
    if (!this.eGet(this.eClass().getEIDAttribute() as EAttribute)) return '';
    //TODO: use full path to type rather than just class name
    //TODO: Can't use the one in TUtils because it creates circular import - put it somewhere else?
    return (
      this.eClass().getName() + '_' + this.eGet(this.eClass().getEIDAttribute() as EAttribute)
    );
  }

  //================================================================================
  // Reflection

  public eContainingFeature() : EStructuralFeature | undefined {
    const containerEClass = this._eContainer?.eClass();
    if(containerEClass){
      const containingFeature = containerEClass.getEStructuralFeature(this._eContainingFeature);
      return containingFeature;
    }
    return undefined;
  }

  //   //TODO: What does this even mean?
  // public eContainmentFeature() : EStructuralFeature | undefined{
  //   return  undefined;
  // }

  public eContents(): EObject[] {
    const contents = new Array<EObject>();
    const containments = this.eClass().getEAllContainments();
    for (let i = 0; i < containments.size(); i++) {
      const cref = containments.get(i);
      if (cref.isMany()) {
        const containedList = this.eGet(cref);
        for (let j = 0; j < containedList.size(); j++) {
          contents.push(containedList.get(j));
        }
      } else if (this.eGet(cref)) contents.push(this.eGet(cref));
    }
    return contents;
  }

  public eAllContents(): EObject[] {
    let all = new Array<EObject>();
    all.push(this);
    for (const contained of this.eContents()) {
      all = all.concat(contained.eAllContents());
    }
    return all;
  }

  public eIsProxy(): boolean{
    return this._eIsProxy;
  }

  public eSetProxy(proxy: boolean){
    this._eIsProxy = proxy;
  }

  //================================================================================
  // Generic getting/setting

  public eGet(feature: EStructuralFeature | number): any {
    return undefined;
  }

  public eSet(feature: EStructuralFeature | number, value: any): void {
    //do nothing
  }

  public eIsSet(feature: EStructuralFeature | number): boolean {
    throw false;
  }

  public eUnset(feature: EStructuralFeature | number): void {
    //do nothing
  }


}
