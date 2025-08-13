import { EObject } from "@tripsnek/tmf";
import { TUtils } from "@tripsnek/tmf";
import { EStructuralFeature } from "@tripsnek/tmf";
import { BasicEList } from "@tripsnek/tmf";
import { EClass } from "@tripsnek/tmf";
import { EList } from "@tripsnek/tmf";
import { EEnum } from "@tripsnek/tmf";
import { EDataType } from "@tripsnek/tmf";
import { EObjectImpl } from "@tripsnek/tmf";

import { CorePackage } from "../core-package";
import { BoundedNumber } from "../api/bounded-number";

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for BoundedNumber.
 */
export abstract class BoundedNumberGen
  extends EObjectImpl
  implements BoundedNumber
{
  /** feature declarations */
  protected units: string;
  protected value: number;
  protected maxValue: number;
  protected minValue: number;
  protected percentDelta: number;
  protected plusPercentDelta: number;
  protected minusPercentDelta: number;
  protected absoluteDelta: number;
  protected plusAbsoluteDelta: number;
  protected minusAbsoluteDelta: number;

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

  public getPercentDelta(): number {
    return this.percentDelta;
  }

  public setPercentDelta(newPercentDelta: number): void {
    this.basicSetPercentDelta(newPercentDelta);
  }

  public getPlusPercentDelta(): number {
    return this.plusPercentDelta;
  }

  public setPlusPercentDelta(newPlusPercentDelta: number): void {
    this.basicSetPlusPercentDelta(newPlusPercentDelta);
  }

  public getMinusPercentDelta(): number {
    return this.minusPercentDelta;
  }

  public setMinusPercentDelta(newMinusPercentDelta: number): void {
    this.basicSetMinusPercentDelta(newMinusPercentDelta);
  }

  public getAbsoluteDelta(): number {
    return this.absoluteDelta;
  }

  public setAbsoluteDelta(newAbsoluteDelta: number): void {
    this.basicSetAbsoluteDelta(newAbsoluteDelta);
  }

  public getPlusAbsoluteDelta(): number {
    return this.plusAbsoluteDelta;
  }

  public setPlusAbsoluteDelta(newPlusAbsoluteDelta: number): void {
    this.basicSetPlusAbsoluteDelta(newPlusAbsoluteDelta);
  }

  public getMinusAbsoluteDelta(): number {
    return this.minusAbsoluteDelta;
  }

  public setMinusAbsoluteDelta(newMinusAbsoluteDelta: number): void {
    this.basicSetMinusAbsoluteDelta(newMinusAbsoluteDelta);
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
      typeof feature === "number"
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
      case CorePackage.BOUNDED_NUMBER__PERCENT_DELTA:
        return this.getPercentDelta();
      case CorePackage.BOUNDED_NUMBER__PLUS_PERCENT_DELTA:
        return this.getPlusPercentDelta();
      case CorePackage.BOUNDED_NUMBER__MINUS_PERCENT_DELTA:
        return this.getMinusPercentDelta();
      case CorePackage.BOUNDED_NUMBER__ABSOLUTE_DELTA:
        return this.getAbsoluteDelta();
      case CorePackage.BOUNDED_NUMBER__PLUS_ABSOLUTE_DELTA:
        return this.getPlusAbsoluteDelta();
      case CorePackage.BOUNDED_NUMBER__MINUS_ABSOLUTE_DELTA:
        return this.getMinusAbsoluteDelta();
    }
    return super.eGet(featureID);
  }

  /**
   * eSet() - provides ability to reflectively set all features.
   */
  public eSet(feature: number | EStructuralFeature, newValue: any): void {
    const featureID: number =
      typeof feature === "number"
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
      case CorePackage.BOUNDED_NUMBER__PERCENT_DELTA:
        this.setPercentDelta(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__PLUS_PERCENT_DELTA:
        this.setPlusPercentDelta(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__MINUS_PERCENT_DELTA:
        this.setMinusPercentDelta(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__ABSOLUTE_DELTA:
        this.setAbsoluteDelta(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__PLUS_ABSOLUTE_DELTA:
        this.setPlusAbsoluteDelta(newValue);
        return;
      case CorePackage.BOUNDED_NUMBER__MINUS_ABSOLUTE_DELTA:
        this.setMinusAbsoluteDelta(newValue);
        return;
    }
    return super.eSet(featureID, newValue);
  }

  /**
   * eIsSet() - provides ability to reflectively check if any feature is set.
   */
  public eIsSet(feature: number | EStructuralFeature): boolean {
    const featureID: number =
      typeof feature === "number"
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
      case CorePackage.BOUNDED_NUMBER__PERCENT_DELTA:
        return this.getPercentDelta === undefined;
      case CorePackage.BOUNDED_NUMBER__PLUS_PERCENT_DELTA:
        return this.getPlusPercentDelta === undefined;
      case CorePackage.BOUNDED_NUMBER__MINUS_PERCENT_DELTA:
        return this.getMinusPercentDelta === undefined;
      case CorePackage.BOUNDED_NUMBER__ABSOLUTE_DELTA:
        return this.getAbsoluteDelta === undefined;
      case CorePackage.BOUNDED_NUMBER__PLUS_ABSOLUTE_DELTA:
        return this.getPlusAbsoluteDelta === undefined;
      case CorePackage.BOUNDED_NUMBER__MINUS_ABSOLUTE_DELTA:
        return this.getMinusAbsoluteDelta === undefined;
    }
    return super.eIsSet(featureID);
  }

  /**
   * eUnset() - provides ability to reflectively unset any feature.
   */
  public eUnset(feature: number | EStructuralFeature): void {
    const featureID: number =
      typeof feature === "number"
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.BOUNDED_NUMBER__UNITS:
        this.setUnits(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__VALUE:
        this.setValue(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__MAX_VALUE:
        this.setMaxValue(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__MIN_VALUE:
        this.setMinValue(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__PERCENT_DELTA:
        this.setPercentDelta(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__PLUS_PERCENT_DELTA:
        this.setPlusPercentDelta(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__MINUS_PERCENT_DELTA:
        this.setMinusPercentDelta(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__ABSOLUTE_DELTA:
        this.setAbsoluteDelta(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__PLUS_ABSOLUTE_DELTA:
        this.setPlusAbsoluteDelta(undefined);
        return;
      case CorePackage.BOUNDED_NUMBER__MINUS_ABSOLUTE_DELTA:
        this.setMinusAbsoluteDelta(undefined);
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

  public basicSetPercentDelta(newPercentDelta: number): void {
    this.percentDelta = newPercentDelta;
  }

  public basicSetPlusPercentDelta(newPlusPercentDelta: number): void {
    this.plusPercentDelta = newPlusPercentDelta;
  }

  public basicSetMinusPercentDelta(newMinusPercentDelta: number): void {
    this.minusPercentDelta = newMinusPercentDelta;
  }

  public basicSetAbsoluteDelta(newAbsoluteDelta: number): void {
    this.absoluteDelta = newAbsoluteDelta;
  }

  public basicSetPlusAbsoluteDelta(newPlusAbsoluteDelta: number): void {
    this.plusAbsoluteDelta = newPlusAbsoluteDelta;
  }

  public basicSetMinusAbsoluteDelta(newMinusAbsoluteDelta: number): void {
    this.minusAbsoluteDelta = newMinusAbsoluteDelta;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public eClass(): EClass {
    return CorePackage.Literals.BOUNDED_NUMBER;
  }
}
