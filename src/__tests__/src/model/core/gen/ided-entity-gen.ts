import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { User } from '../api/user';

import { CorePackage } from '../core-package';
import { IdedEntity } from '../api/ided-entity';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for IdedEntity.
 */
export abstract class IdedEntityGen extends EObjectImpl implements IdedEntity {
  /** feature declarations */
  protected id!: string;
  protected editDate!: Date;
  protected editUser!: User;
  protected locked!: boolean;
  protected id2!: string;

  //======================================================================
  // Getters and Setters

  public getId(): string {
    return this.id;
  }

  public setId(newId: string): void {
    this.basicSetId(newId);
  }

  public getEditDate(): Date {
    return this.editDate;
  }

  public setEditDate(newEditDate: Date): void {
    this.basicSetEditDate(newEditDate);
  }

  public getEditUser(): User {
    return this.editUser;
  }

  public setEditUser(newEditUser: User): void {
    this.basicSetEditUser(newEditUser);
  }

  public isLocked(): boolean {
    return this.locked;
  }

  public setLocked(newLocked: boolean): void {
    this.basicSetLocked(newLocked);
  }

  public getId2(): string {
    return this.id2;
  }

  public setId2(newId2: string): void {
    this.basicSetId2(newId2);
  }

  //======================================================================
  // API Operations

  public genId(): void {
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
      case CorePackage.IDED_ENTITY__ID:
        return this.getId();
      case CorePackage.IDED_ENTITY__EDIT_DATE:
        return this.getEditDate();
      case CorePackage.IDED_ENTITY__EDIT_USER:
        return this.getEditUser();
      case CorePackage.IDED_ENTITY__LOCKED:
        return this.isLocked();
      case CorePackage.IDED_ENTITY__ID2:
        return this.getId2();
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
      case CorePackage.IDED_ENTITY__ID:
        this.setId(newValue);
        return;
      case CorePackage.IDED_ENTITY__EDIT_DATE:
        this.setEditDate(newValue);
        return;
      case CorePackage.IDED_ENTITY__EDIT_USER:
        this.setEditUser(newValue);
        return;
      case CorePackage.IDED_ENTITY__LOCKED:
        this.setLocked(newValue);
        return;
      case CorePackage.IDED_ENTITY__ID2:
        this.setId2(newValue);
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
      case CorePackage.IDED_ENTITY__ID:
        return this.getId() != null;
      case CorePackage.IDED_ENTITY__EDIT_DATE:
        return this.getEditDate() != null;
      case CorePackage.IDED_ENTITY__EDIT_USER:
        return this.getEditUser() != null;
      case CorePackage.IDED_ENTITY__LOCKED:
        return this.isLocked() != null;
      case CorePackage.IDED_ENTITY__ID2:
        return this.getId2() != null;
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
      case CorePackage.IDED_ENTITY__ID:
        this.setId(undefined!);
        return;
      case CorePackage.IDED_ENTITY__EDIT_DATE:
        this.setEditDate(undefined!);
        return;
      case CorePackage.IDED_ENTITY__EDIT_USER:
        this.setEditUser(undefined!);
        return;
      case CorePackage.IDED_ENTITY__LOCKED:
        this.setLocked(undefined!);
        return;
      case CorePackage.IDED_ENTITY__ID2:
        this.setId2(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetId(newId: string): void {
    this.id = newId;
  }

  public basicSetEditDate(newEditDate: Date): void {
    this.editDate = newEditDate;
  }

  public basicSetEditUser(newEditUser: User): void {
    this.editUser = newEditUser;
  }

  public basicSetLocked(newLocked: boolean): void {
    this.locked = newLocked;
  }

  public basicSetId2(newId2: string): void {
    this.id2 = newId2;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.IDED_ENTITY;
  }
}
