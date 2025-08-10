import { EObject } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';

import { EClass } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';

import { NamedEntity } from '../api/named-entity';
import { FooGroup } from '../api/foo-group';
import { FooClass } from '../api/foo-class';
import { BoundedNumber } from '../api/bounded-number';
import { Bar } from '../api/bar';
import { Bazzle } from '../api/bazzle';
import { User } from '../api/user';
import { FooGen } from '../gen/foo-gen';
import { Foo } from '../api/foo';

/**
 * This file can be freely edited to extend the generated class behavior
 * and will never be overwritten by source code generation.
 */
export class FooImpl extends FooGen {
  public copyFoo(): Foo {
    throw new Error('Not implemented');
  }
}
