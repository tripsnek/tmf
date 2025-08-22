import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Foo } from '../../../core/api/foo';
import { FooGroup } from '../../../core/api/foo-group';

import { CapitalizedPackagePackage } from '../capitalized-package-package';
import { ExampleInterface } from '../api/example-interface';
import { FooGen } from '../../../core//gen/foo-gen';
import { FooImpl } from '../../../core//impl/foo-impl';
import { FooGroupGen } from '../../../core//gen/foo-group-gen';
import { FooGroupImpl } from '../../../core//impl/foo-group-impl';
import { CorePackage } from '../../../core/core-package';
/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ExampleInterface.
 */
export abstract class ExampleInterfaceGen
  extends EObjectImpl
  implements ExampleInterface
{
  /** feature declarations */

  //======================================================================
  // Getters and Setters

  //======================================================================
  // API Operations

  public interfaceOperation(fooGroup: EList<FooGroup>): Foo {
    throw new Error('Not implemented');
  }
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
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CapitalizedPackagePackage.Literals.EXAMPLE_INTERFACE;
  }
}
