import { EModelElement } from './emodel-element';

/**
 * Base interface for metamodel elements that have a name.
 * Provides naming functionality for elements like EClass, EAttribute, EReference, etc.
 */
export interface ENamedElement extends EModelElement {
  /** The name of this element. */
  name: string;

  /** Returns the name of this element. */
  getName(): string;

  /** Sets the name of this element. */
  setName(name: string) : void;
}
