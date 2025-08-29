import { CoreFactory } from './src/model/core/core-factory';
import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { Foo } from './src/model/core/api/foo';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { User } from './src/model/core/api/user';
import { FooGroup } from './src/model/core/api/foo-group';
import { BoundedNumber } from './src/model/core/api/bounded-number';
import { AnalysisResult } from './src/model/analysis/api/analysis-result';
import { EFactory } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EPackage } from '@tripsnek/tmf';

// Test data
let coreFactory: EFactory;
let analysisFactory: EFactory;
let corePackage: EPackage;
let analysisPackage: EPackage;
let fooClass: EClass;
let barClass: EClass;
let bazzleClass: EClass;
let userClass: EClass;
let fooGroupClass: EClass;
let boundedNumberClass: EClass;
let analysisResultClass: EClass;

beforeEach(() => {
  // Get factories
  coreFactory = CoreFactory.eINSTANCE;
  analysisFactory = AnalysisFactory.eINSTANCE;

  // Create test objects to get their classes and packages
  const testFoo = CoreFactory.eINSTANCE.createFoo();
  const testBar = CoreFactory.eINSTANCE.createBar();
  const testBazzle = CoreFactory.eINSTANCE.createBazzle();
  const testUser = CoreFactory.eINSTANCE.createUser();
  const testFooGroup = CoreFactory.eINSTANCE.createFooGroup();
  const testBoundedNumber = CoreFactory.eINSTANCE.createBoundedNumber();
  const testAnalysisResult = AnalysisFactory.eINSTANCE.createAnalysisResult();

  // Get packages
  corePackage = testFoo.eClass().getEPackage();
  analysisPackage = testAnalysisResult.eClass().getEPackage();

  // Get EClasses
  fooClass = testFoo.eClass();
  barClass = testBar.eClass();
  bazzleClass = testBazzle.eClass();
  userClass = testUser.eClass();
  fooGroupClass = testFooGroup.eClass();
  boundedNumberClass = testBoundedNumber.eClass();
  analysisResultClass = testAnalysisResult.eClass();
});

