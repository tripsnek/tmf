import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { NamedEntity } from '../api/named-entity';
import { Bar } from '../api/bar';
import { Foo } from '../api/foo';
import { User } from '../api/user';

import { BazzleGen } from '../gen/bazzle-gen';
import { Bazzle } from '../api/bazzle';

/**
 * Editable Impl class.
 */
export class BazzleImpl extends BazzleGen {}
