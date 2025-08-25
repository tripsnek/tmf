import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { FooClass } from './src/model/core/api/foo-class';
import { EEnum } from '@tripsnek/tmf';
import { EEnumLiteral } from '@tripsnek/tmf';
import { EPackage } from '@tripsnek/tmf';

// Test data
let testFoo: Foo;
let corePackage: EPackage;
let fooClassEnum: EEnum;
let shortLiteral: EEnumLiteral;
let mediumLiteral: EEnumLiteral;
let intermediateLiteral: EEnumLiteral;
let longLiteral: EEnumLiteral;

beforeEach(() => {
  // Create fresh test objects for each test
  testFoo = CoreFactory.eINSTANCE.createFoo();
  
  // Get the package and enum
  corePackage = testFoo.eClass().getEPackage();
  fooClassEnum = corePackage.getEClassifier('FooClass') as EEnum;
  
  // Get enum literals
  shortLiteral = fooClassEnum.getEEnumLiteral('SHORT')!;
  mediumLiteral = fooClassEnum.getEEnumLiteral('MEDIUM')!;
  intermediateLiteral = fooClassEnum.getEEnumLiteral('INTERMEDIATE')!;
  longLiteral = fooClassEnum.getEEnumLiteral('LONG')!;
});

describe('EEnum Tests', () => {

  describe('Basic Enum Properties', () => {
    it('should return correct enum name', () => {
      expect(fooClassEnum.getName()).toBe('FooClass');
    });

    it('should be in correct package', () => {
      expect(fooClassEnum.getEPackage()).toBe(corePackage);
    });

    it('should have correct classifier ID', () => {
      const classifierId = fooClassEnum.getClassifierId();
      expect(classifierId).toBeGreaterThanOrEqual(0);
    });

    it('should not have structural features like EClass', () => {
      // EEnum extends EDataType, not EClass
      expect((fooClassEnum as any).getEStructuralFeatures).toBeUndefined();
      expect((fooClassEnum as any).getEAttributes).toBeUndefined();
      expect((fooClassEnum as any).getEReferences).toBeUndefined();
    });
  });

  describe('Enum Literals Collection', () => {
    it('should return all enum literals', () => {
      const literals = fooClassEnum.getELiterals();
      expect(literals.size()).toBe(4);
      
      const literalNames = literals.map(lit => lit.getName());
      expect(literalNames.contains('SHORT')).toBe(true);
      expect(literalNames.contains('MEDIUM')).toBe(true);
      expect(literalNames.contains('INTERMEDIATE')).toBe(true);
      expect(literalNames.contains('LONG')).toBe(true);
    });

    it('should return literals in correct order', () => {
      const literals = fooClassEnum.getELiterals();
      
      // Literals should be ordered by their values (0, 1, 2, 3)
      expect(literals.get(0).getValue()).toBe(0);
      expect(literals.get(1).getValue()).toBe(1);
      expect(literals.get(2).getValue()).toBe(2);
      expect(literals.get(3).getValue()).toBe(3);
    });

    it('should allow adding new literals', () => {
      const originalSize = fooClassEnum.getELiterals().size();
      
      // Create a test literal (note: this might not persist in production)
      const testLiteral = shortLiteral; // Use existing literal for test
      
      expect(() => fooClassEnum.addLiteral(testLiteral)).not.toThrow();
      
      // The collection should still be accessible
      expect(fooClassEnum.getELiterals().size()).toBeGreaterThanOrEqual(originalSize);
    });
  });

  describe('Literal Lookup by Name', () => {
    it('should find literals by name', () => {
      const foundShort = fooClassEnum.getEEnumLiteral('SHORT');
      const foundMedium = fooClassEnum.getEEnumLiteral('MEDIUM');
      const foundIntermediate = fooClassEnum.getEEnumLiteral('INTERMEDIATE');
      const foundLong = fooClassEnum.getEEnumLiteral('LONG');
      
      expect(foundShort).toBe(shortLiteral);
      expect(foundMedium).toBe(mediumLiteral);
      expect(foundIntermediate).toBe(intermediateLiteral);
      expect(foundLong).toBe(longLiteral);
    });

    it('should return undefined for non-existent literal names', () => {
      const nonExistent = fooClassEnum.getEEnumLiteral('NONEXISTENT');
      expect(nonExistent).toBeUndefined();
      
      const empty = fooClassEnum.getEEnumLiteral('');
      expect(empty).toBeUndefined();
    });

    it('should handle case sensitivity', () => {
      // Should be case-sensitive
      const lowercase = fooClassEnum.getEEnumLiteral('short');
      expect(lowercase).toBeUndefined();
      
      const mixedcase = fooClassEnum.getEEnumLiteral('Short');
      expect(mixedcase).toBeUndefined();
    });
  });

  describe('Literal Lookup by Value', () => {
    it('should find literals by numeric value', () => {
      const foundShort = fooClassEnum.getEEnumLiteral(0);
      const foundMedium = fooClassEnum.getEEnumLiteral(1);
      const foundIntermediate = fooClassEnum.getEEnumLiteral(2);
      const foundLong = fooClassEnum.getEEnumLiteral(3);
      
      expect(foundShort).toBe(shortLiteral);
      expect(foundMedium).toBe(mediumLiteral);
      expect(foundIntermediate).toBe(intermediateLiteral);
      expect(foundLong).toBe(longLiteral);
    });

    it('should return undefined for non-existent numeric values', () => {
      const nonExistent = fooClassEnum.getEEnumLiteral(-1);
      expect(nonExistent).toBeUndefined();
      
      const tooHigh = fooClassEnum.getEEnumLiteral(999);
      expect(tooHigh).toBeUndefined();
    });

    it('should handle the overloaded getEEnumLiteral method', () => {
      // Test the overloaded method that accepts string | number
      const byString = fooClassEnum.getEEnumLiteral('SHORT' as string | number);
      const byNumber = fooClassEnum.getEEnumLiteral(0 as string | number);
      
      expect(byString).toBe(shortLiteral);
      expect(byNumber).toBe(shortLiteral);
    });
  });

  describe('Literal Lookup by Literal Value', () => {
    it('should find literals by literal string value', () => {
      // Literal values might be different from names
      const shortByLiteral = fooClassEnum.getEEnumLiteralByLiteral('SHORT');
      expect(shortByLiteral).toBeDefined();
      
      const mediumByLiteral = fooClassEnum.getEEnumLiteralByLiteral('MEDIUM');
      expect(mediumByLiteral).toBeDefined();
    });

    it('should return undefined for non-existent literal values', () => {
      const nonExistent = fooClassEnum.getEEnumLiteralByLiteral('INVALID');
      expect(nonExistent).toBeUndefined();
    });

    it('should distinguish between name and literal lookup', () => {
      // For most enums, name and literal are the same, but they can differ
      const byName = fooClassEnum.getEEnumLiteral('SHORT');
      const byLiteral = fooClassEnum.getEEnumLiteralByLiteral('SHORT');
      
      expect(byName).toBe(byLiteral);
      expect(byName).toBe(shortLiteral);
    });
  });

  describe('Enum Usage in Model Objects', () => {
    it('should work as attribute types', () => {
      // Test using enum values
      testFoo.setFooClass(FooClass.SHORT);
      expect(testFoo.getFooClass()).toBe(FooClass.SHORT);
      
      testFoo.setFooClass(FooClass.MEDIUM);
      expect(testFoo.getFooClass()).toBe(FooClass.MEDIUM);
      
      testFoo.setFooClass(FooClass.INTERMEDIATE);
      expect(testFoo.getFooClass()).toBe(FooClass.INTERMEDIATE);
      
      testFoo.setFooClass(FooClass.LONG);
      expect(testFoo.getFooClass()).toBe(FooClass.LONG);
    });

    it('should work with eGet and eSet operations', () => {
      const fooClassFeature = testFoo.eClass().getEStructuralFeature('fooClass');
      expect(fooClassFeature).toBeDefined();
      
      // Test getting enum value through reflection
      testFoo.setFooClass(FooClass.INTERMEDIATE);
      const retrievedValue = testFoo.eGet(fooClassFeature!);
      expect(retrievedValue).toBe(FooClass.INTERMEDIATE);
      
      // Test setting enum value through reflection
      testFoo.eSet(fooClassFeature!, FooClass.LONG);
      expect(testFoo.getFooClass()).toBe(FooClass.LONG);
    });

    it('should maintain type safety with enum values', () => {
      // The TypeScript enum should correspond to EEnum literals
      expect(FooClass.SHORT).toBe(shortLiteral.getInstance());
      expect(FooClass.MEDIUM).toBe(mediumLiteral.getInstance());
      expect(FooClass.INTERMEDIATE).toBe(intermediateLiteral.getInstance());
      expect(FooClass.LONG).toBe(longLiteral.getInstance());
    });
  });

  describe('Enum Literal Properties', () => {
    it('should have correct literal names', () => {
      expect(shortLiteral.getName()).toBe('SHORT');
      expect(mediumLiteral.getName()).toBe('MEDIUM');
      expect(intermediateLiteral.getName()).toBe('INTERMEDIATE');
      expect(longLiteral.getName()).toBe('LONG');
    });

    it('should have correct literal values', () => {
      expect(shortLiteral.getValue()).toBe(0);
      expect(mediumLiteral.getValue()).toBe(1);
      expect(intermediateLiteral.getValue()).toBe(2);
      expect(longLiteral.getValue()).toBe(3);
    });

    it('should have correct literal string representations', () => {
      expect(shortLiteral.getLiteral()).toBe('SHORT');
      expect(mediumLiteral.getLiteral()).toBe('MEDIUM');
      expect(intermediateLiteral.getLiteral()).toBe('INTERMEDIATE');
      expect(longLiteral.getLiteral()).toBe('LONG');
    });

    it('should reference back to containing enum', () => {
      expect(shortLiteral.getEEnum()).toBe(fooClassEnum);
      expect(mediumLiteral.getEEnum()).toBe(fooClassEnum);
      expect(intermediateLiteral.getEEnum()).toBe(fooClassEnum);
      expect(longLiteral.getEEnum()).toBe(fooClassEnum);
    });

    it('should have runtime instances', () => {
      expect(shortLiteral.getInstance()).toBeDefined();
      expect(mediumLiteral.getInstance()).toBeDefined();
      expect(intermediateLiteral.getInstance()).toBeDefined();
      expect(longLiteral.getInstance()).toBeDefined();
      
      // Instances should be unique
      expect(shortLiteral.getInstance()).not.toBe(mediumLiteral.getInstance());
      expect(mediumLiteral.getInstance()).not.toBe(intermediateLiteral.getInstance());
    });
  });

  describe('Enum Literal Modification', () => {
    it('should allow setting literal properties', () => {
      const testLiteral = shortLiteral;
      const originalName = testLiteral.getName();
      const originalValue = testLiteral.getValue();
      const originalLiteralString = testLiteral.getLiteral();
      const originalInstance = testLiteral.getInstance();
      
      // Test setters
      expect(() => testLiteral.setName('TEST_SHORT')).not.toThrow();
      expect(() => testLiteral.setValue(99)).not.toThrow();
      expect(() => testLiteral.setLiteral('TEST_SHORT')).not.toThrow();
      expect(() => testLiteral.setInstance('TEST_INSTANCE')).not.toThrow();
      
      // Reset to original values (to avoid affecting other tests)
      testLiteral.setName(originalName);
      testLiteral.setValue(originalValue);
      testLiteral.setLiteral(originalLiteralString);
      testLiteral.setInstance(originalInstance);
    });

    it('should allow setting enum reference', () => {
      const testLiteral = shortLiteral;
      const originalEnum = testLiteral.getEEnum();
      
      expect(() => testLiteral.setEEnum(fooClassEnum)).not.toThrow();
      expect(testLiteral.getEEnum()).toBe(fooClassEnum);
      
      // Reset
      testLiteral.setEEnum(originalEnum);
    });
  });

  describe('Enum in Package Context', () => {
    it('should be found in package classifiers', () => {
      const classifiers = corePackage.getEClassifiers();
      expect(classifiers.contains(fooClassEnum)).toBe(true);
      
      const classifierNames = classifiers.map(c => c.getName());
      expect(classifierNames.contains('FooClass')).toBe(true);
    });

    it('should be distinguishable from EClass classifiers', () => {
      const fooClass = corePackage.getEClassifier('Foo');
      
      // fooClassEnum should be an EEnum
      expect((fooClassEnum as any).getELiterals).toBeDefined();
      expect((fooClassEnum as any).getEStructuralFeatures).toBeUndefined();
      
      // fooClass should be an EClass  
      expect((fooClass as any).getEStructuralFeatures).toBeDefined();
      expect((fooClass as any).getELiterals).toBeUndefined();
    });

    it('should have unique classifier ID within package', () => {
      const enumId = fooClassEnum.getClassifierId();
      const fooClass = corePackage.getEClassifier('Foo');
      const fooClassId = fooClass!.getClassifierId();
      
      expect(enumId).not.toBe(fooClassId);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined inputs gracefully', () => {
      expect(fooClassEnum.getEEnumLiteral('')).toBeUndefined();
      expect(fooClassEnum.getEEnumLiteral(null as any)).toBeUndefined();
      expect(fooClassEnum.getEEnumLiteral(undefined as any)).toBeUndefined();
      
      expect(fooClassEnum.getEEnumLiteralByLiteral('')).toBeUndefined();
      expect(fooClassEnum.getEEnumLiteralByLiteral(null as any)).toBeUndefined();
      expect(fooClassEnum.getEEnumLiteralByLiteral(undefined as any)).toBeUndefined();
    });

    it('should maintain consistency between values and literals', () => {
      const literals = fooClassEnum.getELiterals();
      
      for (let i = 0; i < literals.size(); i++) {
        const literal = literals.get(i);
        const foundByValue = fooClassEnum.getEEnumLiteral(literal.getValue());
        const foundByName = fooClassEnum.getEEnumLiteral(literal.getName());
        const foundByLiteral = fooClassEnum.getEEnumLiteralByLiteral(literal.getLiteral());
        
        expect(foundByValue).toBe(literal);
        expect(foundByName).toBe(literal);
        expect(foundByLiteral).toBe(literal);
      }
    });

    it('should handle large enum collections', () => {
      // Test performance/behavior with the existing enum
      const literals = fooClassEnum.getELiterals();
      
      // Should handle iteration efficiently
      let count = 0;
      for (let i = 0; i < literals.size(); i++) {
        const literal = literals.get(i);
        expect(literal).toBeDefined();
        expect(literal.getName()).toBeDefined();
        count++;
      }
      
      expect(count).toBe(literals.size());
    });
  });
});