import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { Foo } from './foo.js';
import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for ThingWithoutID.
 */
export interface ThingWithoutID extends EObject {
  getSingleNonContainment(): Foo;
  setSingleNonContainment(newSingleNonContainment: Foo): void;
  getManyNonContainment(): EList<Foo>;
  getRefToOtherIdlessThing(): ThingWithoutID;
  setRefToOtherIdlessThing(newRefToOtherIdlessThing: ThingWithoutID): void;
  getManyRefToOtherIdlessThings(): EList<ThingWithoutID>;
}
