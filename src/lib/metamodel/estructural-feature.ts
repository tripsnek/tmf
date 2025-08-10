import { ETypedElement } from './etyped-element';
import { EClass } from './eclass';

export interface EStructuralFeature extends ETypedElement {
  isDerived(): boolean;

  setDerived(value: boolean);

  isTransient(): boolean;

  setTransient(value: boolean);

  isUnsettable(): boolean;

  setUnsettable(value: boolean): void;

  isVolatile(): boolean;

  setVolatile(value: boolean): void;

  setFeatureID(value: number): void;

  getFeatureID(): number;

  isList(): boolean;

  isContainment(): boolean;

  getContainerClass(): string;

  getDefaultValue(): any;

  setDefaultValue(value: any): void;

  getDefaultValueLiteral(): string;

  setDefaultValueLiteral(value: string): void;

  getEContainingClass(): EClass;

  setEContainingClass(owner: EClass): void;

  isChangeable(): boolean;

  setChangeable(value: boolean): void;
}
