import { EClass } from '../metamodel/eclass';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EPackage } from '../metamodel/epackage';
import { TGenUtils as DU } from './tgen-utils';

/**
 * Source code generation for .ts file that exports external facing
 * APIs for a TMF EPackage.
 *
 */
export class DGeneratorBarrelIndexTs {
  public generate(ePackage: EPackage): string {
    return this.generatePackageContents('', ePackage);
  }

  private generatePackageContents(
    pkgFolderPath: string,
    ePackage: EPackage
  ): string {
    const path = pkgFolderPath + DU.kebabLowerCase(ePackage.getName());
    let toReturn = ``;
    for (const sub of ePackage.getESubPackages()) {
      toReturn += this.generatePackageContents(path + '/', sub);
    }
    toReturn += 
    `export * from './lib/${path}/${DU.genUtilsFileName(ePackage)}';
export * from './lib/${path}/${DU.genPackageFileName(ePackage)}';
export * from './lib/${path}/${DU.genFactoryFileName(ePackage)}';
${this.generateEClassifierExports(ePackage, path)}`;
    return toReturn;
  }

  generateEClassifierExports(ePackage: EPackage, pkgFolderPath: string) {
    let exports = ``;
    for (const eclassifier of ePackage.getEClassifiers()) {
      exports += `export * from './lib/${pkgFolderPath}/api/${DU.genClassApiName(
        eclassifier
      )}';\n`;
      if (eclassifier instanceof EClassImpl) {
        exports += `export * from './lib/${pkgFolderPath}/impl/${DU.genClassImplName(
          eclassifier
        )}';\n`;
        exports += `export * from './lib/${pkgFolderPath}/gen/${DU.genClassGenName(
          eclassifier
        )}';\n`;
      }
    }
    return exports;
  }
}
