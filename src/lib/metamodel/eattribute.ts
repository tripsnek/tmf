import { EStructuralFeature } from './estructural-feature';
import { EDataType } from './edata-type';

export interface EAttribute extends EStructuralFeature {
  // getEAttributeType(): EDataType;

  isId(): boolean;

  setId(value: boolean): void;
}
