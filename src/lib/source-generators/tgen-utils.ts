import { EPackage } from '../metamodel/api/epackage.js';
import { EClass } from '../metamodel/api/eclass.js';
import { EClassifier } from '../metamodel/api/eclassifier.js';
import { EStructuralFeature } from '../metamodel/api/estructural-feature.js';
import { EOperation } from '../metamodel/api/eoperation.js';
import { TUtils } from '../tutils.js';
import { EcorePackage } from '../metamodel/ecorepackage.js';
import { EDataType } from '../metamodel/api/edata-type.js';
import { EAttributeImpl } from '../metamodel/impl/eattribute-impl.js';
import { EEnumImpl } from '../metamodel/impl/eenum-impl.js';

/**
 * Utility methods used for TMF source code generation, including
 * EPackage/EFactory specializations and individual EClassifier files.
 */
export class TGenUtils {
  //paths to which files are written
  static API_PATH = '/api';
  static GEN_PATH = '/gen';
  static IMPL_PATH = '/impl';

  //imports needed by every api/gen/impl of every EClass
  static DEFAULT_IMPORTS = `import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';`;

  static ECORE_DEFAULT_IMPORTS = `import { EObjectImpl } from '../impl/e-object.js';
      import { EStructuralFeature } from '../api/e-structural-feature.js';
      import { BasicEList } from '../common/basic-e-list.js';
      import { EList } from '../common/e-list.js';
      `;

  /**
   * Generates statements for importing a set of packages into a file residing
   * in the directory of the host package.
   * @param pkgToImport
   * @param host
   */
  public static generateImportStatementsForExternalPackages(
    pkgToImport: Set<EPackage>,
    host: EPackage,
    prefix: string
  ) {
    let pkgImports = '';
    for (const pkgDependency of pkgToImport) {
      //if we need to support importing EcorePackage, need to resolve it's path specially (or use an alias)
      if (pkgDependency !== EcorePackage.eINSTANCE) {
        if (pkgDependency) {
          const pkgName = TGenUtils.genPackageClassName(pkgDependency);

          //for nested package structures (allowable from Ecore)
          let pkgPath = this.getPathToOtherPackage(host, pkgDependency);

          //for packages defined as 'x-data' folders in lib without nesting
          // if (!host.getESuperPackage())
          //   pkgPath = this.getPathToOtherPackageFlat(host, pkgDependency);

          // if packages share a root, use relative imports
          if (host.getRootPackage() === pkgDependency.getRootPackage()) {
            pkgImports += `import { ${pkgName }} from '${prefix}${pkgPath}${this.kebabLowerCase(pkgDependency.getName())}-package.js';`;
          } else {
            console.log('WARNING: CROSS-PACKAGE IMPORTS NOT SUPPORTED');
          }
        }
      }
    }
    return pkgImports;
  }

  /**
   * Generates import statements for the API .ts files for a set of EClassifiers.
   * @param imports
   */
  static genApiImports(
    eclass: EClass,
    toImport: Set<EClassifier>,
    pathToApiDir: string
  ): string {
    let imports = ``;
    //add necessary imports for e.g. EOperations, cross-references and super types
    for (const ec of toImport) {
      if (ec) {
        let genPathToImport = `${pathToApiDir}/${this.genClassApiName(ec)}`;

        //construct path to the type, which may reside in another package
        if (ec.getEPackage() !== eclass.getEPackage()) {
          //if both eclasses are from the same root package, then we use relative paths
          if (ec.getRootPackage() === eclass.getRootPackage()) {
            //traverse from here up to root
            let pathToImport = TGenUtils.getPathToTypeInOtherPkg(eclass, ec);
            // pathToImport += 'api/' + ec.getName();
            pathToImport += `api/${this.genClassApiName(ec)}`;
            genPathToImport = pathToImport;
          }
          // Otherwise, Alternate path-based import from another library
          else {
            console.log('WARNING: CROSS-PACKAGE IMPORTS NOT SUPPORTED');
          }
          // console.log(
          //   eclass.getEPackage().getName() + ' to ' + ec.getEPackage().getName() + ' ' + genPathToImport
          // );
        }

        imports += `import { ${ec.getName()} } from '${genPathToImport}.js';\n`;
      }
    }

    return imports;
  }

