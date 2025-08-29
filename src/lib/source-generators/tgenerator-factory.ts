import { EPackage } from '../metamodel/api/epackage.js';
import { EClass } from '../metamodel/api/eclass.js';
import { TGenUtils as DU } from './tgen-utils.js';
import { EClassImpl } from '../metamodel/impl/eclass-impl.js';
import { TGeneratorPackageInitializer } from './tgenerator-package-initializer.js';

/**
 * Generates *-factory.ts files, which provide static access to
 * methods for instantiating data objects for a TMF model.
 */
export class TGeneratorFactory {

  rootPackage!: EPackage;

  /**
   * Single public static method for generating a XXXFactory class.
   * @param pkg
   */
  public generateFactoryContents(pkg: EPackage): string {

    //build path to root package initializer
    const pathToRoot = DU.getPathToRoot(pkg);

    this.rootPackage = pkg;
    while(this.rootPackage.getESuperPackage()) this.rootPackage = this.rootPackage.getESuperPackage();

    return `${this.genGenericImports(pkg)}
${this.genSpecificImports(pkg)}
import { ${TGeneratorPackageInitializer.generateClassName(this.rootPackage)}} from '${pathToRoot}${TGeneratorPackageInitializer.generateFileName(this.rootPackage)}';

export class ${DU.genFactoryClassName(pkg)} implements EFactory {
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
import { ${pkgClassName} } from './${DU.genPackageFileName(pkg)}';`;
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
  public static _eINSTANCE: ${className} = ${className}.init();
  public static init(): ${className} {
    if (!${className}._eINSTANCE) {
      ${className}._eINSTANCE = new ${className}();
    }

    return ${className}._eINSTANCE;
  }
  
  static get eINSTANCE(): ${className} {
    ${TGeneratorPackageInitializer.generateClassName(this.rootPackage)}.registerAll();
    return this._eINSTANCE;
  }
  `;
  
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
  public create(eClass: EClass): EObject {
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