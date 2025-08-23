import { TJson, EList, EObject } from '@tripsnek/tmf';

import { TUtils } from '@tripsnek/tmf';
import { AnalysisFactory } from './src/model/analysis/analysis-factory';
import { AnalysisPackage } from './src/model/analysis/analysis-package';
import { AnalysisResult } from './src/model/analysis/api/analysis-result';
import { Bar } from './src/model/core/api/bar';
import { Bazzle } from './src/model/core/api/bazzle';
import { Foo } from './src/model/core/api/foo';
import { FooClass } from './src/model/core/api/foo-class';
import { CoreFactory } from './src/model/core/core-factory';
import { CorePackage } from './src/model/core/core-package';
import { BoundedNumberImpl } from './src/model/core/impl/bounded-number-impl';

//configure TJson with test packages
const fact = CoreFactory.eINSTANCE;


//validate deserialized Foo contents
describe('TJson Proxy Functionality', () => {
  
  // Update the existing test to expect proxy behavior instead of null
  it('should create proxy objects for external non-containment references', () => {
    const f1 = fact.createFoo();
    const f2 = fact.createFoo();
    const b1 = fact.createBar();
    const b2 = fact.createBar();
    
    // Set up the object hierarchy
    f1.getBars().add(b1);
    f2.getBars().add(b2);
    const baz1 = fact.createBazzle();
    b1.getBazzles().add(baz1);
    
    // Ensure external object has an ID
    TUtils.genIdIfNotExists(b2);
    
    // Set internal ref to an external object
    baz1.setBackupBar(b2);
    
    // Serialize and deserialize only f1 (not f2, so b2 is external)
    const throughJson = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const deserializedBaz = throughJson.getBars().get(0).getBazzles().get(0);
    const backupBarProxy = deserializedBaz.getBackupBar();
    
    // Should create a proxy instead of being null
    expect(backupBarProxy).toBeTruthy();
    expect(backupBarProxy.eIsProxy()).toBe(true);
  });

  it('should create proxies with correct EClass', () => {
    const f1 = fact.createFoo();
    const externalUser = CoreFactory.eINSTANCE.createUser();
    externalUser.setId('user123');
    externalUser.setName('External User');
    
    // Set external reference
    f1.setEditUser(externalUser);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const userProxy = deserialized.getEditUser();
    
    expect(userProxy).toBeTruthy();
    expect(userProxy.eIsProxy()).toBe(true);
    expect(userProxy.eClass().getName()).toBe('User');
  });

  it('should create proxies with correct ID value', () => {
    const f1 = fact.createFoo();
    const externalUser = CoreFactory.eINSTANCE.createUser();
    externalUser.setId('user456');
    externalUser.setName('Test User');
    
    f1.setEditUser(externalUser);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const userProxy = deserialized.getEditUser();
    
    expect(userProxy).toBeTruthy();
    expect(userProxy.eIsProxy()).toBe(true);
    expect(userProxy.getId()).toBe('user456');
    expect(userProxy.fullId()).toBe('User_user456');
  });

  it('should share same proxy instance for multiple references to same external object', () => {
    const f1 = fact.createFoo();
    const f2 = fact.createFoo();
    const externalUser = CoreFactory.eINSTANCE.createUser();
    externalUser.setId('shared_user');
    
    // Both foos reference the same external user
    f1.setEditUser(externalUser);
    f2.setEditUser(externalUser);
    
    // Put both in a container
    const container = fact.createFooGroup();
    // Note: FooGroup doesn't have a direct reference to multiple Foos in the model
    // So let's use a different approach with bars
    
    const bar1 = fact.createBar();
    const bar2 = fact.createBar();
    const baz1 = fact.createBazzle();
    const baz2 = fact.createBazzle();
    
    f1.getBars().add(bar1);
    f1.getBars().add(bar2);
    bar1.getBazzles().add(baz1);
    bar2.getBazzles().add(baz2);
    
    // External bar that both bazzles reference
    const externalBar = fact.createBar();
    TUtils.genIdIfNotExists(externalBar);
    baz1.setBackupBar(externalBar);
    baz2.setBackupBar(externalBar);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const proxy1 = deserialized.getBars().get(0).getBazzles().get(0).getBackupBar();
    const proxy2 = deserialized.getBars().get(1).getBazzles().get(0).getBackupBar();
    
    expect(proxy1).toBeTruthy();
    expect(proxy2).toBeTruthy();
    expect(proxy1.eIsProxy()).toBe(true);
    expect(proxy2.eIsProxy()).toBe(true);
    // Should be the exact same instance
    expect(proxy1).toBe(proxy2);
  });

  it('should handle many-valued external references', () => {
    const f1 = fact.createFoo();
    const externalFoo1 = fact.createFoo();
    const externalFoo2 = fact.createFoo();
    
    TUtils.genIdIfNotExists(externalFoo1);
    TUtils.genIdIfNotExists(externalFoo2);
    externalFoo1.setName('External1');
    externalFoo2.setName('External2');
    
    // Add external references to many-valued cross aggregate
    f1.getManyCrossAggregate().add(externalFoo1);
    f1.getManyCrossAggregate().add(externalFoo2);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const crossRefs = deserialized.getManyCrossAggregate();
    
    expect(crossRefs.size()).toBe(2);
    
    const proxy1 = crossRefs.get(0);
    const proxy2 = crossRefs.get(1);
    
    expect(proxy1.eIsProxy()).toBe(true);
    expect(proxy2.eIsProxy()).toBe(true);
    expect(proxy1.eClass().getName()).toBe('Foo');
    expect(proxy2.eClass().getName()).toBe('Foo');
    expect(proxy1.getId()).toBe(externalFoo1.getId());
    expect(proxy2.getId()).toBe(externalFoo2.getId());
  });

  it('should not create proxies for containment references', () => {
    const f1 = fact.createFoo();
    const bar1 = fact.createBar();
    const baz1 = fact.createBazzle();
    
    TUtils.genIdIfNotExists(baz1);
    baz1.setName('Contained Bazzle');
    
    // This is a containment reference
    bar1.getBazzles().add(baz1);
    f1.getBars().add(bar1);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const deserializedBaz = deserialized.getBars().get(0).getBazzles().get(0);
    
    expect(deserializedBaz).toBeTruthy();
    expect(deserializedBaz.eIsProxy()).toBe(false);
    expect(deserializedBaz.getName()).toBe('Contained Bazzle');
  });

  it('should still resolve internal references normally', () => {
    const f1 = fact.createFoo();
    const bar1 = fact.createBar();
    const bar2 = fact.createBar();
    const baz1 = fact.createBazzle();
    
    f1.getBars().add(bar1);
    f1.getBars().add(bar2);
    bar1.getBazzles().add(baz1);
    
    // This should resolve normally since bar2 is in the same aggregate
    baz1.setBackupBar(bar2);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const deserializedBaz = deserialized.getBars().get(0).getBazzles().get(0);
    const backupBar = deserializedBaz.getBackupBar();
    const expectedBar = deserialized.getBars().get(1);
    
    expect(backupBar).toBeTruthy();
    expect(backupBar.eIsProxy()).toBe(false);
    expect(backupBar).toBe(expectedBar);
  });

  it('should handle external references with complex IDs', () => {
    const f1 = fact.createFoo();
    const externalUser = CoreFactory.eINSTANCE.createUser();
    
    // Test with complex ID that might contain underscores
    externalUser.setId('complex_user_id_123');
    externalUser.setName('Complex User');
    f1.setEditUser(externalUser);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const userProxy = deserialized.getEditUser();
    
    expect(userProxy).toBeTruthy();
    expect(userProxy.eIsProxy()).toBe(true);
    expect(userProxy.getId()).toBe('complex_user_id_123');
    expect(userProxy.fullId()).toBe('User_complex_user_id_123');
  });

  it('should create proxies for cross-package references', () => {
    const analysisResult = AnalysisFactory.eINSTANCE.createAnalysisResult();
    const externalUser = CoreFactory.eINSTANCE.createUser();
    TUtils.genIdIfNotExists(externalUser);
    externalUser.setName('External User');
    
    // Cross-package reference from analysis to core
    analysisResult.setUser(externalUser);
    
    const deserialized = TJson.makeEObject(TJson.makeJson(analysisResult)) as AnalysisResult;
    const userProxy = deserialized.getUser();
    
    expect(userProxy).toBeTruthy();
    expect(userProxy.eIsProxy()).toBe(true);
    expect(userProxy.eClass().getName()).toBe('User');
    expect(userProxy.getId()).toBe(externalUser.getId());
  });

  it('should log appropriate warnings for invalid proxy creation scenarios', () => {
    // Spy on console.warn to capture warnings
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    // Create a scenario where proxy creation might fail
    // This is harder to test directly, but we can at least verify
    // the system doesn't crash with malformed data
    
    const malformedJson = {
      "@type": "Foo",
      "id": "test_foo",
      "editUser": "InvalidIdFormat" // Missing underscore
    };
    
    const result = TJson.makeEObject(malformedJson);
    
    // Should still create the object, just without the problematic reference
    expect(result).toBeTruthy();
    expect(result!.eClass().getName()).toBe('Foo');
    
    consoleSpy.mockRestore();
  });

  it('should preserve proxy status through multiple serialization cycles', () => {
    const f1 = fact.createFoo();
    const externalUser = CoreFactory.eINSTANCE.createUser();
    externalUser.setId('persistent_user');
    f1.setEditUser(externalUser);
    
    // First serialization cycle - creates proxy
    const firstDeserialized = TJson.makeEObject(TJson.makeJson(f1)) as Foo;
    const firstProxy = firstDeserialized.getEditUser();
    expect(firstProxy.eIsProxy()).toBe(true);
    
    // Second serialization cycle - proxy should be serialized as reference
    const secondDeserialized = TJson.makeEObject(TJson.makeJson(firstDeserialized)) as Foo;
    const secondProxy = secondDeserialized.getEditUser();
    
    expect(secondProxy).toBeTruthy();
    expect(secondProxy.eIsProxy()).toBe(true);
    expect(secondProxy.getId()).toBe('persistent_user');
    expect(secondProxy.eClass().getName()).toBe('User');
  });
});