import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { IdedEntity } from '../api/ided-entity';
import { User } from '../api/user';
import { CorePackage } from '../core-package';
import { NamedEntity } from '../api/named-entity';
import { IdedEntityGen } from './ided-entity-gen';
import { IdedEntityImpl } from '../impl/ided-entity-impl';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for NamedEntity.
 */
export abstract class NamedEntityGen
  extends IdedEntityImpl
  implements NamedEntity
{
  /** feature declarations */
  protected name: string;

  //======================================================================
  // Getters and Setters

  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.basicSetName(newName);
  }

  //======================================================================
  // API Operations

  //======================================================================
  // Standard EObject behavior

  /**
   * eGet() - provides reflective access to all features.
   */
  public eGet(feature: number | EStructuralFeature): any {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.NAMED_ENTITY__NAME:
        return this.getName();
    }
    return super.eGet(featureID);
  }

  /**
   * eSet() - provides ability to reflectively set all features.
   */
  public eSet(feature: number | EStructuralFeature, newValue: any): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.NAMED_ENTITY__NAME:
        this.setName(newValue);
        return;
    }
    return super.eSet(featureID, newValue);
  }

  /**
   * eIsSet() - provides ability to reflectively check if any feature is set.
   */
  public eIsSet(feature: number | EStructuralFeature): boolean {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.NAMED_ENTITY__NAME:
        return this.getName === undefined;
    }
    return super.eIsSet(featureID);
  }

  /**
   * eUnset() - provides ability to reflectively unset any feature.
   */
  public eUnset(feature: number | EStructuralFeature): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.NAMED_ENTITY__NAME:
        this.setName(undefined);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetName(newName: string): void {
    this.name = newName;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public eClass(): EClass {
    return CorePackage.Literals.NAMED_ENTITY;
  }
}
