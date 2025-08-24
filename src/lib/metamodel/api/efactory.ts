import { EClass } from './eclass';
import { EModelElement } from './emodel-element';
import { EObject } from './eobject';

/**
 * This is an EMF ECore class that we have defined as a placeholder.
 */
export interface EFactory {
  /**
   * 
   * @param eClass 
   */
  create(eClass: EClass): EObject;
}
