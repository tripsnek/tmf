import { Foo } from '../model/core/api/foo';
import { FooImpl } from '../model/core/impl/foo-impl';

export class SampleDataCreator {
  public static createSampleFoo(): Foo {
    const foo = new FooImpl();
    foo.setName('SampleFoo');
    return foo;
  }
}
