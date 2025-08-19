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

import { AnalysisResultGen } from '../gen/analysis-result-gen';
import { AnalysisResult } from '../api/analysis-result';

/**
 * Editable Impl class.
 */
export class AnalysisResultImpl extends AnalysisResultGen {
  public override cloneObject(deepCopy: boolean, newUser: User): NamedEntity {
    throw new Error('Not implemented');
  }
}
