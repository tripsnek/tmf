import * as FS from 'fs';
import * as PATH from 'path';
import { EPackage } from '../metamodel/epackage';
import { EClassifier } from '../metamodel/eclassifier';
import { EClass } from '../metamodel/eclass';
import { EReference } from '../metamodel/ereference';
import { EEnum } from '../metamodel/eenum';
import { DGeneratorPackage } from './dgenerator-package';
import { DGeneratorFactory } from './dgenerator-factory';
import { DGeneratorUtils } from './dgenerator-utils';
import { DGeneratorGen } from './dgenerator-gen';
import { DGeneratorApi } from './dgenerator-api';
import { DGeneratorImpl } from './dgenerator-impl';
import { DGeneratorEnum } from './dgenerator-enum';
import { TGenUtils as DU } from './tgen-utils';
import { EcorePackage } from '../metamodel/ecorepackage';
import { DGeneratorBarrelIndexTs } from './dgenerator-barrel-index';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EReferenceImpl } from '../metamodel/ereference-impl';
import { EEnumImpl } from '../metamodel/eenum-impl';
/**
 * Exposes source code generation for use as a Grunt task.
 * @param pkg
 * @param outDir
 * @param overwriteImpl
 */
export function generate(
  pkg: EPackage,
  outDir: string,
  overwriteImpl: boolean
) {
  return new DGeneratorMain(pkg, outDir, overwriteImpl).generate();
}

/**
 * Generates TypeScript source code for an EPackage and all subpackages, including
 * the following artifacts:
 *  (1) *-package.ts for each EPackage (see TMFPackageSourceGenerator.ts)
 *  (2) *-factory.ts for each EPackage (see TMFFactorySourceGenerator.ts)
 *  (3) API interfaces (see TMFApiSourceGenerator.ts)
 *  (4) Abstract *Gen.ts classes (see TMFGenSourceGenerator.ts)
 *  (5) Overwritable *Impl.ts classes (see TMFImplSourceGenerator.ts)
 *  (6) Enums (see TMFEnumSourceGenerator.ts)
 */
export class DGeneratorMain {
  // NOTE: These 5 are all constants computed during initialization
  public barrelFileOutDir!: string;
  public pkgOutDir: string;
  public pkgRootOutDir: string;
  public pkgApiOutDir: string;
  public pkgGenOutDir: string;
  public pkgImplOutDir: string;
  // NOTE: These 3 are recomputed for each EClass!
  private eClassApiImports!: Set<EClassifier>;
  private eClassGenImports!: Set<EClassifier>;
  private eClassPkgImports!: Set<EPackage>;

  public constructor(
    public pkg: EPackage,
    public outDir: string,
    public overwriteImpl?: boolean,
    public barrelFileDir?: string
  ) {
    this.pkgOutDir = this.outDir + (pkg.getName() ? '/' + pkg.getName() : '');
    this.pkgRootOutDir = this.resolveAndMaybeCreateDir(this.pkgOutDir, false);
    this.pkgApiOutDir = this.resolveAndMaybeCreateDir(
      this.pkgOutDir + DU.API_PATH,
      true
    );
    this.pkgGenOutDir = this.resolveAndMaybeCreateDir(
      this.pkgOutDir + DU.GEN_PATH,
      true
    );
    this.pkgImplOutDir = this.resolveAndMaybeCreateDir(
      this.pkgOutDir + DU.IMPL_PATH,
      false
    );
    if (barrelFileDir)
      this.barrelFileOutDir = PATH.resolve(__dirname, barrelFileDir);
  }

  /**
   * Generates typescript sourcecode for all packages, recursing all subpackages.
   * @param pkg
   */
  public generate(): void {
    if (this.barrelFileDir) this.writeBarrelFile();
    this.writePackageFile();
    this.writeFactoryFile();
    this.writeUtilsFile();
    for (const eClassifier of this.pkg.getEClassifiers()) {
      if (eClassifier instanceof EClassImpl) {
        this.generateAllEClassArtifacts(eClassifier);
      } else if (eClassifier instanceof EEnumImpl) {
        this.writeEnumFile(eClassifier);
      }
    }

    // Deal with recursive subpackages
    for (const subpackage of this.pkg.getESubPackages()) {
      const subGenerator = new DGeneratorMain(
        subpackage,
        this.pkgRootOutDir,
        this.overwriteImpl
      );
      subGenerator.generate();
    }

    // Finally... format the source code with prettier
    // NOTE: This requires prettier installed locally ('npm install -g prettier')
    const execSync = require('child_process').execSync;
    execSync('prettier --write ' + PATH.resolve(__dirname, this.outDir));
    if (this.barrelFileDir)
      execSync(
        'prettier --write ' + PATH.resolve(__dirname, this.barrelFileOutDir)
      );
  }

  public generateAllEClassArtifacts(eClassifier: EClass) {
    this.setupEClassImports(eClassifier);
    this.writeEClassApiFile(eClassifier);
    this.writeEClassGenFile(eClassifier);
    this.writeEClassImplFile(eClassifier);
  }

  private writeBarrelFile(): void {
    const generator = new DGeneratorBarrelIndexTs();
    const content = generator.generate(this.pkg);
    this.writeSourceFile(this.barrelFileOutDir, 'index.ts', content, true);
  }

  private writePackageFile(): void {
    const fileName = DU.genPackageFileName(this.pkg);
    const generator = new DGeneratorPackage();
    const content = generator.generatePackageContents(this.pkg);
    this.writeSourceFile(this.pkgRootOutDir, fileName + '.ts', content, true);
  }

