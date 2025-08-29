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
import { Foo } from './foo.js';
import { Bazzle } from './bazzle.js';
import { User } from './user.js';
import { FooClass } from './foo-class.js';
import { BoundedNumber } from './bounded-number.js';
import { CorePackage } from '../core-package.js';

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
