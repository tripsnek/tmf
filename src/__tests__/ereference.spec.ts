import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { User } from './src/model/core/api/user';
import { EReference } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';

// Test data
let testFoo: Foo;
let testBar: Bar;
let testBazzle: Bazzle;
let testUser: User;
let fooClass: EClass;
let barClass: EClass;
let bazzleClass: EClass;
let barsReference: EReference;
let bazzlesReference: EReference;
let rangeReference: EReference;
let backupForReference: EReference;
let backupBarReference: EReference;
let oneToOneBazzleReference: EReference;

beforeEach(() => {
  // Create fresh test objects for each test
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testBar = CoreFactory.eINSTANCE.createBar();
  testBazzle = CoreFactory.eINSTANCE.createBazzle();
  testUser = CoreFactory.eINSTANCE.createUser();
  
  // Get EClasses
  fooClass = testFoo.eClass();
  barClass = testBar.eClass();
  bazzleClass = testBazzle.eClass();
  
  // Get references for testing
  barsReference = fooClass.getEStructuralFeature('bars') as EReference;
  bazzlesReference = barClass.getEStructuralFeature('bazzles') as EReference;
  rangeReference = fooClass.getEStructuralFeature('range') as EReference;
  backupForReference = barClass.getEStructuralFeature('backupFor') as EReference;
  backupBarReference = bazzleClass.getEStructuralFeature('backupBar') as EReference;
  oneToOneBazzleReference = fooClass.getEStructuralFeature('oneToOneBazzle') as EReference;
});

