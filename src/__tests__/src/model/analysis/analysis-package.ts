import { CorePackage } from '../core/core-package';
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
export class AnalysisPackage extends EPackageImpl {
  public static ANALYSIS_RESULT = 0;
  public static ANALYSIS_RESULT_FEATURE_COUNT =
    CorePackage.IDED_ENTITY_FEATURE_COUNT + 2;
  public static ANALYSIS_RESULT__USER =
    CorePackage.IDED_ENTITY_FEATURE_COUNT + 0;
  public static ANALYSIS_RESULT__OBJECT =
    CorePackage.IDED_ENTITY_FEATURE_COUNT + 1;
  public static ANALYSIS_RESULT__CLONE_OBJECT = 0;

  /** Singleton */
  public static eINSTANCE: AnalysisPackage = AnalysisPackage.init();

  //if the singleton is initialized
  private static isInited = false;

  static eNS_URI = 'undefined';
  static eNAME = 'analysis';
  static eNS_PREFIX = 'undefined';

  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {
    static ANALYSIS_RESULT: EClass =
      AnalysisPackage.eINSTANCE.getAnalysisResult();
    static ANALYSIS_RESULT__USER: EReference =
      AnalysisPackage.eINSTANCE.getAnalysisResult_User();
    static ANALYSIS_RESULT__OBJECT: EReference =
      AnalysisPackage.eINSTANCE.getAnalysisResult_Object();
  };

  //flags that keep track of whether package is initialized
  private isCreated = false;
  private isInitialized = false;

  private analysisResultEClass: EClass = {} as EClass;

  //causes EPackage.Registry registration event
  //hard-coded URI, since referring to the static eNS_URI field in constructor can cause issues
  constructor() {
    super('analysis', 'undefined');
  }

  /**
   * Invoked once. Initializes the Singleton.
   *
   * NOTE: Lots of differences here with the EMF version, which interacts with the package Registry,
   * other packages from the same model to register interdependencies, and freezes the package meta-data.
   */
  private static init(): AnalysisPackage {
    if (AnalysisPackage.isInited) return this.eINSTANCE;
    // Obtain or create and register package
    const theAnalysisPackage = new AnalysisPackage();
    //this is necessary specifically for EcorePackage generation, which needs to refer to itself
    this.eINSTANCE = theAnalysisPackage;
    AnalysisPackage.isInited = true;

    // Create package meta-data objects
    theAnalysisPackage.createPackageContents();

    // Initialize created meta-data
    theAnalysisPackage.initializePackageContents();
    return theAnalysisPackage;
  }

  //this used to be direct lazy retrieval of the
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

  public getAnalysisResult(): EClass {
    return this.analysisResultEClass;
  }
  public getAnalysisResult_User(): EReference {
    return <EReference>(
      this.analysisResultEClass.getEStructuralFeatures().get(0)
    );
  }
  public getAnalysisResult_Object(): EReference {
    return <EReference>(
      this.analysisResultEClass.getEStructuralFeatures().get(1)
    );
  }
  public getAnalysisResult_CloneObject(): EOperation {
    return this.analysisResultEClass.getEOperations().get(0);
  }

  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;
    this.analysisResultEClass = this.createEClass(
      AnalysisPackage.ANALYSIS_RESULT
    );
    this.createEReference(
      this.analysisResultEClass,
      AnalysisPackage.ANALYSIS_RESULT__USER
    );
    this.createEReference(
      this.analysisResultEClass,
      AnalysisPackage.ANALYSIS_RESULT__OBJECT
    );
    this.createEOperation(
      this.analysisResultEClass,
      AnalysisPackage.ANALYSIS_RESULT__CLONE_OBJECT
    );
  }

  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    //reusable handle for eoperations, used for adding parameters
    let op: EOperation;
    this.analysisResultEClass
      .getESuperTypes()
      .add(CorePackage.eINSTANCE.getIdedEntity());
    this.initEClass(
      this.analysisResultEClass,
      'AnalysisResult',
      false,
      false,
      true
    );
    this.initEReference(
      this.getAnalysisResult_User(),
      CorePackage.eINSTANCE.getUser(),
      null,
      'user',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getAnalysisResult_Object(),
      CorePackage.eINSTANCE.getNamedEntity(),
      null,
      'object',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false
    );
    op = this.initEOperation(
      this.getAnalysisResult_CloneObject(),
      CorePackage.eINSTANCE.getNamedEntity(),
      'cloneObject',
      0,
      1,
      true,
      true
    );
  }
}
