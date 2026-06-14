import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Foo } from '../../core/api/foo.js';
import { AnalysisPackage } from '../analysis-package.js';

/**
 * Source-gen API for ResultDetail.
 */
export interface ResultDetail extends EObject {
  getCrossPackageInverse(): Foo;
  setCrossPackageInverse(newCrossPackageInverse: Foo): void;
}
