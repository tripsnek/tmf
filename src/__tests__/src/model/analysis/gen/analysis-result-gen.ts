import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { IdedEntity } from '../../core/api/ided-entity';
import { User } from '../../core/api/user';
import { NamedEntity } from '../../core/api/named-entity';

import { AnalysisPackage } from '../analysis-package';
import { AnalysisResult } from '../api/analysis-result';
import { IdedEntityGen } from '../../core//gen/ided-entity-gen';
import { IdedEntityImpl } from '../../core//impl/ided-entity-impl';
import { UserGen } from '../../core//gen/user-gen';
import { UserImpl } from '../../core//impl/user-impl';
import { NamedEntityGen } from '../../core//gen/named-entity-gen';
import { NamedEntityImpl } from '../../core//impl/named-entity-impl';
import { CorePackage } from '../../core/core-package';
/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for AnalysisResult.
 */
export abstract class AnalysisResultGen
  extends IdedEntityImpl
  implements AnalysisResult
{
  /** feature declarations */
  protected user!: User;
  protected object!: NamedEntity;

  //======================================================================
  // Getters and Setters

  public getUser(): User {
    return this.user;
  }

  public setUser(newUser: User): void {
    this.basicSetUser(newUser);
  }

  public getObject(): NamedEntity {
    return this.object;
  }

  public setObject(newObject: NamedEntity): void {
    const oldObject = this.object;
    if (oldObject) oldObject.setEContainer(undefined, undefined);
    if (newObject)
      newObject.setEContainer(this, AnalysisPackage.ANALYSIS_RESULT__OBJECT);
    this.basicSetObject(newObject);
  }

  //======================================================================
  // API Operations

  public cloneObject(deepCopy: boolean, newUser: User): NamedEntity {
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
      case AnalysisPackage.ANALYSIS_RESULT__USER:
        return this.getUser();
      case AnalysisPackage.ANALYSIS_RESULT__OBJECT:
        return this.getObject();
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
      case AnalysisPackage.ANALYSIS_RESULT__USER:
        this.setUser(newValue);
        return;
      case AnalysisPackage.ANALYSIS_RESULT__OBJECT:
        this.setObject(newValue);
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
      case AnalysisPackage.ANALYSIS_RESULT__USER:
        return this.getUser() != null;
      case AnalysisPackage.ANALYSIS_RESULT__OBJECT:
        return this.getObject() != null;
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
      case AnalysisPackage.ANALYSIS_RESULT__USER:
        this.setUser(undefined!);
        return;
      case AnalysisPackage.ANALYSIS_RESULT__OBJECT:
        this.setObject(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetUser(newUser: User): void {
    this.user = newUser;
  }

  public basicSetObject(newObject: NamedEntity): void {
    this.object = newObject;
  }

  //======================================================================
  // Inverse Adders (if needed)

  //======================================================================
  // Inverse Removers (if needed)

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return AnalysisPackage.Literals.ANALYSIS_RESULT;
  }
}
