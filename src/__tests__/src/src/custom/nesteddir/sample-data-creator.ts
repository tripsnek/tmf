import { FooImpl } from '../../../model/core/impl/foo-impl';

export class NestedSampleDataCreator {
  public static createSampleFooFromNested() {
    const foo = new FooImpl();
    foo.setName('SampleFooFromNested');
  }
}
