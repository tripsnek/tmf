import { EObject } from "@tripsnek/tmf";
import { TUtils } from "@tripsnek/tmf";
import { EStructuralFeature } from "@tripsnek/tmf";
import { BasicEList } from "@tripsnek/tmf";
import { EClass } from "@tripsnek/tmf";
import { EList } from "@tripsnek/tmf";
import { EEnum } from "@tripsnek/tmf";
import { EDataType } from "@tripsnek/tmf";
import { EObjectImpl } from "@tripsnek/tmf";

import { EPackage } from "@tripsnek/tmf";
import { EPackageImpl } from "@tripsnek/tmf";
import { EAttribute } from "@tripsnek/tmf";
import { EFactory } from "@tripsnek/tmf";
import { EReference } from "@tripsnek/tmf";
import { EOperation } from "@tripsnek/tmf";
import { EcorePackage } from "@tripsnek/tmf";
export class ModelPackage extends EPackageImpl {
  /** Singleton */
  public static eINSTANCE: ModelPackage = ModelPackage.init();

  //if the singleton is initialized
  private static isInited = false;

  static eNS_URI = "http://www.tripsnek.com/emf.com.tripsnek.tmftest.model";
  static eNAME = "model";
  static eNS_PREFIX = "emf.com.tripsnek.tmftest.model";

  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {};

  //flags that keep track of whether package is initialized
  private isCreated = false;
  private isInitialized = false;

  //causes EPackage.Registry registration event
  //hard-coded URI, since referring to the static eNS_URI field in constructor can cause issues
  constructor() {
    super("model", "http://www.tripsnek.com/emf.com.tripsnek.tmftest.model");
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

  //DRT 10/1/2020 - this used to be direct lazy retrieval of the
  //factory instance from the corresponding .ts factory file, but
  //that was eliminated to avoid circular imports
  public getEFactoryInstance(): EFactory {
    return this._eFactoryInstance;
  }

  /**
   * This will be invoked by the Factory when it is initialized, any invocations
   * afterwards will have no effect.
   */
  public setEFactoryInstance(factoryInst: EFactory): void {
    if (!this._eFactoryInstance) this._eFactoryInstance = factoryInst;
  }

  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;
  }

  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    //reusable handle for eoperations, used for adding parameters
    let op: EOperation = null;
  }
}
