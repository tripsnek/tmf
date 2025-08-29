import { EEnumLiteral } from '../api/eenum-literal';
import { EList } from '../api/elist';
import { BasicEList } from '../basicelist.js';
import { EDataType } from '../api/edata-type';
import { EDataTypeImpl } from './edata-type-impl.js';
import { EEnum } from '../api/eenum';

export class EEnumImpl extends EDataTypeImpl implements EEnum {
  private eLiterals: EList<EEnumLiteral> = new BasicEList();

  public constructor() {
    super();
  }

  public getELiterals(): EList<EEnumLiteral> {
    return this.eLiterals;
  }

  public addLiteral(value: EEnumLiteral): void {
    this.eLiterals.add(value);
  }

  public getEEnumLiteralByLiteral(literal: string): EEnumLiteral | undefined {
    return this.eLiterals.find((e) => e.getLiteral() === literal);
  }

  public getEEnumLiteral(value: number): EEnumLiteral | undefined;
  public getEEnumLiteral(value: string): EEnumLiteral | undefined;
  public getEEnumLiteral(value: number | string): EEnumLiteral | undefined {
    if (typeof value === 'number') {
      return this.eLiterals.find((e) => e.getValue() === value);
    } else {
      let toRet = this.eLiterals.find((e) => e.getLiteral() === value);
      //attempt to interpret string as literal value (in case number was passed in as a string)
      if (!toRet) {
        toRet = this.eLiterals.find((e) => e.getValue().toString() === value);
      }
      return toRet;
    }
  }
}
