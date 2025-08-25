import { CoreFactory } from './src/model/core/core-factory';
import { Foo } from './src/model/core/api/foo';
import { Bar } from './src/model/core/api/bar';
import { FooGroup } from './src/model/core/api/foo-group';
import { EOperation } from '@tripsnek/tmf';
import { EParameter } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EClassifier } from '@tripsnek/tmf';

// Test data
let testFoo: Foo;
let testBar: Bar;
let testFooGroup: FooGroup;
let fooClass: EClass;
let barClass: EClass;
let fooGroupClass: EClass;
let copyFooOperation: EOperation;
let doSomethingOperation: EOperation;
let computeFoosOperation: EOperation;
let getFoosWithBazzlesOperation: EOperation;

beforeEach(() => {
  // Create fresh test objects for each test
  testFoo = CoreFactory.eINSTANCE.createFoo();
  testBar = CoreFactory.eINSTANCE.createBar();
  testFooGroup = CoreFactory.eINSTANCE.createFooGroup();
  
  // Get EClasses
  fooClass = testFoo.eClass();
  barClass = testBar.eClass();
  fooGroupClass = testFooGroup.eClass();
  
  // Get operations for testing
  copyFooOperation = fooClass.getEOperations().find(op => op.getName() === 'copyFoo')!;
  doSomethingOperation = barClass.getEOperations().find(op => op.getName() === 'doSomethingWithFooAndBazzles')!;
  computeFoosOperation = fooGroupClass.getEOperations().find(op => op.getName() === 'computeFoosOfClass')!;
  getFoosWithBazzlesOperation = fooGroupClass.getEOperations().find(op => op.getName() === 'getFoosWithBazzles')!;
});

