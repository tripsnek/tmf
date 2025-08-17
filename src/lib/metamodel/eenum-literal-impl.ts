import { EEnum } from './eenum';
import { EEnumLiteral } from './eenum-literal';
import { ENamedElementImpl } from './enamed-element-impl';
import { EObject } from './eobject';

export class EEnumLiteralImpl
  extends ENamedElementImpl
  implements EEnumLiteral
{
  private value: number;
  private eEnum: EEnum;
  private literal: string;
  private instance: any;

  public constructor(eEnum?: EEnum, literal?: string, value?: number) {
    super(null, literal);
    this.eEnum = eEnum;
    this.literal = literal;
    this.value = value;
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

  public setInstance(value): void {
    this.instance = value;
  }
  
  public eContainer(): EObject{
    return this.eEnum;
  }
}
