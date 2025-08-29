import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { Bar } from './src/model/core/api/bar';
import { User } from './src/model/core/api/user';
import { EStructuralFeature } from '@tripsnek/tmf';
import { EAttribute } from '@tripsnek/tmf';
import { EReference } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EClassifier } from '@tripsnek/tmf';

// Test data
let testFoo: Foo;
let testBar: Bar;
let testUser: User;
let fooClass: EClass;
let barClass: EClass;
let userClass: EClass;
let nameFeature: EStructuralFeature;
let idFeature: EStructuralFeature;
let barsFeature: EStructuralFeature;
let rangeFeature: EStructuralFeature;
let emailFeature: EStructuralFeature;
let creationDateFeature: EStructuralFeature;

beforeEach(() => {
  // Create fresh test objects for each test
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testBar = CoreFactory.eINSTANCE.createBar();
  testUser = CoreFactory.eINSTANCE.createUser();

  // Get EClasses
  fooClass = testFoo.eClass();
  barClass = testBar.eClass();
  userClass = testUser.eClass();

  // Get structural features for testing
  nameFeature = fooClass.getEStructuralFeature('name')!;
  idFeature = fooClass.getEStructuralFeature('id')!;
  barsFeature = fooClass.getEStructuralFeature('bars')!;
  rangeFeature = fooClass.getEStructuralFeature('range')!;
  emailFeature = userClass.getEStructuralFeature('email')!;
  creationDateFeature = fooClass.getEStructuralFeature('creationDate')!;
});

