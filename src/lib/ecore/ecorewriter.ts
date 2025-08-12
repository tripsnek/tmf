import * as fs from 'fs';
import { EPackage } from '../metamodel/epackage';
import { EcoreStringWriter } from './ecore-string-writer';

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
    const xmlContent = this.writeToString(ePackage);
    const path = require('path');
    fs.writeFileSync(path.resolve(filePath), xmlContent, 'utf8');
  }
}