import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { Bar } from './src/model/core/api/bar';
import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { FooClass } from './src/model/core/api/foo-class';
import { Bazzle } from './src/model/core/api/bazzle';
import { User } from './src/model/core/api/user';
import { FooGroup } from './src/model/core/api/foo-group';
import { BoundedNumber } from './src/model/core/api/bounded-number';
import { BarSpecializationWithComponents } from './src/model/core/api/bar-specialization-with-components';
import { FooSpecialization } from './src/model/core/api/foo-specialization';
import {EClass} from '@tripsnek/tmf';

// Create test data
let fooClass: EClass;
let barClass: EClass;
let bazzleClass: EClass;
let userClass: EClass;
let fooGroupClass: EClass;
let boundedNumberClass: EClass;
let fooSpecializationClass: EClass;
let barSpecializationClass: EClass;
let namedEntityClass: EClass;
let idedEntityClass: EClass;

let testFoo: Foo;
let testBar: Bar;
let testBazzle: Bazzle;
let testUser: User;

beforeEach(() => {
  // Get EClasses from the metamodel
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testBar = CoreFactory.eINSTANCE.createBar();
  testBazzle = CoreFactory.eINSTANCE.createBazzle();
  testUser = CoreFactory.eINSTANCE.createUser();
  
  fooClass = testFoo.eClass();
  barClass = testBar.eClass();
  bazzleClass = testBazzle.eClass();
  userClass = testUser.eClass();
  
  const testFooGroup = CoreFactory.eINSTANCE.createFooGroup();
  const testBoundedNumber = CoreFactory.eINSTANCE.createBoundedNumber();
  const testFooSpecialization = CoreFactory.eINSTANCE.createFooSpecialization();
  const testBarSpecialization = CoreFactory.eINSTANCE.createBarSpecializationWithComponents();
  
  fooGroupClass = testFooGroup.eClass();
  boundedNumberClass = testBoundedNumber.eClass();
  fooSpecializationClass = testFooSpecialization.eClass();
  barSpecializationClass = testBarSpecialization.eClass();
  
  // Get abstract superclasses by accessing their metadata
  namedEntityClass = fooClass.getESuperTypes().get(0); // Foo extends NamedEntity
  idedEntityClass = namedEntityClass.getESuperTypes().get(0); // NamedEntity extends IdedEntity
});

