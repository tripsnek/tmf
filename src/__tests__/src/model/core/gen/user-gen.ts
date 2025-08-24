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

import { CorePackage } from '../core-package';
import { User } from '../api/user';
import { NamedEntityGen } from './named-entity-gen';
import { NamedEntityImpl } from '../impl/named-entity-impl';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for User.
 */
export abstract class UserGen extends NamedEntityImpl implements User {
  /** feature declarations */
  protected pass!: string;
  protected salt!: string;
  protected email!: string;

  //======================================================================
  // Getters and Setters

  public getPass(): string {
    return this.pass;
  }

  public setPass(newPass: string): void {
    this.basicSetPass(newPass);
  }

  public getSalt(): string {
    return this.salt;
  }

  public setSalt(newSalt: string): void {
    this.basicSetSalt(newSalt);
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newEmail: string): void {
    this.basicSetEmail(newEmail);
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
      case CorePackage.USER__PASS:
        return this.getPass();
      case CorePackage.USER__SALT:
        return this.getSalt();
      case CorePackage.USER__EMAIL:
        return this.getEmail();
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
      case CorePackage.USER__PASS:
        this.setPass(newValue);
        return;
      case CorePackage.USER__SALT:
        this.setSalt(newValue);
        return;
      case CorePackage.USER__EMAIL:
        this.setEmail(newValue);
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
      case CorePackage.USER__PASS:
        return this.getPass() != null;
      case CorePackage.USER__SALT:
        return this.getSalt() != null;
      case CorePackage.USER__EMAIL:
        return this.getEmail() != null;
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
      case CorePackage.USER__PASS:
        this.setPass(undefined!);
        return;
      case CorePackage.USER__SALT:
        this.setSalt(undefined!);
        return;
      case CorePackage.USER__EMAIL:
        this.setEmail(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetPass(newPass: string): void {
    this.pass = newPass;
  }

  public basicSetSalt(newSalt: string): void {
    this.salt = newSalt;
  }

  public basicSetEmail(newEmail: string): void {
    this.email = newEmail;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.USER;
  }
}
