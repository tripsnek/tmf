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
import { Bar } from '../api/bar.js';
import { Foo } from '../api/foo.js';
import { User } from '../api/user.js';

import { BazzleGen } from '../gen/bazzle-gen.js';
import { Bazzle } from '../api/bazzle.js';

/**
 * Editable Impl class.
 */
export class BazzleImpl extends BazzleGen {}
