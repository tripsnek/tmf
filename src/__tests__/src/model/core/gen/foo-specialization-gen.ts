import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Foo } from '../api/foo';
import { FooGroup } from '../api/foo-group';
import { FooClass } from '../api/foo-class';
import { BoundedNumber } from '../api/bounded-number';
import { Bar } from '../api/bar';
import { Bazzle } from '../api/bazzle';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package';
import { User } from '../api/user';

import { CorePackage } from '../core-package';
import { FooSpecialization } from '../api/foo-specialization';
import { FooGen } from './foo-gen';
import { FooImpl } from '../impl/foo-impl';
import { FooGroupGen } from './foo-group-gen';
import { FooGroupImpl } from '../impl/foo-group-impl';
import { FooClassGen } from './foo-class-gen';
import { FooClassImpl } from '../impl/foo-class-impl';
import { BoundedNumberGen } from './bounded-number-gen';
import { BoundedNumberImpl } from '../impl/bounded-number-impl';
import { BarGen } from './bar-gen';
import { BarImpl } from '../impl/bar-impl';
import { BazzleGen } from './bazzle-gen';
import { BazzleImpl } from '../impl/bazzle-impl';
import { ClassInCapitalizedPackageGen } from '../../core/CapitalizedPackage//gen/class-in-capitalized-package-gen';
import { ClassInCapitalizedPackageImpl } from '../../core/CapitalizedPackage//impl/class-in-capitalized-package-impl';
import { UserGen } from './user-gen';
import { UserImpl } from '../impl/user-impl';
import { CapitalizedPackagePackage } from '../../core/CapitalizedPackage/capitalized-package-package';
/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for FooSpecialization.
 */
export abstract class FooSpecializationGen
  extends FooImpl
  implements FooSpecialization
{
  /** feature declarations */

  //======================================================================
  // Getters and Setters

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
    return CorePackage.Literals.FOO_SPECIALIZATION;
  }
}
