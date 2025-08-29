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
import { User } from './user.js';
import { FooClass } from './foo-class.js';
import { Foo } from './foo.js';
import { Bazzle } from './bazzle.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for FooGroup.
 */
export interface FooGroup extends NamedEntity {
  getUser(): User;
  setUser(newUser: User): void;
  computeFoosOfClass(fooClass: FooClass): number;
  getFoosWithBazzles(bazzles: EList<Bazzle>): EList<Foo>;
  freeze(): void;
}
