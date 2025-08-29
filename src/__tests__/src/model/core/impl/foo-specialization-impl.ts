import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Foo } from '../api/foo.js';
import { FooGroup } from '../api/foo-group.js';
import { FooClass } from '../api/foo-class.js';
import { BoundedNumber } from '../api/bounded-number.js';
import { Bar } from '../api/bar.js';
import { Bazzle } from '../api/bazzle.js';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package.js';
import { ThingWithoutID } from '../api/thing-without-i-d.js';
import { User } from '../api/user.js';

import { FooSpecializationGen } from '../gen/foo-specialization-gen.js';
import { FooSpecialization } from '../api/foo-specialization.js';

/**
 * Editable Impl class.
 */
export class FooSpecializationImpl extends FooSpecializationGen {}
