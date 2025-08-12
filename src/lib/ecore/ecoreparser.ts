import * as fs from 'fs';
import { EPackage } from '../metamodel/epackage';
import { EcoreStringParser } from './ecore-string-parser';


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
    const message = 'Parsing ' + ecoreFilePath + ' from filesystem';
    // console.log(message);

    //read the XML Ecore from the file system
    const path = require('path');
    const ecoreXml = fs.readFileSync(path.resolve(ecoreFilePath), 'utf8');

    //convert to JSON
    return this.parseFromXmlString(ecoreXml);
  }

  public parseFromXmlString(ecoreXml: string): EPackage {
    return this.stringParser.parseFromXmlString(ecoreXml);
  }

}
