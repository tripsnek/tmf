import { EClass } from './eclass.js';
import { EStructuralFeature } from './estructural-feature.js';

/**
 * Represents a reference to another model object. References can be 
 * containment (parent-child) relationships or cross-references, and
 * may have bidirectional opposites that are automatically maintained.
 */
export interface EReference extends EStructuralFeature {
  //not used in TMF
  // getEReferenceType(): EClass;

  /** Returns true if this reference represents the container side of a containment. */
  isContainer(): boolean;

  /** Returns true if this reference represents a containment relationship. */
  isContainment(): boolean;

  /** Sets whether this reference represents a containment relationship. */
  setContainment(containment: boolean): void;

  // isResolveProxies(): boolean;

  // setResolveProxies(value: boolean): void;

  /** Returns the opposite reference in a bidirectional relationship, if any. */
  getEOpposite(): EReference | undefined;

  /** Sets the opposite reference in a bidirectional relationship. */
  setEOpposite(value: EReference): void;
}
