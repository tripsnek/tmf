// ecoreparser-safe.ts
import { EPackage } from "../metamodel/epackage";
import { EcoreStringParser } from "./ecore-string-parser";
import { Environment, ConditionalImports } from '../utils/environment';

/**
 * Parses an XML Ecore file into a TMF metamodel.
 */
export class EcoreParser {
  private stringParser = new EcoreStringParser();

  /**
   * Returns a root EPackage - as a TMF instance - containing all subpackages
   * in the specified Ecore file.
   * @param ecoreFilePath
   */
  public parse(ecoreFilePath: string): EPackage {
    const ecoreXml = this.fileToXmlString(ecoreFilePath);
    return this.parseFromXmlString(ecoreXml);
  }

  /**
   * Async version of parse for better error handling
   */
  public async parseAsync(ecoreFilePath: string): Promise<EPackage> {
    const ecoreXml = await this.fileToXmlStringAsync(ecoreFilePath);
    return this.parseFromXmlStringAsync(ecoreXml);
  }

  public fileToXmlString(ecoreFilePath: string): string {
    Environment.requireNodeEnvironment('File parsing');
    
    // Use sync require for backward compatibility
    const fs = require('fs');
    const path = require('path');
    
    const message = "Parsing " + ecoreFilePath + " from filesystem";
    // console.log(message);
    return fs.readFileSync(path.resolve(ecoreFilePath), "utf8");
  }

  public async fileToXmlStringAsync(ecoreFilePath: string): Promise<string> {
    Environment.requireNodeEnvironment('File parsing');
    
    const fs = await ConditionalImports.getNodeModule('fs');
    const path = await ConditionalImports.getNodeModule('path');
    
    const message = "Parsing " + ecoreFilePath + " from filesystem";
    // console.log(message);
    return fs.readFileSync(path.resolve(ecoreFilePath), "utf8");
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
    if (Environment.isNode) {
      return this.xmlToJsNode(ecoreXml);
    } else {
      return this.xmlToJsBrowser(ecoreXml);
    }
  }

  public async xmlToJsAsync(ecoreXml: string): Promise<any> {
    if (Environment.isNode) {
      return this.xmlToJsNodeAsync(ecoreXml);
    } else {
      return this.xmlToJsBrowser(ecoreXml);
    }
  }

  private xmlToJsNode(ecoreXml: string): any {
    // Use sync require for backward compatibility
    const xml2js = require('xml2js');
    let ecoreJs;
    xml2js.parseString(ecoreXml, (err: any, result: any) => {
      if (err) {
        console.log("ERROR ON PARSE");
        console.log(err);
        throw err;
      }
      ecoreJs = result;
    });
    return ecoreJs;
  }

  private async xmlToJsNodeAsync(ecoreXml: string): Promise<any> {
    const xml2js = await ConditionalImports.getNodeModule('xml2js');
    
    return new Promise((resolve, reject) => {
      xml2js.parseString(ecoreXml, (err: any, result: any) => {
        if (err) {
          console.log("ERROR ON PARSE");
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private xmlToJsBrowser(ecoreXml: string): any {
    if (!Environment.hasDOMParser) {
      throw new Error('XML parsing not available in this browser environment');
    }

    try {
      const parser = new (globalThis as any).DOMParser();
      const xmlDoc = parser.parseFromString(ecoreXml, 'text/xml');
      
      if (xmlDoc.documentElement.nodeName === 'parsererror') {
        throw new Error('Invalid XML');
      }
      
      return this.domToJs(xmlDoc.documentElement);
    } catch (error) {
      console.log("ERROR ON PARSE");
      console.log(error);
      throw error;
    }
  }

  private domToJs(element: any): any {
    const result: any = {};
    
    // Handle attributes
    if (element.attributes && element.attributes.length > 0) {
      result.$ = {};
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        result.$[attr.name] = attr.value;
      }
    }
    
    // Handle child elements
    const childElements: { [key: string]: any[] } = {};
    if (element.children) {
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        const tagName = child.tagName;
        
        if (!childElements[tagName]) {
          childElements[tagName] = [];
        }
        childElements[tagName].push(this.domToJs(child));
      }
    }
    
    // Handle text content
    const textContent = element.textContent?.trim();
    if (textContent && Object.keys(childElements).length === 0) {
      result._ = textContent;
    }
    
    // Add child elements to result
    Object.assign(result, childElements);
    
    return result;
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
    return Environment.isNode || Environment.hasDOMParser;
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