import { FooImpl } from '../../model/core/impl/foo-impl';

export class SampleDataCreator {
  public static createSampleFoo() {
    const foo = new FooImpl();
    foo.setName('SampleFoo');
  }
}
