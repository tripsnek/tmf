import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { User } from './src/model/core/api/user';
import { EAttribute } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';

// Test data
let testFoo: Foo;
let testUser: User;
let fooClass: EClass;
let userClass: EClass;
let nameAttribute: EAttribute;
let idAttribute: EAttribute;
let emailAttribute: EAttribute;
let passAttribute: EAttribute;

beforeEach(() => {
  // Create fresh test objects for each test
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testUser = CoreFactory.eINSTANCE.createUser();

  // Get EClasses
  fooClass = testFoo.eClass();
  userClass = testUser.eClass();

  // Get attributes for testing
  nameAttribute = fooClass.getEStructuralFeature('name') as EAttribute;
  idAttribute = fooClass.getEStructuralFeature('id') as EAttribute;
  emailAttribute = userClass.getEStructuralFeature('email') as EAttribute;
  passAttribute = userClass.getEStructuralFeature('pass') as EAttribute;
});

describe('EAttribute Tests', () => {
  describe('Basic Attribute Properties', () => {
    it('should return correct attribute names', () => {
      expect(nameAttribute.getName()).toBe('name');
      expect(idAttribute.getName()).toBe('id');
      expect(emailAttribute.getName()).toBe('email');
      expect(passAttribute.getName()).toBe('pass');
    });

    it('should identify ID attributes correctly', () => {
      expect(idAttribute.isId()).toBe(true);
      expect(nameAttribute.isId()).toBe(false);
      expect(emailAttribute.isId()).toBe(false);
      expect(passAttribute.isId()).toBe(false);
    });

    it('should allow setting ID property', () => {
      const testAttribute = nameAttribute;
      const originalId = testAttribute.isId();

      testAttribute.setId(!originalId);
      expect(testAttribute.isId()).toBe(!originalId);

      // Reset to original value
      testAttribute.setId(originalId);
      expect(testAttribute.isId()).toBe(originalId);
    });
  });

  describe('Attribute Type Information', () => {
    it('should return correct data types', () => {
      const nameType = nameAttribute.getEType();
      const idType = idAttribute.getEType();

      expect(nameType).toBeDefined();
      expect(idType).toBeDefined();
      expect(nameType.getName()).toBe('EString');
      expect(idType.getName()).toBe('EString');
    });

    it('should identify primitive vs object types', () => {
      // String attributes should have primitive types
      expect(nameAttribute.getEType()).toBeDefined();
      expect(emailAttribute.getEType()).toBeDefined();

      // Type should be a data type, not a class
      const nameType = nameAttribute.getEType() as EDataType;
      expect(nameType).toBeDefined();

      // Should not have structural features like EClass would
      expect((nameType as any).getEStructuralFeatures).toBeUndefined();
    });
  });

  describe('Multiplicity and Constraints', () => {
    it('should handle single-valued attributes correctly', () => {
      expect(nameAttribute.isMany()).toBe(false);
      expect(idAttribute.isMany()).toBe(false);
      expect(emailAttribute.isMany()).toBe(false);

      expect(nameAttribute.getUpperBound()).toBe(1);
      expect(idAttribute.getUpperBound()).toBe(1);
      expect(emailAttribute.getUpperBound()).toBe(1);
    });

    it('should handle attribute bounds correctly', () => {
      // Most attributes should allow 0 or 1 values (optional)
      expect(nameAttribute.getLowerBound()).toBeGreaterThanOrEqual(0);
      expect(nameAttribute.getUpperBound()).toBe(1);

      // ID might be required
      if (idAttribute.isRequired()) {
        expect(idAttribute.getLowerBound()).toBe(1);
      }
    });

    it('should allow modifying multiplicity', () => {
      const testAttribute = nameAttribute;
      const originalLower = testAttribute.getLowerBound();
      const originalUpper = testAttribute.getUpperBound();

      testAttribute.setLowerBound(0);
      testAttribute.setUpperBound(1);
      expect(testAttribute.getLowerBound()).toBe(0);
      expect(testAttribute.getUpperBound()).toBe(1);
      expect(testAttribute.isRequired()).toBe(false);

      // Reset to original values
      testAttribute.setLowerBound(originalLower);
      testAttribute.setUpperBound(originalUpper);
    });
  });

  describe('Containment and Ownership', () => {
    it('should return correct containing class', () => {
      expect(nameAttribute.getEContainingClass().getName()).toBe('NamedEntity');
      expect(idAttribute.getEContainingClass().getName()).toBe('IdedEntity');
      expect(emailAttribute.getEContainingClass()).toBe(userClass);
    });

    it('should have correct feature IDs', () => {
      const nameFeatureId = nameAttribute.getFeatureID();
      const idFeatureId = idAttribute.getFeatureID();

      expect(nameFeatureId).toBeGreaterThanOrEqual(0);
      expect(idFeatureId).toBeGreaterThanOrEqual(0);
      expect(nameFeatureId).not.toBe(idFeatureId); // Should be unique
    });

    it('should not be containment references', () => {
      expect(nameAttribute.isContainment()).toBe(false);
      expect(idAttribute.isContainment()).toBe(false);
      expect(emailAttribute.isContainment()).toBe(false);
    });
  });

  describe('Default Values', () => {
    it('should handle default values', () => {
      // Test attributes might have default values
      const defaultValue = nameAttribute.getDefaultValue();
      const defaultLiteral = nameAttribute.getDefaultValueLiteral();

      // Should not throw errors
      expect(() => nameAttribute.getDefaultValue()).not.toThrow();
      expect(() => nameAttribute.getDefaultValueLiteral()).not.toThrow();

      // If there are default values, they should be consistent
      if (defaultValue !== null && defaultValue !== undefined) {
        expect(defaultLiteral).toBeDefined();
      }
    });

    it('should allow setting default values', () => {
      const testAttribute = nameAttribute;
      const originalDefault = testAttribute.getDefaultValue();
      const originalLiteral = testAttribute.getDefaultValueLiteral();

      testAttribute.setDefaultValue('testDefault');
      testAttribute.setDefaultValueLiteral('testDefault');

      expect(testAttribute.getDefaultValue()).toBe('testDefault');
      expect(testAttribute.getDefaultValueLiteral()).toBe('testDefault');

      // Reset to original values
      testAttribute.setDefaultValue(originalDefault);
      testAttribute.setDefaultValueLiteral(originalLiteral);
    });
  });

  describe('Attribute Flags and Properties', () => {
    it('should handle changeable property', () => {
      expect(nameAttribute.isChangeable()).toBe(true);
      expect(idAttribute.isChangeable()).toBe(true);
      expect(emailAttribute.isChangeable()).toBe(true);

      // Test setter
      const testAttribute = nameAttribute;
      const originalChangeable = testAttribute.isChangeable();

      testAttribute.setChangeable(!originalChangeable);
      expect(testAttribute.isChangeable()).toBe(!originalChangeable);

      // Reset
      testAttribute.setChangeable(originalChangeable);
    });

    it('should handle transient property', () => {
      // Most attributes should be persistent (not transient)
      expect(nameAttribute.isTransient()).toBe(false);
      expect(idAttribute.isTransient()).toBe(false);

      // Test setter
      const testAttribute = nameAttribute;
      const originalTransient = testAttribute.isTransient();

      testAttribute.setTransient(!originalTransient);
      expect(testAttribute.isTransient()).toBe(!originalTransient);

      // Reset
      testAttribute.setTransient(originalTransient);
    });

    it('should handle volatile property', () => {
      // Most attributes should not be volatile
      expect(nameAttribute.isVolatile()).toBe(false);
      expect(idAttribute.isVolatile()).toBe(false);

      // Test setter
      const testAttribute = nameAttribute;
      const originalVolatile = testAttribute.isVolatile();

      testAttribute.setVolatile(!originalVolatile);
      expect(testAttribute.isVolatile()).toBe(!originalVolatile);

      // Reset
      testAttribute.setVolatile(originalVolatile);
    });
  });

  describe('Attribute Usage in Model Objects', () => {
    it('should work with eGet and eSet operations', () => {
      // Test getting attribute value through reflection
      testFoo.setName('TestFooName');
      const retrievedName = testFoo.eGet(nameAttribute);
      expect(retrievedName).toBe('TestFooName');

      // Test setting attribute value through reflection
      testFoo.eSet(nameAttribute, 'NewFooName');
      expect(testFoo.getName()).toBe('NewFooName');
    });

    it('should work with eIsSet operations', () => {
      // Initially might not be set
      testFoo.setName(undefined!);
      expect(testFoo.eIsSet(nameAttribute)).toBe(false);

      // After setting should be marked as set
      testFoo.eSet(nameAttribute, 'TestName');
      expect(testFoo.eIsSet(nameAttribute)).toBe(true);
    });

    it('should work with eUnset operations', () => {
      // Set a value
      testFoo.eSet(nameAttribute, 'TestName');
      expect(testFoo.eIsSet(nameAttribute)).toBe(true);

      // Unset it
      testFoo.eUnset(nameAttribute);
      expect(testFoo.eIsSet(nameAttribute)).toBe(false);
    });
  });

  describe('Attribute Collections and Lookup', () => {
    it('should be found in class attribute collections', () => {
      const fooAttributes = fooClass.getEAllAttributes();
      const userAttributes = userClass.getEAllAttributes();

      expect(fooAttributes.contains(nameAttribute)).toBe(true);
      expect(fooAttributes.contains(idAttribute)).toBe(true);
      expect(userAttributes.contains(emailAttribute)).toBe(true);
      expect(userAttributes.contains(nameAttribute)).toBe(true); // inherited
    });

    it('should be distinguishable from references', () => {
      const fooStructuralFeatures = fooClass.getEAllStructuralFeatures();
      const barsReference = fooClass.getEStructuralFeature('bars');

      expect(fooStructuralFeatures.contains(nameAttribute)).toBe(true);
      expect(fooStructuralFeatures.contains(barsReference!)).toBe(true);

      // nameAttribute should be an EAttribute, barsReference should be an EReference
      expect((nameAttribute as any).isId).toBeDefined(); // EAttribute method
      expect((barsReference as any).isContainment).toBeDefined(); // EReference method
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined values appropriately', () => {
      expect(() => nameAttribute.setDefaultValue(null)).not.toThrow();
      expect(() => nameAttribute.setDefaultValue(undefined)).not.toThrow();
      expect(() => nameAttribute.setDefaultValueLiteral(null!)).not.toThrow();
      expect(() =>
        nameAttribute.setDefaultValueLiteral(undefined!)
      ).not.toThrow();
    });

    it('should maintain consistency between related properties', () => {
      // If an attribute is an ID, it should be meaningful
      if (idAttribute.isId()) {
        expect(idAttribute.getName()).toBe('id');
        expect(idAttribute.getEType().getName()).toBe('EString');
      }

      // Feature ID should be consistent
      const featureId = idAttribute.getFeatureID();
      const lookupFeature = fooClass.getEStructuralFeature(featureId);
      expect(lookupFeature).toBe(idAttribute);
    });

    it('should handle attribute modifications correctly', () => {
      const testAttribute = passAttribute;
      const originalId = testAttribute.isId();
      const originalChangeable = testAttribute.isChangeable();
      const originalTransient = testAttribute.isTransient();

      // Make several changes
      testAttribute.setId(!originalId);
      testAttribute.setChangeable(!originalChangeable);
      testAttribute.setTransient(!originalTransient);

      // Verify all changes took effect
      expect(testAttribute.isId()).toBe(!originalId);
      expect(testAttribute.isChangeable()).toBe(!originalChangeable);
      expect(testAttribute.isTransient()).toBe(!originalTransient);

      // Reset all to original values
      testAttribute.setId(originalId);
      testAttribute.setChangeable(originalChangeable);
      testAttribute.setTransient(originalTransient);
    });
  });
});
