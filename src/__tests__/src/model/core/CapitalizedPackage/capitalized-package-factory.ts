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
import { CapitalizedPackagePackage } from './capitalized-package-package.js';

import { ExampleInterface } from './api/example-interface.js';
import { ExampleInterfaceImpl } from './impl/example-interface-impl.js';
import { ClassInCapitalizedPackage } from './api/class-in-capitalized-package.js';
import { ClassInCapitalizedPackageImpl } from './impl/class-in-capitalized-package-impl.js';
import { ModelPackageInitializer } from '../../model-package-initializer.js';

export class CapitalizedPackageFactory implements EFactory {
  /* Singleton */
  public static _eINSTANCE: CapitalizedPackageFactory =
    CapitalizedPackageFactory.init();
  public static init(): CapitalizedPackageFactory {
    if (!CapitalizedPackageFactory._eINSTANCE) {
      CapitalizedPackageFactory._eINSTANCE = new CapitalizedPackageFactory();
    }

    return CapitalizedPackageFactory._eINSTANCE;
  }

  static get eINSTANCE(): CapitalizedPackageFactory {
    ModelPackageInitializer.registerAll();
    return this._eINSTANCE;
  }

  public create(eClass: EClass): EObject {
    switch (eClass.getClassifierId()) {
      case CapitalizedPackagePackage.EXAMPLE_INTERFACE:
        return this.createExampleInterface();
      case CapitalizedPackagePackage.CLASS_IN_CAPITALIZED_PACKAGE:
        return this.createClassInCapitalizedPackage();
      default:
        throw new Error(
          "The class '" + eClass.getName() + "' is not a valid classifier"
        );
    }
  }

  public createExampleInterface(): ExampleInterface {
    return new ExampleInterfaceImpl();
  }
  public createClassInCapitalizedPackage(): ClassInCapitalizedPackage {
    return new ClassInCapitalizedPackageImpl();
  }
}
