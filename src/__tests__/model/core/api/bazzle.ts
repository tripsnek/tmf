import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { NamedEntity } from './named-entity';
import { Bar } from './bar';
import { Foo } from './foo';
import { User } from './user';
import { CorePackage } from '../core-package';

/**
 * Source-gen API for Bazzle.
 */
export interface Bazzle extends NamedEntity {
  getBackupBar(): Bar;
  setBackupBar(newBackupBar: Bar): void;
  getOneToOneFoo(): Foo;
  setOneToOneFoo(newOneToOneFoo: Foo): void;
}
