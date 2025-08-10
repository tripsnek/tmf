
import * as PATH from 'path';
import { EcoreParser } from './ecore-parser/ecoreparser';
import { EPackage } from './metamodel/epackage';
import { DGeneratorMain } from './source-generators/dgenerator-main';

/**
 * (1) Parses an ECore file.
 * (2) Generates source code into destinationPath/src/lib
 * (3) Generates barrel file (index.ts) into destinationPath/src
 *
 * If not specified, destinationPath will be that of the model file.
 *
 * @param ecorePath
 * @param destinationPath
 */
export function generateFromEcore(
  ecorePath: string,
  overwriteImpl?: boolean,
  destinationPath?: string
) {
  //parse the package
  const pkg = new EcoreParser().parse(ecorePath);

  //auto-determine destination path from ecore location, if necessary
  const destPath = destinationPath
    ? destinationPath
    : ecorePath.substring(0, ecorePath.lastIndexOf('/'));

  //generate the source
  generateFromEPackage(pkg, destPath, overwriteImpl);
}

/**
 * (1) Generates source code into destinationPath/src/lib
 * (2) Generates barrel file (index.ts) into destinationPath/src
 *
 * If not specified, destinationPath will be that of the model file.
 *
 * @param ecorePath
 * @param destinationPath
 */
export function generateFromEPackage(
  pkg: EPackage,
  destPath: string,
  overwriteImpl?: boolean
) {
  new DGeneratorMain(
    pkg,
    PATH.resolve(destPath + '/src/lib'),
    overwriteImpl,
    PATH.resolve(destPath + '/src')
  ).generate();
}
