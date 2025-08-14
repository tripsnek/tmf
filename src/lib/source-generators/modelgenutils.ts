import { EcoreParser } from '../ecore/ecoreparser';
import { EPackage } from '../metamodel/epackage';
import { DGeneratorMain } from './dgenerator-main';
import { Environment, ConditionalImports } from '../utils/environment';

/**
 * (1) Parses an ECore file.
 * (2) Generates source code into destinationPath/src/lib
 * (3) Generates barrel file (index.ts) into destinationPath/src
 *
 * If not specified, destinationPath will be that of the model file.
 *
 * @param ecorePath
 * @param overwriteImpl
 * @param destinationPath
 */
export async function generateFromEcore(
  ecorePath: string,
  overwriteImpl?: boolean,
  destinationPath?: string
): Promise<string> {
  Environment.requireNodeEnvironment('File-based code generation');

  // parse the package
  const pkg = new EcoreParser().parse(ecorePath);

  // auto-determine destination path from ecore location, if necessary
  const path = require('path');
  const destPath : string = destinationPath
    ? destinationPath
    : path.dirname(ecorePath);  // <-- Use path.dirname() instead

  // generate the source
  return generateFromEPackage(pkg, destPath, overwriteImpl);
}
/**
 * (1) Generates source code into destinationPath/src/lib
 * (2) Generates barrel file (index.ts) into destinationPath/src
 *
 * @param pkg
 * @param destPath
 * @param overwriteImpl
 */
export async function generateFromEPackage(
  pkg: EPackage,
  destPath: string,
  overwriteImpl?: boolean
): Promise<string> {
  Environment.requireNodeEnvironment('Code generation');


  const path = require('path');
  const srcPath = path.resolve(destPath + '/src');
  console.log('running DGeneratorMain, output to ' + srcPath);
  new DGeneratorMain(
    pkg,
    path.resolve(destPath + '/src/lib'),
    overwriteImpl,
    path.resolve(destPath + '/src')
  ).generate();
  return srcPath;
}
