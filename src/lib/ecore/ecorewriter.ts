// ecorewriter-safe.ts
import { EPackage } from '../metamodel/epackage';
import { EcoreStringWriter } from './ecore-string-writer';
import { Environment, ConditionalImports } from '../utils/environment';

/**
 * Writes an EPackage metamodel to an XML Ecore file.
 */
export class EcoreWriter {
  private stringWriter = new EcoreStringWriter();
  
  /**
   * Converts an EPackage to Ecore XML string format.
   * @param ePackage The root package to serialize
   * @returns The XML string representation
   */
  public writeToString(ePackage: EPackage): string {
    return this.stringWriter.writeToString(ePackage);
  }
  
  /**
   * Writes an EPackage to an Ecore XML file.
   * @param ePackage The root package to serialize
   * @param filePath The path where the .ecore file will be written
   */
  public writeToFile(ePackage: EPackage, filePath: string): void {
    Environment.requireNodeEnvironment('File writing');
    
    const xmlContent = this.writeToString(ePackage);
    
    // Use sync require for backward compatibility
    const fs = require('fs');
    const path = require('path');
    
    fs.writeFileSync(path.resolve(filePath), xmlContent, 'utf8');
  }

  /**
   * Async version of writeToFile for better error handling
   */
  public async writeToFileAsync(ePackage: EPackage, filePath: string): Promise<void> {
    Environment.requireNodeEnvironment('File writing');
    
    const xmlContent = this.writeToString(ePackage);
    
    const fs = await ConditionalImports.getNodeModule('fs');
    const path = await ConditionalImports.getNodeModule('path');
    
    fs.writeFileSync(path.resolve(filePath), xmlContent, 'utf8');
  }

  /**
   * Browser-compatible file saving via download
   * @param ePackage The root package to serialize  
   * @param filename The filename for download
   */
  public saveAsDownload(ePackage: EPackage, filename: string): void {
    if (!Environment.isBrowser) {
      throw new Error('Download functionality only available in browser environment');
    }

    // try {
    //   const xmlContent = this.writeToString(ePackage);
    //   const blob = new Blob([xmlContent], { type: 'application/xml' });
    //   const url = URL.createObjectURL(blob);
      
    //   // Create temporary download link
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = filename.endsWith('.ecore') ? filename : `${filename}.ecore`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);
    // } catch (error) {
    //   throw new Error(`Browser download failed: ${(error as Error).message}`);
    // }
  }

  /**
   * Universal save method - chooses appropriate strategy based on environment
   */
  public save(ePackage: EPackage, pathOrFilename: string): void {
    if (Environment.isNode) {
      this.writeToFile(ePackage, pathOrFilename);
    } else if (Environment.isBrowser) {
      this.saveAsDownload(ePackage, pathOrFilename);
    } else {
      throw new Error('File saving not supported in this environment');
    }
  }

  /**
   * Universal async save method
   */
  public async saveAsync(ePackage: EPackage, pathOrFilename: string): Promise<void> {
    if (Environment.isNode) {
      await this.writeToFileAsync(ePackage, pathOrFilename);
    } else if (Environment.isBrowser) {
      this.saveAsDownload(ePackage, pathOrFilename);
    } else {
      throw new Error('File saving not supported in this environment');
    }
  }

  /**
   * Check if file writing is supported in current environment
   */
  public static isFileWritingSupported(): boolean {
    return Environment.isNode;
  }

  /**
   * Check if download saving is supported in current environment
   */
  public static isDownloadSupported(): boolean {
    return Environment.isBrowser;
  }

  /**
   * Get supported operations in current environment
   */
  public static getSupportedOperations(): string[] {
    const operations = ['writeToString'];
    
    if (this.isFileWritingSupported()) {
      operations.push('writeToFile', 'writeToFileAsync', 'save', 'saveAsync');
    }
    
    if (this.isDownloadSupported()) {
      operations.push('saveAsDownload', 'save', 'saveAsync');
    }
    
    return operations;
  }
}