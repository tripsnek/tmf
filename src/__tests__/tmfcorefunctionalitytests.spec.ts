import { TUtils } from '@tripsnek/tmf';

import { EPackage } from '@tripsnek/tmf';
import { AnalysisFactory } from './src/lib/model/analysis/analysis-factory';
import { CorePackage } from './src/lib/model/core/core-package';
import { CoreFactory } from './src/lib/model/core/core-factory';
import { FooClass } from './src/lib/model/core/api/foo-class';
import { Foo } from './src/lib/model/core/api/foo';
import { Bar } from './src/lib/model/core/api/bar';
import { Bazzle } from './src/lib/model/core/api/bazzle';

//create a Foo container and contents
const foo: Foo = CoreFactory.eINSTANCE.createFoo();
foo.setName('TestFoo');
foo.setFooClass(FooClass.INTERMEDIATE);
const oneToOneContainmentBaz: Bazzle = CoreFactory.eINSTANCE.createBazzle();
oneToOneContainmentBaz.setName('OneToOneContainmentBazzle');
foo.setOneToOneContainment(oneToOneContainmentBaz);
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
bar1.getBazzles().add(baz2);
foo.setOneToOneBazzle(baz2);

TUtils.generateIdsForAllContained(foo);

//single valued container for Foo
const ar = AnalysisFactory.eINSTANCE.createAnalysisResult();
ar.setObject(foo);

// console.log(foo.eClass().getEAllStructuralFeatures().length + ' attrs on Foo');

describe('TMF', () => {
  it('should preserve attributes', () => {
    expect(foo.eClass().getName()).toBe('Foo');
    expect(foo.getBars().size()).toBe(2);
  });

  it('should compute eContents()', () => {
    expect(foo.eContents().length).toBe(3);
  });
  it('should compute eAllContents()', () => {
    expect(foo.eAllContents().length).toBe(6);
  });

  it('should allow retrieval of EPackages by URI', () => {
    // tslint:disable-next-line: no-unused-expression
    CorePackage.eINSTANCE; //touch the package to make sure it has a chance to register
    const corePkg = EPackage.Registry.INSTANCE.getEPackage(
      'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model.core'
    );
    expect(corePkg).toBe(CorePackage.eINSTANCE);
  });
  it('should initialize EOperations', () => {
    expect(foo.eClass().getEOperations().size()).toBe(1);
    expect(CorePackage.eINSTANCE.getFooGroup().getEOperations().size()).toBe(3);
  });
  it('should implement eoperations', () => {
    expect(
      CoreFactory.eINSTANCE.createFooGroup()['getFoosWithBazzles']
    ).toBeTruthy();
  });

  it('should support instantiation from EClass', () => {
    const foo = CorePackage.eINSTANCE.getFoo().createInstance() as Foo;
    expect(foo).toBeTruthy();
    foo.setName('ReflectiveFoo');
    expect(foo.getName()).toBe('ReflectiveFoo');
  });
});

describe('TMF Enums', () => {
  it('should return literals by name', () => {
    expect(
      CorePackage.eINSTANCE
        .getFooClass()
        .getEEnumLiteral('MEDIUM')
        .getInstance()
    ).toBe(FooClass.MEDIUM);
  });
});
