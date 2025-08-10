import { EPackage } from './epackage';
import { ENamedElement } from './enamed-element';

export interface EClassifier extends ENamedElement {
  getEPackage(): EPackage;

  setEPackage(pkg: EPackage): void;

  getInstanceClassName(): string;

  setInstanceClassName(value: string): void;

  getClassifierId(): number;

  setClassifierId(id: number): void;

  getInstanceTypeName(): string;

  setInstanceTypeName(value: string): void;

  getETypeParameters();

  getInstanceClass(): string;

  setInstanceClass(value);

  getRootPackage(): EPackage;
}
