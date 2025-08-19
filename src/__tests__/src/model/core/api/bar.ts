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
import { Foo } from './foo';
import { Bazzle } from './bazzle';
import { User } from './user';
import { FooClass } from './foo-class';
import { BoundedNumber } from './bounded-number';
import { CorePackage } from '../core-package';

/**
 * Source-gen API for Bar.
 */
export interface Bar extends NamedEntity {
  getFoo(): Foo;
  setFoo(newFoo: Foo): void;
  getBazzles(): EList<Bazzle>;
  getBackupFor(): EList<Bazzle>;
  doSomethingWithFooAndBazzles(foo: Foo, bazzles: EList<Bazzle>): void;
  doSomethingWithClassesAndNumbers(
    classes: EList<FooClass>,
    numbers: EList<BoundedNumber>
  ): void;
}
