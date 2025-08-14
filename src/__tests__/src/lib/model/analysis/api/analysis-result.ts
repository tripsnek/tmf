import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { IdedEntity } from '../../core/api/ided-entity';
import { User } from '../../core/api/user';
import { NamedEntity } from '../../core/api/named-entity';
import { AnalysisPackage } from '../analysis-package';

/**
 * Source-gen API for AnalysisResult.
 */
export interface AnalysisResult extends IdedEntity {
  getUser(): User;
  setUser(newUser: User): void;
  getObject(): NamedEntity;
  setObject(newObject: NamedEntity): void;
  cloneObject(deepCopy: boolean, newUser: User): NamedEntity;
}
