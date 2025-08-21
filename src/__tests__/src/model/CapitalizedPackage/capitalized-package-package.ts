import { CorePackage } from './../core/core-package';
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
export class CapitalizedPackagePackage extends EPackageImpl {
  public static EXAMPLE_INTERFACE = 0;
  public static EXAMPLE_INTERFACE_FEATURE_COUNT = 0;
  public static EXAMPLE_INTERFACE__INTERFACE_OPERATION = 0;

  /** Singleton */
  public static eINSTANCE: CapitalizedPackagePackage =
    CapitalizedPackagePackage.init();

  //if the singleton is initialized
  private static isInited = false;

  static eNS_URI = 'http://www.example.org/package1';
  static eNAME = 'CapitalizedPackage';
  static eNS_PREFIX = 'package1';

  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {
    static EXAMPLE_INTERFACE: EClass =
      CapitalizedPackagePackage.eINSTANCE.getExampleInterface();
  };

  //flags that keep track of whether package is initialized
  private isCreated = false;
  private isInitialized = false;

  private exampleInterfaceEClass!: EClass;

  //causes EPackage.Registry registration event
  //hard-coded URI, since referring to the static eNS_URI field in constructor can cause issues
  constructor() {
    super('CapitalizedPackage', 'http://www.example.org/package1', 'package1');
  }

  /**
   * Invoked once. Initializes the Singleton.
   *
   * NOTE: Lots of differences here with the EMF version, which interacts with the package Registry,
   * other packages from the same model to register interdependencies, and freezes the package meta-data.
   */
  private static init(): CapitalizedPackagePackage {
    if (CapitalizedPackagePackage.isInited) return this.eINSTANCE;
    // Obtain or create and register package
    const theCapitalizedPackagePackage = new CapitalizedPackagePackage();
    //this is necessary specifically for EcorePackage generation, which needs to refer to itself
    this.eINSTANCE = theCapitalizedPackagePackage;
    CapitalizedPackagePackage.isInited = true;

    // Create package meta-data objects
    theCapitalizedPackagePackage.createPackageContents();

    // Initialize created meta-data
    theCapitalizedPackagePackage.initializePackageContents();
    return theCapitalizedPackagePackage;
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

  public getExampleInterface(): EClass {
    return this.exampleInterfaceEClass;
  }
  public getExampleInterface_InterfaceOperation(): EOperation {
    return this.exampleInterfaceEClass.getEOperations().get(0);
  }

  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;
    this.exampleInterfaceEClass = this.createEClass(
      CapitalizedPackagePackage.EXAMPLE_INTERFACE
    );
    this.createEOperation(
      this.exampleInterfaceEClass,
      CapitalizedPackagePackage.EXAMPLE_INTERFACE__INTERFACE_OPERATION
    );
  }

  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    //reusable handle for eoperations, used for adding parameters
    let op: EOperation;
    this.initEClass(
      this.exampleInterfaceEClass,
      'ExampleInterface',
      false,
      true,
      true
    );
    op = this.initEOperation(
      this.getExampleInterface_InterfaceOperation(),
      CorePackage.eINSTANCE.getFoo(),
      'interfaceOperation',
      0,
      1,
      true,
      true
    );
    this.createEParameter(
      op,
      'fooGroup',
      -1,
      CorePackage.eINSTANCE.getFooGroup()
    );
  }
}
