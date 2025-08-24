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
import { CorePackage } from './core-package';

import { User } from './api/user';
import { UserImpl } from './impl/user-impl';
import { FooGroup } from './api/foo-group';
import { FooGroupImpl } from './impl/foo-group-impl';
import { Foo } from './api/foo';
import { FooImpl } from './impl/foo-impl';
import { FooSpecialization } from './api/foo-specialization';
import { FooSpecializationImpl } from './impl/foo-specialization-impl';
import { BarSpecializationWithComponents } from './api/bar-specialization-with-components';
import { BarSpecializationWithComponentsImpl } from './impl/bar-specialization-with-components-impl';
import { Bar } from './api/bar';
import { BarImpl } from './impl/bar-impl';
import { Bazzle } from './api/bazzle';
import { BazzleImpl } from './impl/bazzle-impl';
import { BoundedNumber } from './api/bounded-number';
import { BoundedNumberImpl } from './impl/bounded-number-impl';
import { ThingWithoutID } from './api/thing-without-i-d';
import { ThingWithoutIDImpl } from './impl/thing-without-i-d-impl';
import { ModelPackageInitializer } from '../model-package-initializer';

export class CoreFactory implements EFactory {
  /* Singleton */
  public static _eINSTANCE: CoreFactory = CoreFactory.init();
  public static init(): CoreFactory {
    if (!CoreFactory._eINSTANCE) {
      CoreFactory._eINSTANCE = new CoreFactory();
    }

    return CoreFactory._eINSTANCE;
  }

  static get eINSTANCE(): CoreFactory {
    ModelPackageInitializer.registerAll();
    return this._eINSTANCE;
  }

  public create(eClass: EClass): EObject {
    switch (eClass.getClassifierId()) {
      case CorePackage.USER:
        return this.createUser();
      case CorePackage.FOO_GROUP:
        return this.createFooGroup();
      case CorePackage.FOO:
        return this.createFoo();
      case CorePackage.FOO_SPECIALIZATION:
        return this.createFooSpecialization();
      case CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS:
        return this.createBarSpecializationWithComponents();
      case CorePackage.BAR:
        return this.createBar();
      case CorePackage.BAZZLE:
        return this.createBazzle();
      case CorePackage.BOUNDED_NUMBER:
        return this.createBoundedNumber();
      case CorePackage.THING_WITHOUT_I_D:
        return this.createThingWithoutID();
      default:
        throw new Error(
          "The class '" + eClass.getName() + "' is not a valid classifier"
        );
    }
  }

  public createUser(): User {
    return new UserImpl();
  }
  public createFooGroup(): FooGroup {
    return new FooGroupImpl();
  }
  public createFoo(): Foo {
    return new FooImpl();
  }
  public createFooSpecialization(): FooSpecialization {
    return new FooSpecializationImpl();
  }
  public createBarSpecializationWithComponents(): BarSpecializationWithComponents {
    return new BarSpecializationWithComponentsImpl();
  }
  public createBar(): Bar {
    return new BarImpl();
  }
  public createBazzle(): Bazzle {
    return new BazzleImpl();
  }
  public createBoundedNumber(): BoundedNumber {
    return new BoundedNumberImpl();
  }
  public createThingWithoutID(): ThingWithoutID {
    return new ThingWithoutIDImpl();
  }
}
