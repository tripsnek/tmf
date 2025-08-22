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
import { AnalysisResultImpl } from './src/model/analysis/impl/analysis-result-impl';
import { ModelPackage } from './src/model/model-package';
import { CapitalizedPackagePackage } from './src/model/core/CapitalizedPackage/capitalized-package-package';

const toDeserialize =
  '{"@type":"AnalysisResult","id":"ar1","editDate":"2025-08-22T20:12:31.325Z"}';
const toDeserializeArray = `[${toDeserialize}]`;

AnalysisPackage.eINSTANCE;
// AnalysisFactory.eINSTANCE; //this works too!

const ar = new AnalysisResultImpl();
ar.setId('ar1');
ar.setEditDate(new Date());

const arArray = [ar];

let consoleWarnSpy: jest.SpyInstance;

beforeEach(() => {
  // Create a spy on console.warn before each test
  consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

});

afterEach(() => {
  // Restore original console.warn after each test
  consoleWarnSpy.mockRestore();
});

//validate deserialized Foo contents
describe('TJson', () => {
  it('no warning on makeJson when initialized', () => {
    const arJs = TJson.makeJson(ar);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(arJs['@type']).toBe('AnalysisResult');
    expect(arJs['id']).toBe('ar1');
  });
  it('no warning on makeEObject when initialized', () => {
    const deserializedAr = <AnalysisResult>(
      TJson.makeEObject(JSON.parse(toDeserialize))
    );
    expect(deserializedAr.getId()).toBe('ar1');
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
  });
  it('no warning on makeJsonArray when initialized', () => {
    const arJs = TJson.makeJsonArray(arArray);
    expect(arJs.length).toBe(1);
    expect(arJs[0].id).toBe('ar1');  
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);    
  });
  it('no warning on makeEObjectArray when initialized', () => {
    const deserializedAr = <AnalysisResult[]>(
      TJson.makeEObjectArray(JSON.parse(toDeserializeArray))
    );
    expect(deserializedAr.length).toBe(1);
    expect(deserializedAr[0].getId()).toBe('ar1');  
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
  });      
  it('warning on makeJson when not initialized', () => {
    TJson.setPackages([]);
    const arJs = TJson.makeJson(ar);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'TJson: No packages registered. Call TJson.setPackages([...]) or ' +
        'import and touch your package (e.g., MyPackage.eINSTANCE) before using TJson.'
    );
  });
  it('warning on makeEObject when not initialized', () => {
    TJson.setPackages([]);
    const deserializedAr = <AnalysisResult>(
      TJson.makeEObject(JSON.parse(toDeserialize))
    );
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'TJson: No packages registered. Call TJson.setPackages([...]) or ' +
        'import and touch your package (e.g., MyPackage.eINSTANCE) before using TJson.'
    );
  });
  it('warning on makeJsonArray when not initialized', () => {
    TJson.setPackages([]);
    const arJs = TJson.makeJsonArray(arArray);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'TJson: No packages registered. Call TJson.setPackages([...]) or ' +
        'import and touch your package (e.g., MyPackage.eINSTANCE) before using TJson.'
    );
  });
  it('warning on makeEObjectArray when not initialized', () => {
    TJson.setPackages([]);
    const deserializedAr = (
      TJson.makeEObjectArray(JSON.parse(toDeserializeArray))
    );
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'TJson: No packages registered. Call TJson.setPackages([...]) or ' +
        'import and touch your package (e.g., MyPackage.eINSTANCE) before using TJson.'
    );
  });  
});
