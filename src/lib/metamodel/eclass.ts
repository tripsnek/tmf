import { EClassifier } from './eclassifier';

import { EOperation } from './eoperation';
import { EAttribute } from './eattribute';
import { EReference } from './ereference';
import { EStructuralFeature } from './estructural-feature';
import { EList } from './elist';
import { EObject } from './eobject';

export interface EClass extends EClassifier {
  isAbstract(): boolean;

  isInterface(): boolean;

  setAbstract(value: boolean): void;

  setInterface(value: boolean): void;

  getEAttributes(): EList<EAttribute>;

  getEAllAttributes(): EList<EAttribute>;

  getEIDAttribute(): EAttribute;

  createInstance(): EObject;

  isSuperTypeOf(someClass: EClass): boolean;

  getESuperTypes(): EList<EClass>;

  getEAllSuperTypes(): EList<EClass>;

  getEStructuralFeatures(): EList<EStructuralFeature>;

  getEAllStructuralFeatures(): EList<EStructuralFeature>;

  getEStructuralFeature(featureIdOrName: number | string): EStructuralFeature;

  getFeatureCount(): number;

  getFeatureID(feature: EStructuralFeature): number;

  getEReferences(): EList<EReference>;

  getEAllReferences(): EList<EReference>;

  getEAllContainments(): EList<EReference>;

  getEOperations(): EList<EOperation>;

  getEAllOperations(): EList<EOperation>;
}