describe('EStructuralFeature Tests', () => {
  describe('Basic Structural Feature Properties', () => {
    it('should return correct feature names', () => {
      expect(nameFeature.getName()).toBe('name');
      expect(idFeature.getName()).toBe('id');
      expect(barsFeature.getName()).toBe('bars');
      expect(rangeFeature.getName()).toBe('range');
      expect(emailFeature.getName()).toBe('email');
      expect(creationDateFeature.getName()).toBe('creationDate');
    });

    it('should return correct containing classes', () => {
      expect(nameFeature.getEContainingClass().getName()).toBe('NamedEntity');
      expect(idFeature.getEContainingClass().getName()).toBe('IdedEntity');
      expect(barsFeature.getEContainingClass()).toBe(fooClass);
      expect(rangeFeature.getEContainingClass()).toBe(fooClass);
      expect(emailFeature.getEContainingClass()).toBe(userClass);
    });

    it('should have correct feature IDs', () => {
      const nameId = nameFeature.getFeatureID();
      const barsId = barsFeature.getFeatureID();
      const rangeId = rangeFeature.getFeatureID();

      expect(nameId).toBeGreaterThanOrEqual(0);
      expect(barsId).toBeGreaterThanOrEqual(0);
      expect(rangeId).toBeGreaterThanOrEqual(0);

      // Feature IDs should be unique within a class
      expect(barsId).not.toBe(rangeId);
    });

    it('should allow setting feature IDs', () => {
      const testFeature = nameFeature;
      const originalId = testFeature.getFeatureID();
      const testId = 9999;

      testFeature.setFeatureID(testId);
      expect(testFeature.getFeatureID()).toBe(testId);

      // Reset to original
      testFeature.setFeatureID(originalId);
      expect(testFeature.getFeatureID()).toBe(originalId);
    });

    it('should allow setting containing class', () => {
      const testFeature = barsFeature;
      const originalClass = testFeature.getEContainingClass();

      testFeature.setEContainingClass(fooClass);
      expect(testFeature.getEContainingClass()).toBe(fooClass);

      // Reset
      testFeature.setEContainingClass(originalClass);
    });
  });

  describe('Type Information', () => {
    it('should return correct types for attributes', () => {
      const nameType = nameFeature.getEType();
      const idType = idFeature.getEType();
      const emailType = emailFeature.getEType();

      expect(nameType.getName()).toBe('EString');
      expect(idType.getName()).toBe('EString');
      expect(emailType.getName()).toBe('EString');
    });

    it('should return correct types for references', () => {
      const barsType = barsFeature.getEType();
      const rangeType = rangeFeature.getEType();

      expect(barsType.getName()).toBe('Bar');
      expect(rangeType.getName()).toBe('BoundedNumber');
    });

    it('should return correct types for special attributes', () => {
      if (creationDateFeature) {
        const dateType = creationDateFeature.getEType();
        expect(dateType.getName()).toBe('EDate');
      }
    });
  });

  describe('Multiplicity Properties', () => {
    it('should handle single-valued features correctly', () => {
      expect(nameFeature.isMany()).toBe(false);
      expect(idFeature.isMany()).toBe(false);
      expect(rangeFeature.isMany()).toBe(false);
      expect(emailFeature.isMany()).toBe(false);

      expect(nameFeature.getUpperBound()).toBe(1);
      expect(idFeature.getUpperBound()).toBe(1);
      expect(rangeFeature.getUpperBound()).toBe(1);
      expect(emailFeature.getUpperBound()).toBe(1);
    });

    it('should handle many-valued features correctly', () => {
      expect(barsFeature.isMany()).toBe(true);
      expect(barsFeature.getUpperBound()).toBe(-1); // unbounded
    });

    it('should handle required vs optional features', () => {
      const nameRequired = nameFeature.isRequired();
      const barsRequired = barsFeature.isRequired();

      expect(nameRequired).toBe(nameFeature.getLowerBound() >= 1);
      expect(barsRequired).toBe(barsFeature.getLowerBound() >= 1);
    });

    it('should allow modifying multiplicity', () => {
      const testFeature = nameFeature;
      const originalLower = testFeature.getLowerBound();
      const originalUpper = testFeature.getUpperBound();

      testFeature.setLowerBound(0);
      testFeature.setUpperBound(5);
      expect(testFeature.getLowerBound()).toBe(0);
      expect(testFeature.getUpperBound()).toBe(5);
      expect(testFeature.isRequired()).toBe(false);

      // Reset
      testFeature.setLowerBound(originalLower);
      testFeature.setUpperBound(originalUpper);
    });
  });

  describe('Feature Flags and Properties', () => {
    it('should handle changeable property', () => {
      expect(nameFeature.isChangeable()).toBe(true);
      expect(barsFeature.isChangeable()).toBe(true);
      expect(rangeFeature.isChangeable()).toBe(true);

      // Test setter
      const testFeature = nameFeature;
      const originalChangeable = testFeature.isChangeable();

      testFeature.setChangeable(!originalChangeable);
      expect(testFeature.isChangeable()).toBe(!originalChangeable);

      // Reset
      testFeature.setChangeable(originalChangeable);
    });

    it('should handle transient property', () => {
      // Most features should be persistent (not transient)
      expect(nameFeature.isTransient()).toBe(false);
      expect(barsFeature.isTransient()).toBe(false);
      expect(rangeFeature.isTransient()).toBe(false);

      // Test setter
      const testFeature = nameFeature;
      const originalTransient = testFeature.isTransient();

      testFeature.setTransient(!originalTransient);
      expect(testFeature.isTransient()).toBe(!originalTransient);

      // Reset
      testFeature.setTransient(originalTransient);
    });

    it('should handle volatile property', () => {
      // Most features should not be volatile
      expect(nameFeature.isVolatile()).toBe(false);
      expect(barsFeature.isVolatile()).toBe(false);
      expect(rangeFeature.isVolatile()).toBe(false);

      // Test setter
      const testFeature = nameFeature;
      const originalVolatile = testFeature.isVolatile();

      testFeature.setVolatile(!originalVolatile);
      expect(testFeature.isVolatile()).toBe(!originalVolatile);

      // Reset
      testFeature.setVolatile(originalVolatile);
    });
  });

  describe('Containment Properties', () => {
    it('should identify containment features correctly', () => {
      // References should have containment information
      expect(barsFeature.isContainment()).toBe(true);
      expect(rangeFeature.isContainment()).toBe(true);

      // Attributes should not be containment
      expect(nameFeature.isContainment()).toBe(false);
      expect(idFeature.isContainment()).toBe(false);
      expect(emailFeature.isContainment()).toBe(false);
    });

    it('should distinguish between attributes and references', () => {
      // nameFeature should be an EAttribute
      expect((nameFeature as EAttribute).isId).toBeDefined();
      expect((nameFeature as any).isContainment).toBeDefined(); // From EStructuralFeature
      expect((nameFeature as any).setContainment).toBeUndefined(); // EAttribute doesn't have this

      // barsFeature should be an EReference
      expect((barsFeature as EReference).setContainment).toBeDefined();
      expect((barsFeature as any).isId).toBeUndefined(); // EReference doesn't have this
    });
  });

  describe('Default Values', () => {
    it('should handle default values', () => {
      // Test getting default values (might be null/undefined)
      const nameDefault = nameFeature.getDefaultValue();
      const nameDefaultLiteral = nameFeature.getDefaultValueLiteral();

      // Should not throw errors
      expect(() => nameFeature.getDefaultValue()).not.toThrow();
      expect(() => nameFeature.getDefaultValueLiteral()).not.toThrow();

      // If there's a default value, literal should also exist
      if (nameDefault !== null && nameDefault !== undefined) {
        expect(nameDefaultLiteral).toBeDefined();
      }
    });

    it('should allow setting default values', () => {
      const testFeature = nameFeature;
      const originalDefault = testFeature.getDefaultValue();
      const originalLiteral = testFeature.getDefaultValueLiteral();

      testFeature.setDefaultValue('testDefault');
      testFeature.setDefaultValueLiteral('testDefault');

      expect(testFeature.getDefaultValue()).toBe('testDefault');
      expect(testFeature.getDefaultValueLiteral()).toBe('testDefault');

      // Reset
      testFeature.setDefaultValue(originalDefault);
      testFeature.setDefaultValueLiteral(originalLiteral);
    });

    it('should handle null default values', () => {
      const testFeature = nameFeature;

      expect(() => testFeature.setDefaultValue(null)).not.toThrow();
      expect(() => testFeature.setDefaultValueLiteral(null!)).not.toThrow();
    });

    it('should handle different types of default values', () => {
      // String features
      expect(() => nameFeature.setDefaultValue('string value')).not.toThrow();
      expect(() =>
        emailFeature.setDefaultValue('default@email.com')
      ).not.toThrow();

      // Date features
      if (creationDateFeature) {
        expect(() =>
          creationDateFeature.setDefaultValue(new Date())
        ).not.toThrow();
      }
    });
  });

  describe('Feature Usage in Model Objects', () => {
    it('should work with eGet and eSet operations', () => {
      // Test getting feature value through reflection
      testFoo.setName('TestName');
      const retrievedName = testFoo.eGet(nameFeature);
      expect(retrievedName).toBe('TestName');

      // Test setting feature value through reflection
      testFoo.eSet(nameFeature, 'NewTestName');
      expect(testFoo.getName()).toBe('NewTestName');
    });

    it('should work with eIsSet operations', () => {
      // Initially might not be set
      testFoo.setName(undefined!);
      expect(testFoo.eIsSet(nameFeature)).toBe(false);

      // After setting should be marked as set
      testFoo.eSet(nameFeature, 'TestName');
      expect(testFoo.eIsSet(nameFeature)).toBe(true);
    });

    it('should work with eUnset operations', () => {
      // Set a value
      testFoo.eSet(nameFeature, 'TestName');
      expect(testFoo.eIsSet(nameFeature)).toBe(true);

      // Unset it
      testFoo.eUnset(nameFeature);
      expect(testFoo.eIsSet(nameFeature)).toBe(false);
    });

    it('should handle many-valued features correctly', () => {
      // Get the collection through reflection
      const bars = testFoo.eGet(barsFeature);
      expect(bars).toBeDefined();
      expect(bars.size).toBeDefined(); // Should be an EList
      expect(bars.add).toBeDefined();

      // Add a bar and verify
      const testBar = CoreFactory.eINSTANCE.createBar();
      bars.add(testBar);
      expect(bars.contains(testBar)).toBe(true);
    });
  });

  describe('Feature Collections and Lookup', () => {
    it('should be found in class structural feature collections', () => {
      const fooFeatures = fooClass.getEAllStructuralFeatures();
      const userFeatures = userClass.getEAllStructuralFeatures();

      expect(fooFeatures.contains(nameFeature)).toBe(true);
      expect(fooFeatures.contains(barsFeature)).toBe(true);
      expect(fooFeatures.contains(rangeFeature)).toBe(true);
      expect(userFeatures.contains(emailFeature)).toBe(true);
    });

    it('should be lookupable by name and ID', () => {
      const foundByName = fooClass.getEStructuralFeature('bars');
      const foundById = fooClass.getEStructuralFeature(
        barsFeature.getFeatureID()
      );

      expect(foundByName).toBe(barsFeature);
      expect(foundById).toBe(barsFeature);
    });

    it('should maintain consistent feature IDs', () => {
      const features = fooClass.getEAllStructuralFeatures();

      for (let i = 0; i < features.size(); i++) {
        const feature = features.get(i);
        const featureId = feature.getFeatureID();
        expect(featureId).toBeGreaterThanOrEqual(0);

        const lookupFeature = feature
          .getEContainingClass()
          .getEStructuralFeature(featureId);
        expect(lookupFeature).toBe(feature);
      }
    });
  });

  describe('Inheritance and Feature Ownership', () => {
    it('should correctly identify inherited vs owned features', () => {
      const fooOwnFeatures = fooClass.getEStructuralFeatures();
      const fooAllFeatures = fooClass.getEAllStructuralFeatures();

      // Should have more inherited features than owned
      expect(fooAllFeatures.size()).toBeGreaterThan(fooOwnFeatures.size());

      // bars and range should be owned by Foo
      expect(fooOwnFeatures.contains(barsFeature)).toBe(true);
      expect(fooOwnFeatures.contains(rangeFeature)).toBe(true);

      // name should be inherited, not owned
      expect(fooOwnFeatures.contains(nameFeature)).toBe(false);
      expect(fooAllFeatures.contains(nameFeature)).toBe(true);
    });

    it('should handle feature lookup across inheritance hierarchy', () => {
      // Foo should be able to find inherited features
      const inheritedName = fooClass.getEStructuralFeature('name');
      const inheritedId = fooClass.getEStructuralFeature('id');

      expect(inheritedName).toBeDefined();
      expect(inheritedId).toBeDefined();
      expect(inheritedName).toBe(nameFeature);
      expect(inheritedId).toBe(idFeature);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined values appropriately', () => {
      const testFeature = nameFeature;

      expect(() => testFeature.setDefaultValue(null)).not.toThrow();
      expect(() => testFeature.setDefaultValue(undefined)).not.toThrow();
      expect(() => testFeature.setDefaultValueLiteral(null!)).not.toThrow();
      expect(() =>
        testFeature.setDefaultValueLiteral(undefined!)
      ).not.toThrow();
      expect(() => testFeature.setEContainingClass(null!)).not.toThrow();
    });

    it('should maintain consistency between related properties', () => {
      // Many-valued features should have upperBound -1
      if (barsFeature.isMany()) {
        expect(barsFeature.getUpperBound()).toBe(-1);
      }

      // Required features should have lowerBound >= 1
      if (nameFeature.isRequired()) {
        expect(nameFeature.getLowerBound()).toBeGreaterThanOrEqual(1);
      }
    });

    it('should handle complex type relationships', () => {
      // Ensure all features have valid types
      const allFeatures = [
        nameFeature,
        idFeature,
        barsFeature,
        rangeFeature,
        emailFeature,
      ];

      for (const feature of allFeatures) {
        const featureType = feature.getEType();
        expect(featureType).toBeDefined();
        expect(featureType.getName().length).toBeGreaterThan(0);
      }
    });

    it('should handle boundary cases for multiplicity', () => {
      const testFeature = barsFeature;

      // Test extreme values
      testFeature.setLowerBound(0);
      testFeature.setUpperBound(-1); // unbounded
      expect(testFeature.getLowerBound()).toBe(0);
      expect(testFeature.getUpperBound()).toBe(-1);
      expect(testFeature.isMany()).toBe(true);

      // Test single value
      testFeature.setUpperBound(1);
      expect(testFeature.isMany()).toBe(false);

      // Reset to original (should be many-valued)
      testFeature.setUpperBound(-1);
    });
  });
});
