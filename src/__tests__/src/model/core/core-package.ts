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
import { FooClass } from './api/foo-class';
export class CorePackage extends EPackageImpl {
  public static BOUNDED_NUMBER = 0;
  public static BOUNDED_NUMBER_FEATURE_COUNT = 4;
  public static BOUNDED_NUMBER__UNITS = 0;
  public static BOUNDED_NUMBER__VALUE = 1;
  public static BOUNDED_NUMBER__MAX_VALUE = 2;
  public static BOUNDED_NUMBER__MIN_VALUE = 3;
  public static IDED_ENTITY = 1;
  public static IDED_ENTITY_FEATURE_COUNT = 5;
  public static IDED_ENTITY__ID = 0;
  public static IDED_ENTITY__EDIT_DATE = 1;
  public static IDED_ENTITY__EDIT_USER = 2;
  public static IDED_ENTITY__LOCKED = 3;
  public static IDED_ENTITY__ID2 = 4;
  public static NAMED_ENTITY = 2;
  public static NAMED_ENTITY_FEATURE_COUNT =
    CorePackage.IDED_ENTITY_FEATURE_COUNT + 1;
  public static NAMED_ENTITY__NAME = CorePackage.IDED_ENTITY_FEATURE_COUNT + 0;
  public static BAZZLE = 3;
  public static BAZZLE_FEATURE_COUNT =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 2;
  public static BAZZLE__BACKUP_BAR = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 0;
  public static BAZZLE__ONE_TO_ONE_FOO =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 1;
  public static BAR = 4;
  public static BAR_FEATURE_COUNT = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 3;
  public static BAR__FOO = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 0;
  public static BAR__BAZZLES = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 1;
  public static BAR__BACKUP_FOR = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 2;
  public static BAR_SPECIALIZATION_WITH_COMPONENTS = 5;
  public static BAR_SPECIALIZATION_WITH_COMPONENTS_FEATURE_COUNT =
    CorePackage.BAR_FEATURE_COUNT + 2;
  public static BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS =
    CorePackage.BAR_FEATURE_COUNT + 0;
  public static BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME =
    CorePackage.BAR_FEATURE_COUNT + 1;
  public static FOO = 6;
  public static FOO_FEATURE_COUNT = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 18;
  public static FOO__GROUP = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 0;
  public static FOO__CREATION_DATE = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 1;
  public static FOO__FOO_CLASS = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 2;
  public static FOO__RANGE = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 3;
  public static FOO__BARS = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 4;
  public static FOO__ONE_TO_ONE_BAZZLE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 5;
  public static FOO__MANY_ATTRIBUTE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 6;
  public static FOO__UNCHANGEABLE_ATTRIBUTE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 7;
  public static FOO__UNCHANGEABLE_REFERENCE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 8;
  public static FOO__TRANSIENT_ATTRIBUTE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 9;
  public static FOO__TRANSIENT_REFERENCE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 10;
  public static FOO__VOLATILE_ATTRIBUTE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 11;
  public static FOO__VOLATILE_REFERENCE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 12;
  public static FOO__MANY_CROSS_AGGREGATE =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 13;
  public static FOO__MANY_CROSS_AGGREGATE_NESTED =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 14;
  public static FOO__MANY_VALUE_OBJECTS =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 15;
  public static FOO__ONE_TO_ONE_CONTAINMENT =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 16;
  public static FOO__OWNED_FOOS = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 17;
  public static FOO__COPY_FOO = 0;
  public static FOO_SPECIALIZATION = 7;
  public static FOO_SPECIALIZATION_FEATURE_COUNT =
    CorePackage.FOO_FEATURE_COUNT + 0;
  public static FOO_GROUP = 8;
  public static FOO_GROUP_FEATURE_COUNT =
    CorePackage.NAMED_ENTITY_FEATURE_COUNT + 1;
  public static FOO_GROUP__USER = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 0;
  public static FOO_GROUP__COMPUTE_FOOS_OF_CLASS = 0;
  public static FOO_GROUP__GET_FOOS_WITH_BAZZLES = 1;
  public static FOO_GROUP__FREEZE = 2;
  public static USER = 9;
  public static USER_FEATURE_COUNT = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 3;
  public static USER__PASS = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 0;
  public static USER__SALT = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 1;
  public static USER__EMAIL = CorePackage.NAMED_ENTITY_FEATURE_COUNT + 2;
  public static FOO_CLASS = 10;

