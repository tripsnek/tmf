import { EObject } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { CapitalizedPackagePackage } from './capitalized-package-package.js';

import { ClassInCapitalizedPackage } from './api/class-in-capitalized-package.js';
import { ClassInCapitalizedPackageImpl } from './impl/class-in-capitalized-package-impl.js';
import { PackageRegistry } from '../../package-registry.js';

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
    CapitalizedPackagePackage.eINSTANCE; // Ensure package is initialized
    CapitalizedPackagePackage.registerFactory(this._eINSTANCE); // Register this factory with the package
    return this._eINSTANCE;
  }

  public create(eClass: EClass): EObject {
    switch (eClass.getClassifierId()) {
      case CapitalizedPackagePackage.CLASS_IN_CAPITALIZED_PACKAGE:
        return this.createClassInCapitalizedPackage();
      default:
        throw new Error(
          "The class '" + eClass.getName() + "' is not a valid classifier"
        );
    }
  }

  public createClassInCapitalizedPackage(): ClassInCapitalizedPackage {
    return new ClassInCapitalizedPackageImpl();
  }
}

// Register this factory class with the package registry
PackageRegistry.registerFactoryClass(
  'CapitalizedPackage',
  () => CapitalizedPackageFactory
);
