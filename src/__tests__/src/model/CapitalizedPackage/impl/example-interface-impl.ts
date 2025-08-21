import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { Foo } from '../../core/api/foo';
import { FooGroup } from '../../core/api/foo-group';

import { ExampleInterfaceGen } from '../gen/example-interface-gen';
import { ExampleInterface } from '../api/example-interface';

/**
 * Editable Impl class.
 */
export class ExampleInterfaceImpl extends ExampleInterfaceGen {
  public override interfaceOperation(fooGroup: EList<FooGroup>): Foo {
    throw new Error('Not implemented');
  }
}
