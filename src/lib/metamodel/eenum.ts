import { EEnumLiteral } from './eenum-literal';
import { EList } from './elist';
import { EDataType } from './edata-type';

export interface EEnum extends EDataType {
  getELiterals(): EList<EEnumLiteral>;
  addLiteral(value: EEnumLiteral): void;
  getEEnumLiteralByLiteral(literal: string): EEnumLiteral;
  getEEnumLiteral(value: number): EEnumLiteral;
  getEEnumLiteral(value: string): EEnumLiteral;
  getEEnumLiteral(value: number | string): EEnumLiteral;
}
