import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { ContainedRootType } from './contained-root-type';
import { ModelPackage } from '../model-package';

/**
 * Source-gen API for ContainerRootType.
 */
export interface ContainerRootType extends EObject {
  getContained(): EList<ContainedRootType>;
}
