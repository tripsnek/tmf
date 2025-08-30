import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Foo } from './foo.js';
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
 * Source-gen API for FooSpecialization.
 */
export interface FooSpecialization extends Foo {
}
