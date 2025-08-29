import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Bar } from './bar.js';
import { Foo } from './foo.js';
import { Bazzle } from './bazzle.js';
import { User } from './user.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for BarSpecializationWithComponents.
 */
export interface BarSpecializationWithComponents extends Bar {
  getComponentBars(): EList<Bar>;
  getSpecialName(): string;
  setSpecialName(newSpecialName: string): void;
}