describe('EFactory Tests', () => {
  describe('Basic Factory Properties', () => {
    it('should provide access to factory instances', () => {
      expect(coreFactory).toBeDefined();
      expect(analysisFactory).toBeDefined();
      expect(CoreFactory.eINSTANCE).toBe(coreFactory);
      expect(AnalysisFactory.eINSTANCE).toBe(analysisFactory);
    });

    it('should be associated with correct packages', () => {
      const corePackageFactory = corePackage.getEFactoryInstance();
      const analysisPackageFactory = analysisPackage.getEFactoryInstance();

      expect(corePackageFactory).toBe(coreFactory);
      expect(analysisPackageFactory).toBe(analysisFactory);
    });

    it('should maintain singleton pattern', () => {
      const factory1 = CoreFactory.eINSTANCE;
      const factory2 = CoreFactory.eINSTANCE;

      expect(factory1).toBe(factory2);

      const analysisFactory1 = AnalysisFactory.eINSTANCE;
      const analysisFactory2 = AnalysisFactory.eINSTANCE;

      expect(analysisFactory1).toBe(analysisFactory2);
    });
  });

  describe('Object Creation via Specific Factory Methods', () => {
    it('should create Foo objects correctly', () => {
      const foo = CoreFactory.eINSTANCE.createFoo();

      expect(foo).toBeDefined();
      expect(foo).toBeInstanceOf(Object);
      expect(foo.eClass()).toBe(fooClass);
      expect(foo.eClass().getName()).toBe('Foo');
    });

    it('should create Bar objects correctly', () => {
      const bar = CoreFactory.eINSTANCE.createBar();

      expect(bar).toBeDefined();
      expect(bar.eClass()).toBe(barClass);
      expect(bar.eClass().getName()).toBe('Bar');
    });

    it('should create Bazzle objects correctly', () => {
      const bazzle = CoreFactory.eINSTANCE.createBazzle();

      expect(bazzle).toBeDefined();
      expect(bazzle.eClass()).toBe(bazzleClass);
      expect(bazzle.eClass().getName()).toBe('Bazzle');
    });

    it('should create User objects correctly', () => {
      const user = CoreFactory.eINSTANCE.createUser();

      expect(user).toBeDefined();
      expect(user.eClass()).toBe(userClass);
      expect(user.eClass().getName()).toBe('User');
    });

    it('should create FooGroup objects correctly', () => {
      const fooGroup = CoreFactory.eINSTANCE.createFooGroup();

      expect(fooGroup).toBeDefined();
      expect(fooGroup.eClass()).toBe(fooGroupClass);
      expect(fooGroup.eClass().getName()).toBe('FooGroup');
    });

    it('should create BoundedNumber objects correctly', () => {
      const boundedNumber = CoreFactory.eINSTANCE.createBoundedNumber();

      expect(boundedNumber).toBeDefined();
      expect(boundedNumber.eClass()).toBe(boundedNumberClass);
      expect(boundedNumber.eClass().getName()).toBe('BoundedNumber');
    });

    it('should create AnalysisResult objects correctly', () => {
      const analysisResult = AnalysisFactory.eINSTANCE.createAnalysisResult();

      expect(analysisResult).toBeDefined();
      expect(analysisResult.eClass()).toBe(analysisResultClass);
      expect(analysisResult.eClass().getName()).toBe('AnalysisResult');
    });
  });

  describe('Object Creation via Generic create() Method', () => {
    it('should create objects using generic create method with EClass', () => {
      const foo = coreFactory.create(fooClass);

      expect(foo).toBeDefined();
      expect(foo.eClass()).toBe(fooClass);
      expect(foo.eClass().getName()).toBe('Foo');
    });

    it('should create different types of objects via generic method', () => {
      const bar = coreFactory.create(barClass);
      const bazzle = coreFactory.create(bazzleClass);
      const user = coreFactory.create(userClass);

      expect(bar.eClass()).toBe(barClass);
      expect(bazzle.eClass()).toBe(bazzleClass);
      expect(user.eClass()).toBe(userClass);
    });

    it('should create objects from different packages', () => {
      const foo = coreFactory.create(fooClass);
      const analysisResult = analysisFactory.create(analysisResultClass);

      expect(foo.eClass().getEPackage()).toBe(corePackage);
      expect(analysisResult.eClass().getEPackage()).toBe(analysisPackage);
    });

    it('should handle specialization classes', () => {
      // Try to create specialized versions if they exist
      const fooSpecClass = corePackage.getEClassifier('FooSpecialization');
      if (fooSpecClass) {
        const fooSpec = coreFactory.create(fooSpecClass as EClass);
        expect(fooSpec).toBeDefined();
        expect(fooSpec.eClass().getName()).toBe('FooSpecialization');
      }
    });
  });

  describe('Created Object Properties', () => {
    it('should create objects with proper initial state', () => {
      const foo = CoreFactory.eINSTANCE.createFoo();
      const bar = CoreFactory.eINSTANCE.createBar();
      const user = CoreFactory.eINSTANCE.createUser();

      // Objects should not have container initially
      expect(foo.eContainer()).toBeUndefined();
      expect(bar.eContainer()).toBeUndefined();
      expect(user.eContainer()).toBeUndefined();

      // Objects should have empty collections for many-valued features
      expect(foo.getBars().size()).toBe(0);
      expect(bar.getBazzles().size()).toBe(0);
    });

    it('should create objects that support all expected operations', () => {
      const foo = CoreFactory.eINSTANCE.createFoo();
      const bar = CoreFactory.eINSTANCE.createBar();

      // Basic EObject operations should work
      expect(() => foo.eClass()).not.toThrow();
      expect(() => foo.eContainer()).not.toThrow();
      expect(() => foo.eContents()).not.toThrow();

      // Type-specific operations should work
      expect(() => foo.getName()).not.toThrow();
      expect(() => foo.setName('test')).not.toThrow();
      expect(() => foo.getBars()).not.toThrow();

      expect(() => bar.getName()).not.toThrow();
      expect(() => bar.setName('test')).not.toThrow();
      expect(() => bar.getBazzles()).not.toThrow();
    });

    it('should create objects with proper type hierarchy', () => {
      const foo = CoreFactory.eINSTANCE.createFoo();
      const user = CoreFactory.eINSTANCE.createUser();

      // Foo extends NamedEntity which extends IdedEntity
      const fooSupertypes = foo.eClass().getEAllSuperTypes();
      const supertypeNames = fooSupertypes.map((st) => st.getName());
      expect(supertypeNames.contains('NamedEntity')).toBe(true);
      expect(supertypeNames.contains('IdedEntity')).toBe(true);

      // User extends NamedEntity which extends IdedEntity
      const userSupertypes = user.eClass().getEAllSuperTypes();
      const userSupertypeNames = userSupertypes.map((st) => st.getName());
      expect(userSupertypeNames.contains('NamedEntity')).toBe(true);
      expect(userSupertypeNames.contains('IdedEntity')).toBe(true);
    });
  });

  describe('Factory Error Handling', () => {
    it('should handle null EClass gracefully', () => {
      expect(() => coreFactory.create(null!)).toThrow();
    });

    it('should handle undefined EClass gracefully', () => {
      expect(() => coreFactory.create(undefined!)).toThrow();
    });

    it('should handle abstract classes appropriately', () => {
      // Try to create an abstract class if one exists
      const namedEntityClass = fooClass.getESuperTypes().get(0); // Should be NamedEntity (abstract)

      if (namedEntityClass.isAbstract()) {
        expect(() => coreFactory.create(namedEntityClass)).toThrow();
      }
    });
  });

  describe('Factory and Package Relationships', () => {
    it('should maintain consistent factory-package relationships', () => {
      expect(corePackage.getEFactoryInstance()).toBe(coreFactory);
      expect(analysisPackage.getEFactoryInstance()).toBe(analysisFactory);
    });

    it('should allow factory instance changes', () => {
      const originalFactory = corePackage.getEFactoryInstance();

      // This is more of a structural test - setting factory should not throw
      expect(() => corePackage.setEFactoryInstance(coreFactory)).not.toThrow();
      expect(corePackage.getEFactoryInstance()).toBe(coreFactory);

      // Reset
      corePackage.setEFactoryInstance(originalFactory);
    });

    it('should handle factory lookup via package registry', () => {
      if (
        typeof EPackage !== 'undefined' &&
        typeof EPackage.Registry !== 'undefined'
      ) {
        const foundCoreFactory = EPackage.Registry.INSTANCE.getEFactory(
          corePackage.getNsURI()
        );
        const foundAnalysisFactory = EPackage.Registry.INSTANCE.getEFactory(
          analysisPackage.getNsURI()
        );

        expect(foundCoreFactory).toBe(coreFactory);
        expect(foundAnalysisFactory).toBe(analysisFactory);
      }
    });
  });

  describe('Multiple Object Creation', () => {
    it('should create multiple objects of same type correctly', () => {
      const foo1 = CoreFactory.eINSTANCE.createFoo();
      const foo2 = CoreFactory.eINSTANCE.createFoo();
      const foo3 = CoreFactory.eINSTANCE.createFoo();

      // Should be different instances
      expect(foo1).not.toBe(foo2);
      expect(foo2).not.toBe(foo3);
      expect(foo1).not.toBe(foo3);

      // But same type
      expect(foo1.eClass()).toBe(foo2.eClass());
      expect(foo2.eClass()).toBe(foo3.eClass());
      expect(foo1.eClass()).toBe(fooClass);
    });

    it('should create mixed object types correctly', () => {
      const objects = [
        CoreFactory.eINSTANCE.createFoo(),
        CoreFactory.eINSTANCE.createBar(),
        CoreFactory.eINSTANCE.createBazzle(),
        CoreFactory.eINSTANCE.createUser(),
        CoreFactory.eINSTANCE.createFooGroup(),
        CoreFactory.eINSTANCE.createBoundedNumber(),
      ];

      // All should be different types
      const classNames = objects.map((obj) => obj.eClass().getName());
      expect(new Set(classNames).size).toBe(objects.length);

      // All should be properly created
      for (const obj of objects) {
        expect(obj).toBeDefined();
        expect(obj.eClass()).toBeDefined();
        expect(obj.eContainer()).toBeUndefined(); // No container initially
      }
    });

    it('should handle high-volume object creation', () => {
      const objects: Foo[] = [];
      const count = 100;

      // Create many objects
      for (let i = 0; i < count; i++) {
        const foo = CoreFactory.eINSTANCE.createFoo();
        foo.setName(`Foo_${i}`);
        objects.push(foo);
      }

      expect(objects.length).toBe(count);

      // Verify all are properly created and unique
      const names = new Set(objects.map((foo) => foo.getName()));
      expect(names.size).toBe(count);

      // Verify all have correct type
      for (const foo of objects) {
        expect(foo.eClass()).toBe(fooClass);
      }
    });
  });

  describe('Factory Method Consistency', () => {
    it('should produce equivalent objects via different creation methods', () => {
      const foo1 = CoreFactory.eINSTANCE.createFoo();
      const foo2 = coreFactory.create(foo1.eClass());

      // Different instances
      expect(foo1).not.toBe(foo2);

      // Same type and properties
      expect(foo1.eClass()).toBe(foo2.eClass());
      expect(foo1.eClass()).toBe(fooClass);
      expect(foo1.eContainer()).toBe(foo2.eContainer()); // both undefined

      // Same behavior
      foo1.setName('Test1');
      foo2.setName('Test2');
      expect(foo1.getName()).toBe('Test1');
      expect(foo2.getName()).toBe('Test2');
    });

    it('should maintain object identity and uniqueness', () => {
      const objects = [
        CoreFactory.eINSTANCE.createFoo(),
        coreFactory.create(fooClass),
        CoreFactory.eINSTANCE.createBar(),
        coreFactory.create(barClass),
      ];

      // All should be unique instances
      for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
          expect(objects[i]).not.toBe(objects[j]);
        }
      }

      // But pairs of same type should have same EClass
      expect(objects[0].eClass()).toBe(objects[1].eClass()); // both Foo
      expect(objects[2].eClass()).toBe(objects[3].eClass()); // both Bar
      expect(objects[0].eClass()).not.toBe(objects[2].eClass()); // Foo vs Bar
    });
  });

  describe('Edge Cases and Complex Scenarios', () => {
    it('should handle creation of objects with complex containment structures', () => {
      const foo = CoreFactory.eINSTANCE.createFoo();
      const bar = CoreFactory.eINSTANCE.createBar();
      const bazzle = CoreFactory.eINSTANCE.createBazzle();

      // Set up containment
      foo.getBars().add(bar);
      bar.getBazzles().add(bazzle);

      // Verify containment is properly established
      expect(bar.eContainer()).toBe(foo);
      expect(bazzle.eContainer()).toBe(bar);
      expect(foo.eAllContents()).toContain(bar);
      expect(foo.eAllContents()).toContain(bazzle);
    });

    it('should handle creation of objects with bidirectional references', () => {
      const bar = CoreFactory.eINSTANCE.createBar();
      const bazzle = CoreFactory.eINSTANCE.createBazzle();

      // Set up bidirectional reference
      bar.getBackupFor().add(bazzle);

      // Verify bidirectional relationship
      expect(bazzle.getBackupBar()).toBe(bar);
      expect(bar.getBackupFor().contains(bazzle)).toBe(true);
    });
  });
});
