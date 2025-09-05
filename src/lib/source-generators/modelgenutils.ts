import { EcoreParser } from '../ecore/ecoreparser.js';
import { EPackage } from '../metamodel/api/epackage.js';
import { TGeneratorMain } from './tgenerator-main.js';
import { Environment, ConditionalImports, safeDynamicImport } from '../utils/environment.js';

export interface GenOptions {
  overwriteImpl?: boolean;              //whether to overwrite *.impl files
  destinationPath?: string;             //where to generate the src/ directory
  attemptFormatWithPrettier?: boolean;  //whether to attempt to invoke prettier formatting
}

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
  destinationPath?: string,
  attemptFormatWithPrettier?: boolean
): Promise<string> {
  Environment.requireNodeEnvironment('File-based code generation');

  // parse the package
  const pkg = await new EcoreParser().parseAsync(ecorePath);

  // auto-determine destination path from ecore location, if necessary
  let destPath: string;
  if (destinationPath) {
    destPath = destinationPath;
  } else {
    try {
      const path = await safeDynamicImport('path');
      destPath = path.dirname(ecorePath);
    } catch (error: any) {
      throw new Error(`Path resolution failed: ${error.message}. This operation requires Node.js environment.`);
    }
  }

  // generate the source
  return generateFromEPackage(pkg, destPath, overwriteImpl, attemptFormatWithPrettier);
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
  overwriteImpl?: boolean,
  attemptInvokePrettier?: boolean
): Promise<string> {
  Environment.requireNodeEnvironment('Code generation');

  try {
    const path = await safeDynamicImport('path');
    const srcPath = path.resolve(destPath + '/src');
    console.log('running TGeneratorMain, output to ' + srcPath);
    new TGeneratorMain(
      pkg,
      path.resolve(destPath + '/src'),
      overwriteImpl,
      path.resolve(destPath + '/src')
    ).generate(attemptInvokePrettier);
    return srcPath;
  } catch (error: any) {
    throw new Error(`Path resolution failed: ${error.message}. This operation requires Node.js environment.`);
  }
}

/**
 * Generates TypeScript code from an Ecore file with configurable options.
 * 
 * @param ecorePath Path to the .ecore file
 * @param options Optional generation options
 */
export async function genmodel(ecorePath: string, options?: GenOptions): Promise<string> {
  return generateFromEcore(
    ecorePath,
    options?.overwriteImpl,
    options?.destinationPath,
    options?.attemptFormatWithPrettier
  );
}