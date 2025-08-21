import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Foo } from '../../core/api/foo';
import { FooGroup } from '../../core/api/foo-group';
import { CapitalizedPackagePackage } from '../capitalized-package-package';

/**
 * Source-gen API for ExampleInterface.
 */
export interface ExampleInterface extends EObject {
  interfaceOperation(fooGroup: EList<FooGroup>): Foo;
}
