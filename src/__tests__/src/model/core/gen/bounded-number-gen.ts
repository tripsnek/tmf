import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { CorePackage } from '../core-package';
import { BoundedNumber } from '../api/bounded-number';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for BoundedNumber.
 */
export abstract class BoundedNumberGen
  extends EObjectImpl
  implements BoundedNumber
{
  /** feature declarations */
  protected units!: string;
  protected value!: number;
  protected maxValue!: number;
  protected minValue!: number;

  //======================================================================
  // Getters and Setters

  public getUnits(): string {
    return this.units;
  }

  public setUnits(newUnits: string): void {
    this.basicSetUnits(newUnits);
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(newValue: number): void {
    this.basicSetValue(newValue);
  }

  public getMaxValue(): number {
    return this.maxValue;
  }

  public setMaxValue(newMaxValue: number): void {
    this.basicSetMaxValue(newMaxValue);
  }

  public getMinValue(): number {
    return this.minValue;
  }

  public setMinValue(newMinValue: number): void {
    this.basicSetMinValue(newMinValue);
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
      case CorePackage.BOUNDED_NUMBER__UNITS:
        return this.getUnits();
      case CorePackage.BOUNDED_NUMBER__VALUE:
        return this.getValue();
      case CorePackage.BOUNDED_NUMBER__MAX_VALUE:
        return this.getMaxValue();
      case CorePackage.BOUNDED_NUMBER__MIN_VALUE:
        return this.getMinValue();
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
      case CorePackage.BOUNDED_NUMBER__UNITS:
        this.setUnits(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__VALUE:
        this.setValue(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__MAX_VALUE:
        this.setMaxValue(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__MIN_VALUE:
        this.setMinValue(newValue);
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
      case CorePackage.BOUNDED_NUMBER__UNITS:
        return this.getUnits === undefined;
      case CorePackage.BOUNDED_NUMBER__VALUE:
        return this.getValue === undefined;
      case CorePackage.BOUNDED_NUMBER__MAX_VALUE:
        return this.getMaxValue === undefined;
      case CorePackage.BOUNDED_NUMBER__MIN_VALUE:
        return this.getMinValue === undefined;
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
      case CorePackage.BOUNDED_NUMBER__UNITS:
        this.setUnits(undefined!);
        return;
      case CorePackage.BOUNDED_NUMBER__VALUE:
        this.setValue(undefined!);
        return;
      case CorePackage.BOUNDED_NUMBER__MAX_VALUE:
        this.setMaxValue(undefined!);
        return;
      case CorePackage.BOUNDED_NUMBER__MIN_VALUE:
        this.setMinValue(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetUnits(newUnits: string): void {
    this.units = newUnits;
  }

  public basicSetValue(newValue: number): void {
    this.value = newValue;
  }

  public basicSetMaxValue(newMaxValue: number): void {
    this.maxValue = newMaxValue;
  }

  public basicSetMinValue(newMinValue: number): void {
    this.minValue = newMinValue;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.BOUNDED_NUMBER;
  }
}
