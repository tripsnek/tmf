import { EObject } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { ModelPackage } from './model-package.js';

import { ContainerRootType } from './api/container-root-type.js';
import { ContainerRootTypeImpl } from './impl/container-root-type-impl.js';
import { ContainedRootType } from './api/contained-root-type.js';
import { ContainedRootTypeImpl } from './impl/contained-root-type-impl.js';
import { PackageRegistry } from './package-registry.js';

export class ModelFactory implements EFactory {
  /* Singleton */
  public static _eINSTANCE: ModelFactory = ModelFactory.init();
  public static init(): ModelFactory {
    if (!ModelFactory._eINSTANCE) {
      ModelFactory._eINSTANCE = new ModelFactory();
    }

    return ModelFactory._eINSTANCE;
  }

  static get eINSTANCE(): ModelFactory {
    ModelPackage.eINSTANCE; // Ensure package is initialized
    ModelPackage.registerFactory(this._eINSTANCE); // Register this factory with the package
    return this._eINSTANCE;
  }

  public create(eClass: EClass): EObject {
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

// Register this factory class with the package registry
PackageRegistry.registerFactoryClass('model', () => ModelFactory);
