// dgenerator-main-safe.ts
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
import { Environment, ConditionalImports } from '../utils/environment';

/**
 * Exposes source code generation for use as a Grunt task.
 * Only available in Node.js environment.
 * @param pkg
 * @param outDir
 * @param overwriteImpl
 */
export async function generate(
  pkg: EPackage,
  outDir: string,
  overwriteImpl: boolean
): Promise<void> {
  Environment.requireNodeEnvironment('Code generation');
  
  const generator = new DGeneratorMain(pkg, outDir, overwriteImpl);
  await generator.generate();
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

  // Cached Node.js modules (loaded once per instance)
  private fs: any = null;
  private path: any = null;
  private childProcess: any = null;

  public constructor(
    public pkg: EPackage,
    public outDir: string,
    public overwriteImpl?: boolean,
    public barrelFileDir?: string
  ) {
    // Initialize directories without file system operations
    this.pkgOutDir = this.outDir + (pkg.getName() ? '/' + pkg.getName() : '');
    this.pkgRootOutDir = this.pkgOutDir;
    this.pkgApiOutDir = this.pkgOutDir + DU.API_PATH;
    this.pkgGenOutDir = this.pkgOutDir + DU.GEN_PATH;
    this.pkgImplOutDir = this.pkgOutDir + DU.IMPL_PATH;
    
    // Note: barrelFileOutDir will be set during generate() when path is available
  }

  /**
   * Generates typescript sourcecode for all packages, recursing all subpackages.
   * Only available in Node.js environment.
   */
  public async generate(): Promise<void> {
    Environment.requireNodeEnvironment('Code generation');

    // Load Node.js modules
    await this.ensureNodeModulesLoaded();

    // Now we can resolve directories and create them
    await this.initializeDirectories();

    // Generate all the files
    if (this.barrelFileDir) await this.writeBarrelFile();
    await this.writePackageFile();
    await this.writeFactoryFile();
    await this.writeUtilsFile();
    
    for (const eClassifier of this.pkg.getEClassifiers()) {
      if (eClassifier instanceof EClassImpl) {
        await this.generateAllEClassArtifacts(eClassifier);
      } else if (eClassifier instanceof EEnumImpl) {
        await this.writeEnumFile(eClassifier);
      }
    }

    // Deal with recursive subpackages
    for (const subpackage of this.pkg.getESubPackages()) {
      const subGenerator = new DGeneratorMain(
        subpackage,
        this.pkgRootOutDir,
        this.overwriteImpl
      );
      await subGenerator.generate();
    }

    // Finally... format the source code with prettier
    await this.tryFormatWithPrettier();
  }

  public async generateAllEClassArtifacts(eClassifier: EClass): Promise<void> {
    this.setupEClassImports(eClassifier);
    await this.writeEClassApiFile(eClassifier);
    await this.writeEClassGenFile(eClassifier);
    await this.writeEClassImplFile(eClassifier);
  }

  /**
   * Check if code generation is supported in current environment
   */
  public static isGenerationSupported(): boolean {
    return Environment.isNode;
  }

  /**
   * Get list of supported operations in current environment
   */
  public static getSupportedOperations(): string[] {
    const operations = ['In-memory generation'];
    
    if (Environment.isNode) {
      operations.push(
        'File-based generation',
        'Directory creation',
        'Prettier formatting',
        'Recursive package processing'
      );
    }
    
    return operations;
  }

  // ======================================================================
  // Private methods

  private async ensureNodeModulesLoaded(): Promise<void> {
    if (!this.fs) {
      this.fs = await ConditionalImports.getNodeModule('fs');
    }
    if (!this.path) {
      this.path = await ConditionalImports.getNodeModule('path');
    }
    // childProcess is loaded on-demand in tryFormatWithPrettier
  }

  private async initializeDirectories(): Promise<void> {
    // Now we can use path operations
    this.pkgRootOutDir = await this.resolveAndMaybeCreateDir(this.pkgOutDir, false);
    this.pkgApiOutDir = await this.resolveAndMaybeCreateDir(
      this.pkgOutDir + DU.API_PATH,
      true
    );
    this.pkgGenOutDir = await this.resolveAndMaybeCreateDir(
      this.pkgOutDir + DU.GEN_PATH,
      true
    );
    this.pkgImplOutDir = await this.resolveAndMaybeCreateDir(
      this.pkgOutDir + DU.IMPL_PATH,
      false
    );
    
    if (this.barrelFileDir) {
      this.barrelFileOutDir = this.path.resolve(__dirname, this.barrelFileDir);
    }
  }

  private async writeBarrelFile(): Promise<void> {
    const generator = new DGeneratorBarrelIndexTs();
    const content = generator.generate(this.pkg);
    await this.writeSourceFile(this.barrelFileOutDir, 'index.ts', content, true);
  }

  private async writePackageFile(): Promise<void> {
    const fileName = DU.genPackageFileName(this.pkg);
    const generator = new DGeneratorPackage();
    const content = generator.generatePackageContents(this.pkg);
    await this.writeSourceFile(this.pkgRootOutDir, fileName + '.ts', content, true);
  }

  private async writeFactoryFile(): Promise<void> {
    const fileName = DU.genFactoryFileName(this.pkg);
    const generator = new DGeneratorFactory();
    const content = generator.generateFactoryContents(this.pkg);
    await this.writeSourceFile(this.pkgRootOutDir, fileName + '.ts', content, true);
  }

  private async writeUtilsFile(): Promise<void> {
    const fileName = DU.genUtilsFileName(this.pkg);
    const generator = new DGeneratorUtils();
    const content = generator.generateUtilsContents(this.pkg);
    await this.writeSourceFile(this.pkgRootOutDir, fileName + '.ts', content, false);
  }

  private setupEClassImports(eClass: EClass): void {
    // Determines the set of types that needs to be imported to support the EClass
    this.eClassApiImports = new Set<EClassifier>();
    this.eClassGenImports = new Set<EClassifier>();
    this.eClassPkgImports = new Set<EPackage>();
    this.collectEClassImports(this.pkg, eClass);
  }

  private async writeEClassApiFile(eClass: EClass): Promise<void> {
    const apiGenerator = new DGeneratorApi();
    const tsInterfaceContent = apiGenerator.generate(
      eClass,
      this.eClassApiImports
    );
    const filename = DU.genClassApiName(eClass);
    await this.writeSourceFile(
      this.pkgApiOutDir,
      filename + '.ts',
      tsInterfaceContent,
      true
    );
  }

  private async writeEClassGenFile(eClass: EClass): Promise<void> {
    const genGenerator = new DGeneratorGen();
    const tsGenClassContent = genGenerator.generate(
      eClass,
      this.eClassApiImports,
      this.eClassGenImports,
      this.eClassPkgImports
    );
    const filename = DU.genClassGenName(eClass);
    await this.writeSourceFile(
      this.pkgGenOutDir,
      filename + '.ts',
      tsGenClassContent,
      true
    );
  }

  private async writeEClassImplFile(eClass: EClass): Promise<void> {
    const implGenerator = new DGeneratorImpl();
    const tsImplClassContent = implGenerator.generate(
      eClass,
      this.eClassApiImports
    );
    const filename = DU.genClassImplName(eClass);
    await this.writeSourceFile(
      this.pkgImplOutDir,
      filename + '.ts',
      tsImplClassContent,
      this.overwriteImpl
    );
  }

  private async writeEnumFile(eclassifier: EEnum): Promise<void> {
    const enumGenerator = new DGeneratorEnum();
    const enumContent = enumGenerator.generate(eclassifier);
    await this.writeSourceFile(
      this.pkgApiOutDir,
      DU.genClassApiName(eclassifier) + '.ts',
      enumContent,
      true
    );
  }

  private async resolveAndMaybeCreateDir(outDir: string, deleteAllInDir: boolean): Promise<string> {
    await this.ensureNodeModulesLoaded();
    
    const resolvedOutDir = this.path.resolve(__dirname, outDir);
    
    if (this.fs.existsSync(resolvedOutDir)) {
      if (deleteAllInDir) {
        await this.deleteFilesInFolder(resolvedOutDir);
      }
    } else {
      this.fs.mkdirSync(resolvedOutDir, { recursive: true });
    }
    
    return outDir;
  }

  /**
   * Traverses entire EClass structure and collects the set of types that need
   * to be imported, including API, Gen and EPackage instances.
   */
  private collectEClassImports(pkg: EPackage, eClass: EClass): void {
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
        // make sure to import any parameter type, if necessary
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
  ): void {
    if (candidate instanceof EClassImpl || candidate instanceof EEnumImpl) {
      if (candidate.getEPackage() !== thisPackage) {
        this.eClassPkgImports.add(candidate.getEPackage());
      }
      if (!this.eClassApiImports.has(candidate) && candidate !== thisEClass) {
        // Ecore types are imported for everything
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
   * @param overwrite
   */
  private async writeSourceFile(
    outDir: string,
    filename: string,
    content: string,
    overwrite: boolean
  ): Promise<void> {
    await this.ensureNodeModulesLoaded();
    
    const filePath = this.path.resolve(__dirname, outDir + '/' + filename);
    
    if (overwrite || !this.fs.existsSync(filePath)) {
      this.fs.writeFileSync(filePath, content, 'utf8');
    }
  }

  private async deleteFilesInFolder(directoryPath: string): Promise<void> {
    await this.ensureNodeModulesLoaded();
    
    try {
      const files = this.fs.readdirSync(directoryPath);
      for (const file of files) {
        try {
          this.fs.unlinkSync(this.path.join(directoryPath, file));
        } catch (err) {
          // Swallow individual file deletion errors as per original logic
          console.warn(`Failed to delete file ${file}:`, err);
        }
      }
    } catch (err) {
      console.warn(`Failed to read directory ${directoryPath}:`, err);
    }
  }

  private async tryFormatWithPrettier(): Promise<void> {
    try {
      if (!this.childProcess) {
        this.childProcess = await ConditionalImports.getNodeModule('child_process');
      }
      
      // Format main output directory
      const mainPath = this.path.resolve(__dirname, this.outDir);
      this.childProcess.execSync(`prettier --write "${mainPath}"`);
      
      // Format barrel file directory if it exists
      if (this.barrelFileDir) {
        const barrelPath = this.path.resolve(__dirname, this.barrelFileOutDir);
        this.childProcess.execSync(`prettier --write "${barrelPath}"`);
      }
    } catch (error) {
      console.warn('Prettier formatting skipped:', (error as Error).message);
      console.warn('Make sure prettier is installed: npm install -g prettier');
    }
  }
}
