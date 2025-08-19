import { EClass } from '../metamodel/eclass';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EPackage } from '../metamodel/epackage';
import { TGenUtils as DU } from './tgen-utils';
import { Environment } from '../utils/environment';

/**
 * Source code generation for .ts file that exports external facing
 * APIs for a TMF EPackage.
 *
 */
export class TGeneratorBarrelIndexTs {
  private outDir: string = '';

  public async generate(ePackage: EPackage, outDir?: string): Promise<string> {
    if (outDir) {
      this.outDir = outDir;
      await this.ensureCustomDirectory();
    }
    const packageContents = this.generatePackageContents('', ePackage);
    const customExports = await this.generateCustomExports();
    return packageContents + customExports;
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
    `export * from './${path}/${DU.genUtilsFileName(ePackage)}';
export * from './${path}/${DU.genPackageFileName(ePackage)}';
export * from './${path}/${DU.genFactoryFileName(ePackage)}';
${this.generateEClassifierExports(ePackage, path)}`;
    return toReturn;
  }

  generateEClassifierExports(ePackage: EPackage, pkgFolderPath: string) {
    let exports = ``;
    for (const eclassifier of ePackage.getEClassifiers()) {
      exports += `export * from './${pkgFolderPath}/api/${DU.genClassApiName(
        eclassifier
      )}';\n`;
      if (eclassifier instanceof EClassImpl) {
        exports += `export * from './${pkgFolderPath}/impl/${DU.genClassImplName(
          eclassifier
        )}';\n`;
        exports += `export * from './${pkgFolderPath}/gen/${DU.genClassGenName(
          eclassifier
        )}';\n`;
      }
    }
    return exports;
  }

  private async ensureCustomDirectory(): Promise<void> {
    if (!this.outDir) return;
    
    Environment.requireNodeEnvironment('Custom directory creation');
    
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const customDir = path.join(this.outDir, 'custom');
      
      if (!fs.existsSync(customDir)) {
        fs.mkdirSync(customDir, { recursive: true });
        
        const readmeContent = `# Custom Directory

This directory is automatically created by the TMF code generator to store your custom TypeScript files.

## Purpose

Files placed in this directory (and its subdirectories) are automatically exported in the barrel file (index.ts) 
alongside the generated model code. This allows you to:

- Add custom utility functions related to your model
- Create custom business logic that works with your model
- Add helper types and interfaces

## Usage

- Place any \`.ts\` files in this directory or its subdirectories
- **GENERATE YOUR MODEL AGAIN**: All \`.ts\` files will be automatically included in the barrel exports
- Files are exported using relative paths from the project root
- The directory structure is preserved in the export paths

## Examples

\`\`\`typescript
// custom/utilities.ts
export function customModelHelper() {
  // Your custom code here
}

// custom/types/custom-types.ts  
export interface CustomModelExtension {
  // Your custom types here
}
\`\`\`

These will automatically be exported as:
\`\`\`typescript
export * from './custom/utilities';
export * from './custom/types/custom-types';
\`\`\`
`;
        
        const readmePath = path.join(customDir, 'README.md');
        fs.writeFileSync(readmePath, readmeContent, 'utf8');
      }
    } catch (error: any) {
      throw new Error(`Custom directory creation failed: ${error.message}. This operation requires Node.js environment.`);
    }
  }

  private async generateCustomExports(): Promise<string> {
    if (!this.outDir) return '';
    
    Environment.requireNodeEnvironment('Custom exports generation');
    
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const customDir = path.join(this.outDir, 'custom');
      
      if (!fs.existsSync(customDir)) return '';
      
      const customFiles = await this.findTypeScriptFiles(customDir);
      
      if (customFiles.length === 0) return '';
      
      let exports = '\n// Custom exports from /custom directory\n';
      
      for (const file of customFiles) {
        const relativePath = path.relative(this.outDir, file);
        const exportPath = relativePath.replace(/\.ts$/, '').replace(/\\/g, '/');
        exports += `export * from './${exportPath}';\n`;
      }
      
      return exports;
    } catch (error: any) {
      throw new Error(`Custom exports generation failed: ${error.message}. This operation requires Node.js environment.`);
    }
  }

  private async findTypeScriptFiles(dir: string): Promise<string[]> {
    Environment.requireNodeEnvironment('TypeScript file discovery');
    
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const files: string[] = [];
      
      if (!fs.existsSync(dir)) return files;
      
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          files.push(...await this.findTypeScriptFiles(fullPath));
        } else if (item.isFile() && item.name.endsWith('.ts') && item.name !== 'README.md') {
          files.push(fullPath);
        }
      }
      
      return files;
    } catch (error: any) {
      throw new Error(`TypeScript file discovery failed: ${error.message}. This operation requires Node.js environment.`);
    }
  }
}