  private writeFactoryFile(): void {
    const fileName = DU.genFactoryFileName(this.pkg);
    const generator = new DGeneratorFactory();
    const content = generator.generateFactoryContents(this.pkg);
    this.writeSourceFile(this.pkgRootOutDir, fileName + '.ts', content, true);
  }

  private writeUtilsFile(): void {
    const fileName = DU.genUtilsFileName(this.pkg);
    const generator = new DGeneratorUtils();
    const content = generator.generateUtilsContents(this.pkg);
    this.writeSourceFile(this.pkgRootOutDir, fileName + '.ts', content, false);
  }

  private setupEClassImports(eClass: EClass): void {
    //Determines the set of types that needs to be imported to support the EClass
    this.eClassApiImports = new Set<EClassifier>();
    this.eClassGenImports = new Set<EClassifier>();
    this.eClassPkgImports = new Set<EPackage>();
    this.collectEClassImports(this.pkg, eClass);
  }

  private writeEClassApiFile(eClass: EClass): void {
    const apiGenerator = new DGeneratorApi();
    const tsInterfaceContent = apiGenerator.generate(
      eClass,
      this.eClassApiImports
    );
    let filename = DU.genClassApiName(eClass);
    this.writeSourceFile(
      this.pkgApiOutDir,
      filename + '.ts',
      tsInterfaceContent,
      true
    );
  }

  private writeEClassGenFile(eClass: EClass): void {
    const genGenerator = new DGeneratorGen();
    const tsGenClassContent = genGenerator.generate(
      eClass,
      this.eClassApiImports,
      this.eClassGenImports,
      this.eClassPkgImports
    );
    const filename = DU.genClassGenName(eClass);
    this.writeSourceFile(
      this.pkgGenOutDir,
      filename + '.ts',
      tsGenClassContent,
      true
    );
  }

  private writeEClassImplFile(eClass: EClass): void {
    const implGenerator = new DGeneratorImpl();
    const tsImplClassContent = implGenerator.generate(
      eClass,
      this.eClassApiImports
    );
    const filename = DU.genClassImplName(eClass);
    this.writeSourceFile(
      this.pkgImplOutDir,
      filename + '.ts',
      tsImplClassContent,
      this.overwriteImpl
    );
  }

  private writeEnumFile(eclassifier: EEnum): void {
    const enumGenerator = new DGeneratorEnum();
    const enumContent = enumGenerator.generate(eclassifier);
    this.writeSourceFile(
      this.pkgApiOutDir,
      DU.genClassApiName(eclassifier) + '.ts',
      enumContent,
      true
    );
  }

  //======================================================================
  // Private helper functions

  private resolveAndMaybeCreateDir(outDir: string, deleteAllInDir: boolean) {
    // console.log('Attempting to make dir ' + outDir);
    const resolvedOutDir = PATH.resolve(__dirname, outDir);
    if (FS.existsSync(resolvedOutDir)) {
      if (deleteAllInDir) this.deleteFilesInFolder(resolvedOutDir);
    } else {
      FS.mkdirSync(resolvedOutDir);
    }
    return outDir;
  }

  /**
   * Traverses entire EClass structure and collects the set of types that need
   * to be imported, including API, Gen and EPackage instances.
   */
  private collectEClassImports(pkg: EPackage, eClass: EClass) {
    // Start with importing supertypes
    for (const superType of eClass.getESuperTypes()) {
      this.eClassApiImports.add(superType);
      if (!superType.isInterface()) {
        this.eClassGenImports.add(superType);
      }
    }

    // Add imports to support EStructuralFeatures
    for (const field of eClass.getEAllStructuralFeatures()) {
      this.maybeAddMemberImports(pkg, eClass, field.getEType());
      if (field instanceof EReferenceImpl) {
        if (field.getEOpposite()) {
          this.maybeAddMemberImports(
            pkg,
            eClass,
            field.getEOpposite().getEContainingClass()
          );
        }
      }
    }

    // Add imports to support EOperations
    for (const eop of eClass.getEOperations()) {
      this.maybeAddMemberImports(pkg, eClass, eop.getEType());
      for (const param of eop.getEParameters()) {
        //make sure to import any parameter type, if necessary
        this.maybeAddMemberImports(pkg, eClass, param.getEType());
      }
    }
  }

  /**
   * Possibly adds the type and package of 'etype' to the list of things
   * to import.
   */
  private maybeAddMemberImports(
    thisPackage: EPackage,
    thisEClass: EClass,
    candidate: EClassifier
  ) {
    if (candidate instanceof EClassImpl || candidate instanceof EEnumImpl) {
      if (candidate.getEPackage() !== thisPackage) {
        this.eClassPkgImports.add(candidate.getEPackage());
      }
      if (!this.eClassApiImports.has(candidate) && candidate !== thisEClass) {
        //Ecore types are imported for everything
        if (candidate.getEPackage() !== EcorePackage.eINSTANCE) {
          this.eClassApiImports.add(candidate);
        }
      }
    }
  }

  /**
   * Writes the sourcecode file to the file system.
   * @param outDir
   * @param filename
   * @param content
   */
  private writeSourceFile(
    outDir: string,
    filename: string,
    content: string,
    overwrite: boolean
  ) {
    const path = PATH.resolve(__dirname, outDir + '/' + filename);
    // console.log('writing to ' + path);
    if (overwrite || !FS.existsSync(path)) {
      FS.writeFileSync(path, content, 'utf8');
    }
  }

  private deleteFilesInFolder(directoryPath: string) {
    //this may or may not always fully work, but it swallows errors
    FS.readdirSync(directoryPath).forEach((file, index) => {
      // console.log('deleting ' + file);
      try {
        FS.unlinkSync(PATH.join(directoryPath, file));
      } catch (err) {}
    });
  }
}
