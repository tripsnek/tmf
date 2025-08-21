import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';

import { EPackage } from '@tripsnek/tmf';
import { EPackageImpl } from '@tripsnek/tmf';
import { EAttribute } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { EReference } from '@tripsnek/tmf';
import { EOperation } from '@tripsnek/tmf';
import { EcorePackage } from '@tripsnek/tmf';
export class ModelPackage extends EPackageImpl {
  public static CONTAINED_ROOT_TYPE = 0;
  public static CONTAINED_ROOT_TYPE_FEATURE_COUNT = 1;
  public static CONTAINED_ROOT_TYPE__CONTAINER = 0;
  public static CONTAINER_ROOT_TYPE = 1;
  public static CONTAINER_ROOT_TYPE_FEATURE_COUNT = 1;
  public static CONTAINER_ROOT_TYPE__CONTAINED = 0;

  /** Singleton */
  public static eINSTANCE: ModelPackage = ModelPackage.init();

  //if the singleton is initialized
  private static isInited = false;

  static eNS_URI = 'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model';
  static eNAME = 'model';
  static eNS_PREFIX = 'emf.com.tripsnek.tmftest.model';

  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {
    static CONTAINED_ROOT_TYPE: EClass =
      ModelPackage.eINSTANCE.getContainedRootType();
    static CONTAINED_ROOT_TYPE__CONTAINER: EReference =
      ModelPackage.eINSTANCE.getContainedRootType_Container();
    static CONTAINER_ROOT_TYPE: EClass =
      ModelPackage.eINSTANCE.getContainerRootType();
    static CONTAINER_ROOT_TYPE__CONTAINED: EReference =
      ModelPackage.eINSTANCE.getContainerRootType_Contained();
  };

  //flags that keep track of whether package is initialized
  private isCreated = false;
  private isInitialized = false;

  private containedRootTypeEClass!: EClass;
  private containerRootTypeEClass!: EClass;

  //causes EPackage.Registry registration event
  //hard-coded URI, since referring to the static eNS_URI field in constructor can cause issues
  constructor() {
    super(
      'model',
      'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model',
      'emf.com.tripsnek.tmftest.model'
    );
  }

  /**
   * Invoked once. Initializes the Singleton.
   *
   * NOTE: Lots of differences here with the EMF version, which interacts with the package Registry,
   * other packages from the same model to register interdependencies, and freezes the package meta-data.
   */
  private static init(): ModelPackage {
    if (ModelPackage.isInited) return this.eINSTANCE;
    // Obtain or create and register package
    const theModelPackage = new ModelPackage();
    //this is necessary specifically for EcorePackage generation, which needs to refer to itself
    this.eINSTANCE = theModelPackage;
    ModelPackage.isInited = true;

    // Create package meta-data objects
    theModelPackage.createPackageContents();

    // Initialize created meta-data
    theModelPackage.initializePackageContents();
    return theModelPackage;
  }

  //this used to be direct lazy retrieval of the
  //factory instance from the corresponding .ts factory file, but
  //that was eliminated to avoid circular imports
  public override getEFactoryInstance(): EFactory {
    return this._eFactoryInstance;
  }

  /**
   * This will be invoked by the Factory when it is initialized, any invocations
   * afterwards will have no effect.
   */
  public override setEFactoryInstance(factoryInst: EFactory): void {
    if (!this._eFactoryInstance) this._eFactoryInstance = factoryInst;
  }

  public getContainedRootType(): EClass {
    return this.containedRootTypeEClass;
  }
  public getContainedRootType_Container(): EReference {
    return <EReference>(
      this.containedRootTypeEClass.getEStructuralFeatures().get(0)
    );
  }
  public getContainerRootType(): EClass {
    return this.containerRootTypeEClass;
  }
  public getContainerRootType_Contained(): EReference {
    return <EReference>(
      this.containerRootTypeEClass.getEStructuralFeatures().get(0)
    );
  }

  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;
    this.containedRootTypeEClass = this.createEClass(
      ModelPackage.CONTAINED_ROOT_TYPE
    );
    this.createEReference(
      this.containedRootTypeEClass,
      ModelPackage.CONTAINED_ROOT_TYPE__CONTAINER
    );
    this.containerRootTypeEClass = this.createEClass(
      ModelPackage.CONTAINER_ROOT_TYPE
    );
    this.createEReference(
      this.containerRootTypeEClass,
      ModelPackage.CONTAINER_ROOT_TYPE__CONTAINED
    );
  }

  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    //reusable handle for eoperations, used for adding parameters
    let op: EOperation;
    this.initEClass(
      this.containedRootTypeEClass,
      'ContainedRootType',
      false,
      false,
      true
    );
    this.initEReference(
      this.getContainedRootType_Container(),
      this.getContainerRootType(),
      this.getContainerRootType_Contained(),
      'container',
      '',
      0,
      1,
      '', //TODO: Container Class
      false,
      false,
      true,
      false,
      false,
      true, //TODO: isUnsettable
      false,
      false, //TODO: isDerived
      false //TODO: isOrdered
    );
    this.initEClass(
      this.containerRootTypeEClass,
      'ContainerRootType',
      false,
      false,
      true
    );
    this.initEReference(
      this.getContainerRootType_Contained(),
      this.getContainedRootType(),
      this.getContainedRootType_Container(),
      'contained',
      '',
      0,
      -1,
      '', //TODO: Container Class
      false,
      false,
      true,
      true,
      false,
      true, //TODO: isUnsettable
      false,
      false, //TODO: isDerived
      false //TODO: isOrdered
    );
  }
}
