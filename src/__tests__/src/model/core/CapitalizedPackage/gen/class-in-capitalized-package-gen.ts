import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { ExampleInterface } from '../api/example-interface';

import { CapitalizedPackagePackage } from '../capitalized-package-package';
import { ClassInCapitalizedPackage } from '../api/class-in-capitalized-package';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ClassInCapitalizedPackage.
 */
export abstract class ClassInCapitalizedPackageGen
  extends EObjectImpl
  implements ClassInCapitalizedPackage
{
  /** feature declarations */
  protected stringAttr!: string;

  //======================================================================
  // Getters and Setters

  public getStringAttr(): string {
    return this.stringAttr;
  }

  public setStringAttr(newStringAttr: string): void {
    this.basicSetStringAttr(newStringAttr);
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
      case CapitalizedPackagePackage.CLASS_IN_CAPITALIZED_PACKAGE__STRING_ATTR:
        return this.getStringAttr();
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
      case CapitalizedPackagePackage.CLASS_IN_CAPITALIZED_PACKAGE__STRING_ATTR:
        this.setStringAttr(newValue);
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
      case CapitalizedPackagePackage.CLASS_IN_CAPITALIZED_PACKAGE__STRING_ATTR:
        return this.getStringAttr() != null;
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
      case CapitalizedPackagePackage.CLASS_IN_CAPITALIZED_PACKAGE__STRING_ATTR:
        this.setStringAttr(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetStringAttr(newStringAttr: string): void {
    this.stringAttr = newStringAttr;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CapitalizedPackagePackage.Literals.CLASS_IN_CAPITALIZED_PACKAGE;
  }
}
