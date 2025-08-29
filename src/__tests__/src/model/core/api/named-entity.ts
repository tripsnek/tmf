import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { IdedEntity } from './ided-entity.js';
import { User } from './user.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for NamedEntity.
 */
export interface NamedEntity extends IdedEntity {
  getName(): string;
  setName(newName: string): void;
}
