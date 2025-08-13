import { CorePackage } from './src/lib/model/core/core-package';
import { CoreFactory } from './src/lib/model/core/core-factory';
import { Foo } from './src/lib/model/core/api/foo';
import { FooClass } from './src/lib/model/core/api/foo-class';
import { Bazzle } from './src/lib/model/core/api/bazzle';
import { Bar } from './src/lib/model/core/api/bar';
import { AnalysisFactory } from './src/lib/model/analysis/analysis-factory';

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

describe('TMF EOpposites ', () => {
  it('should allow traversal to many-valued eopposite', () => {
    bar1.getBackupFor().clear();
    bar1.getBackupFor().add(baz1);
    expect(baz1.getBackupBar()).toBe(bar1);
  });
  it('should unset inverse when removing from list', () => {
    bar1.getBackupFor().clear();
    bar1.getBackupFor().add(baz1);
    bar1.getBackupFor().clear();
    expect(baz1.getBackupBar()).toBe(null);
  });
  it('should unset all inverse references on list clear', () => {
    bar1.getBackupFor().clear();
    expect(bar1.getBackupFor().size()).toBe(0);
    bar1.getBackupFor().add(baz1);
    expect(bar1.getBackupFor().size()).toBe(1);
    bar1.getBackupFor().add(baz2);
    expect(bar1.getBackupFor().size()).toBe(2);
    expect(baz1.getBackupBar()).toBe(bar1);
    expect(baz2.getBackupBar()).toBe(bar1);
    bar1.getBackupFor().clear();
    expect(bar1.getBackupFor().size()).toBe(0);
    expect(baz1.getBackupBar()).toBe(null);
    expect(baz2.getBackupBar()).toBe(null);
  });
  it('should remove from old many-valued EOpposite when added to new eOpposite', () => {
    bar1.getBackupFor().clear();
    bar1.getBackupFor().add(baz1);
    expect(baz1.getBackupBar()).toBe(bar1);
    expect(bar1.getBackupFor().size()).toBe(1);
    expect(bar2.getBackupFor().size()).toBe(0);
    bar2.getBackupFor().add(baz1);
    expect(baz1.getBackupBar()).toBe(bar2);
    expect(bar1.getBackupFor().size()).toBe(0);
    expect(bar2.getBackupFor().size()).toBe(1);
  });
  it('should allow traversal to single-valued eOpposite', () => {
    bar1.getBackupFor().clear();
    bar1.getBackupFor().add(baz1);
    expect(baz1.getBackupBar()).toBe(bar1);
  });
  it('should set one-to-one eOpposite', () => {
    foo.setOneToOneBazzle(baz1);
    expect(baz1.getOneToOneFoo()).toBe(foo);
  });
  //TODO: Two above are the ones to test for eContainer I think?
  it('nulling reference should unset single-valued eOpposite', () => {
    foo.setOneToOneBazzle(baz1);
    foo.setOneToOneBazzle(null);
    expect(baz1.getOneToOneFoo()).toBe(null);
  });
  it('should remove from old single-valued eopposite when added to new single-valued eopposite', () => {
    const foo2 = CoreFactory.eINSTANCE.createFoo();
    foo.setOneToOneBazzle(baz1);
    expect(baz1.getOneToOneFoo()).toBe(foo);
    foo2.setOneToOneBazzle(baz1);
    expect(foo.getOneToOneBazzle()).toBe(null);
    expect(baz1.getOneToOneFoo()).toBe(foo2);

    //repeat the process - this was triggering a bug at one point
    foo.setOneToOneBazzle(baz1);
    expect(baz1.getOneToOneFoo()).toBe(foo);
    foo2.setOneToOneBazzle(baz1);
    expect(baz1.getOneToOneFoo()).toBe(foo2);
  });
  it('should remove from old single-valued eopposite when added to new single-valued eopposite with eSet', () => {
    const foo2 = CoreFactory.eINSTANCE.createFoo();
    foo.eSet(CorePackage.eINSTANCE.getFoo_OneToOneBazzle(), baz1);
    expect(baz1.getOneToOneFoo()).toBe(foo);
    foo2.eSet(CorePackage.eINSTANCE.getFoo_OneToOneBazzle(), baz1);
    expect(baz1.getOneToOneFoo()).toBe(foo2);
  });
  it('should allow setting eopposites from many end after one end, with null effect', () => {
    bar1.getBackupFor().clear();
    baz1.setBackupBar(bar1);
    baz2.setBackupBar(bar1);
    expect(bar1.getBackupFor().size()).toBe(2);
    //now 'add' to the many side, which should have no effect since they are already present
    bar1.getBackupFor().add(baz1);
    expect(bar1.getBackupFor().size()).toBe(2);
    bar1.getBackupFor().add(baz2);
    expect(bar1.getBackupFor().size()).toBe(2);
  });
  it('should allow setting eopposites from one end after many end, with null effect', () => {
    bar1.getBackupFor().clear();
    bar1.getBackupFor().add(baz1);
    expect(bar1.getBackupFor().size()).toBe(1);
    bar1.getBackupFor().add(baz2);
    expect(bar1.getBackupFor().size()).toBe(2);
    //now 'set' on the one side, which should have no effect since they are already present
    baz1.setBackupBar(bar1);
    expect(bar1.getBackupFor().size()).toBe(2);
    baz2.setBackupBar(bar1);
    expect(bar1.getBackupFor().size()).toBe(2);
  });
  it('should enforce inverse container reference on add', () => {
    foo.getBars().clear();
    foo.getBars().add(bar1);
    expect(bar1.getFoo()).toBe(foo);
  });
  it('should unset container and field on multiple clears', () => {
    foo.getBars().clear();
    expect(bar1.eContainer()).toBeFalsy();
    expect(bar1.getFoo()).toBeFalsy();
    foo.getBars().add(bar1);
    expect(bar1.eContainer()).toBe(foo);
    foo.getBars().clear();
    expect(bar1.eContainer()).toBeFalsy();
  });
  it('should unset container on list remove', () => {
    foo.getBars().clear();
    expect(foo.getBars().size()).toBe(0);
    foo.getBars().add(bar1);
    expect(foo.getBars().size()).toBe(1);
    expect(bar1.eContainer()).toBe(foo);
    foo.getBars().remove(bar1);
    expect(bar1.eContainer()).toBeFalsy();
  });
});
