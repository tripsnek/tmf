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
import { FooGroup } from './foo-group';
import { FooClass } from './foo-class';
import { BoundedNumber } from './bounded-number';
import { Bar } from './bar';
import { Bazzle } from './bazzle';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package';
import { ThingWithoutID } from './thing-without-i-d';
import { User } from './user';
import { CorePackage } from '../core-package';

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
