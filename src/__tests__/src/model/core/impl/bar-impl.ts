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
import { Foo } from '../api/foo.js';
import { Bazzle } from '../api/bazzle.js';
import { User } from '../api/user.js';
import { FooClass } from '../api/foo-class.js';
import { BoundedNumber } from '../api/bounded-number.js';

import { BarGen } from '../gen/bar-gen.js';
import { Bar } from '../api/bar.js';

/**
 * Editable Impl class.
 */
export class BarImpl extends BarGen {
  public override doSomethingWithFooAndBazzles(
    foo: Foo,
    bazzles: EList<Bazzle>
  ): void {
    throw new Error('Not implemented');
  }
  public override doSomethingWithClassesAndNumbers(
    classes: EList<FooClass>,
    numbers: EList<BoundedNumber>
  ): void {
    throw new Error('Not implemented');
  }
}