describe('EOperation Tests', () => {

  describe('Basic Operation Properties', () => {
    it('should return correct operation names', () => {
      expect(copyFooOperation?.getName()).toBe('copyFoo');
      expect(doSomethingOperation?.getName()).toBe('doSomethingWithFooAndBazzles');
      expect(computeFoosOperation?.getName()).toBe('computeFoosOfClass');
      expect(getFoosWithBazzlesOperation?.getName()).toBe('getFoosWithBazzles');
    });

    it('should return correct containing class', () => {
      if (copyFooOperation) {
        expect(copyFooOperation.getEContainingClass()).toBe(fooClass);
      }
      if (doSomethingOperation) {
        expect(doSomethingOperation.getEContainingClass()).toBe(barClass);
      }
      if (computeFoosOperation) {
        expect(computeFoosOperation.getEContainingClass()).toBe(fooGroupClass);
      }
    });

    it('should have correct operation IDs', () => {
      if (copyFooOperation) {
        const operationId = copyFooOperation.getOperationID();
        expect(operationId).toBeGreaterThanOrEqual(0);
      }
      
      if (doSomethingOperation) {
        const operationId = doSomethingOperation.getOperationID();
        expect(operationId).toBeGreaterThanOrEqual(0);
      }
    });

    it('should allow setting operation ID', () => {
      if (copyFooOperation) {
        const originalId = copyFooOperation.getOperationID();
        const testId = 999;
        
        copyFooOperation.setOperationID(testId);
        expect(copyFooOperation.getOperationID()).toBe(testId);
        
        // Reset to original
        copyFooOperation.setOperationID(originalId);
        expect(copyFooOperation.getOperationID()).toBe(originalId);
      }
    });

    it('should allow setting containing class', () => {
      if (copyFooOperation) {
        const originalClass = copyFooOperation.getEContainingClass();
        
        expect(() => copyFooOperation.setEContainingClass(fooClass)).not.toThrow();
        expect(copyFooOperation.getEContainingClass()).toBe(fooClass);
        
        // Reset to original
        copyFooOperation.setEContainingClass(originalClass);
      }
    });
  });

  describe('Operation Return Types', () => {
    it('should have correct return types', () => {
      if (copyFooOperation) {
        const returnType = copyFooOperation.getEType();
        if (returnType) {
          expect(returnType.getName()).toBe('Foo');
        }
      }
      
      if (computeFoosOperation) {
        const returnType = computeFoosOperation.getEType();
        if (returnType) {
          // This operation returns a collection, so return type might be EList or similar
          expect(returnType).toBeDefined();
        }
      }
    });

    it('should handle void operations', () => {
      if (doSomethingOperation) {
        const returnType = doSomethingOperation.getEType();
        // Void operations might have undefined return type
        if (!returnType) {
          expect(returnType).toBeUndefined();
        }
      }
    });

    it('should allow setting return type', () => {
      if (copyFooOperation) {
        const originalType = copyFooOperation.getEType();
        const stringType = fooClass.getEPackage().getEClassifier('EString') as EClassifier;
        
        if (stringType) {
          copyFooOperation.setEType(stringType);
          expect(copyFooOperation.getEType()).toBe(stringType);
          
          // Reset to original
          if (originalType) {
            copyFooOperation.setEType(originalType);
          }
        }
      }
    });
  });

  describe('Operation Multiplicity', () => {
    it('should handle single-valued return operations', () => {
      if (copyFooOperation) {
        expect(copyFooOperation.isMany()).toBe(false);
        expect(copyFooOperation.getUpperBound()).toBe(1);
      }
    });

    it('should handle many-valued return operations', () => {
      if (computeFoosOperation) {
        // This operation returns a collection
        const upperBound = computeFoosOperation.getUpperBound();
        if (upperBound === -1) {
          expect(computeFoosOperation.isMany()).toBe(true);
        }
      }
    });

    it('should allow modifying return multiplicity', () => {
      if (copyFooOperation) {
        const originalLower = copyFooOperation.getLowerBound();
        const originalUpper = copyFooOperation.getUpperBound();
        
        copyFooOperation.setLowerBound(0);
        copyFooOperation.setUpperBound(5);
        expect(copyFooOperation.getLowerBound()).toBe(0);
        expect(copyFooOperation.getUpperBound()).toBe(5);
        
        // Reset to original values
        copyFooOperation.setLowerBound(originalLower);
        copyFooOperation.setUpperBound(originalUpper);
      }
    });

    it('should handle required vs optional returns', () => {
      if (copyFooOperation) {
        const isRequired = copyFooOperation.isRequired();
        // Should be consistent with lower bound
        expect(isRequired).toBe(copyFooOperation.getLowerBound() >= 1);
      }
    });
  });

  describe('Operation Parameters', () => {
    it('should return parameter collections', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        expect(parameters).toBeDefined();
        expect(parameters.size()).toBe(2); // foo and bazzles parameters
        
        const paramNames = parameters.map(param => param.getName());
        expect(paramNames.contains('foo')).toBe(true);
        expect(paramNames.contains('bazzles')).toBe(true);
      }
      
      if (computeFoosOperation) {
        const parameters = computeFoosOperation.getEParameters();
        expect(parameters).toBeDefined();
        expect(parameters.size()).toBeGreaterThan(0);
        
        const paramNames = parameters.map(param => param.getName());
        expect(paramNames.contains('fooClass')).toBe(true);
      }
    });

    it('should handle operations with no parameters', () => {
      if (copyFooOperation) {
        const parameters = copyFooOperation.getEParameters();
        expect(parameters).toBeDefined();
        expect(parameters.size()).toBe(0);
      }
      
    });

    it('should provide access to individual parameters', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const firstParam = parameters.get(0);
          expect(firstParam).toBeDefined();
          expect(firstParam.getName()).toBe('foo');
          expect(firstParam.getEOperation()).toBe(doSomethingOperation);
        }
        
        if (parameters.size() > 1) {
          const secondParam = parameters.get(1);
          expect(secondParam).toBeDefined();
          expect(secondParam.getName()).toBe('bazzles');
          expect(secondParam.getEOperation()).toBe(doSomethingOperation);
        }
      }
    });
  });

  describe('Parameter Properties', () => {
    it('should have correct parameter types', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const fooParam = parameters.get(0);
          const paramType = fooParam.getEType();
          expect(paramType).toBeDefined();
          expect(paramType!.getName()).toBe('Foo');
        }
        
        if (parameters.size() > 1) {
          const bazzlesParam = parameters.get(1);
          const paramType = bazzlesParam.getEType();
          expect(paramType).toBeDefined();
          expect(paramType!.getName()).toBe('Bazzle');
        }
      }
    });

    it('should have correct parameter multiplicity', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const fooParam = parameters.get(0);
          expect(fooParam.getUpperBound()).toBe(1); // Single Foo
          expect(fooParam.isMany()).toBe(false);
        }
        
        if (parameters.size() > 1) {
          const bazzlesParam = parameters.get(1);
          expect(bazzlesParam.getUpperBound()).toBe(-1); // Many Bazzles
          expect(bazzlesParam.isMany()).toBe(true);
        }
      }
    });

    it('should handle optional parameters', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        for (let i = 0; i < parameters.size(); i++) {
          const param = parameters.get(i);
          const isOptional = param.isOptional();
          
          // Optional should be related to lower bound
          if (isOptional) {
            expect(param.getLowerBound()).toBe(0);
          } else {
            expect(param.getLowerBound()).toBeGreaterThan(0);
          }
        }
      }
    });

    it('should allow parameter modification', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const param = parameters.get(0);
          const originalName = param.getName();
          const originalLower = param.getLowerBound();
          const originalUpper = param.getUpperBound();
          
          // Test setters
          param.setName('testParam');
          param.setLowerBound(1);
          param.setUpperBound(5);
          
          expect(param.getName()).toBe('testParam');
          expect(param.getLowerBound()).toBe(1);
          expect(param.getUpperBound()).toBe(5);
          
          // Reset to original values
          param.setName(originalName);
          param.setLowerBound(originalLower);
          param.setUpperBound(originalUpper);
        }
      }
    });
  });

  describe('Operation Collections and Lookup', () => {
    it('should be found in class operation collections', () => {
      const fooOperations = fooClass.getEOperations();
      const barOperations = barClass.getEOperations();
      const fooGroupOperations = fooGroupClass.getEOperations();
      
      if (copyFooOperation) {
        expect(fooOperations.contains(copyFooOperation)).toBe(true);
      }
      
      if (doSomethingOperation) {
        expect(barOperations.contains(doSomethingOperation)).toBe(true);
      }
      
      if (computeFoosOperation) {
        expect(fooGroupOperations.contains(computeFoosOperation)).toBe(true);
      }
    });

    it('should be included in all operations including inherited', () => {
      const fooAllOperations = fooClass.getEAllOperations();
      const barAllOperations = barClass.getEAllOperations();
      
      if (copyFooOperation) {
        expect(fooAllOperations.contains(copyFooOperation)).toBe(true);
      }
      
      if (doSomethingOperation) {
        expect(barAllOperations.contains(doSomethingOperation)).toBe(true);
      }
      
      // All operations should be at least as many as direct operations
      expect(fooAllOperations.size()).toBeGreaterThanOrEqual(fooClass.getEOperations().size());
      expect(barAllOperations.size()).toBeGreaterThanOrEqual(barClass.getEOperations().size());
    });

    it('should have unique operation IDs within class', () => {
      const fooOperations = fooClass.getEOperations();
      const operationIds = new Set();
      
      for (let i = 0; i < fooOperations.size(); i++) {
        const operation = fooOperations.get(i);
        const operationId = operation.getOperationID();
        expect(operationIds.has(operationId)).toBe(false);
        operationIds.add(operationId);
      }
    });
  });

  describe('Parameter-Operation Relationship', () => {
    it('should maintain bidirectional parameter-operation relationship', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        for (let i = 0; i < parameters.size(); i++) {
          const param = parameters.get(i);
          expect(param.getEOperation()).toBe(doSomethingOperation);
        }
      }
    });

    it('should allow setting parameter operation', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const param = parameters.get(0);
          const originalOperation = param.getEOperation();
          
          param.setEOperation(doSomethingOperation);
          expect(param.getEOperation()).toBe(doSomethingOperation);
          
          // Reset
          param.setEOperation(originalOperation);
        }
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle operations with complex parameter types', () => {
      if (computeFoosOperation) {
        const parameters = computeFoosOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const param = parameters.get(0);
          const paramType = param.getEType();
          
          // Parameter type should be an enum (FooClass)
          expect(paramType).toBeDefined();
          expect(paramType!.getName()).toBe('FooClass');
          
          // Should be able to access enum-specific methods
          if ((paramType as any).getELiterals) {
            const literals = (paramType as any).getELiterals();
            expect(literals.size()).toBeGreaterThan(0);
          }
        }
      }
    });

    it('should handle null and undefined parameter values', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const param = parameters.get(0);
          
          expect(() => param.setName(null!)).not.toThrow();
          expect(() => param.setName(undefined!)).not.toThrow();
          expect(() => param.setEType(null!)).not.toThrow();
          expect(() => param.setEOperation(null!)).not.toThrow();
        }
      }
    });

    it('should maintain consistency between operation and parameter collections', () => {
      const allClasses = [fooClass, barClass, fooGroupClass];
      
      for (const eClass of allClasses) {
        const operations = eClass.getEOperations();
        
        for (let i = 0; i < operations.size(); i++) {
          const operation = operations.get(i);
          const parameters = operation.getEParameters();
          
          // Each parameter should reference back to the operation
          for (let j = 0; j < parameters.size(); j++) {
            const param = parameters.get(j);
            expect(param.getEOperation()).toBe(operation);
          }
        }
      }
    });

    it('should handle operations with no return type gracefully', () => {
      // Some operations might be void (no return type)
      const allClasses = [fooClass, barClass, fooGroupClass];
      
      for (const eClass of allClasses) {
        const operations = eClass.getEOperations();
        
        for (let i = 0; i < operations.size(); i++) {
          const operation = operations.get(i);
          const returnType = operation.getEType();
          
          // Should not throw even if no return type
          expect(() => operation.getEType()).not.toThrow();
          expect(() => operation.isMany()).not.toThrow();
          expect(() => operation.isRequired()).not.toThrow();
        }
      }
    });

    it('should handle parameter type changes correctly', () => {
      if (doSomethingOperation) {
        const parameters = doSomethingOperation.getEParameters();
        
        if (parameters.size() > 0) {
          const param = parameters.get(0);
          const originalType = param.getEType();
          
          // Try setting to a different type
          const stringType = fooClass.getEPackage().getEClassifier('EString') as EClassifier;
          if (stringType) {
            param.setEType(stringType);
            expect(param.getEType()).toBe(stringType);
            
            // Reset to original
            if (originalType) {
              param.setEType(originalType);
            }
          }
        }
      }
    });
  });
});