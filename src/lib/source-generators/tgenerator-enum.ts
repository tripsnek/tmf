import { EEnum } from '../metamodel/api/eenum';

/**
 * Source code generation for .ts file that implements an EEnum.
 *
 * @tripsnek
 */
export class TGeneratorEnum {
  public generate(eEnum: EEnum): string {
    return `/**
 * Source-gen code for ${eEnum.getName()} enumeration.
 */
export enum ${eEnum.getName()} {
${this.generateLiterals(eEnum)}}
`;
  }

  private generateLiterals(eEnum: EEnum): string {
    let result = ``;
    for (let i = 0; i < eEnum.getELiterals().size(); i++) {
      const literal = eEnum.getELiterals().get(i);
      const name = literal.getName();
      const value = `'${literal.getName()}'` || i;
      result += `  ${name} = ${value},\n`;
    }
    return result;
  }
}
