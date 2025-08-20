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
import { Bar } from '../api/bar';
import { Foo } from '../api/foo';
import { User } from '../api/user';

import { CorePackage } from '../core-package';
import { Bazzle } from '../api/bazzle';
import { NamedEntityGen } from './named-entity-gen';
import { NamedEntityImpl } from '../impl/named-entity-impl';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for Bazzle.
 */
export abstract class BazzleGen  extends NamedEntityImpl implements Bazzle {
  /** feature declarations */
  protected backupBar!: Bar;
  protected oneToOneFoo!: Foo;



  //======================================================================
  // Getters and Setters


  public getBackupBar(): Bar {
    return this.backupBar;
  }

  public setBackupBar(newBackupBar: Bar): void {
    if (this.backupBar !== newBackupBar) {
      if (this.backupBar) {
        this.backupBar.eInverseRemove(this, CorePackage.BAR__BACKUP_FOR);
      }
      if (newBackupBar) {
        newBackupBar.eInverseAdd(this, CorePackage.BAR__BACKUP_FOR);
      }
    }
    this.basicSetBackupBar(newBackupBar);
  }

  public getOneToOneFoo(): Foo {
    return this.oneToOneFoo;
  }

  public setOneToOneFoo(newOneToOneFoo: Foo): void {
    if (this.oneToOneFoo !== newOneToOneFoo) {
      if (this.oneToOneFoo) {
        this.oneToOneFoo.eInverseRemove(this, CorePackage.FOO__ONE_TO_ONE_BAZZLE);
      }
      if (newOneToOneFoo) {
        newOneToOneFoo.eInverseAdd(this, CorePackage.FOO__ONE_TO_ONE_BAZZLE);
      }
    }
    this.basicSetOneToOneFoo(newOneToOneFoo);
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
      case CorePackage.BAZZLE__BACKUP_BAR:
        return this.getBackupBar();
      case CorePackage.BAZZLE__ONE_TO_ONE_FOO:
        return this.getOneToOneFoo();
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
      case CorePackage.BAZZLE__BACKUP_BAR:
        this.setBackupBar(newValue);
        return;
      case CorePackage.BAZZLE__ONE_TO_ONE_FOO:
        this.setOneToOneFoo(newValue);
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
      case CorePackage.BAZZLE__BACKUP_BAR:
        return this.getBackupBar() != null;
      case CorePackage.BAZZLE__ONE_TO_ONE_FOO:
        return this.getOneToOneFoo() != null;
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
      case CorePackage.BAZZLE__BACKUP_BAR:
        this.setBackupBar(undefined!);
        return;
      case CorePackage.BAZZLE__ONE_TO_ONE_FOO:
        this.setOneToOneFoo(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)


  public basicSetBackupBar(newBackupBar: Bar): void {
    this.backupBar = newBackupBar;
  }

  public basicSetOneToOneFoo(newOneToOneFoo: Foo): void {
    this.oneToOneFoo = newOneToOneFoo;
  }

  //======================================================================
  // Inverse Adders (if needed)
  public override eInverseAdd(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case CorePackage.BAZZLE__BACKUP_BAR:
        if (this.backupBar)
          this.backupBar.eInverseRemove(
            this,
            CorePackage.BAR__BACKUP_FOR
          );
        return this.basicSetBackupBar(<Bar>otherEnd);
      case CorePackage.BAZZLE__ONE_TO_ONE_FOO:
        if (this.oneToOneFoo)
          this.oneToOneFoo.eInverseRemove(
            this,
            CorePackage.FOO__ONE_TO_ONE_BAZZLE
          );
        return this.basicSetOneToOneFoo(<Foo>otherEnd);
    }
    return super.eInverseAdd(otherEnd, featureID);
  }


  //======================================================================
  // Inverse Removers (if needed)
  public override eInverseRemove(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case CorePackage.BAZZLE__BACKUP_BAR:
        return this.basicSetBackupBar(undefined!);
      case CorePackage.BAZZLE__ONE_TO_ONE_FOO:
        return this.basicSetOneToOneFoo(undefined!);
    }
    return super.eInverseRemove(otherEnd, featureID);
  }

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.BAZZLE;
  }
}