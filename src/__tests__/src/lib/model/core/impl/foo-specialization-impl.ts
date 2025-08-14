import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Foo } from '../api/foo';
import { FooGroup } from '../api/foo-group';
import { FooClass } from '../api/foo-class';
import { BoundedNumber } from '../api/bounded-number';
import { Bar } from '../api/bar';
import { Bazzle } from '../api/bazzle';
import { User } from '../api/user';
import { FooSpecializationGen } from '../gen/foo-specialization-gen';
import { FooSpecialization } from '../api/foo-specialization';

/**
 * Editable Impl class.
 */
export class FooSpecializationImpl extends FooSpecializationGen {}
