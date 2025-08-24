import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { EReference } from '@tripsnek/tmf';
import { EAttribute } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { AnalysisPackage } from './analysis-package';

import { AnalysisResult } from './api/analysis-result';
import { AnalysisResultImpl } from './impl/analysis-result-impl';
import { ModelPackageInitializer } from '../model-package-initializer';

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
    ModelPackageInitializer.registerAll();
    return this._eINSTANCE;
  }

  public override create(eClass: EClass): EObject {
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