  /**
   * Method signature for an EOperation.
   * @param eop
   */
  public static eopSignature(eop: EOperation): string {
    let signature = `${eop.getName()}(`;

    //determine return type
    const returnType = TGenUtils.eopReturnType(eop);

    //add parameters
    let paramInd = 0;
    for (const param of eop.getEParameters()) {
      if (param.getEType()) {
        if (paramInd > 0) signature += ', ';
        let paramType = TUtils.getTypescriptName(param.getEType()!);
        if (param.isMany()) {
          paramType = `EList<${paramType}>`;
        }
        const paramName = param.getName() + (param.isOptional() ? '?' : '');
        signature += `${paramName}: ${paramType}`;
        paramInd++;
      }
    }
    return `${signature}): ${returnType}`;
  }

  public static eopReturnType(eop: EOperation) {
    let returnType = eop.getEType()
      ? TUtils.getTypescriptName(eop.getEType()!)
      : 'void';

    //handle lists
    if (eop.isMany()) {
      returnType = `EList<${returnType}>`;
    }
    return returnType;
  }

  /**
   * Invocation of an EOperation.
   *
   * @param eop
   */
  public static eopInvocation(eop: EOperation): string {
    let signature = `${eop.getName()}(`;
    //add parameters
    let paramInd = 0;
    for (const param of eop.getEParameters()) {
      if (paramInd > 0) signature += ',';
      signature += `${param.getName()}`;
      paramInd++;
    }
    return `${signature})`;
  }

  public static genGenClassName(eclass: EClass) {
    return eclass.getName() + 'Gen';
  }

  public static genImplClassName(eclass: EClass) {
    return eclass.getName() + 'Impl';
  }

  /**
   * Method name for feature setter.
   * @param f
   */
  public static setterName(f: EStructuralFeature): string {
    return 'set' + TGenUtils.capitalize(f.getName());
  }

  public static basicSetterName(f: EStructuralFeature): string {
    return `basic${TGenUtils.capitalize(TGenUtils.setterSig(f))}`;
  }

  /**
   * Method name for feature getter.
   * @param f
   */
  public static getterName(f: EStructuralFeature) {
    return (
      (f.getEType()?.getName() === 'EBoolean' ? 'is' : 'get') +
      TGenUtils.capitalize(f.getName())
    );
  }

  /**
   * Method signature for feature setter.
   * @param f
   */
  public static setterSig(f: EStructuralFeature) {
    return `${TGenUtils.setterName(f)}(${TGenUtils.setterParamName(
      f
    )}: ${TGenUtils.getTypeName(f)}): void`;
  }

  /**
   * Method signature for feature basic setter.
   * @param f
   */
  public static basicSetterSig(f: EStructuralFeature) {
    return `${TGenUtils.basicSetterName(f)}(${TGenUtils.setterParamName(
      f
    )}: ${TGenUtils.getTypeName(f)}): void`;
  }

  public static setterParamName(f: EStructuralFeature) {
    return `new${TGenUtils.capitalize(f.getName())}`;
  }

  /**
   * Method signature for feature getter.
   * @param f
   */
  public static getterSig(f: EStructuralFeature) {
    return `${TGenUtils.getterName(f)}(): ${TGenUtils.getTypeName(f)}`;
  }

  /**
   * Gets the name of the data type for the given feature.
   * @param f
   */
  public static getTypeName(f: EStructuralFeature): string {
    let typeName = f.getEType()?.getName ? f.getEType()?.getName() : 'any';
    if (f instanceof EAttributeImpl) {
      if (f.getEType() instanceof EEnumImpl) {
        typeName = f.getEType()?.getName();
      } else {
        typeName = TUtils.toTypeScriptPrimitive(f.getEType()!);
      }
    }
    if (f.isMany()) {
      typeName = `EList<${typeName}>`;
    }
    return typeName!;
  }

