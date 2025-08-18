import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { ContainerRootType } from '../api/container-root-type';

import { ModelPackage } from '../model-package';
import { ContainedRootType } from '../api/contained-root-type';

/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ContainedRootType.
 */
export abstract class ContainedRootTypeGen
  extends EObjectImpl
  implements ContainedRootType
{
  /** feature declarations */
  protected container: ContainerRootType;

  //======================================================================
  // Getters and Setters

  public getContainer(): ContainerRootType {
    return this.container;
  }

  public setContainer(newContainer: ContainerRootType): void {
    if (this.container !== newContainer) {
      if (this.container) {
        this.container.eInverseRemove(
          this,
          ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED
        );
      }
      if (newContainer) {
        newContainer.eInverseAdd(
          this,
          ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED
        );
      }
    }
    this.basicSetContainer(newContainer);
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
      case ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER:
        return this.getContainer();
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
      case ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER:
        this.setContainer(newValue);
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
      case ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER:
        return this.getContainer === undefined;
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
      case ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER:
        this.setContainer(undefined);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetContainer(newContainer: ContainerRootType): void {
    this.eBasicSetContainer(
      newContainer,
      ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER
    );
    this.container = newContainer;
  }

  //======================================================================
  // Inverse Adders (if needed)
  public eInverseAdd(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER:
        if (this.container)
          this.container.eInverseRemove(
            this,
            ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED
          );
        return this.basicSetContainer(<ContainerRootType>otherEnd);
    }
    return super.eInverseAdd(otherEnd, featureID);
  }

  //======================================================================
  // Inverse Removers (if needed)
  public eInverseRemove(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER:
        return this.basicSetContainer(null);
    }
    return super.eInverseRemove(otherEnd, featureID);
  }

  //======================================================================
  // eClass()

  public eClass(): EClass {
    return ModelPackage.Literals.CONTAINED_ROOT_TYPE;
  }
}
