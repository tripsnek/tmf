import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { CorePackage } from '../core-package.js';

/**
 * Source-gen API for BoundedNumber.
 */
export interface BoundedNumber extends EObject {
  getUnits(): string;
  setUnits(newUnits: string): void;
  getValue(): number;
  setValue(newValue: number): void;
  getMaxValue(): number;
  setMaxValue(newMaxValue: number): void;
  getMinValue(): number;
  setMinValue(newMinValue: number): void;
}
