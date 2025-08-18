import { Foo } from '../../model/core/api/foo';
import { FooImpl } from '../../model/core/impl/foo-impl';

export class NestedSampleDataCreator {
  public static createSampleFooFromNested(): Foo {
    const foo = new FooImpl();
    foo.setName('SampleFooFromNested');
    return foo;
  }
}
