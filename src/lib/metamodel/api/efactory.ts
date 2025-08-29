import { EClass } from './eclass.js';
import { EModelElement } from './emodel-element.js';
import { EObject } from './eobject.js';

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
