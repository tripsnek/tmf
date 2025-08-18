import { EEnum } from './eenum';
import { ENamedElementImpl } from './enamed-element-impl';

export interface EEnumLiteral extends ENamedElementImpl {
  getEEnum(): EEnum;
  setEEnum(eenum: EEnum): void;
  getLiteral(): string;
  setLiteral(value: string): void;
  getValue(): number;
  setValue(value: number): void;
  getInstance(): any;
  setInstance(value: any): void;
}
