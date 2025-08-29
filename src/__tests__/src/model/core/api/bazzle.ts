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
import { Bar } from './bar.js';
import { Foo } from './foo.js';
import { User } from './user.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for Bazzle.
 */
export interface Bazzle extends NamedEntity {
  getBackupBar(): Bar;
  setBackupBar(newBackupBar: Bar): void;
  getOneToOneFoo(): Foo;
  setOneToOneFoo(newOneToOneFoo: Foo): void;
}
