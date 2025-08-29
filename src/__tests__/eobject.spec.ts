import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { Bar } from './src/model/core/api/bar';
import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { FooClass } from './src/model/core/api/foo-class';
import { Bazzle } from './src/model/core/api/bazzle';
import { User } from './src/model/core/api/user';
import { FooGroup } from './src/model/core/api/foo-group';
import { BoundedNumber } from './src/model/core/api/bounded-number';
import { AnalysisResult } from './src/model/analysis/api/analysis-result';
import { EClass } from '@tripsnek/tmf';

// Create test data
let testFoo: Foo;
let testBar1: Bar;
let testBar2: Bar;
let testBazzle1: Bazzle;
let testBazzle2: Bazzle;
let testUser: User;
let testFooGroup: FooGroup;
let testBoundedNumber: BoundedNumber;
let testAnalysisResult: AnalysisResult;

let fooClass: EClass;
let barClass: EClass;
let bazzleClass: EClass;

beforeEach(() => {
  // Create fresh test objects for each test
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testBar1 = CoreFactory.eINSTANCE.createBar();
  testBar2 = CoreFactory.eINSTANCE.createBar();
  testBazzle1 = CoreFactory.eINSTANCE.createBazzle();
  testBazzle2 = CoreFactory.eINSTANCE.createBazzle();
  testUser = CoreFactory.eINSTANCE.createUser();
  testFooGroup = CoreFactory.eINSTANCE.createFooGroup();
  testBoundedNumber = CoreFactory.eINSTANCE.createBoundedNumber();
  testAnalysisResult = AnalysisFactory.eINSTANCE.createAnalysisResult();

  // Set up basic properties
  testFoo.setName('TestFoo');
  testFoo.setFooClass(FooClass.INTERMEDIATE);
  testBar1.setName('TestBar1');
  testBar2.setName('TestBar2');
  testBazzle1.setName('TestBazzle1');
  testBazzle2.setName('TestBazzle2');
  testUser.setName('TestUser');
  testUser.setEmail('test@example.com');
  testFooGroup.setName('TestFooGroup');

  // Get EClasses
  fooClass = testFoo.eClass();
  barClass = testBar1.eClass();
  bazzleClass = testBazzle1.eClass();
});