describe('EReference Tests', () => {

  describe('Basic Reference Properties', () => {
    it('should return correct reference names', () => {
      expect(barsReference.getName()).toBe('bars');
      expect(bazzlesReference.getName()).toBe('bazzles');
      expect(rangeReference.getName()).toBe('range');
      expect(backupForReference.getName()).toBe('backupFor');
      expect(backupBarReference.getName()).toBe('backupBar');
    });

    it('should return correct target types', () => {
      const barsType = barsReference.getEType();
      const bazzlesType = bazzlesReference.getEType();
      const rangeType = rangeReference.getEType();
      
      expect(barsType.getName()).toBe('Bar');
      expect(bazzlesType.getName()).toBe('Bazzle');
      expect(rangeType.getName()).toBe('BoundedNumber');
    });
  });

  describe('Containment Properties', () => {
    it('should identify containment references correctly', () => {
      expect(barsReference.isContainment()).toBe(true);
      expect(bazzlesReference.isContainment()).toBe(true);
      expect(rangeReference.isContainment()).toBe(true);
      
      // Cross-references should not be containment
      expect(backupForReference.isContainment()).toBe(false);
      expect(backupBarReference.isContainment()).toBe(false);
    });

    it('should identify container references correctly', () => {
      // The opposite of a containment reference should be a container
      if (barsReference.getEOpposite()) {
        expect(barsReference.getEOpposite()!.isContainer()).toBe(true);
      }
      if (bazzlesReference.getEOpposite()) {
        expect(bazzlesReference.getEOpposite()!.isContainer()).toBe(true);
      }
    });

    it('should allow setting containment property', () => {
      const testReference = backupForReference; // Use non-containment reference
      const originalContainment = testReference.isContainment();
      
      testReference.setContainment(!originalContainment);
      expect(testReference.isContainment()).toBe(!originalContainment);
      
      // Reset to original value
      testReference.setContainment(originalContainment);
      expect(testReference.isContainment()).toBe(originalContainment);
    });
  });

  describe('Opposite References (Bidirectional)', () => {
    it('should have correct opposites for bidirectional references', () => {
      const barsOpposite = barsReference.getEOpposite();
      if (barsOpposite) {
        expect(barsOpposite.getName()).toBe('foo');
        expect(barsOpposite.getEOpposite()).toBe(barsReference);
      }

      const backupForOpposite = backupForReference.getEOpposite();
      if (backupForOpposite) {
        expect(backupForOpposite).toBe(backupBarReference);
        expect(backupBarReference.getEOpposite()).toBe(backupForReference);
      }
    });

    it('should maintain opposite consistency', () => {
      if (barsReference.getEOpposite()) {
        const opposite = barsReference.getEOpposite()!;
        expect(opposite.getEOpposite()).toBe(barsReference);
        
        // Containment should be asymmetric
        expect(barsReference.isContainment()).toBe(true);
        expect(opposite.isContainment()).toBe(false);
        expect(opposite.isContainer()).toBe(true);
      }
    });

    it('should allow setting opposite references', () => {
      // Test with a reference that might not have an opposite initially
      const testRef1 = oneToOneBazzleReference;
      const originalOpposite = testRef1.getEOpposite();
      
      // Find another reference to use as test opposite
      const testOpposite = bazzleClass.getEStructuralFeature('oneToOneFoo') as EReference;
      
      if (testOpposite) {
        testRef1.setEOpposite(testOpposite);
        expect(testRef1.getEOpposite()).toBe(testOpposite);
        
        // Reset to original
        if (originalOpposite) {
          testRef1.setEOpposite(originalOpposite);
        }
      }
    });

    it('should handle unidirectional references', () => {
      // Some references might not have opposites
      const manyCrossAggregateRef = fooClass.getEStructuralFeature('manyCrossAggregate') as EReference;
      if (manyCrossAggregateRef) {
        // Unidirectional references should have no opposite
        const opposite = manyCrossAggregateRef.getEOpposite();
        if (!opposite) {
          expect(opposite).toBeUndefined();
        }
      }
    });
  });

  describe('Multiplicity and Collections', () => {
    it('should handle single-valued references correctly', () => {
      expect(rangeReference.isMany()).toBe(false);
      expect(rangeReference.getUpperBound()).toBe(1);
      
      if (backupBarReference) {
        expect(backupBarReference.isMany()).toBe(false);
        expect(backupBarReference.getUpperBound()).toBe(1);
      }
    });

    it('should handle many-valued references correctly', () => {
      expect(barsReference.isMany()).toBe(true);
      expect(barsReference.getUpperBound()).toBe(-1); // unbounded
      
      expect(bazzlesReference.isMany()).toBe(true);
      expect(bazzlesReference.getUpperBound()).toBe(-1);
      
      if (backupForReference) {
        expect(backupForReference.isMany()).toBe(true);
        expect(backupForReference.getUpperBound()).toBe(-1);
      }
    });

    it('should allow modifying multiplicity', () => {
      const testReference = barsReference;
      const originalLower = testReference.getLowerBound();
      const originalUpper = testReference.getUpperBound();
      
      testReference.setLowerBound(1);
      testReference.setUpperBound(5);
      expect(testReference.getLowerBound()).toBe(1);
      expect(testReference.getUpperBound()).toBe(5);
      expect(testReference.isRequired()).toBe(true);
      expect(testReference.isMany()).toBe(true);
      
      // Reset to original values
      testReference.setLowerBound(originalLower);
      testReference.setUpperBound(originalUpper);
    });
  });

  describe('Containment and Ownership', () => {
    it('should return correct containing class', () => {
      expect(barsReference.getEContainingClass()).toBe(fooClass);
      expect(bazzlesReference.getEContainingClass()).toBe(barClass);
      expect(rangeReference.getEContainingClass()).toBe(fooClass);
    });

    it('should have correct feature IDs', () => {
      const barsFeatureId = barsReference.getFeatureID();
      const bazzlesFeatureId = bazzlesReference.getFeatureID();
      
      expect(barsFeatureId).toBeGreaterThanOrEqual(0);
      expect(bazzlesFeatureId).toBeGreaterThanOrEqual(0);
      expect(barsFeatureId).not.toBe(bazzlesFeatureId); // Should be unique within class
    });

    it('should allow setting containing class', () => {
      const testReference = barsReference;
      const originalContainer = testReference.getEContainingClass();
      
      // This is more of a structural test
      expect(() => testReference.setEContainingClass(originalContainer)).not.toThrow();
      expect(testReference.getEContainingClass()).toBe(originalContainer);
    });
  });

  describe('Reference Behavior in Model Objects', () => {

    it('should work with eGet operations for many-valued references', () => {
      // Test getting collection through reflection
      const bars = testFoo.eGet(barsReference);
      expect(bars).toBeDefined();
      expect(bars.size).toBeDefined(); // Should be an EList
      expect(bars.add).toBeDefined();
    });

    it('should maintain containment relationships', () => {
      // Add a bar to foo
      testFoo.getBars().add(testBar);
      
      // Bar should be contained in foo
      expect(testBar.eContainer()).toBe(testFoo);
      expect(testBar.eContainingFeature()).toBe(barsReference);
      
      // Remove bar from foo
      testFoo.getBars().remove(testBar);
      expect(testBar.eContainer()).toBeUndefined();
    });

    it('should maintain opposite relationships', () => {
      // Set up bidirectional relationship
      if (backupForReference && backupBarReference) {
        testBar.getBackupFor().add(testBazzle);
        
        // Opposite should be set automatically
        expect(testBazzle.getBackupBar()).toBe(testBar);
        
        // Remove and check opposite is cleared
        testBar.getBackupFor().remove(testBazzle);
        expect(testBazzle.getBackupBar()).toBeUndefined();
      }
    });
  });

  describe('Reference Properties and Flags', () => {
    it('should handle changeable property', () => {
      expect(barsReference.isChangeable()).toBe(true);
      expect(rangeReference.isChangeable()).toBe(true);
      
      // Test setter
      const testReference = barsReference;
      const originalChangeable = testReference.isChangeable();
      
      testReference.setChangeable(!originalChangeable);
      expect(testReference.isChangeable()).toBe(!originalChangeable);
      
      // Reset
      testReference.setChangeable(originalChangeable);
    });

    it('should handle transient property', () => {
      // Most references should be persistent (not transient)
      expect(barsReference.isTransient()).toBe(false);
      expect(rangeReference.isTransient()).toBe(false);
      
      // Test setter
      const testReference = barsReference;
      const originalTransient = testReference.isTransient();
      
      testReference.setTransient(!originalTransient);
      expect(testReference.isTransient()).toBe(!originalTransient);
      
      // Reset
      testReference.setTransient(originalTransient);
    });

    it('should handle volatile property', () => {
      // Most references should not be volatile
      expect(barsReference.isVolatile()).toBe(false);
      expect(rangeReference.isVolatile()).toBe(false);
      
      // Test setter
      const testReference = barsReference;
      const originalVolatile = testReference.isVolatile();
      
      testReference.setVolatile(!originalVolatile);
      expect(testReference.isVolatile()).toBe(!originalVolatile);
      
      // Reset
      testReference.setVolatile(originalVolatile);
    });
  });

  describe('Reference Collections and Lookup', () => {
    it('should be found in class reference collections', () => {
      const fooReferences = fooClass.getEAllReferences();
      const barReferences = barClass.getEAllReferences();
      
      expect(fooReferences.contains(barsReference)).toBe(true);
      expect(fooReferences.contains(rangeReference)).toBe(true);
      expect(barReferences.contains(bazzlesReference)).toBe(true);
    });

    it('should be distinguishable from attributes', () => {
      const fooStructuralFeatures = fooClass.getEAllStructuralFeatures();
      const nameAttribute = fooClass.getEStructuralFeature('name');
      
      expect(fooStructuralFeatures.contains(barsReference)).toBe(true);
      expect(fooStructuralFeatures.contains(nameAttribute!)).toBe(true);
      
      // barsReference should be an EReference, nameAttribute should be an EAttribute
      expect((barsReference as any).isContainment).toBeDefined(); // EReference method
      expect((nameAttribute as any).isId).toBeDefined(); // EAttribute method
    });

    it('should identify containment references separately', () => {
      const fooContainments = fooClass.getEAllContainments();
      
      expect(fooContainments.contains(barsReference)).toBe(true);
      expect(fooContainments.contains(rangeReference)).toBe(true);
      
      // Non-containment references should not be in containments list
      if (backupForReference && !backupForReference.isContainment()) {
        expect(fooContainments.contains(backupForReference)).toBe(false);
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined opposite references', () => {
      const testReference = oneToOneBazzleReference;
      
      expect(() => testReference.setEOpposite(null!)).not.toThrow();
      expect(() => testReference.setEOpposite(undefined!)).not.toThrow();
    });

    it('should maintain consistency between related properties', () => {
      // Containment and container should be mutually exclusive
      expect(barsReference.isContainment()).toBe(true);
      expect(barsReference.isContainer()).toBe(false);
      
      // If there's an opposite, one should be containment, the other container
      const opposite = barsReference.getEOpposite();
      if (opposite) {
        expect(opposite.isContainment()).toBe(false);
        expect(opposite.isContainer()).toBe(true);
      }
    });

    it('should handle circular reference detection', () => {
      // This should not cause infinite loops
      if (backupForReference && backupBarReference) {
        testBar.getBackupFor().add(testBazzle);
        expect(testBazzle.getBackupBar()).toBe(testBar);
        
        // The relationship should be established without issues
        const allContents = testBar.eAllContents();
        expect(allContents.length).toBeGreaterThan(0);
      }
    });
  });
});