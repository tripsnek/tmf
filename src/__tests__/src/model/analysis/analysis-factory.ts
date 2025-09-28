import { EObject } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { AnalysisPackage } from './analysis-package.js';

import { AnalysisResult } from './api/analysis-result.js';
import { AnalysisResultImpl } from './impl/analysis-result-impl.js';
import { PackageRegistry } from '../package-registry.js';

export class AnalysisFactory implements EFactory {
  /* Singleton */
  public static _eINSTANCE: AnalysisFactory = AnalysisFactory.init();
  public static init(): AnalysisFactory {
    if (!AnalysisFactory._eINSTANCE) {
      AnalysisFactory._eINSTANCE = new AnalysisFactory();
    }

    return AnalysisFactory._eINSTANCE;
  }

  static get eINSTANCE(): AnalysisFactory {
    AnalysisPackage.eINSTANCE; // Ensure package is initialized
    AnalysisPackage.registerFactory(this._eINSTANCE); // Register this factory with the package
    return this._eINSTANCE;
  }

  public create(eClass: EClass): EObject {
    switch (eClass.getClassifierId()) {
      case AnalysisPackage.ANALYSIS_RESULT:
        return this.createAnalysisResult();
      default:
        throw new Error(
          "The class '" + eClass.getName() + "' is not a valid classifier"
        );
    }
  }

  public createAnalysisResult(): AnalysisResult {
    return new AnalysisResultImpl();
  }
}

// Register this factory class with the package registry
PackageRegistry.registerFactoryClass('analysis', () => AnalysisFactory);
