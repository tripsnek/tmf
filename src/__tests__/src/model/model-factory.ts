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
import { ModelPackage } from './model-package';

import { ContainerRootType } from './api/container-root-type';
import { ContainerRootTypeImpl } from './impl/container-root-type-impl';
import { ContainedRootType } from './api/contained-root-type';
import { ContainedRootTypeImpl } from './impl/contained-root-type-impl';
import { ModelPackageInitializer } from './model-package-initializer';

export class ModelFactory extends EFactory {
  /* Singleton */
  public static _eINSTANCE: ModelFactory = ModelFactory.init();
  public static init(): ModelFactory {
    if (!ModelFactory._eINSTANCE) {
      ModelFactory._eINSTANCE = new ModelFactory();
    }

    return ModelFactory._eINSTANCE;
  }

  static get eINSTANCE(): ModelFactory {
    ModelPackageInitializer.registerAll();
    return this._eINSTANCE;
  }

  public override create(eClass: EClass): any {
    switch (eClass.getClassifierId()) {
      case ModelPackage.CONTAINER_ROOT_TYPE:
        return this.createContainerRootType();
      case ModelPackage.CONTAINED_ROOT_TYPE:
        return this.createContainedRootType();
      default:
        throw new Error(
          "The class '" + eClass.getName() + "' is not a valid classifier"
        );
    }
  }

  public createContainerRootType(): ContainerRootType {
    return new ContainerRootTypeImpl();
  }
  public createContainedRootType(): ContainedRootType {
    return new ContainedRootTypeImpl();
  }
}
