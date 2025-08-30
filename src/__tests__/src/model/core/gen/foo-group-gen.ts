import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { NamedEntity } from '../api/named-entity.js';
import { User } from '../api/user.js';
import { FooClass } from '../api/foo-class.js';
import { Foo } from '../api/foo.js';
import { Bazzle } from '../api/bazzle.js';

import { CorePackage } from '../core-package.js';
import { FooGroup } from '../api/foo-group.js';
import { NamedEntityGen } from './named-entity-gen.js';
import { NamedEntityImpl } from '../impl/named-entity-impl.js';
import { UserGen } from './user-gen.js';
import { UserImpl } from '../impl/user-impl.js';
import { FooGen } from './foo-gen.js';
import { FooImpl } from '../impl/foo-impl.js';
import { BazzleGen } from './bazzle-gen.js';
import { BazzleImpl } from '../impl/bazzle-impl.js';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for FooGroup.
 */
export abstract class FooGroupGen  extends NamedEntityImpl implements FooGroup {
  /** feature declarations */
  protected user!: User;



  //======================================================================
  // Getters and Setters


  public getUser(): User {
    return this.user;
  }

  public setUser(newUser: User): void {
    const oldUser = this.user;
    if (oldUser) oldUser.setEContainer(undefined, undefined);
    if (newUser) newUser.setEContainer(this, CorePackage.FOO_GROUP__USER);
    this.basicSetUser(newUser);
  }

  //======================================================================
  // API Operations


  public computeFoosOfClass(fooClass: FooClass): number {
    throw new Error('Not implemented');
  }

  public getFoosWithBazzles(bazzles: EList<Bazzle>): EList<Foo> {
    throw new Error('Not implemented');
  }

  public freeze(): void {
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
      case CorePackage.FOO_GROUP__USER:
        return this.getUser();
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
      case CorePackage.FOO_GROUP__USER:
        this.setUser(newValue);
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
      case CorePackage.FOO_GROUP__USER:
        return this.getUser() != null;
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
      case CorePackage.FOO_GROUP__USER:
        this.setUser(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)


  public basicSetUser(newUser: User): void {
    this.user = newUser;
  }

  //======================================================================
  // Inverse Adders (if needed)


  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.FOO_GROUP;
  }
}