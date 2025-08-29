import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { NamedEntity } from '../api/named-entity.js';
import { FooGroup } from '../api/foo-group.js';
import { FooClass } from '../api/foo-class.js';
import { BoundedNumber } from '../api/bounded-number.js';
import { Bar } from '../api/bar.js';
import { Bazzle } from '../api/bazzle.js';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package.js';
import { ThingWithoutID } from '../api/thing-without-i-d.js';
import { User } from '../api/user.js';

import { FooGen } from '../gen/foo-gen.js';
import { Foo } from '../api/foo.js';

/**
 * Editable Impl class.
 */
export class FooImpl extends FooGen {
  public override copyFoo(): Foo {
    throw new Error('Not implemented');
  }
}
