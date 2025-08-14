import { EClass } from '../metamodel/eclass';
import { TGenUtils as DU } from './tgen-utils';
import { EClassifier } from '../metamodel/eclassifier';

/**
 * Source code generation for *impl.ts files for EClasses.
 *
 * @tripsnek
 */
export class TGeneratorImpl {
  public generate(eClass: EClass, toImport: Set<EClassifier>): string {
    const genClassName = DU.genGenClassName(eClass);
    const apiClassName = eClass.getName();
    const implClassName = DU.genImplClassName(eClass);
    const isEcore = eClass.getEPackage().getName() == 'ecore';
    return `
      ${isEcore ? DU.ECORE_DEFAULT_IMPORTS : DU.DEFAULT_IMPORTS}
      ${DU.genApiImports(eClass, toImport, '..' + DU.API_PATH)}
      import {${genClassName}} from '..${DU.GEN_PATH}/${DU.genClassGenName(
      eClass
    )}'
      import { ${apiClassName} } from '..${DU.API_PATH}/${DU.genClassApiName(
      eClass
    )}';

       /**
        * Editable Impl class.
        */
      export class ${implClassName} extends ${genClassName}{
        ${this.generateOperations(eClass)}
      }`;
  }

  private generateOperations(eClass: EClass): string {
    let result = '';
    for (const eop of eClass.getEOperations()) {
      result += `public ${DU.eopSignature(
        eop
      )} {throw new Error('Not implemented');}`;
    }
    return result;
  }
}
