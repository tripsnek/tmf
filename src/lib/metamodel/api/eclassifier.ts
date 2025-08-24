import { EPackage } from './epackage';
import { ENamedElement } from './enamed-element';

/**
 * Base interface for all type classifiers in the metamodel. 
 * Represents types that can be used to classify model objects, including
 * classes (EClass), data types (EDataType), and enumerations (EEnum).
 */
export interface EClassifier extends ENamedElement {
  /** Returns the package that contains this classifier. */
  getEPackage(): EPackage;

  /** Sets the package that contains this classifier. */
  setEPackage(pkg: EPackage): void;

  // getInstanceClassName(): string;

  // setInstanceClassName(value: string): void;

  /** Returns the unique ID of this classifier within its package. */
  getClassifierId(): number;

  /** Sets the unique ID of this classifier within its package. */
  setClassifierId(id: number): void;

  // getInstanceTypeName(): string;

  // setInstanceTypeName(value: string): void;

  // getETypeParameters() : any;

  // getInstanceClass(): string;

  // setInstanceClass(value: any) : any;

  /** Returns the root package containing this classifier. */
  getRootPackage(): EPackage | undefined;
}
