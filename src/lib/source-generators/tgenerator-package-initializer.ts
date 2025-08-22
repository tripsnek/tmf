import { EPackage } from '../metamodel/epackage';
import { TGenUtils as DU } from './tgen-utils';

/**
 * Generates a package initializer file for the root package that handles
 * initialization of the entire package hierarchy without circular imports.
 */
export class TGeneratorPackageInitializer {
  
  /**
   * Generates the package initializer content for a root package.
   * @param rootPackage The root EPackage
   * @returns The generated TypeScript content
   */
  public generate(rootPackage: EPackage): string {
    if (rootPackage.getESuperPackage()) {
      throw new Error('Package initializer should only be generated for root packages');
    }

    const allPackages = this.collectAllPackages(rootPackage);
    const className = this.generateClassName(rootPackage);
    const fileName = this.generateFileName(rootPackage);
    
    return this.generateContent(rootPackage, allPackages, className);
  }

  /**
   * Generates the class name for the package initializer.
   */
  public generateClassName(rootPackage: EPackage): string {
    return DU.capitalize(rootPackage.getName()) + 'PackageInitializer';
  }

  /**
   * Generates the file name for the package initializer.
   */
  public generateFileName(rootPackage: EPackage): string {
    return DU.kebabLowerCase(rootPackage.getName()) + '-package-initializer';
  }

  /**
   * Collects all packages in the hierarchy starting from the root.
   */
  private collectAllPackages(rootPackage: EPackage): EPackage[] {
    const allPackages: EPackage[] = [];
    this.collectPackagesRecursive(rootPackage, allPackages);
    return allPackages;
  }

  /**
   * Recursively collects all packages in the hierarchy.
   */
  private collectPackagesRecursive(pkg: EPackage, collected: EPackage[]): void {
    collected.push(pkg);
    
    for (const subPackage of pkg.getESubPackages()) {
      this.collectPackagesRecursive(subPackage, collected);
    }
  }

  /**
   * Generates the full content of the package initializer file.
   */
  private generateContent(rootPackage: EPackage, allPackages: EPackage[], className: string): string {
    const imports = this.generateImports(allPackages);
    const classBody = this.generateClassBody(allPackages, className);
    
    return `${imports}

${classBody}`;
  }

  /**
   * Generates import statements for all packages.
   */
  private generateImports(allPackages: EPackage[]): string {
    let imports = '';
    
    for (const pkg of allPackages) {
      const packageClassName = DU.genPackageClassName(pkg);
      const packageFileName = DU.genPackageFileName(pkg);
      
      // Calculate relative path from root to this package
      const relativePath = this.getRelativePathToPackage(pkg);
      
      imports += `import { ${packageClassName} } from '${relativePath}${packageFileName}';\n`;
    }
    
    return imports;
  }

  /**
   * Calculates the relative path from root directory to a package directory.
   */
  private getRelativePathToPackage(pkg: EPackage): string {
    const pathParts: string[] = [];
    let current = pkg;
    
    // Build path from package up to root
    while (current.getESuperPackage()) {
      pathParts.unshift(current.getName());
      current = current.getESuperPackage();
    }
    
    // If this is the root package, use current directory
    if (pathParts.length === 0) {
      return './';
    }
    
    // Build relative path
    return './' + pathParts.join('/') + '/';
  }

  /**
   * Generates the class body with registerAll method.
   */
  private generateClassBody(allPackages: EPackage[], className: string): string {
    const instanceDeclarations = this.generateInstanceDeclarations(allPackages);
    const packageRelationships = this.generatePackageRelationships(allPackages);
    const initializationCalls = this.generateInitializationCalls(allPackages);
    
    return `/**
 * A "global initializer" solution for ensuring that package contents
 * for an entire package hierarchy can be initialized on the first
 * 'touch' of any individual package, without triggering circular import
 * issues.
 *
 * The way it works:
 *  1. Whenever any package is 'touched' (by simply being referenced in code) it
 *     initialized it's '_eINSTANCE' field, and uses it to create its initial structures
 *     and Literals references. This does *not* require touching other packages, so there
 *     is no risk of circular imports.
 *  2. When the first invocation of '<package>.eINSTANCE' is made, each package intercepts
 *     that as a static 'get' on the property, and calls registerAll() on this instance to ensure that
 *     ALL packages are touched and have their initial contents created.
 *  3. The first time registerAll() is called, the package hierarchy (sub/super) is created, and
 *     all package contents are initialized.
 */
export class ${className} {
  private static registered = false;

  static registerAll() {
    //if registration is completed, return immediately
    if (this.registered) return;
    this.registered = true;
${instanceDeclarations}
${packageRelationships}
${initializationCalls}
  }
}`;
  }

  /**
   * Generates the instance declarations in registerAll method.
   */
  private generateInstanceDeclarations(allPackages: EPackage[]): string {
    let declarations = '';
    
    for (const pkg of allPackages) {
      const packageClassName = DU.genPackageClassName(pkg);
      const variableName = DU.uncapitalize(pkg.getName());
      
      declarations += `    const ${variableName} = ${packageClassName}._eINSTANCE;\n`;
    }
    
    return declarations;
  }

  /**
   * Generates package relationship setup code.
   */
  private generatePackageRelationships(allPackages: EPackage[]): string {
    let relationships = '\n    //set package/sub-package relationships\n';
    
    for (const pkg of allPackages) {
      const superPackage = pkg.getESuperPackage();
      if (superPackage) {
        const pkgVarName = DU.uncapitalize(pkg.getName());
        const superVarName = DU.uncapitalize(superPackage.getName());
        
        relationships += `    ${pkgVarName}.setESuperPackage(${superVarName});\n`;
      }
    }
    
    return relationships;
  }

  /**
   * Generates initialization method calls.
   */
  private generateInitializationCalls(allPackages: EPackage[]): string {
    let calls = '\n    //initialize package contents\n';
    
    // Initialize in dependency order (root first, then children)
    const sortedPackages = this.sortPackagesByDependency(allPackages);
    
    for (const pkg of sortedPackages) {
      const variableName = DU.uncapitalize(pkg.getName());
      calls += `    ${variableName}.initializePackageContents();\n`;
    }
    
    return calls;
  }

  /**
   * Sorts packages by dependency order (parents before children).
   */
  private sortPackagesByDependency(packages: EPackage[]): EPackage[] {
    const sorted: EPackage[] = [];
    const processed = new Set<EPackage>();
    
    const processPackage = (pkg: EPackage) => {
      if (processed.has(pkg)) return;
      
      // Process super package first if it exists
      const superPackage = pkg.getESuperPackage();
      if (superPackage && packages.includes(superPackage)) {
        processPackage(superPackage);
      }
      
      sorted.push(pkg);
      processed.add(pkg);
    };
    
    for (const pkg of packages) {
      processPackage(pkg);
    }
    
    return sorted;
  }
}