// ecoreparser-safe.ts
import { EPackage } from "../metamodel/epackage";
import { EcoreStringParser } from "./ecore-string-parser";
import { Environment, ConditionalImports } from '../utils/environment';
import { parseString, parseStringSync } from "./xml-to-js-parser";

/**
 * Parses an XML Ecore file into a TMF metamodel.
 */
export class EcoreParser {
  private stringParser = new EcoreStringParser();

  /**
   * Async version of parse for better error handling
   */
  public async parseAsync(ecoreFilePath: string): Promise<EPackage> {
    const ecoreXml = await this.fileToXmlStringAsync(ecoreFilePath);
    return this.parseFromXmlStringAsync(ecoreXml);
  }

  public async fileToXmlStringAsync(ecoreFilePath: string): Promise<string> {
    Environment.requireNodeEnvironment('File parsing');
    
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const message = "Parsing " + ecoreFilePath + " from filesystem";
      // console.log(message);
      return fs.readFileSync(path.resolve(ecoreFilePath), "utf8");
    } catch (error: any) {
      throw new Error(`File system access failed: ${error.message}. This operation requires Node.js environment.`);
    }
  }

  /**
   * Parses an Ecore XML string into a TMF metamodel.
   * @param ecoreXml The XML string to parse
   * @returns The root EPackage containing the parsed metamodel
   */
  public parseFromXmlString(ecoreXml: string): EPackage {
    const ecoreJs = this.xmlToJs(ecoreXml);
    return this.stringParser.parseFromJs(ecoreJs);
  }

  /**
   * Async version of parseFromXmlString
   */
  public async parseFromXmlStringAsync(ecoreXml: string): Promise<EPackage> {
    const ecoreJs = await this.xmlToJsAsync(ecoreXml);
    return this.stringParser.parseFromJs(ecoreJs);
  }

  public xmlToJs(ecoreXml: string): any {
    // Use our new synchronous parser for both Node.js and browser
    try {
      return parseStringSync(ecoreXml);
    } catch (error) {
      console.log("ERROR ON PARSE");
      console.log(error);
      throw error;
    }
  }

  public async xmlToJsAsync(ecoreXml: string): Promise<any> {
    // Use our new asynchronous parser for both Node.js and browser
    try {
      return await parseString(ecoreXml);
    } catch (error) {
      console.log("ERROR ON PARSE");
      console.log(error);
      throw error;
    }
  }

  /**
   * Check if file-based parsing is supported
   */
  public static isFileParsingSupported(): boolean {
    return Environment.isNode;
  }

  /**
   * Check if XML string parsing is supported
   */
  public static isXmlParsingSupported(): boolean {
    // Our parser works in both Node.js and browser environments
    return true;
  }

  /**
   * Get supported operations in current environment
   */
  public static getSupportedOperations(): string[] {
    const operations: string[] = [];
    
    if (this.isXmlParsingSupported()) {
      operations.push('parseFromXmlString', 'parseFromXmlStringAsync');
    }
    
    if (this.isFileParsingSupported()) {
      operations.push('parse', 'parseAsync', 'fileToXmlString', 'fileToXmlStringAsync');
    }
    
    return operations;
  }
}