  /** Singleton */
  public static eINSTANCE: CorePackage = CorePackage.init();

  //if the singleton is initialized
  private static isInited = false;

  static eNS_URI =
    'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model.core';
  static eNAME = 'core';
  static eNS_PREFIX = 'core';

  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {
    static BOUNDED_NUMBER: EClass = CorePackage.eINSTANCE.getBoundedNumber();
    static BOUNDED_NUMBER__UNITS: EAttribute =
      CorePackage.eINSTANCE.getBoundedNumber_Units();
    static BOUNDED_NUMBER__VALUE: EAttribute =
      CorePackage.eINSTANCE.getBoundedNumber_Value();
    static BOUNDED_NUMBER__MAX_VALUE: EAttribute =
      CorePackage.eINSTANCE.getBoundedNumber_MaxValue();
    static BOUNDED_NUMBER__MIN_VALUE: EAttribute =
      CorePackage.eINSTANCE.getBoundedNumber_MinValue();
    static IDED_ENTITY: EClass = CorePackage.eINSTANCE.getIdedEntity();
    static IDED_ENTITY__ID: EAttribute =
      CorePackage.eINSTANCE.getIdedEntity_Id();
    static IDED_ENTITY__EDIT_DATE: EAttribute =
      CorePackage.eINSTANCE.getIdedEntity_EditDate();
    static IDED_ENTITY__EDIT_USER: EReference =
      CorePackage.eINSTANCE.getIdedEntity_EditUser();
    static IDED_ENTITY__LOCKED: EAttribute =
      CorePackage.eINSTANCE.getIdedEntity_Locked();
    static IDED_ENTITY__ID2: EAttribute =
      CorePackage.eINSTANCE.getIdedEntity_Id2();
    static NAMED_ENTITY: EClass = CorePackage.eINSTANCE.getNamedEntity();
    static NAMED_ENTITY__NAME: EAttribute =
      CorePackage.eINSTANCE.getNamedEntity_Name();
    static BAZZLE: EClass = CorePackage.eINSTANCE.getBazzle();
    static BAZZLE__BACKUP_BAR: EReference =
      CorePackage.eINSTANCE.getBazzle_BackupBar();
    static BAZZLE__ONE_TO_ONE_FOO: EReference =
      CorePackage.eINSTANCE.getBazzle_OneToOneFoo();
    static BAR: EClass = CorePackage.eINSTANCE.getBar();
    static BAR__FOO: EReference = CorePackage.eINSTANCE.getBar_Foo();
    static BAR__BAZZLES: EReference = CorePackage.eINSTANCE.getBar_Bazzles();
    static BAR__BACKUP_FOR: EReference =
      CorePackage.eINSTANCE.getBar_BackupFor();
    static BAR_SPECIALIZATION_WITH_COMPONENTS: EClass =
      CorePackage.eINSTANCE.getBarSpecializationWithComponents();
    static BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS: EReference =
      CorePackage.eINSTANCE.getBarSpecializationWithComponents_ComponentBars();
    static BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME: EAttribute =
      CorePackage.eINSTANCE.getBarSpecializationWithComponents_SpecialName();
    static FOO: EClass = CorePackage.eINSTANCE.getFoo();
    static FOO__GROUP: EReference = CorePackage.eINSTANCE.getFoo_Group();
    static FOO__CREATION_DATE: EAttribute =
      CorePackage.eINSTANCE.getFoo_CreationDate();
    static FOO__FOO_CLASS: EAttribute = CorePackage.eINSTANCE.getFoo_FooClass();
    static FOO__RANGE: EReference = CorePackage.eINSTANCE.getFoo_Range();
    static FOO__BARS: EReference = CorePackage.eINSTANCE.getFoo_Bars();
    static FOO__ONE_TO_ONE_BAZZLE: EReference =
      CorePackage.eINSTANCE.getFoo_OneToOneBazzle();
    static FOO__MANY_ATTRIBUTE: EAttribute =
      CorePackage.eINSTANCE.getFoo_ManyAttribute();
    static FOO__UNCHANGEABLE_ATTRIBUTE: EAttribute =
      CorePackage.eINSTANCE.getFoo_UnchangeableAttribute();
    static FOO__UNCHANGEABLE_REFERENCE: EReference =
      CorePackage.eINSTANCE.getFoo_UnchangeableReference();
    static FOO__TRANSIENT_ATTRIBUTE: EAttribute =
      CorePackage.eINSTANCE.getFoo_TransientAttribute();
    static FOO__TRANSIENT_REFERENCE: EReference =
      CorePackage.eINSTANCE.getFoo_TransientReference();
    static FOO__VOLATILE_ATTRIBUTE: EAttribute =
      CorePackage.eINSTANCE.getFoo_VolatileAttribute();
    static FOO__VOLATILE_REFERENCE: EReference =
      CorePackage.eINSTANCE.getFoo_VolatileReference();
    static FOO__MANY_CROSS_AGGREGATE: EReference =
      CorePackage.eINSTANCE.getFoo_ManyCrossAggregate();
    static FOO__MANY_CROSS_AGGREGATE_NESTED: EReference =
      CorePackage.eINSTANCE.getFoo_ManyCrossAggregateNested();
    static FOO__MANY_VALUE_OBJECTS: EReference =
      CorePackage.eINSTANCE.getFoo_ManyValueObjects();
    static FOO__ONE_TO_ONE_CONTAINMENT: EReference =
      CorePackage.eINSTANCE.getFoo_OneToOneContainment();
    static FOO__OWNED_FOOS: EReference =
      CorePackage.eINSTANCE.getFoo_OwnedFoos();
    static FOO_SPECIALIZATION: EClass =
      CorePackage.eINSTANCE.getFooSpecialization();
    static FOO_GROUP: EClass = CorePackage.eINSTANCE.getFooGroup();
    static FOO_GROUP__USER: EReference =
      CorePackage.eINSTANCE.getFooGroup_User();
    static USER: EClass = CorePackage.eINSTANCE.getUser();
    static USER__PASS: EAttribute = CorePackage.eINSTANCE.getUser_Pass();
    static USER__SALT: EAttribute = CorePackage.eINSTANCE.getUser_Salt();
    static USER__EMAIL: EAttribute = CorePackage.eINSTANCE.getUser_Email();
    static FOO_CLASS: EEnum = CorePackage.eINSTANCE.getFooClass();
  };

