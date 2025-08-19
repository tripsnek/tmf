import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { NamedEntity } from '../api/named-entity';
import { User } from '../api/user';
import { FooClass } from '../api/foo-class';
import { Foo } from '../api/foo';
import { Bazzle } from '../api/bazzle';

import { FooGroupGen } from '../gen/foo-group-gen';
import { FooGroup } from '../api/foo-group';

/**
 * Editable Impl class.
 */
export class FooGroupImpl extends FooGroupGen {
  public override computeFoosOfClass(fooClass: FooClass): number {
    throw new Error('Not implemented');
  }
  public override getFoosWithBazzles(bazzles: EList<Bazzle>): EList<Foo> {
    throw new Error('Not implemented');
  }
  public override freeze(): void {
    throw new Error('Not implemented');
  }
}