describe('EClass Tests', () => {
  
  describe('Basic EClass Properties', () => {
    it('should return correct class names', () => {
      expect(fooClass.getName()).toBe('Foo');
      expect(barClass.getName()).toBe('Bar');
      expect(bazzleClass.getName()).toBe('Bazzle');
      expect(userClass.getName()).toBe('User');
    });

    it('should identify abstract classes correctly', () => {
      expect(namedEntityClass.isAbstract()).toBe(true);
      expect(idedEntityClass.isAbstract()).toBe(true);
      expect(fooClass.isAbstract()).toBe(false);
      expect(barClass.isAbstract()).toBe(false);
    });

    it('should identify interface classes correctly', () => {
      // Based on the ecore, these should all be classes, not interfaces
      expect(fooClass.isInterface()).toBe(false);
      expect(barClass.isInterface()).toBe(false);
      expect(namedEntityClass.isInterface()).toBe(false);
    });
  });

  describe('Instance Creation', () => {
    it('should create instances of concrete classes', () => {
      const fooInstance = fooClass.createInstance();
      expect(fooInstance).toBeDefined();
      expect(fooInstance.eClass()).toBe(fooClass);
    });

    it('should create instances of all concrete classes', () => {
      const barInstance = barClass.createInstance();
      const bazzleInstance = bazzleClass.createInstance();
      const userInstance = userClass.createInstance();
      
      expect(barInstance.eClass()).toBe(barClass);
      expect(bazzleInstance.eClass()).toBe(bazzleClass);
      expect(userInstance.eClass()).toBe(userClass);
    });
  });

  describe('Inheritance Hierarchy', () => {
    it('should return correct super types', () => {
      const fooSuperTypes = fooClass.getESuperTypes();
      expect(fooSuperTypes.size()).toBe(1);
      expect(fooSuperTypes.get(0).getName()).toBe('NamedEntity');
      
      const namedEntitySuperTypes = namedEntityClass.getESuperTypes();
      expect(namedEntitySuperTypes.size()).toBe(1);
      expect(namedEntitySuperTypes.get(0).getName()).toBe('IdedEntity');
    });

    it('should return all super types including inherited ones', () => {
      const fooAllSuperTypes = fooClass.getEAllSuperTypes();
      expect(fooAllSuperTypes.size()).toBeGreaterThanOrEqual(2);
      
      const superTypeNames = fooAllSuperTypes.map(st => st.getName());
      expect(superTypeNames.contains('NamedEntity')).toBe(true);
      expect(superTypeNames.contains('IdedEntity')).toBe(true);
    });

    it('should correctly identify super type relationships', () => {
      expect(namedEntityClass.isSuperTypeOf(fooClass)).toBe(true);
      expect(idedEntityClass.isSuperTypeOf(fooClass)).toBe(true);
      expect(idedEntityClass.isSuperTypeOf(namedEntityClass)).toBe(true);
      
      expect(fooClass.isSuperTypeOf(namedEntityClass)).toBe(false);
      expect(fooClass.isSuperTypeOf(barClass)).toBe(false);
    });

    it('should handle specialization classes correctly', () => {
      expect(fooClass.isSuperTypeOf(fooSpecializationClass)).toBe(true);
      expect(barClass.isSuperTypeOf(barSpecializationClass)).toBe(true);
      
      const fooSpecSuperTypes = fooSpecializationClass.getESuperTypes();
      expect(fooSpecSuperTypes.get(0)).toBe(fooClass);
    });
  });

  describe('Structural Features', () => {
    it('should return structural features for Foo class', () => {
      const fooFeatures = fooClass.getEStructuralFeatures();
      expect(fooFeatures.size()).toBeGreaterThan(0);
      
      const featureNames = fooFeatures.map(f => f.getName());
      expect(featureNames.contains('creationDate')).toBe(true);
      expect(featureNames.contains('fooClass')).toBe(true);
      expect(featureNames.contains('bars')).toBe(true);
    });

    it('should return all structural features including inherited ones', () => {
      const fooAllFeatures = fooClass.getEAllStructuralFeatures();
      expect(fooAllFeatures.size()).toBeGreaterThan(fooClass.getEStructuralFeatures().size());
      
      const allFeatureNames = fooAllFeatures.map(f => f.getName());
      expect(allFeatureNames.contains('name')).toBe(true); // from NamedEntity
      expect(allFeatureNames.contains('id')).toBe(true); // from IdedEntity
      expect(allFeatureNames.contains('creationDate')).toBe(true); // from Foo
    });

    it('should find structural features by name', () => {
      const nameFeature = fooClass.getEStructuralFeature('name');
      expect(nameFeature).toBeDefined();
      expect(nameFeature!.getName()).toBe('name');
      
      const idFeature = fooClass.getEStructuralFeature('id');
      expect(idFeature).toBeDefined();
      expect(idFeature!.getName()).toBe('id');
      
      const nonExistentFeature = fooClass.getEStructuralFeature('nonExistent');
      expect(nonExistentFeature).toBeUndefined();
    });

    it('should find structural features by ID', () => {
      const features = fooClass.getEAllStructuralFeatures();
      if (features.size() > 0) {
        const firstFeature = features.get(0);
        const featureId = fooClass.getFeatureID(firstFeature);
        const foundFeature = fooClass.getEStructuralFeature(featureId);
        expect(foundFeature).toBe(firstFeature);
      }
    });

    it('should return correct feature count', () => {
      const featureCount = fooClass.getFeatureCount();
      const allFeatures = fooClass.getEAllStructuralFeatures();
      expect(featureCount).toBe(allFeatures.size());
    });
  });

  describe('Attributes', () => {
    it('should return attributes for classes', () => {
      const fooAttributes = fooClass.getEAttributes();
      expect(fooAttributes).toBeDefined();
      
      const userAttributes = userClass.getEAttributes();
      expect(userAttributes.size()).toBeGreaterThan(0);
      
      const userAttrNames = userAttributes.map(attr => attr.getName());
      expect(userAttrNames.contains('pass')).toBe(true);
      expect(userAttrNames.contains('salt')).toBe(true);
      expect(userAttrNames.contains('email')).toBe(true);
    });

    it('should return all attributes including inherited ones', () => {
      const userAllAttributes = userClass.getEAllAttributes();
      expect(userAllAttributes.size()).toBeGreaterThan(userClass.getEAttributes().size());
      
      const allAttrNames = userAllAttributes.map(attr => attr.getName());
      expect(allAttrNames.contains('name')).toBe(true); // from NamedEntity
      expect(allAttrNames.contains('id')).toBe(true); // from IdedEntity
      expect(allAttrNames.contains('pass')).toBe(true); // from User
    });

    it('should identify ID attributes', () => {
      const idAttribute = fooClass.getEIDAttribute();
      expect(idAttribute).toBeDefined();
      expect(idAttribute!.getName()).toBe('id');
      expect(idAttribute!.isId()).toBe(true);
    });
  });

  describe('References', () => {
    it('should return references for classes', () => {
      const fooReferences = fooClass.getEReferences();
      expect(fooReferences.size()).toBeGreaterThan(0);
      
      const fooRefNames = fooReferences.map(ref => ref.getName());
      expect(fooRefNames.contains('bars')).toBe(true);
      expect(fooRefNames.contains('range')).toBe(true);
    });

    it('should return all references including inherited ones', () => {
      const fooAllReferences = fooClass.getEAllReferences();
      expect(fooAllReferences.size()).toBeGreaterThanOrEqual(fooClass.getEReferences().size());
      
      const allRefNames = fooAllReferences.map(ref => ref.getName());
      expect(allRefNames.contains('bars')).toBe(true);
      expect(allRefNames.contains('editUser')).toBe(true); // from IdedEntity
    });

    it('should identify containment references', () => {
      const fooContainments = fooClass.getEAllContainments();
      expect(fooContainments.size()).toBeGreaterThan(0);
      
      const containmentNames = fooContainments.map(ref => ref.getName());
      expect(containmentNames.contains('bars')).toBe(true); // bars is a containment reference
    });
  });

  describe('Operations', () => {
    it('should return operations for classes', () => {
      const fooOperations = fooClass.getEOperations();
      expect(fooOperations.size()).toBeGreaterThan(0);
      
      const fooOpNames = fooOperations.map(op => op.getName());
      expect(fooOpNames.contains('copyFoo')).toBe(true);
    });

    it('should return operations for classes with parameters', () => {
      const fooGroupOperations = fooGroupClass.getEOperations();
      expect(fooGroupOperations.size()).toBeGreaterThan(0);
      
      const opNames = fooGroupOperations.map(op => op.getName());
      expect(opNames.contains('computeFoosOfClass')).toBe(true);
      expect(opNames.contains('getFoosWithBazzles')).toBe(true);
      expect(opNames.contains('freeze')).toBe(true);
    });

    it('should return all operations including inherited ones', () => {
      const fooAllOperations = fooClass.getEAllOperations();
      expect(fooAllOperations.size()).toBeGreaterThanOrEqual(fooClass.getEOperations().size());
    });

    it('should handle operations with parameters correctly', () => {
      const barOperations = barClass.getEOperations();
      expect(barOperations.size()).toBeGreaterThan(0);
      
      const opWithParams = barOperations.find(op => op.getName() === 'doSomethingWithFooAndBazzles');
      expect(opWithParams).toBeDefined();
      
      if (opWithParams) {
        const parameters = opWithParams.getEParameters();
        expect(parameters.size()).toBe(2);
        expect(parameters.get(0).getName()).toBe('foo');
        expect(parameters.get(1).getName()).toBe('bazzles');
      }
    });
  });

  describe('Modifiable Properties', () => {
    it('should allow setting abstract property', () => {
      const testClass = fooClass; // Use concrete class for testing
      const originalAbstract = testClass.isAbstract();
      
      testClass.setAbstract(!originalAbstract);
      expect(testClass.isAbstract()).toBe(!originalAbstract);
      
      // Reset to original value
      testClass.setAbstract(originalAbstract);
      expect(testClass.isAbstract()).toBe(originalAbstract);
    });

    it('should allow setting interface property', () => {
      const testClass = fooClass;
      const originalInterface = testClass.isInterface();
      
      testClass.setInterface(!originalInterface);
      expect(testClass.isInterface()).toBe(!originalInterface);
      
      // Reset to original value
      testClass.setInterface(originalInterface);
      expect(testClass.isInterface()).toBe(originalInterface);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty collections gracefully', () => {
      // Test class with minimal features
      const emptyFeatures = boundedNumberClass.getEOperations();
      expect(emptyFeatures.size()).toBe(0);
      expect(emptyFeatures.isEmpty()).toBe(true);
    });

    it('should handle invalid feature lookups', () => {
      expect(fooClass.getEStructuralFeature('invalidFeatureName')).toBeUndefined();
      expect(fooClass.getEStructuralFeature(-1)).toBeUndefined();
      expect(fooClass.getEStructuralFeature(99999)).toBeUndefined();
    });

    it('should maintain consistent feature IDs', () => {
      const features = fooClass.getEAllStructuralFeatures();
      for (let i = 0; i < features.size(); i++) {
        const feature = features.get(i);
        const featureId = fooClass.getFeatureID(feature);
        expect(featureId).toBeGreaterThanOrEqual(0);
        
        const retrievedFeature = fooClass.getEStructuralFeature(featureId);
        expect(retrievedFeature).toBe(feature);
      }
    });
  });
});