import { TJson } from '@tripsnek/tmf';

import { TUtils } from '@tripsnek/tmf';
import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { AnalysisPackage } from './src/model/analysis/analysis-package';
import { AnalysisResult } from './src/model/analysis/api/analysis-result';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { Foo } from './src/model/core/api/foo';
import { FooClass } from './src/model/core/api/foo-class';
import { CoreFactory } from './src/model/core/core-factory';
import { CorePackage } from './src/model/core/core-package';
import { BoundedNumberImpl } from './src/model/core/impl/bounded-number-impl';
import { ModelPackage } from './src/model/model-package';
import { CapitalizedPackagePackage } from './src/model/core/CapitalizedPackage/capitalized-package-package';

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
describe('TUtils', () => {
  it('should get transitive closure of packages', () => {
    const allPkgs = TUtils.allPackagesRecursive(ModelPackage.eINSTANCE);
    expect(allPkgs.length).toBe(4);
    expect(allPkgs.indexOf(CorePackage.eINSTANCE)).toBeGreaterThan(-1);
    expect(allPkgs.indexOf(AnalysisPackage.eINSTANCE)).toBeGreaterThan(-1);
    expect(allPkgs.indexOf(ModelPackage.eINSTANCE)).toBeGreaterThan(-1);
    expect(
      allPkgs.indexOf(CapitalizedPackagePackage.eINSTANCE)
    ).toBeGreaterThan(-1);
  });

  it('should get roots', () => {
    const allRoots = TUtils.getRootEClasses(ModelPackage.eINSTANCE);
    expect(allRoots.length).toBe(3);
  });
});
