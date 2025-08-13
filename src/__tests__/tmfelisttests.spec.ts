import { AnalysisFactory } from './src/lib/model/analysis/analysis-factory';
import { Bar } from './src/lib/model/core/api/bar';
import { CoreFactory } from './src/lib/model/core/core-factory';
import { Foo } from './src/lib/model/core/api/foo';
import { FooClass } from './src/lib/model/core/api/foo-class';
import { Bazzle } from './src/lib/model/core/api/bazzle';

//create a Foo container and contents
const foo: Foo = CoreFactory.eINSTANCE.createFoo();
foo.setName('TestFoo');
foo.setFooClass(FooClass.INTERMEDIATE);
const bar1: Bar = CoreFactory.eINSTANCE.createBar();
const bar2: Bar = CoreFactory.eINSTANCE.createBar();
bar1.setName('TestBar1');
bar2.setName('TestBar2');
const baz1: Bazzle = CoreFactory.eINSTANCE.createBazzle();
const baz2: Bazzle = CoreFactory.eINSTANCE.createBazzle();
baz1.setName('TestBazzle1');
baz2.setName('TestBazzle2');
foo.getBars().add(bar1);
foo.getBars().add(bar2);
bar1.getBazzles().add(baz1);

//single valued container for Foo
const ar = AnalysisFactory.eINSTANCE.createAnalysisResult();
ar.setObject(foo);

describe('TMF EList', () => {
  it('should detect contains object', () => {
    expect(bar1.getBazzles().contains(baz1)).toBe(true);
    expect(bar1.getBazzles().contains(baz2)).toBe(false);
  });
  it('should implement addAll', () => {
    bar1.getBazzles().clear();
    expect(bar1.getBazzles().size()).toBe(0);
    bar1.getBazzles().addAll([baz1, baz2]);
    expect(bar1.getBazzles().contains(baz1)).toBe(true);
    expect(bar1.getBazzles().contains(baz2)).toBe(true);
    expect(bar1.getBazzles().size()).toBe(2);
  });
  it('should not allow multiple occurrences in containment list', () => {
    bar1.getBazzles().clear();
    expect(bar1.getBazzles().size()).toBe(0);
    bar1.getBazzles().add(baz1);
    bar1.getBazzles().add(baz2);
    bar1.getBazzles().add(baz1);
    expect(bar1.getBazzles().size()).toBe(2);
  });
  it('should implement map', () => {
    bar1.getBazzles().clear();
    bar1.getBazzles().add(baz1);
    bar1.getBazzles().add(baz2);

    const bazzleNames = bar1.getBazzles().map((bazzle) => bazzle.getName());
    expect(bazzleNames.size()).toBe(2);
    expect(bazzleNames.get(0)).toBe(baz1.getName());
    expect(bazzleNames.get(1)).toBe(baz2.getName());
  });
  it('should implement pop', () => {
    bar1.getBazzles().clear();
    bar1.getBazzles().add(baz1);
    bar1.getBazzles().add(baz2);

    const popped = bar1.getBazzles().pop();
    expect(bar1.getBazzles().size()).toBe(1);
    expect(popped).toBe(baz2);
    expect(bar1.getBazzles().get(0)).toBe(baz1);
  });
  it('should allow re-add after clear', () => {
    foo.getBars().clear();
    expect(foo.getBars().size()).toBe(0);
    foo.getBars().add(bar1);
    expect(foo.getBars().size()).toBe(1);
    expect(bar1.getFoo()).toBe(foo);
  });
  it('should allow attribute add', () => {
    foo.getManyAttribute().clear();
    foo.getManyAttribute().add('TestAttr1');
    foo.getManyAttribute().add('TestAttr2');
    expect(foo.getManyAttribute().size()).toBe(2);
    expect(foo.getManyAttribute().get(0)).toBe('TestAttr1');
  });
  it('should allow attribute remove', () => {
    foo.getManyAttribute().clear();
    foo.getManyAttribute().add('TestAttr1');
    foo.getManyAttribute().add('TestAttr2');
    foo.getManyAttribute().remove('TestAttr1');
    expect(foo.getManyAttribute().size()).toBe(1);
    expect(foo.getManyAttribute().get(0)).toBe('TestAttr2');
  });
  it('should allow attribute clear', () => {
    foo.getManyAttribute().clear();
    foo.getManyAttribute().add('TestAttr1');
    foo.getManyAttribute().add('TestAttr2');
    foo.getManyAttribute().clear();
    expect(foo.getManyAttribute().size()).toBe(0);
  });
  it('should allow attribute re-add after clear', () => {
    foo.getManyAttribute().clear();
    foo.getManyAttribute().add('TestAttr1');
    foo.getManyAttribute().clear();
    foo.getManyAttribute().add('TestNewAttr');
    expect(foo.getManyAttribute().size()).toBe(1);
    expect(foo.getManyAttribute().get(0)).toBe('TestNewAttr');
  });
  it('should implement for each', () => {
    foo.getManyAttribute().clear();
    foo.getManyAttribute().add('TestAttr1');
    foo.getManyAttribute().add('TestNewAttr');

    let concat = '';
    foo.getManyAttribute().forEach((thing) => {
      concat += thing;
    });
    expect(concat).toBe('TestAttr1TestNewAttr');
  });
});
