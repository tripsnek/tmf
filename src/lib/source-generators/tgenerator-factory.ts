import { EPackage } from '../metamodel/epackage';
import { EClass } from '../metamodel/eclass';
import { TGenUtils as DU } from './tgen-utils';
import { EClassImpl } from '../metamodel/eclass-impl';

/**
 * Generates *-factory.ts files, which provide static access to
 * methods for instantiating data objects for a TMF model.
 */
export class TGeneratorFactory {
  /**
   * Single public static method for generating a XXXFactory class.
   * @param pkg
   */
  public generateFactoryContents(pkg: EPackage): string {
    return `${this.genGenericImports(pkg)}
${this.genSpecificImports(pkg)}
export class ${DU.genFactoryClassName(pkg)} extends EFactory {
${this.genSingleton(pkg)}
${this.genCreateSwitch(pkg)}
${this.genClassCreators(pkg)}
}
`;
  }

  //======================================================================
  // Private helper methods

  /**
   * Generate a basic set of imports for eCore classes that we expect every
   * Factory is going to need
   * @param pkg
   */
  private genGenericImports(pkg: EPackage): string {
    const pkgClassName = DU.genPackageClassName(pkg);

    return `${DU.DEFAULT_IMPORTS}

import { EReference } from '@tripsnek/tmf';
import { EAttribute } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { ${pkgClassName} } from './${pkg.getName()}-package';`;
  }

  /**
   * Generate a specific set of imports for the interfaces and Impl classes in
   * this model.
   * @param pkg
   */
  private genSpecificImports(pkg: EPackage): string {
    const pkgClassName = DU.genPackageClassName(pkg);
    let result = '';
    if (!(pkgClassName === 'EcorePackage')) {
      for (const eClass of pkg.getEClassifiers()) {
        if (eClass instanceof EClassImpl && !eClass.isAbstract()) {
          result += `
import { ${eClass.getName()} } from './api/${DU.genClassApiName(
            eClass
          )}';
import { ${eClass.getName()}Impl } from './impl/${DU.genClassImplName(
            eClass
          )}';`;
        }
      }
    }
    return result;
  }

  /**
   * Generate the singleton eINSTANCE for this model's factory class.
   * @param pkg
   */
  private genSingleton(pkg: EPackage): string {
    const className = DU.genFactoryClassName(pkg);
    const pkgClassName = DU.genPackageClassName(pkg);
    return `  /* Singleton */
  public static eINSTANCE: ${className} = ${className}.init();
  public static init(): ${className} {
    if (!${className}.eINSTANCE) {
      ${className}.eINSTANCE = new ${className}();
    }

    //inject the factory instance into the package, so that it can be retrieved reflectively
    ${pkgClassName}.eINSTANCE.setEFactoryInstance(this.eINSTANCE);
    return ${className}.eINSTANCE;
  }`;
  }

  /**
   * Generate the generic create() method for this factory that switches on
   * EClass to call the right specific creator method.
   * @param pkg
   */
  private genCreateSwitch(pkg: EPackage): string {
    const pkgClassName = DU.genPackageClassName(pkg);
    let result = '';
    if (!(pkgClassName === 'EcorePackage')) {
      result += `
  public create(eClass: EClass): any {
    switch (eClass.getClassifierId()) {`;
      for (const eClass of pkg.getEClassifiers()) {
        if (eClass instanceof EClassImpl && !eClass.isAbstract()) {
          const classCreatorName = 'create' + eClass.getName();
          result += `
      case ${pkgClassName}.${DU.genClassIdFieldName(eClass)}:
        return this.${classCreatorName}();`;
        }
      }
      result += `
      default:
        throw new Error(
          "The class '" + eClass.getName() + "' is not a valid classifier"
        );
    }
  }`;
    }
    return result;
  }

  /**
   * Generate all the class-specific createXXX() methods.
   * @param pkg
   */
  private genClassCreators(pkg: EPackage): string {
    const pkgClassName = DU.genPackageClassName(pkg);
    let result = '';
    if (!(pkgClassName === 'EcorePackage')) {
      for (const eClass of pkg.getEClassifiers()) {
        if (eClass instanceof EClassImpl && !eClass.isAbstract()) {
          result += `

  public create${eClass.getName()}(): ${eClass.getName()} {
    return new ${eClass.getName()}Impl();
  }`;
        }
      }
    }
    return result;
  }
}