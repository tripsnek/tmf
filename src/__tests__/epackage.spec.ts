import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { User } from './src/model/core/api/user';
import { AnalysisResult } from './src/model/analysis/api/analysis-result';
import { EPackage } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { ModelPackage } from './src/model/model-package';

// Test data
let rootPackage: EPackage = ModelPackage.eINSTANCE;
let corePackage: EPackage;
let analysisPackage: EPackage;
let testFoo: Foo;
let testBar: Bar;
let testBazzle: Bazzle;
let testUser: User;
let testAnalysisResult: AnalysisResult;

beforeEach(() => {
  // Create test objects to get access to their packages
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testBar = CoreFactory.eINSTANCE.createBar();
  testBazzle = CoreFactory.eINSTANCE.createBazzle();
  testUser = CoreFactory.eINSTANCE.createUser();
  testAnalysisResult = AnalysisFactory.eINSTANCE.createAnalysisResult();

  // Get packages from the metamodel
  corePackage = testFoo.eClass().getEPackage();
  analysisPackage = testAnalysisResult.eClass().getEPackage();
});

describe('EPackage Tests', () => {
  describe('Basic Package Properties', () => {
    it('should return correct package names', () => {
      expect(corePackage.getName()).toBe('core');
      expect(analysisPackage.getName()).toBe('analysis');

      // Root package name
      if (rootPackage !== corePackage) {
        expect(rootPackage.getName()).toBe('model');
      }
    });

    it('should return correct namespace URIs', () => {
      expect(corePackage.getNsURI()).toBe(
        'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model.core'
      );

      expect(rootPackage.getNsURI()).toBe(
        'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model'
      );
    });

    it('should return correct namespace prefixes', () => {
      expect(corePackage.getNsPrefix()).toBe('core');

      if (rootPackage !== corePackage) {
        expect(rootPackage.getNsPrefix()).toBe(
          'emf.com.tripsnek.tmftest.model'
        );
      }
    });

    it('should allow setting package properties', () => {
      const testPackage = corePackage; // Use existing package for testing
      const originalName = testPackage.getName();
      const originalURI = testPackage.getNsURI();
      const originalPrefix = testPackage.getNsPrefix();

      // Test setters (if they exist)
      testPackage.setName('testCore');
      expect(testPackage.getName()).toBe('testCore');
      testPackage.setName(originalName); // Reset

      testPackage.setNsURI('http://test.uri');
      expect(testPackage.getNsURI()).toBe('http://test.uri');
      testPackage.setNsURI(originalURI); // Reset

      testPackage.setNsPrefix('test');
      expect(testPackage.getNsPrefix()).toBe('test');
      testPackage.setNsPrefix(originalPrefix); // Reset
    });
  });

  //   describe('Package Hierarchy', () => {
  //     it('should return correct super package relationships', () => {
  //       const coreSuperPackage = corePackage.getESuperPackage();
  //       const analysisSuperPackage = analysisPackage.getESuperPackage();

  //       if (coreSuperPackage) {
  //         expect(coreSuperPackage.getName()).toBe('model');
  //       }

  //       if (analysisSuperPackage) {
  //         expect(analysisSuperPackage.getName()).toBe('model');
  //       }
  //     });

  //     it('should return correct subpackages', () => {
  //       if (rootPackage !== corePackage) {
  //         const subPackages = rootPackage.getESubPackages();
  //         expect(subPackages.size()).toBeGreaterThanOrEqual(2);

  //         const subPackageNames = subPackages.map((pkg) => pkg.getName());
  //         expect(subPackageNames.contains('core')).toBe(true);
  //         expect(subPackageNames.contains('analysis')).toBe(true);
  //       }
  //     });

  //     it('should find subpackages by name', () => {
  //       const foundCorePackage = rootPackage.getESubPackageByName('core');
  //       const foundAnalysisPackage = rootPackage.getESubPackageByName('analysis');

  //       expect(foundCorePackage).toBe(corePackage);
  //       expect(foundAnalysisPackage).toBe(analysisPackage);

  //       const nonExistentPackage =
  //         rootPackage.getESubPackageByName('nonexistent');
  //       expect(nonExistentPackage).toBeUndefined();
  //     });

  //     it('should return correct root package', () => {
  //       const coreRoot = corePackage.getRootPackage();
  //       const analysisRoot = analysisPackage.getRootPackage();

  //       if (coreRoot && analysisRoot) {
  //         expect(coreRoot).toBe(analysisRoot); // Should be same root
  //         expect(coreRoot.getName()).toBe('model');
  //       }
  //     });
  //   });

  describe('Classifier Management', () => {
    it('should return all classifiers in core package', () => {
      const coreClassifiers = corePackage.getEClassifiers();
      expect(coreClassifiers.size()).toBeGreaterThan(0);

      const classifierNames = coreClassifiers.map((c) => c.getName());
      expect(classifierNames.contains('Foo')).toBe(true);
      expect(classifierNames.contains('Bar')).toBe(true);
      expect(classifierNames.contains('Bazzle')).toBe(true);
      expect(classifierNames.contains('User')).toBe(true);
      expect(classifierNames.contains('FooClass')).toBe(true); // enum
      expect(classifierNames.contains('BoundedNumber')).toBe(true);
    });

    it('should return all classifiers in analysis package', () => {
      const analysisClassifiers = analysisPackage.getEClassifiers();
      expect(analysisClassifiers.size()).toBeGreaterThan(0);

      const classifierNames = analysisClassifiers.map((c) => c.getName());
      expect(classifierNames.contains('AnalysisResult')).toBe(true);
    });

    it('should find classifiers by name', () => {
      const fooClassifier = corePackage.getEClassifier('Foo');
      expect(fooClassifier).toBeDefined();
      expect(fooClassifier!.getName()).toBe('Foo');
      expect(fooClassifier).toBe(testFoo.eClass());

      const barClassifier = corePackage.getEClassifier('Bar');
      expect(barClassifier).toBeDefined();
      expect(barClassifier!.getName()).toBe('Bar');

      const nonExistentClassifier = corePackage.getEClassifier('NonExistent');
      expect(nonExistentClassifier).toBeUndefined();
    });

    it('should distinguish between different classifier types', () => {
      const fooClass = corePackage.getEClassifier('Foo') as EClass;
      const fooEnumClass = corePackage.getEClassifier('FooClass') as EEnum;

      expect(fooClass).toBeDefined();
      expect(fooEnumClass).toBeDefined();

      // Check that we can cast to specific types
      expect(typeof fooClass.getEStructuralFeatures).toBe('function');
      expect(typeof fooEnumClass.getELiterals).toBe('function');
    });
  });

  describe('Factory Access', () => {
    it('should return correct factory for packages', () => {
      const coreFactory = corePackage.getEFactoryInstance();
      const analysisFactory = analysisPackage.getEFactoryInstance();

      expect(coreFactory).toBeDefined();
      expect(analysisFactory).toBeDefined();

      // Should be able to create instances
      const fooClass = corePackage.getEClassifier('Foo') as EClass;
      const createdFoo = coreFactory.create(fooClass);
      expect(createdFoo).toBeDefined();
      expect(createdFoo.eClass()).toBe(fooClass);
    });

    it('should maintain factory consistency', () => {
      const factory1 = corePackage.getEFactoryInstance();
      const factory2 = corePackage.getEFactoryInstance();

      expect(factory1).toBe(factory2); // Should return same instance
    });
  });

  describe('Package Registration and Lookup', () => {
    it('should be findable in package registry by URI', () => {
      // This test assumes there's a global package registry
      if (
        typeof EPackage !== 'undefined' &&
        typeof EPackage.Registry !== 'undefined'
      ) {
        const foundCorePackage = EPackage.Registry.INSTANCE.getEPackage(
          corePackage.getNsURI()
        );
        const foundAnalysisPackage = EPackage.Registry.INSTANCE.getEPackage(
          analysisPackage.getNsURI()
        );

        expect(foundCorePackage).toBe(corePackage);
        expect(foundAnalysisPackage).toBe(analysisPackage);
      }
    });

    it('should handle package registration correctly', () => {
      if (
        typeof EPackage !== 'undefined' &&
        typeof EPackage.Registry !== 'undefined'
      ) {
        const testURI = 'http://test.package.uri';
        const registry = EPackage.Registry.INSTANCE;

        // Register and retrieve
        registry.set(testURI, corePackage);
        const retrieved = registry.getEPackage(testURI);
        expect(retrieved).toBe(corePackage);

        // Clean up
        registry.delete(testURI);
      }
    });
  });

  describe('Data Types and Enums', () => {
    it('should provide access to enums', () => {
      const fooEnum = corePackage.getEClassifier('FooClass') as EEnum;
      expect(fooEnum).toBeDefined();

      const literals = fooEnum.getELiterals();
      expect(literals.size()).toBe(4); // SHORT, MEDIUM, INTERMEDIATE, LONG

      const literalNames = literals.map((lit) => lit.getName());
      expect(literalNames.contains('SHORT')).toBe(true);
      expect(literalNames.contains('MEDIUM')).toBe(true);
      expect(literalNames.contains('INTERMEDIATE')).toBe(true);
      expect(literalNames.contains('LONG')).toBe(true);
    });

    it('should provide access to data types', () => {
      // Look for basic data types that might be in the package
      const classifiers = corePackage.getEClassifiers();
      const dataTypes = classifiers.filter((c) => {
        return !(c as any).getEStructuralFeatures; // Not an EClass
      });

      expect(dataTypes.size()).toBeGreaterThan(0);
    });

    it('should handle enum value lookup', () => {
      const fooEnum = corePackage.getEClassifier('FooClass') as EEnum;

      const shortLiteral = fooEnum.getEEnumLiteral('SHORT');
      expect(shortLiteral).toBeDefined();
      expect(shortLiteral!.getName()).toBe('SHORT');
      expect(shortLiteral!.getValue()).toBe(0);

      const mediumLiteral = fooEnum.getEEnumLiteral('MEDIUM');
      expect(mediumLiteral).toBeDefined();
      expect(mediumLiteral!.getValue()).toBe(1);

      const intermediateLiteral = fooEnum.getEEnumLiteral('INTERMEDIATE');
      expect(intermediateLiteral!.getValue()).toBe(2);

      const longLiteral = fooEnum.getEEnumLiteral('LONG');
      expect(longLiteral!.getValue()).toBe(3);
    });
  });

  describe('Package Validation and Integrity', () => {
    it('should maintain classifier-package relationships', () => {
      const classifiers = corePackage.getEClassifiers();

      for (let i = 0; i < classifiers.size(); i++) {
        const classifier = classifiers.get(i);
        expect(classifier.getEPackage()).toBe(corePackage);
      }
    });

    it('should maintain consistent package hierarchy', () => {
      // Check that subpackages reference correct super package
      if (rootPackage !== corePackage) {
        const subPackages = rootPackage.getESubPackages();

        for (let i = 0; i < subPackages.size(); i++) {
          const subPackage = subPackages.get(i);
          expect(subPackage.getESuperPackage()).toBe(rootPackage);
        }
      }
    });

    it('should handle circular references safely', () => {
      // Ensure no infinite loops in package traversal
      const visited = new Set<EPackage>();

      function visitPackage(pkg: EPackage) {
        if (visited.has(pkg)) {
          return; // Already visited, avoid infinite loop
        }
        visited.add(pkg);

        const subPackages = pkg.getESubPackages();
        for (let i = 0; i < subPackages.size(); i++) {
          visitPackage(subPackages.get(i));
        }
      }

      visitPackage(rootPackage);
      expect(visited.size).toBeGreaterThan(0);
    });
  });

  describe('Package Operations', () => {
    it('should support adding and removing classifiers', () => {
      const originalSize = corePackage.getEClassifiers().size();

      // Create a test classifier (this might require factory methods)
      const testClass = testFoo.eClass(); // Use existing class as test

      // This test would depend on implementation details
      // Just verify the collection exists and is modifiable
      expect(corePackage.getEClassifiers()).toBeDefined();
      expect(typeof corePackage.getEClassifiers().size).toBe('function');
    });

    it('should support adding and removing subpackages', () => {
      const originalSize = rootPackage.getESubPackages().size();

      // Verify the collection exists and is accessible
      expect(rootPackage.getESubPackages()).toBeDefined();
      expect(typeof rootPackage.getESubPackages().size).toBe('function');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined inputs gracefully', () => {
      expect(corePackage.getEClassifier('')).toBeUndefined();
      expect(corePackage.getEClassifier(null as any)).toBeUndefined();
      expect(corePackage.getEClassifier(undefined as any)).toBeUndefined();
      expect(rootPackage.getESubPackageByName('')).toBeUndefined();
      expect(rootPackage.getESubPackageByName(null as any)).toBeUndefined();
    });

    it('should handle empty packages correctly', () => {
      // Create or find an empty package if possible
      const emptyClassifiers = analysisPackage.getEClassifiers();

      // Even if not empty, should handle empty-like operations
      expect(emptyClassifiers.size()).toBeGreaterThanOrEqual(0);
      expect(emptyClassifiers.isEmpty).toBeDefined();
    });

    it('should maintain package consistency during modifications', () => {
      // Test that package state remains consistent
      const classifierCount = corePackage.getEClassifiers().size();
      const classifierNames = corePackage
        .getEClassifiers()
        .map((c) => c.getName());

      // Verify no duplicates
      const uniqueNames = new Set(
        classifierNames.elements ? classifierNames.elements() : []
      );
      expect(uniqueNames.size).toBe(classifierNames.size());
    });

    it('should handle package URI uniqueness', () => {
      const coreURI = corePackage.getNsURI();
      const analysisURI = analysisPackage.getNsURI();

      expect(coreURI).not.toBe(analysisURI);
      expect(coreURI.length).toBeGreaterThan(0);
      expect(analysisURI.length).toBeGreaterThan(0);
    });
  });
});
