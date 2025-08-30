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
import { FooGroup } from '../api/foo-group.js';
import { FooClass } from '../api/foo-class.js';
import { BoundedNumber } from '../api/bounded-number.js';
import { Bar } from '../api/bar.js';
import { Bazzle } from '../api/bazzle.js';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package.js';
import { ThingWithoutID } from '../api/thing-without-i-d.js';
import { User } from '../api/user.js';

import { CorePackage } from '../core-package.js';
import { FooSpecialization } from '../api/foo-specialization.js';
import { FooGen } from './foo-gen.js';
import { FooImpl } from '../impl/foo-impl.js';
import { FooGroupGen } from './foo-group-gen.js';
import { FooGroupImpl } from '../impl/foo-group-impl.js';
import { BoundedNumberGen } from './bounded-number-gen.js';
import { BoundedNumberImpl } from '../impl/bounded-number-impl.js';
import { BarGen } from './bar-gen.js';
import { BarImpl } from '../impl/bar-impl.js';
import { BazzleGen } from './bazzle-gen.js';
import { BazzleImpl } from '../impl/bazzle-impl.js';
import { ClassInCapitalizedPackageGen } from '../../core/CapitalizedPackage//gen/class-in-capitalized-package-gen.js';
import { ClassInCapitalizedPackageImpl } from '../../core/CapitalizedPackage//impl/class-in-capitalized-package-impl.js';
import { ThingWithoutIDGen } from './thing-without-i-d-gen.js';
import { ThingWithoutIDImpl } from '../impl/thing-without-i-d-impl.js';
import { UserGen } from './user-gen.js';
import { UserImpl } from '../impl/user-impl.js';
import { CapitalizedPackagePackage} from '../../core/CapitalizedPackage/capitalized-package-package.js';
/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for FooSpecialization.
 */
export abstract class FooSpecializationGen  extends FooImpl implements FooSpecialization {
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
  public override eSet(feature: number | EStructuralFeature, newValue: any): void {
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