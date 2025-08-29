import { TJson } from '@tripsnek/tmf';

import { TUtils } from '@tripsnek/tmf';
import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { AnalysisResult } from './src/model/analysis/api/analysis-result';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { Foo } from './src/model/core/api/foo';
import { FooClass } from './src/model/core/api/foo-class';
import { CoreFactory } from './src/model/core/core-factory';
import { CorePackage } from './src/model/core/core-package';
import { BoundedNumberImpl } from './src/model/core/impl/bounded-number-impl';

//configure TJson with test packages
const fact = CoreFactory.eINSTANCE;

const currentDate = new Date();

//for cross aggregate reference
const otherFoo = fact.createFoo();
const otherFoo2 = fact.createFoo();
TUtils.genIdIfNotExists(otherFoo);
TUtils.genIdIfNotExists(otherFoo2);

//create a Foo container and contents
const foo: Foo = fact.createFoo();
foo.setName('TestFoo');
foo.getManyAttribute().add('TestManyAttr1');
foo.getManyAttribute().add('TestManyAttr2');
foo.eSet(CorePackage.eINSTANCE.getFoo_UnchangeableAttribute(), 'TestValue');
foo.setTransientAttribute('ShouldNotSerialize');
foo.setTransientReference(fact.createFoo());
foo.setFooClass(FooClass.INTERMEDIATE);
foo.setCreationDate(currentDate);
foo.getManyCrossAggregate().add(otherFoo);
foo.getManyCrossAggregate().add(otherFoo2);
const num1 = new BoundedNumberImpl();
num1.setMinValue(1.0);
num1.setMaxValue(2.5);
num1.setUnits('ft');
const num2 = new BoundedNumberImpl();
num2.setMinValue(0.0);
num2.setMaxValue(10.5);
num2.setUnits('kg');
foo.getManyValueObjects().add(num1);
foo.getManyValueObjects().add(num2);
const bar1: Bar = fact.createBar();
const bar2: Bar = fact.createBar();
const bz: Bazzle = fact.createBazzle();
bz.setName('TestBazzle');
const bz2: Bazzle = fact.createBazzle();
bz2.setName('TestBazzle2');
foo.getBars().add(bar1);
foo.getBars().add(bar2);
foo.setOneToOneBazzle(bz);
bar1.getBazzles().add(bz);
bar1.getBazzles().add(bz2);
bz.setBackupBar(bar2);
bz2.setBackupBar(bar2);

const foo2 = fact.createFoo();
foo2.setName('Foo2');
foo2.setFooClass(FooClass.SHORT);
const foo2Bar = fact.createBar();
foo2Bar.setName('Foo2Bar');
foo2.getBars().add(foo2Bar);

// console.log(m.eClass().getEAllStructuralFeatures().length + ' attrs on Foo');

//validate Foo contents
expect(foo.eClass().getName()).toBe('Foo');
expect(foo.getBars().size()).toBe(2);
expect(foo.getCreationDate()).toBe(currentDate);

//put it inside an AnalysisResult - which demonstrates cross-package containment and inheritance
const rootContainer = AnalysisFactory.eINSTANCE.createAnalysisResult();
rootContainer.setObject(foo);

//serialize root
const jsonRoot = TJson.makeJson(rootContainer);
// console.log(jsonRoot);

//deserialize root
const deserializedRoot = TJson.makeEObject(jsonRoot) as AnalysisResult;
const deserializedFoo = deserializedRoot.getObject() as Foo;

