import { EClassifier } from './eclassifier.js';

import { EOperation } from './eoperation.js';
import { EAttribute } from './eattribute.js';
import { EReference } from './ereference.js';
import { EStructuralFeature } from './estructural-feature.js';
import { EList } from './elist.js';
import { EObject } from './eobject.js';

/**
 * Represents a class in the metamodel. Defines the structure and behavior
 * of model objects through attributes, references, and operations. 
 * Supports inheritance, abstract classes, and interfaces.
 */
export interface EClass extends EClassifier {
  /** Returns true if this class is abstract and cannot be instantiated directly. */
  isAbstract(): boolean;

  /** Returns true if this class represents an interface. */
  isInterface(): boolean;

  /** Sets whether this class is abstract. */
  setAbstract(value: boolean): void;

  /** Sets whether this class represents an interface. */
  setInterface(value: boolean): void;

  /** Returns the attributes directly defined in this class. */
  getEAttributes(): EList<EAttribute>;

  /** Returns all attributes including those inherited from supertypes. */
  getEAllAttributes(): EList<EAttribute>;

  /** Returns the attribute marked as ID for this class, if any. */
  getEIDAttribute(): EAttribute | undefined;

  /** Creates a new instance of this class. */
  createInstance(): EObject;

  /** Returns true if this class is a supertype of the specified class. */
  isSuperTypeOf(someClass: EClass): boolean;

  /** Returns the direct supertypes of this class. */
  getESuperTypes(): EList<EClass>;

  /** Returns all supertypes including transitively inherited ones. */
  getEAllSuperTypes(): EList<EClass>;

  /** Returns the structural features (attributes and references) directly defined in this class. */
  getEStructuralFeatures(): EList<EStructuralFeature>;

  /** Returns all structural features including those inherited from supertypes. */
  getEAllStructuralFeatures(): EList<EStructuralFeature>;

  /** Returns the structural feature with the specified ID or name. */
  getEStructuralFeature(featureIdOrName: number | string): EStructuralFeature | undefined;

  /** Returns the total number of structural features in this class. */
  getFeatureCount(): number;

  /** Returns the numeric ID of the specified feature. */
  getFeatureID(feature: EStructuralFeature): number;

  /** Returns the references directly defined in this class. */
  getEReferences(): EList<EReference>;

  /** Returns all references including those inherited from supertypes. */
  getEAllReferences(): EList<EReference>;

  /** Returns all containment references including those inherited from supertypes. */
  getEAllContainments(): EList<EReference>;

  /** Returns the operations directly defined in this class. */
  getEOperations(): EList<EOperation>;

  /** Returns all operations including those inherited from supertypes. */
  getEAllOperations(): EList<EOperation>;
}
