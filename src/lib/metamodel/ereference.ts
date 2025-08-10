import { EClass } from './eclass';
import { EStructuralFeature } from './estructural-feature';

export interface EReference extends EStructuralFeature {
  getEReferenceType(): EClass;

  isContainer(): boolean;

  isContainment(): boolean;

  setContainment(containment: boolean);

  isResolveProxies(): boolean;

  setResolveProxies(value: boolean): void;

  getEOpposite(): EReference;

  setEOpposite(value: EReference): void;
}
