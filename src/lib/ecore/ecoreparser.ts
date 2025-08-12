import * as xml2js from "xml2js";
import * as fs from "fs";
import { EPackage } from "../metamodel/epackage";
import { EcoreStringParser } from "./ecore-string-parser";

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
    const message = "Parsing " + ecoreFilePath + " from filesystem";
    // console.log(message);

    //read the XML Ecore from the file system
    const path = require("path");
    const ecoreXml = fs.readFileSync(path.resolve(ecoreFilePath), "utf8");

    //convert to JSON
    return this.parseFromXmlString(ecoreXml);
  }

  /**
   * Parses an Ecore XML string into a TMF metamodel.
   * @param ecoreXml The XML string to parse
   * @returns The root EPackage containing the parsed metamodel
   */
  public parseFromXmlString(ecoreXml: string): EPackage {
    let ecoreJs = this.xmlToJs(ecoreXml);

    return this.stringParser.parseFromJs(ecoreJs);
  }

  public xmlToJs(ecoreXml: string) : any{
    let ecoreJs;
    const jsResult = xml2js.parseString(ecoreXml, (err, result) => {
      if (err) {
        console.log("ERROR ON PARSE");
        console.log(err);
      }
      ecoreJs = result;
    });
    return ecoreJs;
  }
}
