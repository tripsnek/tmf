import { EClass } from '../metamodel/eclass';
import { TGenUtils as DU } from './tgen-utils';
import { EClassifier } from '../metamodel/eclassifier';

/**
 * Source code generation for API interface .ts files for EClasses.
 *
 * @tripsnek
 */
export class DGeneratorApi {
  public generate(eClass: EClass, toImport: Set<EClassifier>): string {
    const isEcore = eClass.getEPackage().getName() == 'ecore';
    const pkg = eClass.getEPackage();
    const pkgClassName = DU.genPackageClassName(pkg);
    const pkgFileName = DU.genPackageFileName(pkg);

    //if generating async service for the class, name it *Async
    const className = eClass.getName();

    return `
      ${isEcore ? DU.ECORE_DEFAULT_IMPORTS : DU.DEFAULT_IMPORTS}
      ${DU.genApiImports(eClass, toImport, `.`)}
      import {${pkgClassName}} from '../${pkgFileName}';
        
      /**
       * Source-gen API for ${className}.
       */
      export interface ${className} ${this.generateSuperTypes(eClass)} {
        ${this.generateFields(eClass)}
        ${this.generateOperations(eClass)}
      }`;
  }

  private generateSuperTypes(eClass: EClass): string {
    let result = 'extends';
    if (eClass.getESuperTypes().size() < 1) {
      if (eClass.getName() == 'EObject') result = '';
      else result += ' EObject';
    } else {
      for (let i = 0; i < eClass.getESuperTypes().size(); i++) {
        const superType = eClass.getESuperTypes().get(i);
        result += `${i > 0 ? ',' : ''} ${superType.getName()}`;
      }
    }
    return result;
  }

  private generateFields(eClass: EClass): string {
    let result = '';
    for (const field of eClass.getEStructuralFeatures()) {
      //do not generate getters/setters on public API for companion id fields
      // Generate getters for all fields
      result += `${DU.getterSig(field)};`;

      // Generate setters for changeable references
      if (!field.isMany() && field.isChangeable()) {
        result += `${DU.setterSig(field)};`;
      }
    }
    return result;
  }

  private generateOperations(eClass: EClass): string {
    let result = '';
    for (const eop of eClass.getEOperations()) {
      result += DU.eopSignature(eop) + ';';
    }
    return result;
  }
}