//validate deserialized Foo contents
describe('TJson', () => {
  it('should preserve primitive attributes', () => {
    expect(deserializedFoo.getName()).toBe('TestFoo');
  });
  it('should preserve many-valued primitive attributes', () => {
    expect(deserializedFoo.getManyAttribute().size()).toBe(2);
    expect(deserializedFoo.getManyAttribute().get(0)).toBe('TestManyAttr1');
    expect(deserializedFoo.getManyAttribute().get(1)).toBe('TestManyAttr2');
  });
  it('should preserve dates', () => {
    expect(deserializedFoo.getCreationDate()).toStrictEqual(currentDate);
  });
  it('should preserve unchangeable values', () => {
    expect(deserializedFoo.getUnchangeableAttribute()).toStrictEqual(
      'TestValue'
    );
  });
  it('should preserve primitive enum values', () => {
    expect(deserializedFoo.getFooClass()).toBe(FooClass.INTERMEDIATE);
  });
  it('should preserve primitive falsy 0 enum values', () => {
    const jsonFoo2 = TJson.makeJson(foo2);
    const deserializedFoo2 = TJson.makeEObject(jsonFoo2) as Foo;
    expect(deserializedFoo2.getFooClass()).toBe(FooClass.SHORT);
  });
  it('should ignore transient attributes', () => {
    expect(deserializedFoo.getTransientAttribute()).toBeFalsy();
  });
  it('should preserve many-valued value object references', () => {
    expect(deserializedFoo.getManyValueObjects().size()).toBe(2);
    expect(deserializedFoo.getManyValueObjects().get(0).getMaxValue()).toBe(
      2.5
    );
    expect(deserializedFoo.getManyValueObjects().get(0).getUnits()).toBe('ft');
    expect(deserializedFoo.getManyValueObjects().get(1).getMaxValue()).toBe(
      10.5
    );
    expect(deserializedFoo.getManyValueObjects().get(1).getUnits()).toBe('kg');
  });
  it('should ignore transient containments', () => {
    expect(deserializedFoo.getTransientReference()).toBeFalsy();
  });
  it('should preserve many-valued contained objects', () => {
    expect(deserializedFoo.getBars().size()).toBe(2);
  });
  it('should preserve inverse references to container', () => {
    expect(deserializedFoo.getBars().get(0).getFoo()).toBe(deserializedFoo);
  });
  it('should assign IDs to all objects in heirarchy', () => {
    expect(deserializedFoo.getBars().get(1).getId()).toBeTruthy();
  });
  it('should preserve many-valued contained objects recursively', () => {
    const ds1 = deserializedFoo.getBars().get(0);
    expect(ds1.getBazzles().size()).toBe(2);
    const e1 = ds1.getBazzles().get(0);
    expect(e1.getName()).toBe('TestBazzle');
  });
  it('should preserve single-valued aggregate internal references', () => {
    expect(deserializedFoo.getOneToOneBazzle().getName()).toBe('TestBazzle');
  });
  it('should preserve single-valued aggregate internal references recursively', () => {
    const br1 = deserializedFoo.getBars().get(0);
    const br2 = deserializedFoo.getBars().get(1);
    const z1 = br1.getBazzles().get(0);
    const z2 = br1.getBazzles().get(1);
    expect(z1.getBackupBar()).toBe(br2);
    expect(z2.getBackupBar()).toBe(br2);
  });
  it('should preserve many-valued aggregate internal references', () => {
    const br2 = deserializedFoo.getBars().get(1);
    expect(br2.getBackupFor().size()).toBe(2);
  });

  it('should serialize arrays of aggregates', () => {
    const foos = [foo, foo2];
    const serialized = TJson.makeJsonArray(foos);
    expect(serialized.length).toBe(2);
  });
  it('should deserialize arrays of aggregates', () => {
    const foos = [foo, foo2];
    const deserialized = TJson.makeEObjectArray(
      TJson.makeJsonArray(foos)
    ) as Foo[];
    expect(deserialized.length).toBe(2);
    expect(deserialized[0]!.getBars().size()).toBe(2);
    expect(deserialized[1]!.getBars().get(0).getName()).toBe('Foo2Bar');
  });
  it('should stringify arrays of aggregates', () => {
    const foos = [foo, foo2];
    const serialized = TJson.makeJsonArray(foos);
    // console.log(serialized);
    JSON.stringify(serialized);
  });
  it('should create proxies for in-aggregate references to external instances', () => {
    const f1 = fact.createFoo();
    const f2 = fact.createFoo();
    const b1 = fact.createBar();
    const b2 = fact.createBar();
    f1.getBars().add(b1);
    f2.getBars().add(b2);
    const baz1 = fact.createBazzle();
    b1.getBazzles().add(baz1);
    //set internal ref to an external object
    baz1.setBackupBar(b2);
    const throughJson = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    expect(
      throughJson.getBars().get(0).getBazzles().get(0).getBackupBar().eIsProxy()
    ).toBe(true);
  });
  it('should be informative when packages are not initialized', () => {
    // const
    const foos = [foo, foo2];
    const serialized = TJson.makeJsonArray(foos);
    expect(serialized.length).toBe(2);
  });
});