  //flags that keep track of whether package is initialized
  private isCreated = false;
  private isInitialized = false;

  private boundedNumberEClass!: EClass;
  private idedEntityEClass!: EClass;
  private namedEntityEClass!: EClass;
  private bazzleEClass!: EClass;
  private barEClass!: EClass;
  private barSpecializationWithComponentsEClass!: EClass;
  private fooEClass!: EClass;
  private fooSpecializationEClass!: EClass;
  private fooGroupEClass!: EClass;
  private userEClass!: EClass;
  private fooClassEEnum!: EEnum;

  //causes EPackage.Registry registration event
  //hard-coded URI, since referring to the static eNS_URI field in constructor can cause issues
  constructor() {
    super(
      'core',
      'http://www.tripsnek.com/emf.com.tripsnek.tmftest.model.core'
    );
  }

  /**
   * Invoked once. Initializes the Singleton.
   *
   * NOTE: Lots of differences here with the EMF version, which interacts with the package Registry,
   * other packages from the same model to register interdependencies, and freezes the package meta-data.
   */
  private static init(): CorePackage {
    if (CorePackage.isInited) return this.eINSTANCE;
    // Obtain or create and register package
    const theCorePackage = new CorePackage();
    //this is necessary specifically for EcorePackage generation, which needs to refer to itself
    this.eINSTANCE = theCorePackage;
    CorePackage.isInited = true;

    // Create package meta-data objects
    theCorePackage.createPackageContents();

    // Initialize created meta-data
    theCorePackage.initializePackageContents();
    return theCorePackage;
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

  public getBoundedNumber(): EClass {
    return this.boundedNumberEClass;
  }
  public getBoundedNumber_Units(): EAttribute {
    return <EAttribute>this.boundedNumberEClass.getEStructuralFeatures().get(0);
  }
  public getBoundedNumber_Value(): EAttribute {
    return <EAttribute>this.boundedNumberEClass.getEStructuralFeatures().get(1);
  }
  public getBoundedNumber_MaxValue(): EAttribute {
    return <EAttribute>this.boundedNumberEClass.getEStructuralFeatures().get(2);
  }
  public getBoundedNumber_MinValue(): EAttribute {
    return <EAttribute>this.boundedNumberEClass.getEStructuralFeatures().get(3);
  }
  public getIdedEntity(): EClass {
    return this.idedEntityEClass;
  }
  public getIdedEntity_Id(): EAttribute {
    return <EAttribute>this.idedEntityEClass.getEStructuralFeatures().get(0);
  }
  public getIdedEntity_EditDate(): EAttribute {
    return <EAttribute>this.idedEntityEClass.getEStructuralFeatures().get(1);
  }
  public getIdedEntity_EditUser(): EReference {
    return <EReference>this.idedEntityEClass.getEStructuralFeatures().get(2);
  }
  public getIdedEntity_Locked(): EAttribute {
    return <EAttribute>this.idedEntityEClass.getEStructuralFeatures().get(3);
  }
  public getIdedEntity_Id2(): EAttribute {
    return <EAttribute>this.idedEntityEClass.getEStructuralFeatures().get(4);
  }
  public getNamedEntity(): EClass {
    return this.namedEntityEClass;
  }
  public getNamedEntity_Name(): EAttribute {
    return <EAttribute>this.namedEntityEClass.getEStructuralFeatures().get(0);
  }
  public getBazzle(): EClass {
    return this.bazzleEClass;
  }
  public getBazzle_BackupBar(): EReference {
    return <EReference>this.bazzleEClass.getEStructuralFeatures().get(0);
  }
  public getBazzle_OneToOneFoo(): EReference {
    return <EReference>this.bazzleEClass.getEStructuralFeatures().get(1);
  }
  public getBar(): EClass {
    return this.barEClass;
  }
  public getBar_Foo(): EReference {
    return <EReference>this.barEClass.getEStructuralFeatures().get(0);
  }
  public getBar_Bazzles(): EReference {
    return <EReference>this.barEClass.getEStructuralFeatures().get(1);
  }
  public getBar_BackupFor(): EReference {
    return <EReference>this.barEClass.getEStructuralFeatures().get(2);
  }
  public getBarSpecializationWithComponents(): EClass {
    return this.barSpecializationWithComponentsEClass;
  }
  public getBarSpecializationWithComponents_ComponentBars(): EReference {
    return <EReference>(
      this.barSpecializationWithComponentsEClass.getEStructuralFeatures().get(0)
    );
  }
  public getBarSpecializationWithComponents_SpecialName(): EAttribute {
    return <EAttribute>(
      this.barSpecializationWithComponentsEClass.getEStructuralFeatures().get(1)
    );
  }
  public getFoo(): EClass {
    return this.fooEClass;
  }
  public getFoo_Group(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(0);
  }
  public getFoo_CreationDate(): EAttribute {
    return <EAttribute>this.fooEClass.getEStructuralFeatures().get(1);
  }
  public getFoo_FooClass(): EAttribute {
    return <EAttribute>this.fooEClass.getEStructuralFeatures().get(2);
  }
  public getFoo_Range(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(3);
  }
  public getFoo_Bars(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(4);
  }
  public getFoo_OneToOneBazzle(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(5);
  }
  public getFoo_ManyAttribute(): EAttribute {
    return <EAttribute>this.fooEClass.getEStructuralFeatures().get(6);
  }
  public getFoo_UnchangeableAttribute(): EAttribute {
    return <EAttribute>this.fooEClass.getEStructuralFeatures().get(7);
  }
  public getFoo_UnchangeableReference(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(8);
  }
  public getFoo_TransientAttribute(): EAttribute {
    return <EAttribute>this.fooEClass.getEStructuralFeatures().get(9);
  }
  public getFoo_TransientReference(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(10);
  }
  public getFoo_VolatileAttribute(): EAttribute {
    return <EAttribute>this.fooEClass.getEStructuralFeatures().get(11);
  }
  public getFoo_VolatileReference(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(12);
  }
  public getFoo_ManyCrossAggregate(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(13);
  }
  public getFoo_ManyCrossAggregateNested(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(14);
  }
  public getFoo_ManyValueObjects(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(15);
  }
  public getFoo_OneToOneContainment(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(16);
  }
  public getFoo_OwnedFoos(): EReference {
    return <EReference>this.fooEClass.getEStructuralFeatures().get(17);
  }
  public getFoo_CopyFoo(): EOperation {
    return this.fooEClass.getEOperations().get(0);
  }
  public getFooSpecialization(): EClass {
    return this.fooSpecializationEClass;
  }
  public getFooGroup(): EClass {
    return this.fooGroupEClass;
  }
  public getFooGroup_User(): EReference {
    return <EReference>this.fooGroupEClass.getEStructuralFeatures().get(0);
  }
  public getFooGroup_ComputeFoosOfClass(): EOperation {
    return this.fooGroupEClass.getEOperations().get(0);
  }
  public getFooGroup_GetFoosWithBazzles(): EOperation {
    return this.fooGroupEClass.getEOperations().get(1);
  }
  public getFooGroup_Freeze(): EOperation {
    return this.fooGroupEClass.getEOperations().get(2);
  }
  public getUser(): EClass {
    return this.userEClass;
  }
  public getUser_Pass(): EAttribute {
    return <EAttribute>this.userEClass.getEStructuralFeatures().get(0);
  }
  public getUser_Salt(): EAttribute {
    return <EAttribute>this.userEClass.getEStructuralFeatures().get(1);
  }
  public getUser_Email(): EAttribute {
    return <EAttribute>this.userEClass.getEStructuralFeatures().get(2);
  }
  public getFooClass(): EEnum {
    return this.fooClassEEnum;
  }

  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;
    this.boundedNumberEClass = this.createEClass(CorePackage.BOUNDED_NUMBER);
    this.createEAttribute(
      this.boundedNumberEClass,
      CorePackage.BOUNDED_NUMBER__UNITS
    );
    this.createEAttribute(
      this.boundedNumberEClass,
      CorePackage.BOUNDED_NUMBER__VALUE
    );
    this.createEAttribute(
      this.boundedNumberEClass,
      CorePackage.BOUNDED_NUMBER__MAX_VALUE
    );
    this.createEAttribute(
      this.boundedNumberEClass,
      CorePackage.BOUNDED_NUMBER__MIN_VALUE
    );
    this.idedEntityEClass = this.createEClass(CorePackage.IDED_ENTITY);
    this.createEAttribute(this.idedEntityEClass, CorePackage.IDED_ENTITY__ID);
    this.createEAttribute(
      this.idedEntityEClass,
      CorePackage.IDED_ENTITY__EDIT_DATE
    );
    this.createEReference(
      this.idedEntityEClass,
      CorePackage.IDED_ENTITY__EDIT_USER
    );
    this.createEAttribute(
      this.idedEntityEClass,
      CorePackage.IDED_ENTITY__LOCKED
    );
    this.createEAttribute(this.idedEntityEClass, CorePackage.IDED_ENTITY__ID2);
    this.namedEntityEClass = this.createEClass(CorePackage.NAMED_ENTITY);
    this.createEAttribute(
      this.namedEntityEClass,
      CorePackage.NAMED_ENTITY__NAME
    );
    this.bazzleEClass = this.createEClass(CorePackage.BAZZLE);
    this.createEReference(this.bazzleEClass, CorePackage.BAZZLE__BACKUP_BAR);
    this.createEReference(
      this.bazzleEClass,
      CorePackage.BAZZLE__ONE_TO_ONE_FOO
    );
    this.barEClass = this.createEClass(CorePackage.BAR);
    this.createEReference(this.barEClass, CorePackage.BAR__FOO);
    this.createEReference(this.barEClass, CorePackage.BAR__BAZZLES);
    this.createEReference(this.barEClass, CorePackage.BAR__BACKUP_FOR);
    this.barSpecializationWithComponentsEClass = this.createEClass(
      CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS
    );
    this.createEReference(
      this.barSpecializationWithComponentsEClass,
      CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__COMPONENT_BARS
    );
    this.createEAttribute(
      this.barSpecializationWithComponentsEClass,
      CorePackage.BAR_SPECIALIZATION_WITH_COMPONENTS__SPECIAL_NAME
    );
    this.fooEClass = this.createEClass(CorePackage.FOO);
    this.createEReference(this.fooEClass, CorePackage.FOO__GROUP);
    this.createEAttribute(this.fooEClass, CorePackage.FOO__CREATION_DATE);
    this.createEAttribute(this.fooEClass, CorePackage.FOO__FOO_CLASS);
    this.createEReference(this.fooEClass, CorePackage.FOO__RANGE);
    this.createEReference(this.fooEClass, CorePackage.FOO__BARS);
    this.createEReference(this.fooEClass, CorePackage.FOO__ONE_TO_ONE_BAZZLE);
    this.createEAttribute(this.fooEClass, CorePackage.FOO__MANY_ATTRIBUTE);
    this.createEAttribute(
      this.fooEClass,
      CorePackage.FOO__UNCHANGEABLE_ATTRIBUTE
    );
    this.createEReference(
      this.fooEClass,
      CorePackage.FOO__UNCHANGEABLE_REFERENCE
    );
    this.createEAttribute(this.fooEClass, CorePackage.FOO__TRANSIENT_ATTRIBUTE);
    this.createEReference(this.fooEClass, CorePackage.FOO__TRANSIENT_REFERENCE);
    this.createEAttribute(this.fooEClass, CorePackage.FOO__VOLATILE_ATTRIBUTE);
    this.createEReference(this.fooEClass, CorePackage.FOO__VOLATILE_REFERENCE);
    this.createEReference(
      this.fooEClass,
      CorePackage.FOO__MANY_CROSS_AGGREGATE
    );
    this.createEReference(
      this.fooEClass,
      CorePackage.FOO__MANY_CROSS_AGGREGATE_NESTED
    );
    this.createEReference(this.fooEClass, CorePackage.FOO__MANY_VALUE_OBJECTS);
    this.createEReference(
      this.fooEClass,
      CorePackage.FOO__ONE_TO_ONE_CONTAINMENT
    );
    this.createEReference(this.fooEClass, CorePackage.FOO__OWNED_FOOS);
    this.createEOperation(this.fooEClass, CorePackage.FOO__COPY_FOO);
    this.fooSpecializationEClass = this.createEClass(
      CorePackage.FOO_SPECIALIZATION
    );
    this.fooGroupEClass = this.createEClass(CorePackage.FOO_GROUP);
    this.createEReference(this.fooGroupEClass, CorePackage.FOO_GROUP__USER);
    this.createEOperation(
      this.fooGroupEClass,
      CorePackage.FOO_GROUP__COMPUTE_FOOS_OF_CLASS
    );
    this.createEOperation(
      this.fooGroupEClass,
      CorePackage.FOO_GROUP__GET_FOOS_WITH_BAZZLES
    );
    this.createEOperation(this.fooGroupEClass, CorePackage.FOO_GROUP__FREEZE);
    this.userEClass = this.createEClass(CorePackage.USER);
    this.createEAttribute(this.userEClass, CorePackage.USER__PASS);
    this.createEAttribute(this.userEClass, CorePackage.USER__SALT);
    this.createEAttribute(this.userEClass, CorePackage.USER__EMAIL);
    this.fooClassEEnum = this.createEEnum(CorePackage.FOO_CLASS);
  }

  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    //reusable handle for eoperations, used for adding parameters
    let op: EOperation;
    this.initEClass(
      this.boundedNumberEClass,
      'BoundedNumber',
      false,
      false,
      true
    );
    this.initEAttribute(
      this.getBoundedNumber_Units(),
      this.getEcorePackage().getEString(),
      'units',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getBoundedNumber_Value(),
      this.getEcorePackage().getEDouble(),
      'value',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getBoundedNumber_MaxValue(),
      this.getEcorePackage().getEDouble(),
      'maxValue',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getBoundedNumber_MinValue(),
      this.getEcorePackage().getEDouble(),
      'minValue',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEClass(this.idedEntityEClass, 'IdedEntity', true, false, true);
    this.initEAttribute(
      this.getIdedEntity_Id(),
      this.getEcorePackage().getEString(),
      'id',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getIdedEntity_EditDate(),
      this.getEcorePackage().getEDate(),
      'editDate',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEReference(
      this.getIdedEntity_EditUser(),
      this.getUser(),
      undefined,
      'editUser',
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
    this.initEAttribute(
      this.getIdedEntity_Locked(),
      this.getEcorePackage().getEBoolean(),
      'locked',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getIdedEntity_Id2(),
      this.getEcorePackage().getEString(),
      'id2',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false
    );
    this.namedEntityEClass.getESuperTypes().add(this.getIdedEntity());
    this.initEClass(this.namedEntityEClass, 'NamedEntity', true, false, true);
    this.initEAttribute(
      this.getNamedEntity_Name(),
      this.getEcorePackage().getEString(),
      'name',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.bazzleEClass.getESuperTypes().add(this.getNamedEntity());
    this.initEClass(this.bazzleEClass, 'Bazzle', false, false, true);
    this.initEReference(
      this.getBazzle_BackupBar(),
      this.getBar(),
      this.getBar_BackupFor(),
      'backupBar',
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
      this.getBazzle_OneToOneFoo(),
      this.getFoo(),
      this.getFoo_OneToOneBazzle(),
      'oneToOneFoo',
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
    this.barEClass.getESuperTypes().add(this.getNamedEntity());
    this.initEClass(this.barEClass, 'Bar', false, false, true);
    this.initEReference(
      this.getBar_Foo(),
      this.getFoo(),
      this.getFoo_Bars(),
      'foo',
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
      this.getBar_Bazzles(),
      this.getBazzle(),
      undefined,
      'bazzles',
      '',
      0,
      -1,
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
    this.initEReference(
      this.getBar_BackupFor(),
      this.getBazzle(),
      this.getBazzle_BackupBar(),
      'backupFor',
      '',
      0,
      -1,
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
    this.barSpecializationWithComponentsEClass
      .getESuperTypes()
      .add(this.getBar());
    this.initEClass(
      this.barSpecializationWithComponentsEClass,
      'BarSpecializationWithComponents',
      false,
      false,
      true
    );
    this.initEReference(
      this.getBarSpecializationWithComponents_ComponentBars(),
      this.getBar(),
      undefined,
      'componentBars',
      '',
      0,
      -1,
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
    this.initEAttribute(
      this.getBarSpecializationWithComponents_SpecialName(),
      this.getEcorePackage().getEString(),
      'specialName',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.fooEClass.getESuperTypes().add(this.getNamedEntity());
    this.initEClass(this.fooEClass, 'Foo', false, false, true);
    this.initEReference(
      this.getFoo_Group(),
      this.getFooGroup(),
      undefined,
      'group',
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
    this.initEAttribute(
      this.getFoo_CreationDate(),
      this.getEcorePackage().getEDate(),
      'creationDate',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getFoo_FooClass(),
      this.getFooClass(),
      'fooClass',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEReference(
      this.getFoo_Range(),
      this.getBoundedNumber(),
      undefined,
      'range',
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
    this.initEReference(
      this.getFoo_Bars(),
      this.getBar(),
      this.getBar_Foo(),
      'bars',
      '',
      0,
      -1,
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
    this.initEReference(
      this.getFoo_OneToOneBazzle(),
      this.getBazzle(),
      this.getBazzle_OneToOneFoo(),
      'oneToOneBazzle',
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
    this.initEAttribute(
      this.getFoo_ManyAttribute(),
      this.getEcorePackage().getEString(),
      'manyAttribute',
      '',
      0,
      -1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getFoo_UnchangeableAttribute(),
      this.getEcorePackage().getEString(),
      'unchangeableAttribute',
      '',
      0,
      1,
      '',
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEReference(
      this.getFoo_UnchangeableReference(),
      this.getBazzle(),
      undefined,
      'unchangeableReference',
      '',
      0,
      1,
      '',
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getFoo_TransientAttribute(),
      this.getEcorePackage().getEString(),
      'transientAttribute',
      '',
      0,
      1,
      '',
      true,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEReference(
      this.getFoo_TransientReference(),
      this.getFoo(),
      undefined,
      'transientReference',
      '',
      0,
      1,
      '',
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getFoo_VolatileAttribute(),
      this.getEcorePackage().getEString(),
      'volatileAttribute',
      '',
      0,
      1,
      '',
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEReference(
      this.getFoo_VolatileReference(),
      this.getFoo(),
      undefined,
      'volatileReference',
      '',
      0,
      1,
      '',
      false,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getFoo_ManyCrossAggregate(),
      this.getFoo(),
      undefined,
      'manyCrossAggregate',
      '',
      0,
      -1,
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
      this.getFoo_ManyCrossAggregateNested(),
      this.getBar(),
      undefined,
      'manyCrossAggregateNested',
      '',
      0,
      -1,
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
      this.getFoo_ManyValueObjects(),
      this.getBoundedNumber(),
      undefined,
      'manyValueObjects',
      '',
      0,
      -1,
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
    this.initEReference(
      this.getFoo_OneToOneContainment(),
      this.getBazzle(),
      undefined,
      'oneToOneContainment',
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
    this.initEReference(
      this.getFoo_OwnedFoos(),
      this.getFoo(),
      undefined,
      'ownedFoos',
      '',
      0,
      -1,
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
    op = this.initEOperation(
      this.getFoo_CopyFoo(),
      this.getFoo(),
      'copyFoo',
      0,
      1,
      true,
      true
    );
    this.fooSpecializationEClass.getESuperTypes().add(this.getFoo());
    this.initEClass(
      this.fooSpecializationEClass,
      'FooSpecialization',
      false,
      false,
      true
    );
    this.fooGroupEClass.getESuperTypes().add(this.getNamedEntity());
    this.initEClass(this.fooGroupEClass, 'FooGroup', false, false, true);
    this.initEReference(
      this.getFooGroup_User(),
      this.getUser(),
      undefined,
      'user',
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
      this.getFooGroup_ComputeFoosOfClass(),
      this.getEcorePackage().getEInt(),
      'computeFoosOfClass',
      0,
      1,
      true,
      true
    );
    op = this.initEOperation(
      this.getFooGroup_GetFoosWithBazzles(),
      this.getFoo(),
      'getFoosWithBazzles',
      0,
      -1,
      true,
      true
    );
    op = this.initEOperation(
      this.getFooGroup_Freeze(),
      undefined,
      'freeze',
      0,
      1,
      true,
      true
    );
    this.userEClass.getESuperTypes().add(this.getNamedEntity());
    this.initEClass(this.userEClass, 'User', false, false, true);
    this.initEAttribute(
      this.getUser_Pass(),
      this.getEcorePackage().getEString(),
      'pass',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getUser_Salt(),
      this.getEcorePackage().getEString(),
      'salt',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getUser_Email(),
      this.getEcorePackage().getEString(),
      'email',
      '',
      0,
      1,
      '',
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false
    );
    this.initEEnum(this.fooClassEEnum, 'FooClass');
    this.addEEnumLiteral(this.fooClassEEnum, 'SHORT', 0);
    this.addEEnumLiteral(this.fooClassEEnum, 'MEDIUM', 1);
    this.addEEnumLiteral(this.fooClassEEnum, 'INTERMEDIATE', 2);
    this.addEEnumLiteral(this.fooClassEEnum, 'LONG', 3);
  }
}
