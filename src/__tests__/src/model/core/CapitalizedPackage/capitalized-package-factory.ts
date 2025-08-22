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
import { CapitalizedPackagePackage } from './capitalized-package-package';

import { ExampleInterface } from './api/example-interface';
import { ExampleInterfaceImpl } from './impl/example-interface-impl';
import { ClassInCapitalizedPackage } from './api/class-in-capitalized-package';
import { ClassInCapitalizedPackageImpl } from './impl/class-in-capitalized-package-impl';

export class CapitalizedPackageFactory extends EFactory {
  /* Singleton */
  public static eINSTANCE: CapitalizedPackageFactory =
    CapitalizedPackageFactory.init();
  public static init(): CapitalizedPackageFactory {
    if (!CapitalizedPackageFactory.eINSTANCE) {
      CapitalizedPackageFactory.eINSTANCE = new CapitalizedPackageFactory();
    }

    //inject the factory instance into the package, so that it can be retrieved reflectively
    CapitalizedPackagePackage.eINSTANCE.setEFactoryInstance(this.eINSTANCE);
    return CapitalizedPackageFactory.eINSTANCE;
  }

  public override create(eClass: EClass): any {
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
