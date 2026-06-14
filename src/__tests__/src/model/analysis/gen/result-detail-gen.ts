import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Foo } from '../../core/api/foo.js';

import { AnalysisPackage } from '../analysis-package.js';
import { ResultDetail } from '../api/result-detail.js';
import { FooGen } from '../../core//gen/foo-gen.js';
import { FooImpl } from '../../core//impl/foo-impl.js';
import { CorePackage } from '../../core/core-package.js';

//make sure package is initialized
AnalysisPackage.eINSTANCE;

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ResultDetail.
 */
export abstract class ResultDetailGen
  extends EObjectImpl
  implements ResultDetail
{
  /** feature declarations */
  protected crossPackageInverse!: Foo;

  //======================================================================
  // Getters and Setters

  public getCrossPackageInverse(): Foo {
    return this.crossPackageInverse;
  }

  public setCrossPackageInverse(newCrossPackageInverse: Foo): void {
    if (this.crossPackageInverse !== newCrossPackageInverse) {
      if (this.crossPackageInverse) {
        this.crossPackageInverse.eInverseRemove(
          this,
          CorePackage.FOO__MANY_CROSS_PACKAGE
        );
      }
      if (newCrossPackageInverse) {
        newCrossPackageInverse.eInverseAdd(
          this,
          CorePackage.FOO__MANY_CROSS_PACKAGE
        );
      }
    }
    this.basicSetCrossPackageInverse(newCrossPackageInverse);
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
      case AnalysisPackage.RESULT_DETAIL__CROSS_PACKAGE_INVERSE:
        return this.getCrossPackageInverse();
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
      case AnalysisPackage.RESULT_DETAIL__CROSS_PACKAGE_INVERSE:
        this.setCrossPackageInverse(newValue);
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
      case AnalysisPackage.RESULT_DETAIL__CROSS_PACKAGE_INVERSE:
        return this.getCrossPackageInverse() != null;
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
      case AnalysisPackage.RESULT_DETAIL__CROSS_PACKAGE_INVERSE:
        this.setCrossPackageInverse(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetCrossPackageInverse(newCrossPackageInverse: Foo): void {
    this.crossPackageInverse = newCrossPackageInverse;
  }

  //======================================================================
  // Inverse Adders (if needed)
  public override eInverseAdd(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case AnalysisPackage.RESULT_DETAIL__CROSS_PACKAGE_INVERSE:
        if (this.crossPackageInverse)
          this.crossPackageInverse.eInverseRemove(
            this,
            CorePackage.FOO__MANY_CROSS_PACKAGE
          );
        return this.basicSetCrossPackageInverse(<Foo>otherEnd);
    }
    return super.eInverseAdd(otherEnd, featureID);
  }

  //======================================================================
  // Inverse Removers (if needed)
  public override eInverseRemove(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case AnalysisPackage.RESULT_DETAIL__CROSS_PACKAGE_INVERSE:
        return this.basicSetCrossPackageInverse(undefined!);
    }
    return super.eInverseRemove(otherEnd, featureID);
  }

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return AnalysisPackage.Literals.RESULT_DETAIL;
  }
}