  //======================================================================
  // Basic string manipulation for naming (e.g., casing)

  /**
   * Capitalizes the first letter of the given string.
   * @param s
   */
  public static capitalize(s: string): string {
    return !s ? '' : s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * First letter to lower case.
   * @param s
   */
  public static uncapitalize(s: string): string {
    return !s ? '' : s.charAt(0).toLowerCase() + s.slice(1);
  }

  /**
   * Converts the string to snake case (with underscores preceding
   * upper letters), and then to all upper case.
   *
   * @param str
   */
  static snakeUpperCase(str: string): string {
    let converted = str
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .toUpperCase();
    if (converted.startsWith('_')) {
      converted = converted.substring(1);
    }
    return converted;
  }

  /**
   * Converts the string to kebab case (with dashes preceding
   * upper letters), and then to all lower case.
   *
   * @param str
   */
  static kebabLowerCase(str: string): string {
    let converted = str
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .toLowerCase();
    if (converted.startsWith('-')) {
      converted = converted.substring(1);
    }
    return converted;
  }

  //======================================================================
  // Generate specific package, class, and/or field -associated names

  /**
   * Generates camel-case class name from original '-'separated package name
   * with some optional suffix (like 'Factory' or 'Package') tacked on.
   * @param pkg
   * @param suffix
   */
  private static genPkgClassName(pkg: EPackage, suffix: string): string {
    if (!pkg) return 'ErrorNoSuchPackage' + suffix;
    const pkgNameParts = pkg.getName().split('-').map(this.capitalize);
    pkgNameParts.push(suffix);
    return pkgNameParts.join('');
  }

  public static genPackageClassName(pkg: EPackage): string {
    return this.genPkgClassName(pkg, 'Package');
  }

  public static genPackageFileName(pkg: EPackage): string {
    return this.kebabLowerCase(pkg.getName()) + '-package';
  }
  public static genUtilsFileName(pkg: EPackage): string {
    return this.kebabLowerCase(pkg.getName()) + '-utils';
  }

  public static genFactoryClassName(pkg: EPackage): string {
    return this.genPkgClassName(pkg, 'Factory');
  }

  public static genFactoryFileName(pkg: EPackage): string {
    return this.kebabLowerCase(pkg.getName()) + '-factory';
  }

  public static genClassApiName(eClass: EClassifier, async?: boolean): string {
    return this.kebabLowerCase(eClass.getName()) + (async ? '-async' : '');
  }

  public static genClassGenName(eClass: EClass, async?: boolean): string {
    return (
      this.kebabLowerCase(eClass.getName()) + '-gen' + (async ? '-async' : '')
    );
  }

  public static genClassImplName(eClass: EClass): string {
    return this.kebabLowerCase(eClass.getName()) + '-impl';
  }

  public static genClassIdFieldName(eclassifier: EClassifier): string {
    return this.snakeUpperCase(eclassifier.getName());
  }

  public static genFeatureIdFieldName(feature: EStructuralFeature): string {
    return (
      this.snakeUpperCase(feature.getEContainingClass().getName()) +
      '__' +
      this.snakeUpperCase(feature.getName())
    );
  }

  public static genOperationIdFieldName(feature: EOperation): string {
    return (
      this.snakeUpperCase(feature.getEContainingClass().getName()) +
      '__' +
      this.snakeUpperCase(feature.getName())
    );
  }

  public static genFeatureCountFieldName(eclass: EClass): string {
    return this.snakeUpperCase(eclass.getName()) + '_FEATURE_COUNT';
  }

  public static genFeatureGetterName(feature: EStructuralFeature): string {
    const className = feature.getEContainingClass().getName();
    const featureName = this.capitalize(feature.getName());
    return `get${className}_${featureName}`;
  }

  public static genOperationGetterName(feature: EOperation): string {
    const className = feature.getEContainingClass().getName();
    const featureName = this.capitalize(feature.getName());
    return `get${className}_${featureName}`;
  }

  public static genEdataTypeGetter(feature: EDataType): string {
    return `EcorePackage.eINSTANCE.get${this.capitalize(feature.getName())}()`;
  }

  public static genEclassGetterName(eclassifier: EClassifier): string {
    const getter = 'get' + this.capitalize(eclassifier.getName());
    return getter;
  }

  //======================================================================

  /**
   * Generates reference to the package instance for the 'to' EClass, and
   * registers it as a package to import if it is different from that
   * of the 'from' EClass.
   *
   * @param to
   * @param from
   * @param pkgToImport
   */
  public static getReferenceToPackageInstance(
    to: EClassifier,
    from: EClassifier,
    pkgToImport: Set<EPackage>
  ) {
    let pkgRef = 'this';
    //handle inheritance from objects in other packages
    if (to.getEPackage() !== from.getEPackage()) {
      pkgToImport.add(to.getEPackage());
      pkgRef = TGenUtils.genPackageClassName(to.getEPackage()) + '.eINSTANCE';
    }
    return pkgRef;
  }

  public static getPathToRoot(pkg: EPackage) {
    let pathToRoot = './';
    if (pkg.getESuperPackage()) {
      let cursor = pkg;
      pathToRoot = '';
      while (cursor.getESuperPackage()) {
        pathToRoot += '../';
        cursor = cursor.getESuperPackage();
      }
    }
    return pathToRoot;
  }


  //======================================================================
  // File/path related methods (TODO: Should use imported PATH library???)

  /**
   * Computes the import path necessary to resolve an EClass in a different
   * package.
   * @param fromClass
   * @param toClass
   */
  public static getPathToTypeInOtherPkg(
    fromClass: EClass,
    toClass: EClassifier
  ) {
    //TODO: If cross-package references are not being correctly computed, it
    //may be because eclass.setEPackage is not being called during Ecore parsing.
    //Correct fix would be for this to be set as part of a proper inverse
    //reference with EPackage.eclassifiers
    const fromPackage = fromClass.getEPackage();
    const toPackage = toClass.getEPackage();

    //for nested package structures (allowable from Ecore)
    if (fromPackage.getESuperPackage())
      return '../' + this.getPathToOtherPackage(fromPackage, toPackage);

    //for packages defined as 'x-data' folders in lib without nesting
    return '../' + this.getPathToOtherPackageFlat(fromPackage, toPackage);
  }
  public static getPathToOtherPackageFlat(
    fromPackage: EPackage,
    toPackage: EPackage
  ): string {
    const pkgName = toPackage ? toPackage.getName() : 'PackageNotFound';
    console.log('WARNING: CROSS-PACKAGE IMPORTS NOT SUPPORTED');
    return `'${this.kebabLowerCase(pkgName)}'`;
  }

  public static getPathToOtherPackage(
    fromPackage: EPackage,
    toPackage: EPackage
  ): string {
    let pathToImport = '';
    let cursor = fromPackage;
    while (cursor.getESuperPackage()) {
      pathToImport += '../';
      cursor = cursor.getESuperPackage();
    }

    //and back down to the element to be imported
    const pathDown = new Array<EPackage>();
    cursor = toPackage;
    while (cursor.getESuperPackage()) {
      pathDown.unshift(cursor);
      cursor = cursor.getESuperPackage();
    }
    for (const pathPkg of pathDown) {
      pathToImport += pathPkg.getName() + '/';
    }
    return pathToImport;
  }

  public static inSameLib(eclass1: EClass, eclass2: EClass): boolean {
    return eclass1.getRootPackage() === eclass2.getRootPackage();
  }
}
