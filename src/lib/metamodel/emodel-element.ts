import { EObject } from './eobject';

/**
 * Base interface for all elements that can appear in an Ecore metamodel.
 * Extends EObject to provide the foundation for metamodel elements like
 * EClass, EAttribute, EReference, etc.
 */
export interface EModelElement extends EObject {}
