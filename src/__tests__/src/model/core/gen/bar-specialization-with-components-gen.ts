import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Bar } from '../api/bar.js';
import { Foo } from '../api/foo.js';
import { Bazzle } from '../api/bazzle.js';
import { User } from '../api/user.js';

import { CorePackage } from '../core-package.js';
import { BarSpecializationWithComponents } from '../api/bar-specialization-with-components.js';
import { BarGen } from './bar-gen.js';
import { BarImpl } from '../impl/bar-impl.js';
import { FooGen } from './foo-gen.js';
import { FooImpl } from '../impl/foo-impl.js';
import { BazzleGen } from './bazzle-gen.js';
import { BazzleImpl } from '../impl/bazzle-impl.js';
import { UserGen } from './user-gen.js';
import { UserImpl } from '../impl/user-impl.js';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for BarSpecializationWithComponents.
 */
export abstract class BarSpecializationWithComponentsGen  extends BarImpl implements BarSpecializationWithComponents {
  /** feature declarations */
  protected componentBars: EList<Bar> = new BasicEList<Bar>(
    undefined,
    this,
    CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS,
    undefined
  );
  protected specialName!: string;



  //======================================================================
  // Getters and Setters


  public getComponentBars(): EList<Bar> {
    return this.componentBars;
  }

  public getSpecialName(): string {
    return this.specialName;
  }

  public setSpecialName(newSpecialName: string): void {
    this.basicSetSpecialName(newSpecialName);
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
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS:
        return this.getComponentBars();
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME:
        return this.getSpecialName();
    }
    return super.eGet(featureID);
  }


  /**
   * eSet() - provides ability to reflectively set all features.
   */
  public override eSet(feature: number | EStructuralFeature, newValue: any): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS:
        this.getComponentBars().clear();
        this.getComponentBars().addAll(newValue);
        return;
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME:
        this.setSpecialName(newValue);
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
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS:
        return !this.getComponentBars().isEmpty();
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME:
        return this.getSpecialName() != null;
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
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS:
        this.getComponentBars().clear();
        return;
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME:
        this.setSpecialName(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)


  public basicSetSpecialName(newSpecialName: string): void {
    this.specialName = newSpecialName;
  }

  //======================================================================
  // Inverse Adders (if needed)


  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.BAR_SPECIALIZATION_WITH_COMPONENTS;
  }
}