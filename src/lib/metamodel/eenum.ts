import { EEnumLiteral } from './eenum-literal';
import { EList } from './elist';
import { EDataType } from './edata-type';

export interface EEnum extends EDataType {
  getELiterals(): EList<EEnumLiteral>;
  addLiteral(value: EEnumLiteral): void;
  getEEnumLiteralByLiteral(literal: string): EEnumLiteral | undefined;
  getEEnumLiteral(value: number): EEnumLiteral | undefined;
  getEEnumLiteral(value: string): EEnumLiteral | undefined;
  getEEnumLiteral(value: number | string): EEnumLiteral | undefined;
}
