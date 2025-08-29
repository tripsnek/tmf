import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { User } from './user.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for IdedEntity.
 */
export interface IdedEntity extends EObject {
  getId(): string;
  setId(newId: string): void;
  getEditDate(): Date;
  setEditDate(newEditDate: Date): void;
  getEditUser(): User;
  setEditUser(newEditUser: User): void;
  isLocked(): boolean;
  setLocked(newLocked: boolean): void;
  getId2(): string;
  setId2(newId2: string): void;
  genId(): void;
}
