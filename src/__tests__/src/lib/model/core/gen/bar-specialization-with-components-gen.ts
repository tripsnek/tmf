import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Bar } from '../api/bar';
import { Foo } from '../api/foo';
import { Bazzle } from '../api/bazzle';
import { User } from '../api/user';

import { CorePackage } from '../core-package';
import { BarSpecializationWithComponents } from '../api/bar-specialization-with-components';
import { BarGen } from './bar-gen';
import { BarImpl } from '../impl/bar-impl';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for BarSpecializationWithComponents.
 */
export abstract class BarSpecializationWithComponentsGen
  extends BarImpl
  implements BarSpecializationWithComponents
{
  /** feature declarations */
  protected componentBars: EList<Bar> = new BasicEList<Bar>(
    null,
    this,
    CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS,
    null
  );
  protected specialName: string;

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
  public eGet(feature: number | EStructuralFeature): any {
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
  public eSet(feature: number | EStructuralFeature, newValue: any): void {
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
  public eIsSet(feature: number | EStructuralFeature): boolean {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS:
        return this.getComponentBars().isEmpty();
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME:
        return this.getSpecialName === undefined;
    }
    return super.eIsSet(featureID);
  }

  /**
   * eUnset() - provides ability to reflectively unset any feature.
   */
  public eUnset(feature: number | EStructuralFeature): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS:
        this.getComponentBars().clear();
        return;
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME:
        this.setSpecialName(undefined);
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

  public eClass(): EClass {
    return CorePackage.Literals.BAR_SPECIALIZATION_WITH_COMPONENTS;
  }
}
