import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Bar } from '../api/bar.js';
import { Foo } from '../api/foo.js';
import { Bazzle } from '../api/bazzle.js';
import { User } from '../api/user.js';

import { BarSpecializationWithComponentsGen } from '../gen/bar-specialization-with-components-gen.js';
import { BarSpecializationWithComponents } from '../api/bar-specialization-with-components.js';

/**
 * Editable Impl class.
 */
export class BarSpecializationWithComponentsImpl extends BarSpecializationWithComponentsGen {}
