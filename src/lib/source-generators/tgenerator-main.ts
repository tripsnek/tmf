import { EPackage } from '../metamodel/api/epackage';
import { EClassifier } from '../metamodel/api/eclassifier';
import { EClass } from '../metamodel/api/eclass';
import { EEnum } from '../metamodel/api/eenum';
import { TGeneratorPackage } from './tgenerator-package.js';
import { TGeneratorFactory } from './tgenerator-factory.js';
import { TGeneratorUtils } from './tgenerator-utils.js';
import { TGeneratorGen } from './tgenerator-gen.js';
import { TGeneratorApi } from './tgenerator-api.js';
import { TGeneratorImpl } from './tgenerator-impl.js';
import { TGeneratorEnum } from './tgenerator-enum.js';
import { TGenUtils as DU } from './tgen-utils.js';
import { EcorePackage } from '../metamodel/ecorepackage';
import { TGeneratorBarrelIndexTs } from './tgenerator-barrel-index.js';
import { EClassImpl } from '../metamodel/impl/eclass-impl.js';
import { EReferenceImpl } from '../metamodel/impl/ereference-impl.js';
import { EEnumImpl } from '../metamodel/impl/eenum-impl.js';
import { Environment, ConditionalImports } from '../utils/environment';
import { TGeneratorPackageInitializer } from './tgenerator-package-initializer.js';
import { EOperation } from '../metamodel/api/eoperation';
import { BasicEList } from '../metamodel/basicelist';
import { EList } from '../metamodel/api/elist';

// Debug flag - set to true to enable detailed logging
const DEBUG = false;

