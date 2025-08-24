import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Foo } from './foo';
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
 * Source-gen API for FooSpecialization.
 */
export interface FooSpecialization extends Foo {
}
