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
import { FooGroup } from './foo-group.js';
import { FooClass } from './foo-class.js';
import { BoundedNumber } from './bounded-number.js';
import { Bar } from './bar.js';
import { Bazzle } from './bazzle.js';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package.js';
import { ThingWithoutID } from './thing-without-i-d.js';
import { User } from './user.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for Foo.
 */
export interface Foo extends NamedEntity {
  getGroup(): FooGroup;
  setGroup(newGroup: FooGroup): void;
  getCreationDate(): Date;
  setCreationDate(newCreationDate: Date): void;
  getFooClass(): FooClass;
  setFooClass(newFooClass: FooClass): void;
  getRange(): BoundedNumber;
  setRange(newRange: BoundedNumber): void;
  getBars(): EList<Bar>;
  getOneToOneBazzle(): Bazzle;
  setOneToOneBazzle(newOneToOneBazzle: Bazzle): void;
  getManyAttribute(): EList<string>;
  getUnchangeableAttribute(): string;
  getUnchangeableReference(): Bazzle;
  getTransientAttribute(): string;
  setTransientAttribute(newTransientAttribute: string): void;
  getTransientReference(): Foo;
  setTransientReference(newTransientReference: Foo): void;
  getVolatileAttribute(): string;
  setVolatileAttribute(newVolatileAttribute: string): void;
  getVolatileReference(): Foo;
  setVolatileReference(newVolatileReference: Foo): void;
  getManyCrossAggregate(): EList<Foo>;
  getManyCrossAggregateNested(): EList<Bar>;
  getManyValueObjects(): EList<BoundedNumber>;
  getOneToOneContainment(): Bazzle;
  setOneToOneContainment(newOneToOneContainment: Bazzle): void;
  getOwnedFoos(): EList<Foo>;
  getSubpackageReference(): ClassInCapitalizedPackage;
  setSubpackageReference(newSubpackageReference: ClassInCapitalizedPackage): void;
  getContainedThingsWithNoID(): EList<ThingWithoutID>;
  copyFoo(): Foo;
}
