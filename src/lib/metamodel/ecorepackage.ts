import { EPackage } from './api/epackage.js';
import { EDataType } from './api/edata-type.js';
import { EFactory } from './api/efactory.js';

/**
 * This is a MINIMAL version of EcorePackage, with only what is necessary for the metamodel
 * to operate (definition of datatypes).
 */
export class EcorePackage extends EPackage {
  // Static constants used in ecorepackage_full.ts (only those that are referenced)
  public static E_MODEL_ELEMENT_FEATURE_COUNT = 1;
  public static E_NAMED_ELEMENT_FEATURE_COUNT = EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 1;
  public static E_TYPED_ELEMENT_FEATURE_COUNT = EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 9;
  public static E_STRUCTURAL_FEATURE_FEATURE_COUNT = EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 8;
  public static E_CLASSIFIER_FEATURE_COUNT = EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 6;
  public static E_DATA_TYPE_FEATURE_COUNT = EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 1;

  private static isInited = false;
  public static eINSTANCE: EcorePackage = EcorePackage.init();

  // Essential data types that are actually used in tutils.ts
  private eStringEDataType!: EDataType;
  private eBooleanEDataType!: EDataType;
  private eBooleanObjectEDataType!: EDataType;
  private eDoubleEDataType!: EDataType;
  private eDoubleObjectEDataType!: EDataType;
  private eFloatEDataType!: EDataType;
  private eFloatObjectEDataType!: EDataType;
  private eShortEDataType!: EDataType;
  private eShortObjectEDataType!: EDataType;
  private eIntEDataType!: EDataType;
  private eIntegerObjectEDataType!: EDataType;
  private eLongEDataType!: EDataType;
  private eLongObjectEDataType!: EDataType;
  private eDateEDataType!: EDataType;

    constructor() {
    super('ecore', 'http://www.eclipse.org/emf/2002/Ecore');
  }


  // Literals class with only used types
  public static Literals = class {
    static E_STRING: EDataType = EcorePackage.eINSTANCE.getEString();
    static E_BOOLEAN: EDataType = EcorePackage.eINSTANCE.getEBoolean();
    static E_BOOLEAN_OBJECT: EDataType = EcorePackage.eINSTANCE.getEBooleanObject();
    static E_DOUBLE: EDataType = EcorePackage.eINSTANCE.getEDouble();
    static E_DOUBLE_OBJECT: EDataType = EcorePackage.eINSTANCE.getEDoubleObject();
    static E_FLOAT: EDataType = EcorePackage.eINSTANCE.getEFloat();
    static E_FLOAT_OBJECT: EDataType = EcorePackage.eINSTANCE.getEFloatObject();
    static E_SHORT: EDataType = EcorePackage.eINSTANCE.getEShort();
    static E_SHORT_OBJECT: EDataType = EcorePackage.eINSTANCE.getEShortObject();
    static E_INT: EDataType = EcorePackage.eINSTANCE.getEInt();
    static E_INTEGER_OBJECT: EDataType = EcorePackage.eINSTANCE.getEIntegerObject();
    static E_LONG: EDataType = EcorePackage.eINSTANCE.getELong();
    static E_LONG_OBJECT: EDataType = EcorePackage.eINSTANCE.getELongObject();
    static E_DATE: EDataType = EcorePackage.eINSTANCE.getEDate();
  };

  private static init(): EcorePackage {
    if (EcorePackage.isInited) return this.eINSTANCE;
    const theEcorePackage = new EcorePackage();
    this.eINSTANCE = theEcorePackage;
    EcorePackage.isInited = true;
    theEcorePackage.createPackageContents();
    return theEcorePackage;
  }

  public override getEFactoryInstance(): EFactory {
    return this._eFactoryInstance!;
  }

  // Essential getters used by Literals
  public getEString(): EDataType {
    return this.eStringEDataType;
  }

  public getEBoolean(): EDataType {
    return this.eBooleanEDataType;
  }

  public getEBooleanObject(): EDataType {
    return this.eBooleanObjectEDataType;
  }

  public getEDouble(): EDataType {
    return this.eDoubleEDataType;
  }

  public getEDoubleObject(): EDataType {
    return this.eDoubleObjectEDataType;
  }

  public getEFloat(): EDataType {
    return this.eFloatEDataType;
  }

  public getEFloatObject(): EDataType {
    return this.eFloatObjectEDataType;
  }

  public getEShort(): EDataType {
    return this.eShortEDataType;
  }

  public getEShortObject(): EDataType {
    return this.eShortObjectEDataType;
  }

  public getEInt(): EDataType {
    return this.eIntEDataType;
  }

  public getEIntegerObject(): EDataType {
    return this.eIntegerObjectEDataType;
  }

  public getELong(): EDataType {
    return this.eLongEDataType;
  }

  public getELongObject(): EDataType {
    return this.eLongObjectEDataType;
  }

  public getEDate(): EDataType {
    return this.eDateEDataType;
  }

  // Minimal package contents creation
  public createPackageContents(): void {
    // Create only the essential data types with IDs
    this.eStringEDataType = this.createEDataType(0);
    this.eBooleanEDataType = this.createEDataType(1);
    this.eBooleanObjectEDataType = this.createEDataType(2);
    this.eDoubleEDataType = this.createEDataType(3);
    this.eDoubleObjectEDataType = this.createEDataType(4);
    this.eFloatEDataType = this.createEDataType(5);
    this.eFloatObjectEDataType = this.createEDataType(6);
    this.eShortEDataType = this.createEDataType(7);
    this.eShortObjectEDataType = this.createEDataType(8);
    this.eIntEDataType = this.createEDataType(9);
    this.eIntegerObjectEDataType = this.createEDataType(10);
    this.eLongEDataType = this.createEDataType(11);
    this.eLongObjectEDataType = this.createEDataType(12);
    this.eDateEDataType = this.createEDataType(13);

    // Initialize the data types with names
    this.initEDataType(this.eStringEDataType, 'EString');
    this.initEDataType(this.eBooleanEDataType, 'EBoolean');
    this.initEDataType(this.eBooleanObjectEDataType, 'EBooleanObject');
    this.initEDataType(this.eDoubleEDataType, 'EDouble');
    this.initEDataType(this.eDoubleObjectEDataType, 'EDoubleObject');
    this.initEDataType(this.eFloatEDataType, 'EFloat');
    this.initEDataType(this.eFloatObjectEDataType, 'EFloatObject');
    this.initEDataType(this.eShortEDataType, 'EShort');
    this.initEDataType(this.eShortObjectEDataType, 'EShortObject');
    this.initEDataType(this.eIntEDataType, 'EInt');
    this.initEDataType(this.eIntegerObjectEDataType, 'EIntegerObject');
    this.initEDataType(this.eLongEDataType, 'ELong');
    this.initEDataType(this.eLongObjectEDataType, 'ELongObject');
    this.initEDataType(this.eDateEDataType, 'EDate');

    // Factory instance will be set later if needed
  }
}