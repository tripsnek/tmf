import { EClass } from './api/eclass';

/**
 * This is an EMF ECore class that we have defined as a placeholder.  We do not
 * yet have plans to implement EFactory.
 */
export class EFactory {
  public create(eClass: EClass): any {
    throw Error('Not implemented in base class');
  }
}
