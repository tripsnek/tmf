import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { NamedEntity } from './named-entity.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for User.
 */
export interface User extends NamedEntity {
  getPass(): string;
  setPass(newPass: string): void;
  getSalt(): string;
  setSalt(newSalt: string): void;
  getEmail(): string;
  setEmail(newEmail: string): void;
}
