import { ENamedElement } from './enamed-element';
import { EClassifier } from './eclassifier';

export interface ETypedElement extends ENamedElement {
  getLowerBound(): number;

  setLowerBound(value: number): void;

  getUpperBound(): number;

  setUpperBound(value: number): void;

  isUnique(): boolean;

  setUnique(value: boolean): void;

  getEType(): EClassifier | undefined;

  setEType(value: EClassifier): void;

  isMany(): boolean;

  isOrdered(): boolean;

  setOrdered(value: boolean): void;

  isRequired(): boolean;
}
