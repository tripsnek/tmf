import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Foo } from '../api/foo.js';

import { CorePackage } from '../core-package.js';
import { ThingWithoutID } from '../api/thing-without-i-d.js';
import { FooGen } from './foo-gen.js';
import { FooImpl } from '../impl/foo-impl.js';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ThingWithoutID.
 */
export abstract class ThingWithoutIDGen
  extends EObjectImpl
  implements ThingWithoutID
{
  /** feature declarations */
  protected singleNonContainment!: Foo;
  protected manyNonContainment: EList<Foo> = new BasicEList<Foo>(
    undefined,
    this,
    CorePackage.THING_WITHOUT_I_D__MANY_NON_CONTAINMENT,
    undefined
  );
  protected refToOtherIdlessThing!: ThingWithoutID;
  protected manyRefToOtherIdlessThings: EList<ThingWithoutID> =
    new BasicEList<ThingWithoutID>(
      undefined,
      this,
      CorePackage.THING_WITHOUT_I_D__MANY_REF_TO_OTHER_IDLESS_THINGS,
      undefined
    );

  //======================================================================
  // Getters and Setters

  public getSingleNonContainment(): Foo {
    return this.singleNonContainment;
  }

  public setSingleNonContainment(newSingleNonContainment: Foo): void {
    this.basicSetSingleNonContainment(newSingleNonContainment);
  }

  public getManyNonContainment(): EList<Foo> {
    return this.manyNonContainment;
  }

  public getRefToOtherIdlessThing(): ThingWithoutID {
    return this.refToOtherIdlessThing;
  }

  public setRefToOtherIdlessThing(
    newRefToOtherIdlessThing: ThingWithoutID
  ): void {
    this.basicSetRefToOtherIdlessThing(newRefToOtherIdlessThing);
  }

  public getManyRefToOtherIdlessThings(): EList<ThingWithoutID> {
    return this.manyRefToOtherIdlessThings;
  }

  //======================================================================
  // API Operations

  //======================================================================
  // Standard EObject behavior

  /**
   * eGet() - provides reflective access to all features.
   */
  public override eGet(feature: number | EStructuralFeature): any {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.THING_WITHOUT_I_D__SINGLE_NON_CONTAINMENT:
        return this.getSingleNonContainment();
      case CorePackage.THING_WITHOUT_I_D__MANY_NON_CONTAINMENT:
        return this.getManyNonContainment();
      case CorePackage.THING_WITHOUT_I_D__REF_TO_OTHER_IDLESS_THING:
        return this.getRefToOtherIdlessThing();
      case CorePackage.THING_WITHOUT_I_D__MANY_REF_TO_OTHER_IDLESS_THINGS:
        return this.getManyRefToOtherIdlessThings();
    }
    return super.eGet(featureID);
  }

  /**
   * eSet() - provides ability to reflectively set all features.
   */
  public override eSet(
    feature: number | EStructuralFeature,
    newValue: any
  ): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.THING_WITHOUT_I_D__SINGLE_NON_CONTAINMENT:
        this.setSingleNonContainment(newValue);
        return;
      case CorePackage.THING_WITHOUT_I_D__MANY_NON_CONTAINMENT:
        this.getManyNonContainment().clear();
        this.getManyNonContainment().addAll(newValue);
        return;
      case CorePackage.THING_WITHOUT_I_D__REF_TO_OTHER_IDLESS_THING:
        this.setRefToOtherIdlessThing(newValue);
        return;
      case CorePackage.THING_WITHOUT_I_D__MANY_REF_TO_OTHER_IDLESS_THINGS:
        this.getManyRefToOtherIdlessThings().clear();
        this.getManyRefToOtherIdlessThings().addAll(newValue);
        return;
    }
    return super.eSet(featureID, newValue);
  }

  /**
   * eIsSet() - provides ability to reflectively check if any feature is set.
   */
  public override eIsSet(feature: number | EStructuralFeature): boolean {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.THING_WITHOUT_I_D__SINGLE_NON_CONTAINMENT:
        return this.getSingleNonContainment() != null;
      case CorePackage.THING_WITHOUT_I_D__MANY_NON_CONTAINMENT:
        return !this.getManyNonContainment().isEmpty();
      case CorePackage.THING_WITHOUT_I_D__REF_TO_OTHER_IDLESS_THING:
        return this.getRefToOtherIdlessThing() != null;
      case CorePackage.THING_WITHOUT_I_D__MANY_REF_TO_OTHER_IDLESS_THINGS:
        return !this.getManyRefToOtherIdlessThings().isEmpty();
    }
    return super.eIsSet(featureID);
  }

  /**
   * eUnset() - provides ability to reflectively unset any feature.
   */
  public override eUnset(feature: number | EStructuralFeature): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.THING_WITHOUT_I_D__SINGLE_NON_CONTAINMENT:
        this.setSingleNonContainment(undefined!);
        return;
      case CorePackage.THING_WITHOUT_I_D__MANY_NON_CONTAINMENT:
        this.getManyNonContainment().clear();
        return;
      case CorePackage.THING_WITHOUT_I_D__REF_TO_OTHER_IDLESS_THING:
        this.setRefToOtherIdlessThing(undefined!);
        return;
      case CorePackage.THING_WITHOUT_I_D__MANY_REF_TO_OTHER_IDLESS_THINGS:
        this.getManyRefToOtherIdlessThings().clear();
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetSingleNonContainment(newSingleNonContainment: Foo): void {
    this.singleNonContainment = newSingleNonContainment;
  }

  public basicSetRefToOtherIdlessThing(
    newRefToOtherIdlessThing: ThingWithoutID
  ): void {
    this.refToOtherIdlessThing = newRefToOtherIdlessThing;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.THING_WITHOUT_I_D;
  }
}
