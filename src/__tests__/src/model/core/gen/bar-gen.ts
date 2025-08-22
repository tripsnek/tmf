import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { NamedEntity } from '../api/named-entity';
import { Foo } from '../api/foo';
import { Bazzle } from '../api/bazzle';
import { User } from '../api/user';
import { FooClass } from '../api/foo-class';
import { BoundedNumber } from '../api/bounded-number';

import { CorePackage } from '../core-package';
import { Bar } from '../api/bar';
import { NamedEntityGen } from './named-entity-gen';
import { NamedEntityImpl } from '../impl/named-entity-impl';
import { FooGen } from './foo-gen';
import { FooImpl } from '../impl/foo-impl';
import { BazzleGen } from './bazzle-gen';
import { BazzleImpl } from '../impl/bazzle-impl';
import { UserGen } from './user-gen';
import { UserImpl } from '../impl/user-impl';
import { FooClassGen } from './foo-class-gen';
import { FooClassImpl } from '../impl/foo-class-impl';
import { BoundedNumberGen } from './bounded-number-gen';
import { BoundedNumberImpl } from '../impl/bounded-number-impl';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for Bar.
 */
export abstract class BarGen extends NamedEntityImpl implements Bar {
  /** feature declarations */
  protected foo!: Foo;
  protected bazzles: EList<Bazzle> = new BasicEList<Bazzle>(
    undefined,
    this,
    CorePackage.BAR__BAZZLES,
    undefined
  );
  protected backupFor: EList<Bazzle> = new BasicEList<Bazzle>(
    undefined,
    this,
    CorePackage.BAR__BACKUP_FOR,
    CorePackage.BAZZLE__BACKUP_BAR
  );

  //======================================================================
  // Getters and Setters

  public getFoo(): Foo {
    return this.foo;
  }

  public setFoo(newFoo: Foo): void {
    if (this.foo !== newFoo) {
      if (this.foo) {
        this.foo.eInverseRemove(this, CorePackage.FOO__BARS);
      }
      if (newFoo) {
        newFoo.eInverseAdd(this, CorePackage.FOO__BARS);
      }
    }
    this.basicSetFoo(newFoo);
  }

  public getBazzles(): EList<Bazzle> {
    return this.bazzles;
  }

  public getBackupFor(): EList<Bazzle> {
    return this.backupFor;
  }

  //======================================================================
  // API Operations

  public doSomethingWithFooAndBazzles(foo: Foo, bazzles: EList<Bazzle>): void {
    throw new Error('Not implemented');
  }

  public doSomethingWithClassesAndNumbers(
    classes: EList<FooClass>,
    numbers: EList<BoundedNumber>
  ): void {
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
      case CorePackage.BAR__FOO:
        return this.getFoo();
      case CorePackage.BAR__BAZZLES:
        return this.getBazzles();
      case CorePackage.BAR__BACKUP_FOR:
        return this.getBackupFor();
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
      case CorePackage.BAR__FOO:
        this.setFoo(newValue);
        return;
      case CorePackage.BAR__BAZZLES:
        this.getBazzles().clear();
        this.getBazzles().addAll(newValue);
        return;
      case CorePackage.BAR__BACKUP_FOR:
        this.getBackupFor().clear();
        this.getBackupFor().addAll(newValue);
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
      case CorePackage.BAR__FOO:
        return this.getFoo() != null;
      case CorePackage.BAR__BAZZLES:
        return !this.getBazzles().isEmpty();
      case CorePackage.BAR__BACKUP_FOR:
        return !this.getBackupFor().isEmpty();
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
      case CorePackage.BAR__FOO:
        this.setFoo(undefined!);
        return;
      case CorePackage.BAR__BAZZLES:
        this.getBazzles().clear();
        return;
      case CorePackage.BAR__BACKUP_FOR:
        this.getBackupFor().clear();
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetFoo(newFoo: Foo): void {
    this.eBasicSetContainer(newFoo, CorePackage.FOO__BARS);
    this.foo = newFoo;
  }

  //======================================================================
  // Inverse Adders (if needed)
  public override eInverseAdd(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case CorePackage.BAR__FOO:
        if (this.foo) this.foo.eInverseRemove(this, CorePackage.FOO__BARS);
        return this.basicSetFoo(<Foo>otherEnd);
      case CorePackage.BAR__BACKUP_FOR:
        return (<EList<EObject>>this.getBackupFor()).basicAdd(otherEnd);
    }
    return super.eInverseAdd(otherEnd, featureID);
  }

  //======================================================================
  // Inverse Removers (if needed)
  public override eInverseRemove(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case CorePackage.BAR__FOO:
        return this.basicSetFoo(undefined!);
      case CorePackage.BAR__BACKUP_FOR:
        return (<EList<EObject>>this.getBackupFor()).basicRemove(otherEnd);
    }
    return super.eInverseRemove(otherEnd, featureID);
  }

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.BAR;
  }
}
