import { EEnum } from '../api/eenum';
import { EEnumLiteral } from '../api/eenum-literal';
import { ENamedElementImpl } from './enamed-element-impl';
import { EObject } from '../api/eobject';

export class EEnumLiteralImpl
  extends ENamedElementImpl
  implements EEnumLiteral
{
  private value!: number;
  private eEnum!: EEnum;
  private literal!: string;
  private instance: any;

  public constructor(eEnum?: EEnum, literal?: string, value?: number) {
    super(literal);
    if (eEnum) this.eEnum = eEnum;
    if (literal) this.literal = literal;
    if (value !== undefined) this.value = value;
  }

  public getEEnum(): EEnum {
    return this.eEnum;
  }
  public setEEnum(eenum: EEnum): void {
    this.eEnum = eenum;
  }

  public getLiteral(): string {
    return this.literal;
  }

  public setLiteral(value: string): void {
    this.literal = value;
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public getInstance(): any {
    return this.instance;
  }

  public setInstance(value: any): void {
    this.instance = value;
  }
  
  public override eContainer(): EObject{
    return this.eEnum;
  }
}
