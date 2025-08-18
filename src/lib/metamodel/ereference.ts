import { EClass } from './eclass';
import { EStructuralFeature } from './estructural-feature';

export interface EReference extends EStructuralFeature {
  getEReferenceType(): EClass;

  isContainer(): boolean;

  isContainment(): boolean;

  setContainment(containment: boolean): void;

  isResolveProxies(): boolean;

  setResolveProxies(value: boolean): void;

  getEOpposite(): EReference | undefined;

  setEOpposite(value: EReference): void;
}