// Debug logging utility
const debug = {
  log: (message: string, ...args: any[]) => {
    if (DEBUG) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  time: (label: string) => {
    if (DEBUG) {
      console.time(`[DEBUG] ${label}`);
    }
  },
  timeEnd: (label: string) => {
    if (DEBUG) {
      console.timeEnd(`[DEBUG] ${label}`);
    }
  },
  group: (label: string) => {
    if (DEBUG) {
      console.group(`[DEBUG] ${label}`);
    }
  },
  groupEnd: () => {
    if (DEBUG) {
      console.groupEnd();
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (DEBUG) {
      console.warn(`[DEBUG WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    if (DEBUG) {
      console.error(`[DEBUG ERROR] ${message}`, ...args);
    }
  },
};

/**
 * Exposes source code generation. Only available in Node.js environment.
 * @param pkg
 * @param outDir
 * @param overwriteImpl
 */
export async function generate(
  pkg: EPackage,
  outDir: string,
  overwriteImpl: boolean
): Promise<void> {
  debug.time('Total Generation Time');
  debug.log(
    'Starting code generation for package:',
    pkg.getName() || 'unnamed package'
  );
  debug.log('Output directory:', outDir);
  debug.log('Overwrite implementation files:', overwriteImpl);

  Environment.requireNodeEnvironment('Code generation');

  const generator = new TGeneratorMain(pkg, outDir, overwriteImpl);
  await generator.generate();

  debug.timeEnd('Total Generation Time');
  debug.log('Code generation completed successfully');
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
export class TGeneratorMain {
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
    public overwriteImpl: boolean = false,
    public barrelFileDir?: string
  ) {
    debug.log(
      'Initializing TGeneratorMain for package:',
      pkg.getName() || 'unnamed'
    );
    debug.log('Constructor parameters:', {
      packageName: pkg.getName(),
      outDir,
      overwriteImpl,
      barrelFileDir,
    });

    // Initialize directories without file system operations
    this.pkgOutDir = this.outDir + (pkg.getName() ? '/' + pkg.getName() : '');
    this.pkgRootOutDir = this.pkgOutDir;
    this.pkgApiOutDir = this.pkgOutDir + DU.API_PATH;
    this.pkgGenOutDir = this.pkgOutDir + DU.GEN_PATH;
    this.pkgImplOutDir = this.pkgOutDir + DU.IMPL_PATH;

    debug.log('Computed directory paths:', {
      pkgOutDir: this.pkgOutDir,
      pkgRootOutDir: this.pkgRootOutDir,
      pkgApiOutDir: this.pkgApiOutDir,
      pkgGenOutDir: this.pkgGenOutDir,
      pkgImplOutDir: this.pkgImplOutDir,
    });

    // Note: barrelFileOutDir will be set during generate() when path is available
  }

  /**
   * Generates typescript sourcecode for all packages, recursing all subpackages.
   * Only available in Node.js environment.
   */
  public async generate(attemptFormatWithPrettier?: boolean): Promise<void> {
    debug.time(`Generation for package: ${this.pkg.getName() || 'unnamed'}`);
    debug.group(`Generating package: ${this.pkg.getName() || 'unnamed'}`);

    Environment.requireNodeEnvironment('Code generation');

    // Load Node.js modules
    debug.log('Loading Node.js modules...');
    await this.ensureNodeModulesLoaded();

    // Now we can resolve directories and create them
    debug.log('Initializing directories...');
    await this.initializeDirectories();

    // Count classifiers for debug info
    const classifiers = this.pkg.getEClassifiers();
    const eClasses = classifiers.filter((c) => c instanceof EClassImpl);
    const eEnums = classifiers.filter((c) => c instanceof EEnumImpl);
    const subpackages = this.pkg.getESubPackages();

    debug.log('Package contents:', {
      totalClassifiers: classifiers.size(),
      eClasses: eClasses.size(),
      eEnums: eEnums.size(),
      subpackages: subpackages.size(),
    });

    // Generate all the files
    debug.log('Generating core files...');
    if (this.barrelFileDir) {
      debug.log('Writing barrel file...');
      await this.writeBarrelFile();
    }

    debug.log('Writing package file...');
    await this.writePackageFile();

    debug.log('Writing factory file...');
    await this.writeFactoryFile();

    debug.log('Writing utils file...');
    await this.writeUtilsFile();

    // Add this new section:
    debug.log('Writing package initializer file...');
    await this.writePackageInitializerFile();
    

    // Generate EClass artifacts
    debug.log(`Processing ${eClasses.size()} EClass(es)...`);
    for (const eClassifier of classifiers) {
      if (eClassifier instanceof EClassImpl) {
        debug.log(`Generating artifacts for EClass: ${eClassifier.getName()}`);
        await this.generateAllEClassArtifacts(eClassifier);
      } else if (eClassifier instanceof EEnumImpl) {
        debug.log(`Generating enum file for: ${eClassifier.getName()}`);
        await this.writeEnumFile(eClassifier);
      }
    }

    // Deal with recursive subpackages
    debug.log(`Processing ${subpackages.size()} subpackage(s)...`);
    for (const subpackage of subpackages) {
      debug.log(`Recursively generating subpackage: ${subpackage.getName()}`);
      const subGenerator = new TGeneratorMain(
        subpackage,
        this.pkgRootOutDir,
        this.overwriteImpl
      );
      await subGenerator.generate();
    }

    // Finally... format the source code with prettier
    if (attemptFormatWithPrettier) {
      debug.log('Attempting to format code with Prettier...');
      await this.tryFormatWithPrettier();
    }

    debug.groupEnd();
    debug.timeEnd(`Generation for package: ${this.pkg.getName() || 'unnamed'}`);
    debug.log(
      `Completed generation for package: ${this.pkg.getName() || 'unnamed'}`
    );
  }

  public async generateAllEClassArtifacts(eClassifier: EClass): Promise<void> {
    debug.group(`Generating EClass artifacts: ${eClassifier.getName()}`);
    debug.time(`EClass generation: ${eClassifier.getName()}`);

    debug.log('Setting up imports...');
    this.setupEClassImports(eClassifier);

    debug.log('Import analysis results:', {
      apiImports: Array.from(this.eClassApiImports).map((c) => c.getName()),
      genImports: Array.from(this.eClassGenImports).map((c) => c.getName()),
      packageImports: Array.from(this.eClassPkgImports).map((p) => p.getName()),
    });

    debug.log('Writing API file...');
    await this.writeEClassApiFile(eClassifier);

    debug.log('Writing Gen file...');
    await this.writeEClassGenFile(eClassifier);

    debug.log('Writing Impl file...');
    await this.writeEClassImplFile(eClassifier);

    debug.timeEnd(`EClass generation: ${eClassifier.getName()}`);
    debug.groupEnd();
  }

  /**
   * Check if code generation is supported in current environment
   */
  public static isGenerationSupported(): boolean {
    const supported = Environment.isNode;
    debug.log('Generation support check:', supported);
    return supported;
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

    debug.log('Supported operations:', operations);
    return operations;
  }

  // ======================================================================
  // Private methods

  private async ensureNodeModulesLoaded(): Promise<void> {
    debug.log('Loading Node.js modules...');

    if (!this.fs) {
      debug.log('Loading fs module...');
      this.fs = await ConditionalImports.getNodeModule('fs');
    }
    if (!this.path) {
      debug.log('Loading path module...');
      this.path = await ConditionalImports.getNodeModule('path');
    }
    // childProcess is loaded on-demand in tryFormatWithPrettier

    debug.log('Node.js modules loaded successfully');
  }

  private async initializeDirectories(): Promise<void> {
    debug.log('Initializing and creating directories...');

    // Now we can use path operations
    this.pkgRootOutDir = await this.resolveAndMaybeCreateDir(
      this.pkgOutDir,
      false
    );
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
      debug.log('Barrel file output directory set to:', this.barrelFileOutDir);
    }

    debug.log('Directory initialization completed');
  }

  private async writeBarrelFile(): Promise<void> {
    debug.log('Generating barrel file content...');
    const generator = new TGeneratorBarrelIndexTs();
    const content = await generator.generate(this.pkg, this.barrelFileOutDir);
    debug.log('Writing barrel file to:', this.barrelFileOutDir);
    await this.writeSourceFile(
      this.barrelFileOutDir,
      'index.ts',
      content,
      true
    );
  }

  private async writePackageFile(): Promise<void> {
    const fileName = DU.genPackageFileName(this.pkg);
    debug.log('Generating package file:', fileName + '.ts');
    const generator = new TGeneratorPackage();
    const content = generator.generatePackageContents(this.pkg);
    await this.writeSourceFile(
      this.pkgRootOutDir,
      fileName + '.ts',
      content,
      true
    );
  }

  private async writeFactoryFile(): Promise<void> {
    const fileName = DU.genFactoryFileName(this.pkg);
    debug.log('Generating factory file:', fileName + '.ts');
    const generator = new TGeneratorFactory();
    const content = generator.generateFactoryContents(this.pkg);
    await this.writeSourceFile(
      this.pkgRootOutDir,
      fileName + '.ts',
      content,
      true
    );
  }

  private async writeUtilsFile(): Promise<void> {
    const fileName = DU.genUtilsFileName(this.pkg);
    debug.log('Generating utils file:', fileName + '.ts');
    const generator = new TGeneratorUtils();
    const content = generator.generateUtilsContents(this.pkg);
    await this.writeSourceFile(
      this.pkgRootOutDir,
      fileName + '.ts',
      content,
      false
    );
  }

  private setupEClassImports(eClass: EClass): void {
    debug.log(`Setting up imports for EClass: ${eClass.getName()}`);

    // Determines the set of types that needs to be imported to support the EClass
    this.eClassApiImports = new Set<EClassifier>();
    this.eClassGenImports = new Set<EClassifier>();
    this.eClassPkgImports = new Set<EPackage>();

    debug.log('Collecting imports...');
    this.collectEClassImports(this.pkg, eClass);

    debug.log('Import collection completed');
  }

  private async writeEClassApiFile(eClass: EClass): Promise<void> {
    const filename = DU.genClassApiName(eClass);
    debug.log(`Writing API file for ${eClass.getName()}: ${filename}.ts`);

    const apiGenerator = new TGeneratorApi();
    const tsInterfaceContent = apiGenerator.generate(
      eClass,
      this.eClassApiImports
    );

    await this.writeSourceFile(
      this.pkgApiOutDir,
      filename + '.ts',
      tsInterfaceContent,
      true
    );
  }

  private async writeEClassGenFile(eClass: EClass): Promise<void> {
    const filename = DU.genClassGenName(eClass);
    debug.log(`Writing Gen file for ${eClass.getName()}: ${filename}.ts`);

    const genGenerator = new TGeneratorGen();
    const tsGenClassContent = genGenerator.generate(
      eClass,
      this.eClassApiImports,
      this.eClassGenImports,
      this.eClassPkgImports
    );

    await this.writeSourceFile(
      this.pkgGenOutDir,
      filename + '.ts',
      tsGenClassContent,
      true
    );
  }

  private async writeEClassImplFile(eClass: EClass): Promise<void> {
    const filename = DU.genClassImplName(eClass);
    debug.log(`Writing Impl file for ${eClass.getName()}: ${filename}.ts`);
    debug.log(`Overwrite mode: ${this.overwriteImpl}`);

    const implGenerator = new TGeneratorImpl();
    const tsImplClassContent = implGenerator.generate(
      eClass,
      this.eClassApiImports
    );

    await this.writeSourceFile(
      this.pkgImplOutDir,
      filename + '.ts',
      tsImplClassContent,
      this.overwriteImpl
    );
  }

  private async writeEnumFile(eclassifier: EEnum): Promise<void> {
    const filename = DU.genClassApiName(eclassifier) + '.ts';
    debug.log(`Writing enum file for ${eclassifier.getName()}: ${filename}`);

    const enumGenerator = new TGeneratorEnum();
    const enumContent = enumGenerator.generate(eclassifier);
    await this.writeSourceFile(this.pkgApiOutDir, filename, enumContent, true);
  }

  private async resolveAndMaybeCreateDir(
    outDir: string,
    deleteAllInDir: boolean
  ): Promise<string> {
    await this.ensureNodeModulesLoaded();

    const resolvedOutDir = this.path.resolve(__dirname, outDir);
    debug.log(`Processing directory: ${outDir} -> ${resolvedOutDir}`);
    debug.log(`Delete all files in directory: ${deleteAllInDir}`);

    if (this.fs.existsSync(resolvedOutDir)) {
      debug.log('Directory exists');
      if (deleteAllInDir) {
        debug.log('Deleting all files in directory...');
        await this.deleteFilesInFolder(resolvedOutDir);
      }
    } else {
      debug.log('Directory does not exist, creating...');
      this.fs.mkdirSync(resolvedOutDir, { recursive: true });
      debug.log('Directory created successfully');
    }

    return outDir;
  }

  /**
   * Traverses entire EClass structure and collects the set of types that need
   * to be imported, including API, Gen and EPackage instances.
   */
  private collectEClassImports(pkg: EPackage, eClass: EClass): void {
    debug.group(`Collecting imports for EClass: ${eClass.getName()}`);

    // Start with importing supertypes
    const superTypes = eClass.getESuperTypes();
    debug.log(`Processing ${superTypes.size()} super type(s)...`);
    for (const superType of superTypes) {
      debug.log(`Adding super type: ${superType.getName()}`);
      this.eClassApiImports.add(superType);
      if (!superType.isInterface()) {
        this.eClassGenImports.add(superType);
        debug.log(
          `Added to Gen imports (not interface): ${superType.getName()}`
        );
      }
    }

    // Add imports to support EStructuralFeatures
    const features = eClass.getEAllStructuralFeatures();
    debug.log(`Processing ${features.size()} structural feature(s)...`);
    for (const field of features) {
      if (field.getEType()) {
        this.maybeAddMemberImports(pkg, eClass, field.getEType()!);
        if (field instanceof EReferenceImpl) {
          const opposite = field.getEOpposite();
          if (opposite) {
            debug.log(`Processing opposite reference: ${opposite.getName()}`);
            this.maybeAddMemberImports(
              pkg,
              eClass,
              opposite.getEContainingClass()
            );
          }
        }
      }
    }

    // Add imports to support EOperations
    const operationsToImplement = this.eopsToImplement(eClass);
    debug.log(`Processing ${operationsToImplement.size()} operation(s) for ${eClass.getName()}...`);
    for (const eop of operationsToImplement) {
      if (eop.getEType())
        this.maybeAddMemberImports(pkg, eClass, eop.getEType()!);
      const params = eop.getEParameters();
      for (const param of params) {
        if (param.getEType()) {
          // make sure to import any parameter type, if necessary
          this.maybeAddMemberImports(pkg, eClass, param.getEType()!);
        }
      }
    }

    debug.groupEnd();
  }

  private eopsToImplement(eClass: EClass) : EList<EOperation>{
    let operationsToImplement = new BasicEList<EOperation>(eClass.getEOperations().elements());
    for (const st of eClass.getESuperTypes()) {
      if (st.isInterface()) {
        operationsToImplement.addAll(st.getEOperations().elements());
      }
    }
    return operationsToImplement;
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
    debug.log(`Evaluating import candidate: ${candidate?.getName()}`);

    if (candidate instanceof EClassImpl || candidate instanceof EEnumImpl) {
      const candidatePackage = candidate.getEPackage();
      debug.log(
        `Candidate package: ${candidatePackage.getName()}, this package: ${thisPackage.getName()}`
      );

      if (candidatePackage !== thisPackage) {
        debug.log(`Adding package import: ${candidatePackage.getName()}`);
        this.eClassPkgImports.add(candidatePackage);
      }

      if (candidate !== thisEClass) {
        // Ecore types are imported for everything
        if (candidatePackage !== EcorePackage.eINSTANCE && !this.eClassApiImports.has(candidate)) {
          debug.log(`Adding API import: ${candidate.getName()}`);
          this.eClassApiImports.add(candidate);
        } 
        if (candidatePackage !== EcorePackage.eINSTANCE && !this.eClassGenImports.has(candidate)) {
          debug.log(`Adding Gen import for ${thisEClass.getName()}: ${candidate.getName()}`);
          this.eClassGenImports.add(candidate);
        }         
        
        else {
          debug.log(`Skipping Ecore type: ${candidate.getName()}`);
        }
      } else {
        debug.log(
          `Skipping import (already exists or is self): ${candidate.getName()}`
        );
      }
    }
  }

  // Add this method to the TGeneratorMain class
  private async writePackageInitializerFile(): Promise<void> {
    // Only generate for root packages (packages without a super package)
    if (this.pkg.getESuperPackage()) {
      debug.log('Skipping package initializer for ' + this.pkg.getName() + ' - not a root package');
      return;
    }

    const generator = new TGeneratorPackageInitializer();
    const fileName = TGeneratorPackageInitializer.generateFileName(this.pkg);
    debug.log('Generating package initializer file:', fileName + '.ts');

    const content = generator.generate(this.pkg);
    await this.writeSourceFile(
      this.pkgRootOutDir,
      fileName + '.ts',
      content,
      true
    );
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
    debug.log(`Writing file: ${filePath}`);
    debug.log(
      `Overwrite: ${overwrite}, Content length: ${content.length} characters`
    );

    if (overwrite || !this.fs.existsSync(filePath)) {
      this.fs.writeFileSync(filePath, content, 'utf8');
      debug.log(`File written successfully: ${filename}`);
    } else {
      debug.log(`File skipped (already exists, overwrite=false): ${filename}`);
    }
  }

  private async deleteFilesInFolder(directoryPath: string): Promise<void> {
    await this.ensureNodeModulesLoaded();

    debug.log(`Deleting files in folder: ${directoryPath}`);

    try {
      const files = this.fs.readdirSync(directoryPath);
      debug.log(`Found ${files.length} file(s) to delete`);

      for (const file of files) {
        try {
          const filePath = this.path.join(directoryPath, file);
          this.fs.unlinkSync(filePath);
          debug.log(`Deleted file: ${file}`);
        } catch (err) {
          // Swallow individual file deletion errors as per original logic
          debug.warn(`Failed to delete file ${file}:`, err);
        }
      }
      debug.log('File deletion completed');
    } catch (err) {
      debug.error(`Failed to read directory ${directoryPath}:`, err);
    }
  }

  private async tryFormatWithPrettier(): Promise<void> {
    debug.log('Attempting to format code with Prettier...');

    // Fallback to command line prettier
    try {
      if (!this.childProcess) {
        debug.log('Loading child_process module...');
        this.childProcess = await ConditionalImports.getNodeModule(
          'child_process'
        );
      }

      // Format main output directory
      const mainPath = this.path.resolve(__dirname, this.outDir);
      debug.log(`Formatting main directory with CLI: ${mainPath}`);
      this.childProcess.execSync(`prettier --write "${mainPath}"`);
      debug.log('Main directory formatted successfully');

      // Format barrel file directory if it exists
      if (this.barrelFileDir) {
        const barrelPath = this.path.resolve(__dirname, this.barrelFileOutDir);
        debug.log(`Formatting barrel directory with CLI: ${barrelPath}`);
        this.childProcess.execSync(`prettier --write "${barrelPath}"`);
        debug.log('Barrel directory formatted successfully');
      }

      debug.log('CLI Prettier formatting completed successfully');
    } catch (error) {
      debug.warn('Prettier formatting failed:', (error as Error).message);
      debug.warn('Make sure prettier is installed: npm install -g prettier');
    }
  }
}