describe('EObject Tests', () => {
  describe('Basic EObject Properties', () => {
    it('should return correct EClass', () => {
      expect(testFoo.eClass()).toBe(fooClass);
      expect(testBar1.eClass()).toBe(barClass);
      expect(testBazzle1.eClass()).toBe(bazzleClass);
    });

    it('should return consistent EClass instances', () => {
      const foo2 = CoreFactory.eINSTANCE.createFoo();
      expect(testFoo.eClass()).toBe(foo2.eClass());
    });
  });

  describe('Container Relationships', () => {
    it('should initially have no container', () => {
      expect(testFoo.eContainer()).toBeUndefined();
      expect(testBar1.eContainer()).toBeUndefined();
      expect(testBazzle1.eContainer()).toBeUndefined();
    });

    it('should establish container relationship when adding to containment reference', () => {
      testFoo.getBars().add(testBar1);

      expect(testBar1.eContainer()).toBe(testFoo);
      expect(testFoo.eContainer()).toBeUndefined(); // foo is not contained
    });

    it('should establish nested container relationships', () => {
      testFoo.getBars().add(testBar1);
      testBar1.getBazzles().add(testBazzle1);

      expect(testBar1.eContainer()).toBe(testFoo);
      expect(testBazzle1.eContainer()).toBe(testBar1);
    });

    it('should update container when moving objects between containers', () => {
      testFoo.getBars().add(testBar1);
      testBar1.getBazzles().add(testBazzle1);

      // Move bazzle to bar2
      testFoo.getBars().add(testBar2);
      testBar2.getBazzles().add(testBazzle1);

      expect(testBazzle1.eContainer()).toBe(testBar2);
      expect(testBar1.getBazzles().contains(testBazzle1)).toBe(false);
    });

    it('should clear container when removing from containment', () => {
      testFoo.getBars().add(testBar1);
      expect(testBar1.eContainer()).toBe(testFoo);

      testFoo.getBars().remove(testBar1);
      expect(testBar1.eContainer()).toBeUndefined();
    });
  });

  describe('Containing Feature', () => {
    it('should return undefined for root objects', () => {
      expect(testFoo.eContainingFeature()).toBeUndefined();
    });

    it('should return correct containing feature for contained objects', () => {
      testFoo.getBars().add(testBar1);

      const containingFeature = testBar1.eContainingFeature();
      expect(containingFeature).toBeDefined();
      expect(containingFeature!.getName()).toBe('bars');
    });

    it('should return correct containing feature for nested objects', () => {
      testFoo.getBars().add(testBar1);
      testBar1.getBazzles().add(testBazzle1);

      const bazzleContainingFeature = testBazzle1.eContainingFeature();
      expect(bazzleContainingFeature).toBeDefined();
      expect(bazzleContainingFeature!.getName()).toBe('bazzles');
    });
  });

  describe('Contents Navigation', () => {
    it('should return immediate contents', () => {
      testFoo.getBars().add(testBar1);
      testFoo.getBars().add(testBar2);

      const contents = testFoo.eContents();
      expect(contents.length).toBe(2);
      expect(contents).toContain(testBar1);
      expect(contents).toContain(testBar2);
    });

    it('should return all contents recursively', () => {
      testFoo.getBars().add(testBar1);
      testBar1.getBazzles().add(testBazzle1);
      testBar1.getBazzles().add(testBazzle2);

      const allContents = testFoo.eAllContents();
      expect(allContents.length).toBe(4); // bar1, bazzle1, bazzle2
      expect(allContents).toContain(testFoo);
      expect(allContents).toContain(testBar1);
      expect(allContents).toContain(testBazzle1);
      expect(allContents).toContain(testBazzle2);
    });

    it('should handle empty contents', () => {
      const contents = testFoo.eContents();
      const allContents = testFoo.eAllContents();

      expect(contents.length).toBe(0);
      expect(allContents.length).toBe(1);
    });

    it('should handle deeply nested contents', () => {
      // Create a range for foo
      const range = CoreFactory.eINSTANCE.createBoundedNumber();
      testFoo.setRange(range);

      // Add bars with bazzles
      testFoo.getBars().add(testBar1);
      testBar1.getBazzles().add(testBazzle1);

      const allContents = testFoo.eAllContents();
      expect(allContents).toContain(range);
      expect(allContents).toContain(testBar1);
      expect(allContents).toContain(testBazzle1);
    });
  });

  describe('Full ID Generation', () => {
    it('should generate full ID for objects with ID attributes', () => {
      testFoo.setId('foo123');
      const fullId = testFoo.fullId();

      expect(fullId).toBeDefined();
      expect(fullId.length).toBeGreaterThan(0);
      expect(fullId).toContain('foo123');
    });

    it('should generate different full IDs for different objects', () => {
      testFoo.setId('foo123');
      testBar1.setId('bar456');

      const fooId = testFoo.fullId();
      const barId = testBar1.fullId();

      expect(fooId).not.toBe(barId);
    });

    it('should handle objects without ID set', () => {
      const fullId = testFoo.fullId();
      expect(fullId).toBeDefined();
      // Should still generate an ID even without explicit ID set
    });

    it('should include type information in full ID', () => {
      testFoo.setId('test123');
      const fullId = testFoo.fullId();

      // Should contain type information
      expect(fullId).toContain('Foo');
    });
  });

  describe('Generic Getting and Setting', () => {
    it('should get attribute values by feature', () => {
      testFoo.setName('TestFooName');

      const nameFeature = fooClass.getEStructuralFeature('name');
      expect(nameFeature).toBeDefined();

      const retrievedName = testFoo.eGet(nameFeature!);
      expect(retrievedName).toBe('TestFooName');
    });

    it('should get attribute values by feature ID', () => {
      testFoo.setName('TestFooName');

      const nameFeature = fooClass.getEStructuralFeature('name');
      const featureId = fooClass.getFeatureID(nameFeature!);

      const retrievedName = testFoo.eGet(featureId);
      expect(retrievedName).toBe('TestFooName');
    });

    it('should set attribute values by feature', () => {
      const nameFeature = fooClass.getEStructuralFeature('name');
      expect(nameFeature).toBeDefined();

      testFoo.eSet(nameFeature!, 'NewFooName');
      expect(testFoo.getName()).toBe('NewFooName');
    });

    it('should set attribute values by feature ID', () => {
      const nameFeature = fooClass.getEStructuralFeature('name');
      const featureId = fooClass.getFeatureID(nameFeature!);

      testFoo.eSet(featureId, 'NewFooName');
      expect(testFoo.getName()).toBe('NewFooName');
    });

    it('should handle enum values correctly', () => {
      const fooClassFeature = fooClass.getEStructuralFeature('fooClass');
      expect(fooClassFeature).toBeDefined();

      testFoo.eSet(fooClassFeature!, FooClass.LONG);
      expect(testFoo.eGet(fooClassFeature!)).toBe(FooClass.LONG);
      expect(testFoo.getFooClass()).toBe(FooClass.LONG);
    });

    it('should handle reference values correctly', () => {
      const barsFeature = fooClass.getEStructuralFeature('bars');
      expect(barsFeature).toBeDefined();

      const bars = testFoo.eGet(barsFeature!);
      expect(bars).toBeDefined();
      expect(bars.size).toBeDefined(); // Should be an EList
    });

    it('should handle date values correctly', () => {
      const now = new Date();
      const creationDateFeature =
        fooClass.getEStructuralFeature('creationDate');
      expect(creationDateFeature).toBeDefined();

      testFoo.eSet(creationDateFeature!, now);
      expect(testFoo.eGet(creationDateFeature!)).toBe(now);
    });
  });

  describe('Feature State Management', () => {
    it('should detect when features are set', () => {
      const nameFeature = fooClass.getEStructuralFeature('name');
      expect(nameFeature).toBeDefined();

      //set undefined
      testFoo.setName(undefined!);
      expect(testFoo.eIsSet(nameFeature!)).toBe(false);

      //set null
      testFoo.setName(null!);
      expect(testFoo.eIsSet(nameFeature!)).toBe(false);

      // Set the feature
      testFoo.eSet(nameFeature!, 'TestName');
      expect(testFoo.eIsSet(nameFeature!)).toBe(true);
    });

    it('should handle unset operation', () => {
      const nameFeature = fooClass.getEStructuralFeature('name');
      expect(nameFeature).toBeDefined();

      // Set then unset
      testFoo.eSet(nameFeature!, 'TestName');
      expect(testFoo.eIsSet(nameFeature!)).toBe(true);

      testFoo.eUnset(nameFeature!);
      expect(testFoo.eIsSet(nameFeature!)).toBe(false);
    });

    it('should handle unset on many-valued features', () => {
      const barsFeature = fooClass.getEStructuralFeature('bars');
      expect(barsFeature).toBeDefined();

      // Add some bars
      testFoo.getBars().add(testBar1);
      testFoo.getBars().add(testBar2);
      expect(testFoo.eIsSet(barsFeature!)).toBe(true);

      // Unset should clear the collection
      testFoo.eUnset(barsFeature!);
      expect(testFoo.getBars().size()).toBe(0);
      expect(testFoo.eIsSet(barsFeature!)).toBe(false);
    });

    it('should track feature state for different feature types', () => {
      // Test with various feature types
      const idFeature = fooClass.getEStructuralFeature('id');
      const fooClassFeature = fooClass.getEStructuralFeature('fooClass');
      const rangeFeature = fooClass.getEStructuralFeature('range');

      expect(idFeature).toBeDefined();
      expect(fooClassFeature).toBeDefined();
      expect(rangeFeature).toBeDefined();

      // Set different types of features
      testFoo.eSet(idFeature!, 'test123');
      testFoo.eSet(fooClassFeature!, FooClass.MEDIUM);
      testFoo.eSet(rangeFeature!, testBoundedNumber);

      expect(testFoo.eIsSet(idFeature!)).toBe(true);
      expect(testFoo.eIsSet(fooClassFeature!)).toBe(true);
      expect(testFoo.eIsSet(rangeFeature!)).toBe(true);
    });
  });

  describe('Inverse Relationships', () => {
    it('should handle inverse add correctly', () => {
      // When we add a bar to foo, the inverse should be set
      testFoo.getBars().add(testBar1);

      expect(testBar1.getFoo()).toBe(testFoo);
      expect(testBar1.eContainer()).toBe(testFoo);
    });

    it('should handle inverse remove correctly', () => {
      // Set up relationship
      testFoo.getBars().add(testBar1);
      expect(testBar1.getFoo()).toBe(testFoo);

      // Remove and check inverse is cleared
      testFoo.getBars().remove(testBar1);
      expect(testBar1.getFoo()).toBeUndefined();
      expect(testBar1.eContainer()).toBeUndefined();
    });

    it('should handle one-to-one relationships', () => {
      // Test oneToOneBazzle relationship
      testFoo.setOneToOneBazzle(testBazzle1);

      expect(testBazzle1.getOneToOneFoo()).toBe(testFoo);

      // Clear the relationship
      testFoo.setOneToOneBazzle(undefined!);
      expect(testBazzle1.getOneToOneFoo()).toBeUndefined();
    });

    it('should handle complex inverse relationships', () => {
      // Set up backupFor relationship
      testBar1.getBackupFor().add(testBazzle1);

      expect(testBazzle1.getBackupBar()).toBe(testBar1);

      // Remove from backup
      testBar1.getBackupFor().remove(testBazzle1);
      expect(testBazzle1.getBackupBar()).toBeUndefined();
    });
  });

  describe('Container Management', () => {
    it('should allow manual container setting', () => {
      const barsFeature = fooClass.getEStructuralFeature('bars');
      const featureId = fooClass.getFeatureID(barsFeature!);

      testBar1.setEContainer(testFoo, featureId);
      expect(testBar1.eContainer()).toBe(testFoo);
      expect(testBar1.eContainingFeature()).toBe(barsFeature);
    });

    it('should clear container correctly', () => {
      testFoo.getBars().add(testBar1);
      expect(testBar1.eContainer()).toBe(testFoo);

      testBar1.setEContainer(undefined);
      expect(testBar1.eContainer()).toBeUndefined();
      expect(testBar1.eContainingFeature()).toBeUndefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle invalid feature IDs gracefully', () => {
      expect(() => testFoo.eGet(-1)).not.toThrow();
      expect(() => testFoo.eGet(99999)).not.toThrow();
      expect(() => testFoo.eSet(-1, 'test')).not.toThrow();
    });

    it('should handle null/undefined values appropriately', () => {
      const nameFeature = fooClass.getEStructuralFeature('name');

      testFoo.eSet(nameFeature!, undefined);
      expect(testFoo.eGet(nameFeature!)).toBeUndefined();

      testFoo.eSet(nameFeature!, null);
      expect(testFoo.eGet(nameFeature!)).toBeNull();
    });

    it('should maintain object integrity during complex operations', () => {
      // Set up complex relationship
      testFoo.getBars().add(testBar1);
      testBar1.getBazzles().add(testBazzle1);
      testBar1.getBazzles().add(testBazzle2);

      // Verify all relationships
      expect(testBar1.eContainer()).toBe(testFoo);
      expect(testBazzle1.eContainer()).toBe(testBar1);
      expect(testBazzle2.eContainer()).toBe(testBar1);

      // Clear and verify cleanup
      testFoo.getBars().clear();
      expect(testBar1.eContainer()).toBeUndefined();
      expect(testBazzle1.eContainer()).toBe(testBar1); // Still contained in bar1
      expect(testBazzle2.eContainer()).toBe(testBar1);
    });

    it('should handle circular reference detection', () => {
      // This test depends on implementation details
      // but we should be able to set up legal circular references
      testFoo.getBars().add(testBar1);

      // Add foo to its own manyCrossAggregate (non-containment reference)
      const foo2 = CoreFactory.eINSTANCE.createFoo();
      testFoo.getManyCrossAggregate().add(foo2);
      foo2.getManyCrossAggregate().add(testFoo);

      // This should not cause infinite loops in eAllContents
      const allContents = testFoo.eAllContents();
      expect(allContents.length).toBeGreaterThan(0);
    });
  });
});
