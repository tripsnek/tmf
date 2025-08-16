import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { ContainedRootType } from '../api/contained-root-type';

import { ModelPackage } from '../model-package';
import { ContainerRootType } from '../api/container-root-type';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ContainerRootType.
 */
export abstract class ContainerRootTypeGen
  extends EObjectImpl
  implements ContainerRootType
{
  /** feature declarations */
  protected contained: EList<ContainedRootType> =
    new BasicEList<ContainedRootType>(
      null,
      this,
      ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED,
      null
    );

  //======================================================================
  // Getters and Setters

  public getContained(): EList<ContainedRootType> {
    return this.contained;
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
      case ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED:
        return this.getContained();
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
      case ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED:
        this.getContained().clear();
        this.getContained().addAll(newValue);
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
      case ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED:
        return this.getContained().isEmpty();
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
      case ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED:
        this.getContained().clear();
        return;
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

  public eClass(): EClass {
    return ModelPackage.Literals.CONTAINER_ROOT_TYPE;
  }
}
