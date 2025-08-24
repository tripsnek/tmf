import { EClass } from './api/eclass';
import { EModelElement } from './api/emodel-element';

/**
 * This is an EMF ECore class that we have defined as a placeholder.
 */
export interface EFactory {
  create(eClass: EClass): any;
}
