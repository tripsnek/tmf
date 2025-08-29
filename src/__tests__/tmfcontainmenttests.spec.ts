import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { AnalysisPackage } from './src/model/analysis/analysis-package';
import { CoreFactory } from './src/model/core/core-factory';
import { FooClass } from './src/model/core/api/foo-class';
import { Foo } from './src/model/core/api/foo';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { CorePackage } from './src/model/core/core-package';

const core = CorePackage.eINSTANCE;

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

describe('TMF Containment ', () => {
  it('should allow traversal to many-valued eContainer', () => {
    expect(bar1.eContainer()).toBe(foo);
    expect(baz1.eContainer()).toBe(bar1);
  });
  it('should expose eContainingFeature', () => {
    const barFeature = foo
      .eClass()
      .getEStructuralFeature(core.getFoo_Bars().getFeatureID());
    expect(barFeature?.getName()).toBe('bars');
    expect(bar1.eContainingFeature()).toBe(core.getFoo_Bars());
  });
  it('should set eContainer to null when setting named field to null', () => {
    bar1.setFoo(null!);
    expect(bar1.eContainer()).toBe(null);
  });
  it('should set eContainer when using named field setter', () => {
    bar1.setFoo(null!);
    bar1.setFoo(foo);
    expect(bar1.eContainer()).toBe(foo);
  });
  it('should unset many-valued eContainer when removing from list', () => {
    bar1.getBazzles().clear();
    bar1.getBazzles().add(baz1);
    expect(bar1.getBazzles().size()).toBe(1);
    expect(baz1.eContainer()).toBe(bar1);
    //remove contained object
    bar1.getBazzles().remove(baz1);
    expect(baz1.eContainer()).toBeFalsy();
    expect(bar1.getBazzles().size()).toBe(0);
  });
  it('should unset all eContainers on list clear', () => {
    bar1.getBazzles().clear();
    bar1.getBazzles().add(baz1);
    bar1.getBazzles().add(baz2);
    expect(bar1.getBazzles().size()).toBe(2);
    expect(baz1.eContainer()).toBe(bar1);
    expect(baz2.eContainer()).toBe(bar1);
    bar1.getBazzles().clear();
    expect(bar1.getBazzles().size()).toBe(0);
    expect(baz1.eContainer()).toBeFalsy();
    expect(baz2.eContainer()).toBeFalsy();
  });
  it('should remove from old many-valued container when added to new container', () => {
    //remove contained object
    bar1.getBazzles().clear();
    bar1.getBazzles().add(baz1);
    expect(baz1.eContainer()).toBe(bar1);
    expect(bar1.getBazzles().size()).toBe(1);
    expect(bar2.getBazzles().size()).toBe(0);
    bar2.getBazzles().add(baz1);
    expect(baz1.eContainer()).toBe(bar2);
    expect(bar1.getBazzles().size()).toBe(0);
    expect(bar2.getBazzles().size()).toBe(1);
  });
  it('should remove from old container when added to new container', () => {
    //remove contained object
    bar1.getBazzles().add(baz1);
    expect(baz1.eContainer()).toBe(bar1);
    expect(bar1.getBazzles().size()).toBe(1);
    expect(bar2.getBazzles().size()).toBe(0);
    bar2.getBazzles().add(baz1);
    expect(baz1.eContainer()).toBe(bar2);
    expect(bar1.getBazzles().size()).toBe(0);
    expect(bar2.getBazzles().size()).toBe(1);
  });
  it('should allow traversal to single-valued eContainer', () => {
    expect(foo.eContainer()).toBe(ar);
  });
  it('nulling containment should unset single-valued eContainer', () => {
    ar.setObject(undefined!);
    expect(foo.eContainer()).toBeFalsy();
  });
  it('nulling containment with eSet should unset single-valued eContainer', () => {
    ar.eSet(AnalysisPackage.eINSTANCE.getAnalysisResult_Object(), foo);
    ar.eSet(AnalysisPackage.eINSTANCE.getAnalysisResult_Object(), null);
    expect(foo.eContainer()).toBeFalsy();
  });
  it('should remove from old single-valued container when added to new container', () => {
    ar.setObject(foo);
    expect(foo.eContainer()).toBe(ar);
    const ar2 = AnalysisFactory.eINSTANCE.createAnalysisResult();
    ar2.setObject(foo);
    expect(foo.eContainer()).toBe(ar2);
    expect(ar.getObject()).toBe(null);
  });
  it('should remove from old single-valued container when added to new container with eSet', () => {
    ar.eSet(AnalysisPackage.eINSTANCE.getAnalysisResult_Object(), foo);
    expect(foo.eContainer()).toBe(ar);
    const ar2 = AnalysisFactory.eINSTANCE.createAnalysisResult();
    ar2.eSet(AnalysisPackage.eINSTANCE.getAnalysisResult_Object(), foo);
    expect(foo.eContainer()).toBe(ar2);
    expect(ar.getObject()).toBe(null);
  });
});
