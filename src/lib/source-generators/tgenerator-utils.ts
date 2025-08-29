import { EPackage } from '../metamodel/api/epackage.js';
import { TGenUtils as DU } from './tgen-utils.js';

/**
 * Responsible for generating a default (empty) utils file for an EPackage.
 * The utils file is intended to contain package-specific utility functions
 * and is manually maintained by developers after generation.
 *
 * @author dtuohy
 */
export class TGeneratorUtils {
  public generateUtilsContents(pkg: EPackage): string {
    const utilsClassName = DU.capitalize(pkg.getName()) + 'Utils';
    
    return `/**
 * Utility functions for the ${pkg.getName()} package.
 * 
 * This file is generated as an empty template and is intended to be
 * manually maintained. Add package-specific utility functions here.
 */
export class ${utilsClassName} {
  // Add utility methods here
}
`;
  }
}