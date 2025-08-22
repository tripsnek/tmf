import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { ExampleInterface } from './example-interface';
import { Foo } from '../../../core/api/foo';
import { FooGroup } from '../../../core/api/foo-group';
import { CapitalizedPackagePackage } from '../capitalized-package-package';

/**
 * Source-gen API for ClassInCapitalizedPackage.
 */
export interface ClassInCapitalizedPackage extends ExampleInterface {
  getStringAttr(): string;
  setStringAttr(newStringAttr: string): void;
}
