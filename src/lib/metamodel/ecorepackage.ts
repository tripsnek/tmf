import { EPackage } from './api/epackage.js';
import { EDataType } from './api/edata-type.js';
import { EClass } from './api/eclass.js';
import { EReference } from './api/ereference.js';
import { EAttribute } from './api/eattribute.js';
import { EFactory } from './api/efactory.js';

export class EcorePackage extends EPackage {
  public static E_GENERIC_TYPE = 0;
  public static E_GENERIC_TYPE_FEATURE_COUNT = 9;
  public static E_GENERIC_TYPE__E_UPPER_BOUND = 0;
  public static E_GENERIC_TYPE__E_TYPE_ARGUMENTS = 1;
  public static E_GENERIC_TYPE__E_RAW_TYPE = 2;
  public static E_GENERIC_TYPE__E_LOWER_BOUND = 3;
  public static E_GENERIC_TYPE__E_TYPE_PARAMETER = 4;
  public static E_GENERIC_TYPE__E_CLASSIFIER = 5;
  public static E_GENERIC_TYPE__E_RAW_TYPE_ID = 6;
  public static E_GENERIC_TYPE__E_TYPE_PARAMETER_ID = 7;
  public static E_GENERIC_TYPE__E_CLASSIFIER_ID = 8;
  public static E_STRING_TO_STRING_MAP_ENTRY = 1;
  public static E_STRING_TO_STRING_MAP_ENTRY_FEATURE_COUNT = 2;
  public static E_STRING_TO_STRING_MAP_ENTRY__KEY = 0;
  public static E_STRING_TO_STRING_MAP_ENTRY__VALUE = 1;
  public static E_OBJECT = 2;
  public static E_OBJECT_FEATURE_COUNT = 0;
  public static E_MODEL_ELEMENT = 3;
  public static E_MODEL_ELEMENT_FEATURE_COUNT = 1;
  public static E_MODEL_ELEMENT__E_ANNOTATIONS = 0;
  public static E_NAMED_ELEMENT = 4;
  public static E_NAMED_ELEMENT_FEATURE_COUNT =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 1;
  public static E_NAMED_ELEMENT__NAME =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 0;
  public static E_TYPE_PARAMETER = 5;
  public static E_TYPE_PARAMETER_FEATURE_COUNT =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 1;
  public static E_TYPE_PARAMETER__E_BOUNDS =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 0;
  public static E_TYPED_ELEMENT = 6;
  public static E_TYPED_ELEMENT_FEATURE_COUNT =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 9;
  public static E_TYPED_ELEMENT__ORDERED =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 0;
  public static E_TYPED_ELEMENT__UNIQUE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 1;
  public static E_TYPED_ELEMENT__LOWER_BOUND =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 2;
  public static E_TYPED_ELEMENT__UPPER_BOUND =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 3;
  public static E_TYPED_ELEMENT__MANY =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 4;
  public static E_TYPED_ELEMENT__REQUIRED =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 5;
  public static E_TYPED_ELEMENT__E_TYPE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 6;
  public static E_TYPED_ELEMENT__E_GENERIC_TYPE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 7;
  public static E_TYPED_ELEMENT__E_TYPE_ID =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 8;
  public static E_STRUCTURAL_FEATURE = 7;
  public static E_STRUCTURAL_FEATURE_FEATURE_COUNT =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 8;
  public static E_STRUCTURAL_FEATURE__CHANGEABLE =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 0;
  public static E_STRUCTURAL_FEATURE__VOLATILE =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 1;
  public static E_STRUCTURAL_FEATURE__TRANSIENT =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 2;
  public static E_STRUCTURAL_FEATURE__DEFAULT_VALUE_LITERAL =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 3;
  public static E_STRUCTURAL_FEATURE__DEFAULT_VALUE =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 4;
  public static E_STRUCTURAL_FEATURE__UNSETTABLE =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 5;
  public static E_STRUCTURAL_FEATURE__DERIVED =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 6;
  public static E_STRUCTURAL_FEATURE__E_CONTAINING_CLASS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 7;
  public static E_REFERENCE = 8;
  public static E_REFERENCE_FEATURE_COUNT =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 9;
  public static E_REFERENCE__CONTAINMENT =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 0;
  public static E_REFERENCE__CONTAINER =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 1;
  public static E_REFERENCE__RESOLVE_PROXIES =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 2;
  public static E_REFERENCE__E_OPPOSITE =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 3;
  public static E_REFERENCE__E_REFERENCE_TYPE =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 4;
  public static E_REFERENCE__E_KEYS =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 5;
  public static E_REFERENCE__E_OPPOSITE_ID =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 6;
  public static E_REFERENCE__E_REFERENCE_TYPE_ID =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 7;
  public static E_REFERENCE__E_KEYS_IDS =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 8;
  public static E_PARAMETER = 9;
  public static E_PARAMETER_FEATURE_COUNT =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 1;
  public static E_PARAMETER__E_OPERATION =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 0;
  public static E_PACKAGE = 10;
  public static E_PACKAGE_FEATURE_COUNT =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 7;
  public static E_PACKAGE__NS_U_R_I =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 0;
  public static E_PACKAGE__NS_PREFIX =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 1;
  public static E_PACKAGE__E_FACTORY_INSTANCE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 2;
  public static E_PACKAGE__E_CLASSIFIERS =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 3;
  public static E_PACKAGE__E_SUBPACKAGES =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 4;
  public static E_PACKAGE__E_SUPER_PACKAGE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 5;
  public static E_PACKAGE__E_FACTORY_INSTANCE_ID =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 6;
  public static E_OPERATION = 11;
  public static E_OPERATION_FEATURE_COUNT =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 6;
  public static E_OPERATION__E_CONTAINING_CLASS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 0;
  public static E_OPERATION__E_TYPE_PARAMETERS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 1;
  public static E_OPERATION__E_PARAMETERS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 2;
  public static E_OPERATION__E_EXCEPTIONS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 3;
  public static E_OPERATION__E_GENERIC_EXCEPTIONS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 4;
  public static E_OPERATION__E_EXCEPTIONS_IDS =
    EcorePackage.E_TYPED_ELEMENT_FEATURE_COUNT + 5;
  public static E_FACTORY = 12;
  public static E_FACTORY_FEATURE_COUNT =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 2;
  public static E_FACTORY__E_PACKAGE =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 0;
  public static E_FACTORY__E_PACKAGE_ID =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 1;
  public static E_ENUM_LITERAL = 13;
  public static E_ENUM_LITERAL_FEATURE_COUNT =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 4;
  public static E_ENUM_LITERAL__VALUE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 0;
  public static E_ENUM_LITERAL__INSTANCE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 1;
  public static E_ENUM_LITERAL__LITERAL =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 2;
  public static E_ENUM_LITERAL__E_ENUM =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 3;
  public static E_CLASSIFIER = 14;
  public static E_CLASSIFIER_FEATURE_COUNT =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 6;
  public static E_CLASSIFIER__INSTANCE_CLASS_NAME =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 0;
  public static E_CLASSIFIER__INSTANCE_CLASS =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 1;
  public static E_CLASSIFIER__DEFAULT_VALUE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 2;
  public static E_CLASSIFIER__INSTANCE_TYPE_NAME =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 3;
  public static E_CLASSIFIER__E_PACKAGE =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 4;
  public static E_CLASSIFIER__E_TYPE_PARAMETERS =
    EcorePackage.E_NAMED_ELEMENT_FEATURE_COUNT + 5;
  public static E_DATA_TYPE = 15;
  public static E_DATA_TYPE_FEATURE_COUNT =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 1;
  public static E_DATA_TYPE__SERIALIZABLE =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 0;
  public static E_ENUM = 16;
  public static E_ENUM_FEATURE_COUNT =
    EcorePackage.E_DATA_TYPE_FEATURE_COUNT + 1;
  public static E_ENUM__E_LITERALS = EcorePackage.E_DATA_TYPE_FEATURE_COUNT + 0;
  public static E_CLASS = 17;
  public static E_CLASS_FEATURE_COUNT =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 27;
  public static E_CLASS__ABSTRACT = EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 0;
  public static E_CLASS__INTERFACE =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 1;
  public static E_CLASS__E_SUPER_TYPES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 2;
  public static E_CLASS__E_OPERATIONS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 3;
  public static E_CLASS__E_ALL_ATTRIBUTES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 4;
  public static E_CLASS__E_ALL_REFERENCES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 5;
  public static E_CLASS__E_REFERENCES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 6;
  public static E_CLASS__E_ATTRIBUTES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 7;
  public static E_CLASS__E_ALL_CONTAINMENTS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 8;
  public static E_CLASS__E_ALL_OPERATIONS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 9;
  public static E_CLASS__E_ALL_STRUCTURAL_FEATURES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 10;
  public static E_CLASS__E_ALL_SUPER_TYPES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 11;
  public static E_CLASS__E_I_D_ATTRIBUTE =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 12;
  public static E_CLASS__E_STRUCTURAL_FEATURES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 13;
  public static E_CLASS__E_GENERIC_SUPER_TYPES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 14;
  public static E_CLASS__E_ALL_GENERIC_SUPER_TYPES =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 15;
  public static E_CLASS__E_SUPER_TYPES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 16;
  public static E_CLASS__E_ALL_ATTRIBUTES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 17;
  public static E_CLASS__E_ALL_REFERENCES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 18;
  public static E_CLASS__E_REFERENCES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 19;
  public static E_CLASS__E_ATTRIBUTES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 20;
  public static E_CLASS__E_ALL_CONTAINMENTS_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 21;
  public static E_CLASS__E_ALL_OPERATIONS_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 22;
  public static E_CLASS__E_ALL_STRUCTURAL_FEATURES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 23;
  public static E_CLASS__E_ALL_SUPER_TYPES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 24;
  public static E_CLASS__E_I_D_ATTRIBUTE_ID =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 25;
  public static E_CLASS__E_ALL_GENERIC_SUPER_TYPES_IDS =
    EcorePackage.E_CLASSIFIER_FEATURE_COUNT + 26;
  public static E_ANNOTATION = 18;
  public static E_ANNOTATION_FEATURE_COUNT =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 6;
  public static E_ANNOTATION__SOURCE =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 0;
  public static E_ANNOTATION__DETAILS =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 1;
  public static E_ANNOTATION__E_MODEL_ELEMENT =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 2;
  public static E_ANNOTATION__CONTENTS =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 3;
  public static E_ANNOTATION__REFERENCES =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 4;
  public static E_ANNOTATION__REFERENCES_IDS =
    EcorePackage.E_MODEL_ELEMENT_FEATURE_COUNT + 5;
  public static E_ATTRIBUTE = 19;
  public static E_ATTRIBUTE_FEATURE_COUNT =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 3;
  public static E_ATTRIBUTE__I_D =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 0;
  public static E_ATTRIBUTE__E_ATTRIBUTE_TYPE =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 1;
  public static E_ATTRIBUTE__E_ATTRIBUTE_TYPE_ID =
    EcorePackage.E_STRUCTURAL_FEATURE_FEATURE_COUNT + 2;
  public static E_BIG_DECIMAL = 20;
  public static E_BIG_INTEGER = 21;
  public static E_BOOLEAN = 22;
  public static E_BOOLEAN_OBJECT = 23;
  public static E_BYTE = 24;
  public static E_BYTE_ARRAY = 25;
  public static E_BYTE_OBJECT = 26;
  public static E_CHAR = 27;
  public static E_CHARACTER_OBJECT = 28;
  public static E_DATE = 29;
  public static E_DIAGNOSTIC_CHAIN = 30;
  public static E_DOUBLE = 31;
  public static E_DOUBLE_OBJECT = 32;
  public static E_E_LIST = 33;
  public static E_ENUMERATOR = 34;
  public static E_FEATURE_MAP = 35;
  public static E_FEATURE_MAP_ENTRY = 36;
  public static E_FLOAT = 37;
  public static E_FLOAT_OBJECT = 38;
  public static E_INT = 39;
  public static E_INTEGER_OBJECT = 40;
  public static E_JAVA_CLASS = 41;
  public static E_JAVA_OBJECT = 42;
  public static D_ANY = 43;
  public static E_LONG = 44;
  public static E_LONG_OBJECT = 45;
  public static E_MAP = 46;
  public static E_ARRAY = 47;
  public static CUD_RESULT = 48;
  public static E_RESOURCE = 49;
  public static E_RESOURCE_SET = 50;
  public static E_SHORT = 51;
  public static E_SHORT_OBJECT = 52;
  public static E_STRING = 53;
  public static E_TREE_ITERATOR = 54;
  public static E_INVOCATION_TARGET_EXCEPTION = 55;
  /** Singleton */
  public static eINSTANCE: EcorePackage = EcorePackage.init();

  //if the singleton is initialized
  private static isInited = false;
  static eNS_URI = 'http://www.eclipse.org/emf/2002/Ecore';
  static eNAME = 'ecore';
  static eNS_PREFIX = 'ecore';
  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {
    static E_GENERIC_TYPE: EClass = EcorePackage.eINSTANCE.getEGenericType();
    static E_GENERIC_TYPE__E_UPPER_BOUND: EReference =
      EcorePackage.eINSTANCE.getEGenericType_EUpperBound();
    static E_GENERIC_TYPE__E_TYPE_ARGUMENTS: EReference =
      EcorePackage.eINSTANCE.getEGenericType_ETypeArguments();
    static E_GENERIC_TYPE__E_RAW_TYPE: EReference =
      EcorePackage.eINSTANCE.getEGenericType_ERawType();
    static E_GENERIC_TYPE__E_LOWER_BOUND: EReference =
      EcorePackage.eINSTANCE.getEGenericType_ELowerBound();
    static E_GENERIC_TYPE__E_TYPE_PARAMETER: EReference =
      EcorePackage.eINSTANCE.getEGenericType_ETypeParameter();
    static E_GENERIC_TYPE__E_CLASSIFIER: EReference =
      EcorePackage.eINSTANCE.getEGenericType_EClassifier();
    static E_GENERIC_TYPE__E_RAW_TYPE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEGenericType_ERawTypeId();
    static E_GENERIC_TYPE__E_TYPE_PARAMETER_ID: EAttribute =
      EcorePackage.eINSTANCE.getEGenericType_ETypeParameterId();
    static E_GENERIC_TYPE__E_CLASSIFIER_ID: EAttribute =
      EcorePackage.eINSTANCE.getEGenericType_EClassifierId();
    static E_STRING_TO_STRING_MAP_ENTRY: EClass =
      EcorePackage.eINSTANCE.getEStringToStringMapEntry();
    static E_STRING_TO_STRING_MAP_ENTRY__KEY: EAttribute =
      EcorePackage.eINSTANCE.getEStringToStringMapEntry_Key();
    static E_STRING_TO_STRING_MAP_ENTRY__VALUE: EAttribute =
      EcorePackage.eINSTANCE.getEStringToStringMapEntry_Value();
    static E_OBJECT: EClass = EcorePackage.eINSTANCE.getEObject();
    static E_MODEL_ELEMENT: EClass = EcorePackage.eINSTANCE.getEModelElement();
    static E_MODEL_ELEMENT__E_ANNOTATIONS: EReference =
      EcorePackage.eINSTANCE.getEModelElement_EAnnotations();
    static E_NAMED_ELEMENT: EClass = EcorePackage.eINSTANCE.getENamedElement();
    static E_NAMED_ELEMENT__NAME: EAttribute =
      EcorePackage.eINSTANCE.getENamedElement_Name();
    static E_TYPE_PARAMETER: EClass =
      EcorePackage.eINSTANCE.getETypeParameter();
    static E_TYPE_PARAMETER__E_BOUNDS: EReference =
      EcorePackage.eINSTANCE.getETypeParameter_EBounds();
    static E_TYPED_ELEMENT: EClass = EcorePackage.eINSTANCE.getETypedElement();
    static E_TYPED_ELEMENT__ORDERED: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_Ordered();
    static E_TYPED_ELEMENT__UNIQUE: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_Unique();
    static E_TYPED_ELEMENT__LOWER_BOUND: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_LowerBound();
    static E_TYPED_ELEMENT__UPPER_BOUND: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_UpperBound();
    static E_TYPED_ELEMENT__MANY: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_Many();
    static E_TYPED_ELEMENT__REQUIRED: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_Required();
    static E_TYPED_ELEMENT__E_TYPE: EReference =
      EcorePackage.eINSTANCE.getETypedElement_EType();
    static E_TYPED_ELEMENT__E_GENERIC_TYPE: EReference =
      EcorePackage.eINSTANCE.getETypedElement_EGenericType();
    static E_TYPED_ELEMENT__E_TYPE_ID: EAttribute =
      EcorePackage.eINSTANCE.getETypedElement_ETypeId();
    static E_STRUCTURAL_FEATURE: EClass =
      EcorePackage.eINSTANCE.getEStructuralFeature();
    static E_STRUCTURAL_FEATURE__CHANGEABLE: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_Changeable();
    static E_STRUCTURAL_FEATURE__VOLATILE: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_Volatile();
    static E_STRUCTURAL_FEATURE__TRANSIENT: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_Transient();
    static E_STRUCTURAL_FEATURE__DEFAULT_VALUE_LITERAL: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_DefaultValueLiteral();
    static E_STRUCTURAL_FEATURE__DEFAULT_VALUE: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_DefaultValue();
    static E_STRUCTURAL_FEATURE__UNSETTABLE: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_Unsettable();
    static E_STRUCTURAL_FEATURE__DERIVED: EAttribute =
      EcorePackage.eINSTANCE.getEStructuralFeature_Derived();
    static E_STRUCTURAL_FEATURE__E_CONTAINING_CLASS: EReference =
      EcorePackage.eINSTANCE.getEStructuralFeature_EContainingClass();
    static E_REFERENCE: EClass = EcorePackage.eINSTANCE.getEReference();
    static E_REFERENCE__CONTAINMENT: EAttribute =
      EcorePackage.eINSTANCE.getEReference_Containment();
    static E_REFERENCE__CONTAINER: EAttribute =
      EcorePackage.eINSTANCE.getEReference_Container();
    static E_REFERENCE__RESOLVE_PROXIES: EAttribute =
      EcorePackage.eINSTANCE.getEReference_ResolveProxies();
    static E_REFERENCE__E_OPPOSITE: EReference =
      EcorePackage.eINSTANCE.getEReference_EOpposite();
    static E_REFERENCE__E_REFERENCE_TYPE: EReference =
      EcorePackage.eINSTANCE.getEReference_EReferenceType();
    static E_REFERENCE__E_KEYS: EReference =
      EcorePackage.eINSTANCE.getEReference_EKeys();
    static E_REFERENCE__E_OPPOSITE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEReference_EOppositeId();
    static E_REFERENCE__E_REFERENCE_TYPE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEReference_EReferenceTypeId();
    static E_REFERENCE__E_KEYS_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEReference_EKeysIds();
    static E_PARAMETER: EClass = EcorePackage.eINSTANCE.getEParameter();
    static E_PARAMETER__E_OPERATION: EReference =
      EcorePackage.eINSTANCE.getEParameter_EOperation();
    static E_PACKAGE: EClass = EcorePackage.eINSTANCE.getEPackage();
    static E_PACKAGE__NS_U_R_I: EAttribute =
      EcorePackage.eINSTANCE.getEPackage_NsURI();
    static E_PACKAGE__NS_PREFIX: EAttribute =
      EcorePackage.eINSTANCE.getEPackage_NsPrefix();
    static E_PACKAGE__E_FACTORY_INSTANCE: EReference =
      EcorePackage.eINSTANCE.getEPackage_EFactoryInstance();
    static E_PACKAGE__E_CLASSIFIERS: EReference =
      EcorePackage.eINSTANCE.getEPackage_EClassifiers();
    static E_PACKAGE__E_SUBPACKAGES: EReference =
      EcorePackage.eINSTANCE.getEPackage_ESubpackages();
    static E_PACKAGE__E_SUPER_PACKAGE: EReference =
      EcorePackage.eINSTANCE.getEPackage_ESuperPackage();
    static E_PACKAGE__E_FACTORY_INSTANCE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEPackage_EFactoryInstanceId();
    static E_OPERATION: EClass = EcorePackage.eINSTANCE.getEOperation();
    static E_OPERATION__E_CONTAINING_CLASS: EReference =
      EcorePackage.eINSTANCE.getEOperation_EContainingClass();
    static E_OPERATION__E_TYPE_PARAMETERS: EReference =
      EcorePackage.eINSTANCE.getEOperation_ETypeParameters();
    static E_OPERATION__E_PARAMETERS: EReference =
      EcorePackage.eINSTANCE.getEOperation_EParameters();
    static E_OPERATION__E_EXCEPTIONS: EReference =
      EcorePackage.eINSTANCE.getEOperation_EExceptions();
    static E_OPERATION__E_GENERIC_EXCEPTIONS: EReference =
      EcorePackage.eINSTANCE.getEOperation_EGenericExceptions();
    static E_OPERATION__E_EXCEPTIONS_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEOperation_EExceptionsIds();
    static E_FACTORY: EClass = EcorePackage.eINSTANCE.getEFactory();
    static E_FACTORY__E_PACKAGE: EReference =
      EcorePackage.eINSTANCE.getEFactory_EPackage();
    static E_FACTORY__E_PACKAGE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEFactory_EPackageId();
    static E_ENUM_LITERAL: EClass = EcorePackage.eINSTANCE.getEEnumLiteral();
    static E_ENUM_LITERAL__VALUE: EAttribute =
      EcorePackage.eINSTANCE.getEEnumLiteral_Value();
    static E_ENUM_LITERAL__INSTANCE: EAttribute =
      EcorePackage.eINSTANCE.getEEnumLiteral_Instance();
    static E_ENUM_LITERAL__LITERAL: EAttribute =
      EcorePackage.eINSTANCE.getEEnumLiteral_Literal();
    static E_ENUM_LITERAL__E_ENUM: EReference =
      EcorePackage.eINSTANCE.getEEnumLiteral_EEnum();
    static E_CLASSIFIER: EClass = EcorePackage.eINSTANCE.getEClassifier();
    static E_CLASSIFIER__INSTANCE_CLASS_NAME: EAttribute =
      EcorePackage.eINSTANCE.getEClassifier_InstanceClassName();
    static E_CLASSIFIER__INSTANCE_CLASS: EAttribute =
      EcorePackage.eINSTANCE.getEClassifier_InstanceClass();
    static E_CLASSIFIER__DEFAULT_VALUE: EAttribute =
      EcorePackage.eINSTANCE.getEClassifier_DefaultValue();
    static E_CLASSIFIER__INSTANCE_TYPE_NAME: EAttribute =
      EcorePackage.eINSTANCE.getEClassifier_InstanceTypeName();
    static E_CLASSIFIER__E_PACKAGE: EReference =
      EcorePackage.eINSTANCE.getEClassifier_EPackage();
    static E_CLASSIFIER__E_TYPE_PARAMETERS: EReference =
      EcorePackage.eINSTANCE.getEClassifier_ETypeParameters();
    static E_DATA_TYPE: EClass = EcorePackage.eINSTANCE.getEDataType();
    static E_DATA_TYPE__SERIALIZABLE: EAttribute =
      EcorePackage.eINSTANCE.getEDataType_Serializable();
    static E_ENUM: EClass = EcorePackage.eINSTANCE.getEEnum();
    static E_ENUM__E_LITERALS: EReference =
      EcorePackage.eINSTANCE.getEEnum_ELiterals();
    static E_CLASS: EClass = EcorePackage.eINSTANCE.getEClass();
    static E_CLASS__ABSTRACT: EAttribute =
      EcorePackage.eINSTANCE.getEClass_Abstract();
    static E_CLASS__INTERFACE: EAttribute =
      EcorePackage.eINSTANCE.getEClass_Interface();
    static E_CLASS__E_SUPER_TYPES: EReference =
      EcorePackage.eINSTANCE.getEClass_ESuperTypes();
    static E_CLASS__E_OPERATIONS: EReference =
      EcorePackage.eINSTANCE.getEClass_EOperations();
    static E_CLASS__E_ALL_ATTRIBUTES: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllAttributes();
    static E_CLASS__E_ALL_REFERENCES: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllReferences();
    static E_CLASS__E_REFERENCES: EReference =
      EcorePackage.eINSTANCE.getEClass_EReferences();
    static E_CLASS__E_ATTRIBUTES: EReference =
      EcorePackage.eINSTANCE.getEClass_EAttributes();
    static E_CLASS__E_ALL_CONTAINMENTS: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllContainments();
    static E_CLASS__E_ALL_OPERATIONS: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllOperations();
    static E_CLASS__E_ALL_STRUCTURAL_FEATURES: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllStructuralFeatures();
    static E_CLASS__E_ALL_SUPER_TYPES: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllSuperTypes();
    static E_CLASS__E_I_D_ATTRIBUTE: EReference =
      EcorePackage.eINSTANCE.getEClass_EIDAttribute();
    static E_CLASS__E_STRUCTURAL_FEATURES: EReference =
      EcorePackage.eINSTANCE.getEClass_EStructuralFeatures();
    static E_CLASS__E_GENERIC_SUPER_TYPES: EReference =
      EcorePackage.eINSTANCE.getEClass_EGenericSuperTypes();
    static E_CLASS__E_ALL_GENERIC_SUPER_TYPES: EReference =
      EcorePackage.eINSTANCE.getEClass_EAllGenericSuperTypes();
    static E_CLASS__E_SUPER_TYPES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_ESuperTypesIds();
    static E_CLASS__E_ALL_ATTRIBUTES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllAttributesIds();
    static E_CLASS__E_ALL_REFERENCES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllReferencesIds();
    static E_CLASS__E_REFERENCES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EReferencesIds();
    static E_CLASS__E_ATTRIBUTES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAttributesIds();
    static E_CLASS__E_ALL_CONTAINMENTS_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllContainmentsIds();
    static E_CLASS__E_ALL_OPERATIONS_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllOperationsIds();
    static E_CLASS__E_ALL_STRUCTURAL_FEATURES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllStructuralFeaturesIds();
    static E_CLASS__E_ALL_SUPER_TYPES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllSuperTypesIds();
    static E_CLASS__E_I_D_ATTRIBUTE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EIDAttributeId();
    static E_CLASS__E_ALL_GENERIC_SUPER_TYPES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEClass_EAllGenericSuperTypesIds();
    static E_ANNOTATION: EClass = EcorePackage.eINSTANCE.getEAnnotation_EC();
    static E_ANNOTATION__SOURCE: EAttribute =
      EcorePackage.eINSTANCE.getEAnnotation_Source();
    static E_ANNOTATION__DETAILS: EReference =
      EcorePackage.eINSTANCE.getEAnnotation_Details();
    static E_ANNOTATION__E_MODEL_ELEMENT: EReference =
      EcorePackage.eINSTANCE.getEAnnotation_EModelElement();
    static E_ANNOTATION__CONTENTS: EReference =
      EcorePackage.eINSTANCE.getEAnnotation_Contents();
    static E_ANNOTATION__REFERENCES: EReference =
      EcorePackage.eINSTANCE.getEAnnotation_References();
    static E_ANNOTATION__REFERENCES_IDS: EAttribute =
      EcorePackage.eINSTANCE.getEAnnotation_ReferencesIds();
    static E_ATTRIBUTE: EClass = EcorePackage.eINSTANCE.getEAttribute();
    static E_ATTRIBUTE__I_D: EAttribute =
      EcorePackage.eINSTANCE.getEAttribute_ID();
    static E_ATTRIBUTE__E_ATTRIBUTE_TYPE: EReference =
      EcorePackage.eINSTANCE.getEAttribute_EAttributeType();
    static E_ATTRIBUTE__E_ATTRIBUTE_TYPE_ID: EAttribute =
      EcorePackage.eINSTANCE.getEAttribute_EAttributeTypeId();
    static E_BIG_DECIMAL: EDataType = EcorePackage.eINSTANCE.getEBigDecimal();
    static E_BIG_INTEGER: EDataType = EcorePackage.eINSTANCE.getEBigInteger();
    static E_BOOLEAN: EDataType = EcorePackage.eINSTANCE.getEBoolean();
    static E_BOOLEAN_OBJECT: EDataType =
      EcorePackage.eINSTANCE.getEBooleanObject();
    static E_BYTE: EDataType = EcorePackage.eINSTANCE.getEByte();
    static E_BYTE_ARRAY: EDataType = EcorePackage.eINSTANCE.getEByteArray();
    static E_BYTE_OBJECT: EDataType = EcorePackage.eINSTANCE.getEByteObject();
    static E_CHAR: EDataType = EcorePackage.eINSTANCE.getEChar();
    static E_CHARACTER_OBJECT: EDataType =
      EcorePackage.eINSTANCE.getECharacterObject();
    static E_DATE: EDataType = EcorePackage.eINSTANCE.getEDate();
    static E_DIAGNOSTIC_CHAIN: EDataType =
      EcorePackage.eINSTANCE.getEDiagnosticChain();
    static E_DOUBLE: EDataType = EcorePackage.eINSTANCE.getEDouble();
    static E_DOUBLE_OBJECT: EDataType =
      EcorePackage.eINSTANCE.getEDoubleObject();
    static E_E_LIST: EDataType = EcorePackage.eINSTANCE.getEEList();
    static E_ENUMERATOR: EDataType = EcorePackage.eINSTANCE.getEEnumerator();
    static E_FEATURE_MAP: EDataType = EcorePackage.eINSTANCE.getEFeatureMap();
    static E_FEATURE_MAP_ENTRY: EDataType =
      EcorePackage.eINSTANCE.getEFeatureMapEntry();
    static E_FLOAT: EDataType = EcorePackage.eINSTANCE.getEFloat();
    static E_FLOAT_OBJECT: EDataType = EcorePackage.eINSTANCE.getEFloatObject();
    static E_INT: EDataType = EcorePackage.eINSTANCE.getEInt();
    static E_INTEGER_OBJECT: EDataType =
      EcorePackage.eINSTANCE.getEIntegerObject();
    static E_JAVA_CLASS: EDataType = EcorePackage.eINSTANCE.getEJavaClass();
    static E_JAVA_OBJECT: EDataType = EcorePackage.eINSTANCE.getEJavaObject();
    static D_ANY: EDataType = EcorePackage.eINSTANCE.getDAny();
    static E_LONG: EDataType = EcorePackage.eINSTANCE.getELong();
    static E_LONG_OBJECT: EDataType = EcorePackage.eINSTANCE.getELongObject();
    static E_MAP: EDataType = EcorePackage.eINSTANCE.getEMap();
    static E_ARRAY: EDataType = EcorePackage.eINSTANCE.getEArray();
    static CUD_RESULT: EDataType = EcorePackage.eINSTANCE.getCudResult();
    static E_RESOURCE: EDataType = EcorePackage.eINSTANCE.getEResource();
    static E_RESOURCE_SET: EDataType = EcorePackage.eINSTANCE.getEResourceSet();
    static E_SHORT: EDataType = EcorePackage.eINSTANCE.getEShort();
    static E_SHORT_OBJECT: EDataType = EcorePackage.eINSTANCE.getEShortObject();
    static E_STRING: EDataType = EcorePackage.eINSTANCE.getEString();
    static E_TREE_ITERATOR: EDataType =
      EcorePackage.eINSTANCE.getETreeIterator();
    static E_INVOCATION_TARGET_EXCEPTION: EDataType =
      EcorePackage.eINSTANCE.getEInvocationTargetException();
  };
  //if this packages contents have been created and initialized
  private isCreated = false;
  private isInitialized = false;
  private eGenericTypeEClass!: EClass;
  private eStringToStringMapEntryEClass!: EClass;
  private eObjectEClass!: EClass;
  private eModelElementEClass!: EClass;
  private eNamedElementEClass!: EClass;
  private eTypeParameterEClass!: EClass;
  private eTypedElementEClass!: EClass;
  private eStructuralFeatureEClass!: EClass;
  private eReferenceEClass!: EClass;
  private eParameterEClass!: EClass;
  private ePackageEClass!: EClass;
  private eOperationEClass!: EClass;
  private eFactoryEClass!: EClass;
  private eEnumLiteralEClass!: EClass;
  private eClassifierEClass!: EClass;
  private eDataTypeEClass!: EClass;
  private eEnumEClass!: EClass;
  private eClassEClass!: EClass;
  private eAnnotationEClass!: EClass;
  private eAttributeEClass!: EClass;
  private eBigDecimalEDataType!: EDataType;
  private eBigIntegerEDataType!: EDataType;
  private eBooleanEDataType!: EDataType;
  private eBooleanObjectEDataType!: EDataType;
  private eByteEDataType!: EDataType;
  private eByteArrayEDataType!: EDataType;
  private eByteObjectEDataType!: EDataType;
  private eCharEDataType!: EDataType;
  private eCharacterObjectEDataType!: EDataType;
  private eDateEDataType!: EDataType;
  private eDiagnosticChainEDataType!: EDataType;
  private eDoubleEDataType!: EDataType;
  private eDoubleObjectEDataType!: EDataType;
  private eEListEDataType!: EDataType;
  private eEnumeratorEDataType!: EDataType;
  private eFeatureMapEDataType!: EDataType;
  private eFeatureMapEntryEDataType!: EDataType;
  private eFloatEDataType!: EDataType;
  private eFloatObjectEDataType!: EDataType;
  private eIntEDataType!: EDataType;
  private eIntegerObjectEDataType!: EDataType;
  private eJavaClassEDataType!: EDataType;
  private eJavaObjectEDataType!: EDataType;
  private dAnyEDataType!: EDataType;
  private eLongEDataType!: EDataType;
  private eLongObjectEDataType!: EDataType;
  private eMapEDataType!: EDataType;
  private eArrayEDataType!: EDataType;
  private cudResultEDataType!: EDataType;
  private eResourceEDataType!: EDataType;
  private eResourceSetEDataType!: EDataType;
  private eShortEDataType!: EDataType;
  private eShortObjectEDataType!: EDataType;
  private eStringEDataType!: EDataType;
  private eTreeIteratorEDataType!: EDataType;
  private eInvocationTargetExceptionEDataType!: EDataType;
  constructor() {
    super('ecore', 'http://www.eclipse.org/emf/2002/Ecore');
  }
  /**
   * Invoked once. Initializes the Singleton.
   *
   * NOTE: Lots of differences here with the EMF version, which interacts with the package Registry,
   * other packages from the same model to register interdependencies, and freezes the package meta-data.
   */
  private static init(): EcorePackage {
    if (EcorePackage.isInited) return this.eINSTANCE;
    // Obtain or create and register package
    const theEcorePackage = new EcorePackage();
    //this is necessary specifically for EcorePackage generation, which needs to refer to itself
    this.eINSTANCE = theEcorePackage;
    EcorePackage.isInited = true;

    // Create package meta-data objects
    theEcorePackage.createPackageContents();

    // Initialize created meta-data
    theEcorePackage.initializePackageContents();
    return theEcorePackage;
  }
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
  public getEGenericType(): EClass {
    return this.eGenericTypeEClass;
  }
  public getEGenericType_EUpperBound(): EReference {
    return <EReference>this.eGenericTypeEClass.getEStructuralFeatures().get(0);
  }
  public getEGenericType_ETypeArguments(): EReference {
    return <EReference>this.eGenericTypeEClass.getEStructuralFeatures().get(1);
  }
  public getEGenericType_ERawType(): EReference {
    return <EReference>this.eGenericTypeEClass.getEStructuralFeatures().get(2);
  }
  public getEGenericType_ELowerBound(): EReference {
    return <EReference>this.eGenericTypeEClass.getEStructuralFeatures().get(3);
  }
  public getEGenericType_ETypeParameter(): EReference {
    return <EReference>this.eGenericTypeEClass.getEStructuralFeatures().get(4);
  }
  public getEGenericType_EClassifier(): EReference {
    return <EReference>this.eGenericTypeEClass.getEStructuralFeatures().get(5);
  }
  public getEGenericType_ERawTypeId(): EAttribute {
    return <EAttribute>this.eGenericTypeEClass.getEStructuralFeatures().get(6);
  }
  public getEGenericType_ETypeParameterId(): EAttribute {
    return <EAttribute>this.eGenericTypeEClass.getEStructuralFeatures().get(7);
  }
  public getEGenericType_EClassifierId(): EAttribute {
    return <EAttribute>this.eGenericTypeEClass.getEStructuralFeatures().get(8);
  }
  public getEStringToStringMapEntry(): EClass {
    return this.eStringToStringMapEntryEClass;
  }
  public getEStringToStringMapEntry_Key(): EAttribute {
    return <EAttribute>(
      this.eStringToStringMapEntryEClass.getEStructuralFeatures().get(0)
    );
  }
  public getEStringToStringMapEntry_Value(): EAttribute {
    return <EAttribute>(
      this.eStringToStringMapEntryEClass.getEStructuralFeatures().get(1)
    );
  }
  public getEObject(): EClass {
    return this.eObjectEClass;
  }
  public getEModelElement(): EClass {
    return this.eModelElementEClass;
  }
  public getEModelElement_EAnnotations(): EReference {
    return <EReference>this.eModelElementEClass.getEStructuralFeatures().get(0);
  }
  public getENamedElement(): EClass {
    return this.eNamedElementEClass;
  }
  public getENamedElement_Name(): EAttribute {
    return <EAttribute>this.eNamedElementEClass.getEStructuralFeatures().get(0);
  }
  public getETypeParameter(): EClass {
    return this.eTypeParameterEClass;
  }
  public getETypeParameter_EBounds(): EReference {
    return <EReference>(
      this.eTypeParameterEClass.getEStructuralFeatures().get(0)
    );
  }
  public getETypedElement(): EClass {
    return this.eTypedElementEClass;
  }
  public getETypedElement_Ordered(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(0);
  }
  public getETypedElement_Unique(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(1);
  }
  public getETypedElement_LowerBound(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(2);
  }
  public getETypedElement_UpperBound(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(3);
  }
  public getETypedElement_Many(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(4);
  }
  public getETypedElement_Required(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(5);
  }
  public getETypedElement_EType(): EReference {
    return <EReference>this.eTypedElementEClass.getEStructuralFeatures().get(6);
  }
  public getETypedElement_EGenericType(): EReference {
    return <EReference>this.eTypedElementEClass.getEStructuralFeatures().get(7);
  }
  public getETypedElement_ETypeId(): EAttribute {
    return <EAttribute>this.eTypedElementEClass.getEStructuralFeatures().get(8);
  }
  public getEStructuralFeature(): EClass {
    return this.eStructuralFeatureEClass;
  }
  public getEStructuralFeature_Changeable(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(0)
    );
  }
  public getEStructuralFeature_Volatile(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(1)
    );
  }
  public getEStructuralFeature_Transient(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(2)
    );
  }
  public getEStructuralFeature_DefaultValueLiteral(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(3)
    );
  }
  public getEStructuralFeature_DefaultValue(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(4)
    );
  }
  public getEStructuralFeature_Unsettable(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(5)
    );
  }
  public getEStructuralFeature_Derived(): EAttribute {
    return <EAttribute>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(6)
    );
  }
  public getEStructuralFeature_EContainingClass(): EReference {
    return <EReference>(
      this.eStructuralFeatureEClass.getEStructuralFeatures().get(7)
    );
  }
  public getEReference(): EClass {
    return this.eReferenceEClass;
  }
  public getEReference_Containment(): EAttribute {
    return <EAttribute>this.eReferenceEClass.getEStructuralFeatures().get(0);
  }
  public getEReference_Container(): EAttribute {
    return <EAttribute>this.eReferenceEClass.getEStructuralFeatures().get(1);
  }
  public getEReference_ResolveProxies(): EAttribute {
    return <EAttribute>this.eReferenceEClass.getEStructuralFeatures().get(2);
  }
  public getEReference_EOpposite(): EReference {
    return <EReference>this.eReferenceEClass.getEStructuralFeatures().get(3);
  }
  public getEReference_EReferenceType(): EReference {
    return <EReference>this.eReferenceEClass.getEStructuralFeatures().get(4);
  }
  public getEReference_EKeys(): EReference {
    return <EReference>this.eReferenceEClass.getEStructuralFeatures().get(5);
  }
  public getEReference_EOppositeId(): EAttribute {
    return <EAttribute>this.eReferenceEClass.getEStructuralFeatures().get(6);
  }
  public getEReference_EReferenceTypeId(): EAttribute {
    return <EAttribute>this.eReferenceEClass.getEStructuralFeatures().get(7);
  }
  public getEReference_EKeysIds(): EAttribute {
    return <EAttribute>this.eReferenceEClass.getEStructuralFeatures().get(8);
  }
  public getEParameter(): EClass {
    return this.eParameterEClass;
  }
  public getEParameter_EOperation(): EReference {
    return <EReference>this.eParameterEClass.getEStructuralFeatures().get(0);
  }
  public getEPackage(): EClass {
    return this.ePackageEClass;
  }
  public getEPackage_NsURI(): EAttribute {
    return <EAttribute>this.ePackageEClass.getEStructuralFeatures().get(0);
  }
  public getEPackage_NsPrefix(): EAttribute {
    return <EAttribute>this.ePackageEClass.getEStructuralFeatures().get(1);
  }
  public getEPackage_EFactoryInstance(): EReference {
    return <EReference>this.ePackageEClass.getEStructuralFeatures().get(2);
  }
  public getEPackage_EClassifiers(): EReference {
    return <EReference>this.ePackageEClass.getEStructuralFeatures().get(3);
  }
  public getEPackage_ESubpackages(): EReference {
    return <EReference>this.ePackageEClass.getEStructuralFeatures().get(4);
  }
  public getEPackage_ESuperPackage(): EReference {
    return <EReference>this.ePackageEClass.getEStructuralFeatures().get(5);
  }
  public getEPackage_EFactoryInstanceId(): EAttribute {
    return <EAttribute>this.ePackageEClass.getEStructuralFeatures().get(6);
  }
  public getEOperation(): EClass {
    return this.eOperationEClass;
  }
  public getEOperation_EContainingClass(): EReference {
    return <EReference>this.eOperationEClass.getEStructuralFeatures().get(0);
  }
  public getEOperation_ETypeParameters(): EReference {
    return <EReference>this.eOperationEClass.getEStructuralFeatures().get(1);
  }
  public getEOperation_EParameters(): EReference {
    return <EReference>this.eOperationEClass.getEStructuralFeatures().get(2);
  }
  public getEOperation_EExceptions(): EReference {
    return <EReference>this.eOperationEClass.getEStructuralFeatures().get(3);
  }
  public getEOperation_EGenericExceptions(): EReference {
    return <EReference>this.eOperationEClass.getEStructuralFeatures().get(4);
  }
  public getEOperation_EExceptionsIds(): EAttribute {
    return <EAttribute>this.eOperationEClass.getEStructuralFeatures().get(5);
  }
  public getEFactory(): EClass {
    return this.eFactoryEClass;
  }
  public getEFactory_EPackage(): EReference {
    return <EReference>this.eFactoryEClass.getEStructuralFeatures().get(0);
  }
  public getEFactory_EPackageId(): EAttribute {
    return <EAttribute>this.eFactoryEClass.getEStructuralFeatures().get(1);
  }
  public getEEnumLiteral(): EClass {
    return this.eEnumLiteralEClass;
  }
  public getEEnumLiteral_Value(): EAttribute {
    return <EAttribute>this.eEnumLiteralEClass.getEStructuralFeatures().get(0);
  }
  public getEEnumLiteral_Instance(): EAttribute {
    return <EAttribute>this.eEnumLiteralEClass.getEStructuralFeatures().get(1);
  }
  public getEEnumLiteral_Literal(): EAttribute {
    return <EAttribute>this.eEnumLiteralEClass.getEStructuralFeatures().get(2);
  }
  public getEEnumLiteral_EEnum(): EReference {
    return <EReference>this.eEnumLiteralEClass.getEStructuralFeatures().get(3);
  }
  public override getEClassifier(): EClass {
    return this.eClassifierEClass;
  }
  public getEClassifier_InstanceClassName(): EAttribute {
    return <EAttribute>this.eClassifierEClass.getEStructuralFeatures().get(0);
  }
  public getEClassifier_InstanceClass(): EAttribute {
    return <EAttribute>this.eClassifierEClass.getEStructuralFeatures().get(1);
  }
  public getEClassifier_DefaultValue(): EAttribute {
    return <EAttribute>this.eClassifierEClass.getEStructuralFeatures().get(2);
  }
  public getEClassifier_InstanceTypeName(): EAttribute {
    return <EAttribute>this.eClassifierEClass.getEStructuralFeatures().get(3);
  }
  public getEClassifier_EPackage(): EReference {
    return <EReference>this.eClassifierEClass.getEStructuralFeatures().get(4);
  }
  public getEClassifier_ETypeParameters(): EReference {
    return <EReference>this.eClassifierEClass.getEStructuralFeatures().get(5);
  }
  public getEDataType(): EClass {
    return this.eDataTypeEClass;
  }
  public getEDataType_Serializable(): EAttribute {
    return <EAttribute>this.eDataTypeEClass.getEStructuralFeatures().get(0);
  }
  public getEEnum(): EClass {
    return this.eEnumEClass;
  }
  public getEEnum_ELiterals(): EReference {
    return <EReference>this.eEnumEClass.getEStructuralFeatures().get(0);
  }
  public getEClass(): EClass {
    return this.eClassEClass;
  }
  public getEClass_Abstract(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(0);
  }
  public getEClass_Interface(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(1);
  }
  public getEClass_ESuperTypes(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(2);
  }
  public getEClass_EOperations(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(3);
  }
  public getEClass_EAllAttributes(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(4);
  }
  public getEClass_EAllReferences(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(5);
  }
  public getEClass_EReferences(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(6);
  }
  public getEClass_EAttributes(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(7);
  }
  public getEClass_EAllContainments(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(8);
  }
  public getEClass_EAllOperations(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(9);
  }
  public getEClass_EAllStructuralFeatures(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(10);
  }
  public getEClass_EAllSuperTypes(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(11);
  }
  public getEClass_EIDAttribute(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(12);
  }
  public getEClass_EStructuralFeatures(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(13);
  }
  public getEClass_EGenericSuperTypes(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(14);
  }
  public getEClass_EAllGenericSuperTypes(): EReference {
    return <EReference>this.eClassEClass.getEStructuralFeatures().get(15);
  }
  public getEClass_ESuperTypesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(16);
  }
  public getEClass_EAllAttributesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(17);
  }
  public getEClass_EAllReferencesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(18);
  }
  public getEClass_EReferencesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(19);
  }
  public getEClass_EAttributesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(20);
  }
  public getEClass_EAllContainmentsIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(21);
  }
  public getEClass_EAllOperationsIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(22);
  }
  public getEClass_EAllStructuralFeaturesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(23);
  }
  public getEClass_EAllSuperTypesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(24);
  }
  public getEClass_EIDAttributeId(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(25);
  }
  public getEClass_EAllGenericSuperTypesIds(): EAttribute {
    return <EAttribute>this.eClassEClass.getEStructuralFeatures().get(26);
  }
  public getEAnnotation_EC(): EClass {
    return this.eAnnotationEClass;
  }
  public getEAnnotation_Source(): EAttribute {
    return <EAttribute>this.eAnnotationEClass.getEStructuralFeatures().get(0);
  }
  public getEAnnotation_Details(): EReference {
    return <EReference>this.eAnnotationEClass.getEStructuralFeatures().get(1);
  }
  public getEAnnotation_EModelElement(): EReference {
    return <EReference>this.eAnnotationEClass.getEStructuralFeatures().get(2);
  }
  public getEAnnotation_Contents(): EReference {
    return <EReference>this.eAnnotationEClass.getEStructuralFeatures().get(3);
  }
  public getEAnnotation_References(): EReference {
    return <EReference>this.eAnnotationEClass.getEStructuralFeatures().get(4);
  }
  public getEAnnotation_ReferencesIds(): EAttribute {
    return <EAttribute>this.eAnnotationEClass.getEStructuralFeatures().get(5);
  }
  public getEAttribute(): EClass {
    return this.eAttributeEClass;
  }
  public getEAttribute_ID(): EAttribute {
    return <EAttribute>this.eAttributeEClass.getEStructuralFeatures().get(0);
  }
  public getEAttribute_EAttributeType(): EReference {
    return <EReference>this.eAttributeEClass.getEStructuralFeatures().get(1);
  }
  public getEAttribute_EAttributeTypeId(): EAttribute {
    return <EAttribute>this.eAttributeEClass.getEStructuralFeatures().get(2);
  }
  public getEBigDecimal(): EDataType {
    return this.eBigDecimalEDataType;
  }
  public getEBigInteger(): EDataType {
    return this.eBigIntegerEDataType;
  }
  public getEBoolean(): EDataType {
    return this.eBooleanEDataType;
  }
  public getEBooleanObject(): EDataType {
    return this.eBooleanObjectEDataType;
  }
  public getEByte(): EDataType {
    return this.eByteEDataType;
  }
  public getEByteArray(): EDataType {
    return this.eByteArrayEDataType;
  }
  public getEByteObject(): EDataType {
    return this.eByteObjectEDataType;
  }
  public getEChar(): EDataType {
    return this.eCharEDataType;
  }
  public getECharacterObject(): EDataType {
    return this.eCharacterObjectEDataType;
  }
  public getEDate(): EDataType {
    return this.eDateEDataType;
  }
  public getEDiagnosticChain(): EDataType {
    return this.eDiagnosticChainEDataType;
  }
  public getEDouble(): EDataType {
    return this.eDoubleEDataType;
  }
  public getEDoubleObject(): EDataType {
    return this.eDoubleObjectEDataType;
  }
  public getEEList(): EDataType {
    return this.eEListEDataType;
  }
  public getEEnumerator(): EDataType {
    return this.eEnumeratorEDataType;
  }
  public getEFeatureMap(): EDataType {
    return this.eFeatureMapEDataType;
  }
  public getEFeatureMapEntry(): EDataType {
    return this.eFeatureMapEntryEDataType;
  }
  public getEFloat(): EDataType {
    return this.eFloatEDataType;
  }
  public getEFloatObject(): EDataType {
    return this.eFloatObjectEDataType;
  }
  public getEInt(): EDataType {
    return this.eIntEDataType;
  }
  public getEIntegerObject(): EDataType {
    return this.eIntegerObjectEDataType;
  }
  public getEJavaClass(): EDataType {
    return this.eJavaClassEDataType;
  }
  public getEJavaObject(): EDataType {
    return this.eJavaObjectEDataType;
  }
  public getDAny(): EDataType {
    return this.dAnyEDataType;
  }
  public getELong(): EDataType {
    return this.eLongEDataType;
  }
  public getELongObject(): EDataType {
    return this.eLongObjectEDataType;
  }
  public getEMap(): EDataType {
    return this.eMapEDataType;
  }
  public getEArray(): EDataType {
    return this.eArrayEDataType;
  }
  public getCudResult(): EDataType {
    return this.cudResultEDataType;
  }
  public getEResource(): EDataType {
    return this.eResourceEDataType;
  }
  public getEResourceSet(): EDataType {
    return this.eResourceSetEDataType;
  }
  public getEShort(): EDataType {
    return this.eShortEDataType;
  }
  public getEShortObject(): EDataType {
    return this.eShortObjectEDataType;
  }
  public getEString(): EDataType {
    return this.eStringEDataType;
  }
  public getETreeIterator(): EDataType {
    return this.eTreeIteratorEDataType;
  }
  public getEInvocationTargetException(): EDataType {
    return this.eInvocationTargetExceptionEDataType;
  }
  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;
    this.eGenericTypeEClass = this.createEClass(EcorePackage.E_GENERIC_TYPE);
    this.createEReference(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_UPPER_BOUND
    );
    this.createEReference(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_TYPE_ARGUMENTS
    );
    this.createEReference(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_RAW_TYPE
    );
    this.createEReference(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_LOWER_BOUND
    );
    this.createEReference(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_TYPE_PARAMETER
    );
    this.createEReference(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_CLASSIFIER
    );
    this.createEAttribute(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_RAW_TYPE_ID
    );
    this.createEAttribute(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_TYPE_PARAMETER_ID
    );
    this.createEAttribute(
      this.eGenericTypeEClass,
      EcorePackage.E_GENERIC_TYPE__E_CLASSIFIER_ID
    );
    this.eStringToStringMapEntryEClass = this.createEClass(
      EcorePackage.E_STRING_TO_STRING_MAP_ENTRY
    );
    this.createEAttribute(
      this.eStringToStringMapEntryEClass,
      EcorePackage.E_STRING_TO_STRING_MAP_ENTRY__KEY
    );
    this.createEAttribute(
      this.eStringToStringMapEntryEClass,
      EcorePackage.E_STRING_TO_STRING_MAP_ENTRY__VALUE
    );
    this.eObjectEClass = this.createEClass(EcorePackage.E_OBJECT);
    this.eModelElementEClass = this.createEClass(EcorePackage.E_MODEL_ELEMENT);
    this.createEReference(
      this.eModelElementEClass,
      EcorePackage.E_MODEL_ELEMENT__E_ANNOTATIONS
    );
    this.eNamedElementEClass = this.createEClass(EcorePackage.E_NAMED_ELEMENT);
    this.createEAttribute(
      this.eNamedElementEClass,
      EcorePackage.E_NAMED_ELEMENT__NAME
    );
    this.eTypeParameterEClass = this.createEClass(
      EcorePackage.E_TYPE_PARAMETER
    );
    this.createEReference(
      this.eTypeParameterEClass,
      EcorePackage.E_TYPE_PARAMETER__E_BOUNDS
    );
    this.eTypedElementEClass = this.createEClass(EcorePackage.E_TYPED_ELEMENT);
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__ORDERED
    );
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__UNIQUE
    );
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__LOWER_BOUND
    );
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__UPPER_BOUND
    );
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__MANY
    );
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__REQUIRED
    );
    this.createEReference(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__E_TYPE
    );
    this.createEReference(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__E_GENERIC_TYPE
    );
    this.createEAttribute(
      this.eTypedElementEClass,
      EcorePackage.E_TYPED_ELEMENT__E_TYPE_ID
    );
    this.eStructuralFeatureEClass = this.createEClass(
      EcorePackage.E_STRUCTURAL_FEATURE
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__CHANGEABLE
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__VOLATILE
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__TRANSIENT
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__DEFAULT_VALUE_LITERAL
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__DEFAULT_VALUE
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__UNSETTABLE
    );
    this.createEAttribute(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__DERIVED
    );
    this.createEReference(
      this.eStructuralFeatureEClass,
      EcorePackage.E_STRUCTURAL_FEATURE__E_CONTAINING_CLASS
    );
    this.eReferenceEClass = this.createEClass(EcorePackage.E_REFERENCE);
    this.createEAttribute(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__CONTAINMENT
    );
    this.createEAttribute(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__CONTAINER
    );
    this.createEAttribute(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__RESOLVE_PROXIES
    );
    this.createEReference(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__E_OPPOSITE
    );
    this.createEReference(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__E_REFERENCE_TYPE
    );
    this.createEReference(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__E_KEYS
    );
    this.createEAttribute(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__E_OPPOSITE_ID
    );
    this.createEAttribute(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__E_REFERENCE_TYPE_ID
    );
    this.createEAttribute(
      this.eReferenceEClass,
      EcorePackage.E_REFERENCE__E_KEYS_IDS
    );
    this.eParameterEClass = this.createEClass(EcorePackage.E_PARAMETER);
    this.createEReference(
      this.eParameterEClass,
      EcorePackage.E_PARAMETER__E_OPERATION
    );
    this.ePackageEClass = this.createEClass(EcorePackage.E_PACKAGE);
    this.createEAttribute(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__NS_U_R_I
    );
    this.createEAttribute(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__NS_PREFIX
    );
    this.createEReference(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__E_FACTORY_INSTANCE
    );
    this.createEReference(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__E_CLASSIFIERS
    );
    this.createEReference(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__E_SUBPACKAGES
    );
    this.createEReference(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__E_SUPER_PACKAGE
    );
    this.createEAttribute(
      this.ePackageEClass,
      EcorePackage.E_PACKAGE__E_FACTORY_INSTANCE_ID
    );
    this.eOperationEClass = this.createEClass(EcorePackage.E_OPERATION);
    this.createEReference(
      this.eOperationEClass,
      EcorePackage.E_OPERATION__E_CONTAINING_CLASS
    );
    this.createEReference(
      this.eOperationEClass,
      EcorePackage.E_OPERATION__E_TYPE_PARAMETERS
    );
    this.createEReference(
      this.eOperationEClass,
      EcorePackage.E_OPERATION__E_PARAMETERS
    );
    this.createEReference(
      this.eOperationEClass,
      EcorePackage.E_OPERATION__E_EXCEPTIONS
    );
    this.createEReference(
      this.eOperationEClass,
      EcorePackage.E_OPERATION__E_GENERIC_EXCEPTIONS
    );
    this.createEAttribute(
      this.eOperationEClass,
      EcorePackage.E_OPERATION__E_EXCEPTIONS_IDS
    );
    this.eFactoryEClass = this.createEClass(EcorePackage.E_FACTORY);
    this.createEReference(
      this.eFactoryEClass,
      EcorePackage.E_FACTORY__E_PACKAGE
    );
    this.createEAttribute(
      this.eFactoryEClass,
      EcorePackage.E_FACTORY__E_PACKAGE_ID
    );
    this.eEnumLiteralEClass = this.createEClass(EcorePackage.E_ENUM_LITERAL);
    this.createEAttribute(
      this.eEnumLiteralEClass,
      EcorePackage.E_ENUM_LITERAL__VALUE
    );
    this.createEAttribute(
      this.eEnumLiteralEClass,
      EcorePackage.E_ENUM_LITERAL__INSTANCE
    );
    this.createEAttribute(
      this.eEnumLiteralEClass,
      EcorePackage.E_ENUM_LITERAL__LITERAL
    );
    this.createEReference(
      this.eEnumLiteralEClass,
      EcorePackage.E_ENUM_LITERAL__E_ENUM
    );
    this.eClassifierEClass = this.createEClass(EcorePackage.E_CLASSIFIER);
    this.createEAttribute(
      this.eClassifierEClass,
      EcorePackage.E_CLASSIFIER__INSTANCE_CLASS_NAME
    );
    this.createEAttribute(
      this.eClassifierEClass,
      EcorePackage.E_CLASSIFIER__INSTANCE_CLASS
    );
    this.createEAttribute(
      this.eClassifierEClass,
      EcorePackage.E_CLASSIFIER__DEFAULT_VALUE
    );
    this.createEAttribute(
      this.eClassifierEClass,
      EcorePackage.E_CLASSIFIER__INSTANCE_TYPE_NAME
    );
    this.createEReference(
      this.eClassifierEClass,
      EcorePackage.E_CLASSIFIER__E_PACKAGE
    );
    this.createEReference(
      this.eClassifierEClass,
      EcorePackage.E_CLASSIFIER__E_TYPE_PARAMETERS
    );
    this.eDataTypeEClass = this.createEClass(EcorePackage.E_DATA_TYPE);
    this.createEAttribute(
      this.eDataTypeEClass,
      EcorePackage.E_DATA_TYPE__SERIALIZABLE
    );
    this.eEnumEClass = this.createEClass(EcorePackage.E_ENUM);
    this.createEReference(this.eEnumEClass, EcorePackage.E_ENUM__E_LITERALS);
    this.eClassEClass = this.createEClass(EcorePackage.E_CLASS);
    this.createEAttribute(this.eClassEClass, EcorePackage.E_CLASS__ABSTRACT);
    this.createEAttribute(this.eClassEClass, EcorePackage.E_CLASS__INTERFACE);
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_SUPER_TYPES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_OPERATIONS
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_ATTRIBUTES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_REFERENCES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_REFERENCES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ATTRIBUTES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_CONTAINMENTS
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_OPERATIONS
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_STRUCTURAL_FEATURES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_SUPER_TYPES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_I_D_ATTRIBUTE
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_STRUCTURAL_FEATURES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_GENERIC_SUPER_TYPES
    );
    this.createEReference(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_GENERIC_SUPER_TYPES
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_SUPER_TYPES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_ATTRIBUTES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_REFERENCES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_REFERENCES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ATTRIBUTES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_CONTAINMENTS_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_OPERATIONS_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_STRUCTURAL_FEATURES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_SUPER_TYPES_IDS
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_I_D_ATTRIBUTE_ID
    );
    this.createEAttribute(
      this.eClassEClass,
      EcorePackage.E_CLASS__E_ALL_GENERIC_SUPER_TYPES_IDS
    );
    this.eAnnotationEClass = this.createEClass(EcorePackage.E_ANNOTATION);
    this.createEAttribute(
      this.eAnnotationEClass,
      EcorePackage.E_ANNOTATION__SOURCE
    );
    this.createEReference(
      this.eAnnotationEClass,
      EcorePackage.E_ANNOTATION__DETAILS
    );
    this.createEReference(
      this.eAnnotationEClass,
      EcorePackage.E_ANNOTATION__E_MODEL_ELEMENT
    );
    this.createEReference(
      this.eAnnotationEClass,
      EcorePackage.E_ANNOTATION__CONTENTS
    );
    this.createEReference(
      this.eAnnotationEClass,
      EcorePackage.E_ANNOTATION__REFERENCES
    );
    this.createEAttribute(
      this.eAnnotationEClass,
      EcorePackage.E_ANNOTATION__REFERENCES_IDS
    );
    this.eAttributeEClass = this.createEClass(EcorePackage.E_ATTRIBUTE);
    this.createEAttribute(this.eAttributeEClass, EcorePackage.E_ATTRIBUTE__I_D);
    this.createEReference(
      this.eAttributeEClass,
      EcorePackage.E_ATTRIBUTE__E_ATTRIBUTE_TYPE
    );
    this.createEAttribute(
      this.eAttributeEClass,
      EcorePackage.E_ATTRIBUTE__E_ATTRIBUTE_TYPE_ID
    );
    this.eBigDecimalEDataType = this.createEDataType(
      EcorePackage.E_BIG_DECIMAL
    );
    this.eBigIntegerEDataType = this.createEDataType(
      EcorePackage.E_BIG_INTEGER
    );
    this.eBooleanEDataType = this.createEDataType(EcorePackage.E_BOOLEAN);
    this.eBooleanObjectEDataType = this.createEDataType(
      EcorePackage.E_BOOLEAN_OBJECT
    );
    this.eByteEDataType = this.createEDataType(EcorePackage.E_BYTE);
    this.eByteArrayEDataType = this.createEDataType(EcorePackage.E_BYTE_ARRAY);
    this.eByteObjectEDataType = this.createEDataType(
      EcorePackage.E_BYTE_OBJECT
    );
    this.eCharEDataType = this.createEDataType(EcorePackage.E_CHAR);
    this.eCharacterObjectEDataType = this.createEDataType(
      EcorePackage.E_CHARACTER_OBJECT
    );
    this.eDateEDataType = this.createEDataType(EcorePackage.E_DATE);
    this.eDiagnosticChainEDataType = this.createEDataType(
      EcorePackage.E_DIAGNOSTIC_CHAIN
    );
    this.eDoubleEDataType = this.createEDataType(EcorePackage.E_DOUBLE);
    this.eDoubleObjectEDataType = this.createEDataType(
      EcorePackage.E_DOUBLE_OBJECT
    );
    this.eEListEDataType = this.createEDataType(EcorePackage.E_E_LIST);
    this.eEnumeratorEDataType = this.createEDataType(EcorePackage.E_ENUMERATOR);
    this.eFeatureMapEDataType = this.createEDataType(
      EcorePackage.E_FEATURE_MAP
    );
    this.eFeatureMapEntryEDataType = this.createEDataType(
      EcorePackage.E_FEATURE_MAP_ENTRY
    );
    this.eFloatEDataType = this.createEDataType(EcorePackage.E_FLOAT);
    this.eFloatObjectEDataType = this.createEDataType(
      EcorePackage.E_FLOAT_OBJECT
    );
    this.eIntEDataType = this.createEDataType(EcorePackage.E_INT);
    this.eIntegerObjectEDataType = this.createEDataType(
      EcorePackage.E_INTEGER_OBJECT
    );
    this.eJavaClassEDataType = this.createEDataType(EcorePackage.E_JAVA_CLASS);
    this.eJavaObjectEDataType = this.createEDataType(
      EcorePackage.E_JAVA_OBJECT
    );
    this.dAnyEDataType = this.createEDataType(EcorePackage.D_ANY);
    this.eLongEDataType = this.createEDataType(EcorePackage.E_LONG);
    this.eLongObjectEDataType = this.createEDataType(
      EcorePackage.E_LONG_OBJECT
    );
    this.eMapEDataType = this.createEDataType(EcorePackage.E_MAP);
    this.eArrayEDataType = this.createEDataType(EcorePackage.E_ARRAY);
    this.cudResultEDataType = this.createEDataType(EcorePackage.CUD_RESULT);
    this.eResourceEDataType = this.createEDataType(EcorePackage.E_RESOURCE);
    this.eResourceSetEDataType = this.createEDataType(
      EcorePackage.E_RESOURCE_SET
    );
    this.eShortEDataType = this.createEDataType(EcorePackage.E_SHORT);
    this.eShortObjectEDataType = this.createEDataType(
      EcorePackage.E_SHORT_OBJECT
    );
    this.eStringEDataType = this.createEDataType(EcorePackage.E_STRING);
    this.eTreeIteratorEDataType = this.createEDataType(
      EcorePackage.E_TREE_ITERATOR
    );
    this.eInvocationTargetExceptionEDataType = this.createEDataType(
      EcorePackage.E_INVOCATION_TARGET_EXCEPTION
    );
  }
  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.initEClass(
      this.eGenericTypeEClass,
      'EGenericType',
      false,
      false,
      true
    );
    this.initEReference(
      this.getEGenericType_EUpperBound(),
      this.getEGenericType(),
      undefined,
      'eUpperBound',
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
      this.getEGenericType_ETypeArguments(),
      this.getEGenericType(),
      undefined,
      'eTypeArguments',
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
      this.getEGenericType_ERawType(),
      this.getEClassifier(),
      undefined,
      'eRawType',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEGenericType_ELowerBound(),
      this.getEGenericType(),
      undefined,
      'eLowerBound',
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
      this.getEGenericType_ETypeParameter(),
      this.getETypeParameter(),
      undefined,
      'eTypeParameter',
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
      this.getEGenericType_EClassifier(),
      this.getEClassifier(),
      undefined,
      'eClassifier',
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
      this.getEGenericType_ERawTypeId(),
      this.getEString(),
      'eRawTypeId',
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
      this.getEGenericType_ETypeParameterId(),
      this.getEString(),
      'eTypeParameterId',
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
      this.getEGenericType_EClassifierId(),
      this.getEString(),
      'eClassifierId',
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
    this.initEClass(
      this.eStringToStringMapEntryEClass,
      'EStringToStringMapEntry',
      false,
      false,
      true
    );
    this.initEAttribute(
      this.getEStringToStringMapEntry_Key(),
      this.getEString(),
      'key',
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
      this.getEStringToStringMapEntry_Value(),
      this.getEString(),
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
    this.initEClass(this.eObjectEClass, 'EObject', false, false, true);
    this.initEClass(
      this.eModelElementEClass,
      'EModelElement',
      true,
      false,
      true
    );
    this.initEReference(
      this.getEModelElement_EAnnotations(),
      this.getEAnnotation_EC(),
      this.getEAnnotation_EModelElement(),
      'eAnnotations',
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
    this.eNamedElementEClass.getESuperTypes().add(this.getEModelElement());
    this.initEClass(
      this.eNamedElementEClass,
      'ENamedElement',
      true,
      false,
      true
    );
    this.initEAttribute(
      this.getENamedElement_Name(),
      this.getEString(),
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
    this.eTypeParameterEClass.getESuperTypes().add(this.getENamedElement());
    this.initEClass(
      this.eTypeParameterEClass,
      'ETypeParameter',
      false,
      false,
      true
    );
    this.initEReference(
      this.getETypeParameter_EBounds(),
      this.getEGenericType(),
      undefined,
      'eBounds',
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
    this.eTypedElementEClass.getESuperTypes().add(this.getENamedElement());
    this.initEClass(
      this.eTypedElementEClass,
      'ETypedElement',
      true,
      false,
      true
    );
    this.initEAttribute(
      this.getETypedElement_Ordered(),
      this.getEBoolean(),
      'ordered',
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
      this.getETypedElement_Unique(),
      this.getEBoolean(),
      'unique',
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
      this.getETypedElement_LowerBound(),
      this.getEInt(),
      'lowerBound',
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
      this.getETypedElement_UpperBound(),
      this.getEInt(),
      'upperBound',
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
      this.getETypedElement_Many(),
      this.getEBoolean(),
      'many',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getETypedElement_Required(),
      this.getEBoolean(),
      'required',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEReference(
      this.getETypedElement_EType(),
      this.getEClassifier(),
      undefined,
      'eType',
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
      this.getETypedElement_EGenericType(),
      this.getEGenericType(),
      undefined,
      'eGenericType',
      '',
      0,
      1,
      '',
      false,
      true,
      true,
      true,
      false,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getETypedElement_ETypeId(),
      this.getEString(),
      'eTypeId',
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
    this.eStructuralFeatureEClass.getESuperTypes().add(this.getETypedElement());
    this.initEClass(
      this.eStructuralFeatureEClass,
      'EStructuralFeature',
      true,
      false,
      true
    );
    this.initEAttribute(
      this.getEStructuralFeature_Changeable(),
      this.getEBoolean(),
      'changeable',
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
      this.getEStructuralFeature_Volatile(),
      this.getEBoolean(),
      'volatile',
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
      this.getEStructuralFeature_Transient(),
      this.getEBoolean(),
      'transient',
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
      this.getEStructuralFeature_DefaultValueLiteral(),
      this.getEString(),
      'defaultValueLiteral',
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
      this.getEStructuralFeature_DefaultValue(),
      this.getEJavaObject(),
      'defaultValue',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEStructuralFeature_Unsettable(),
      this.getEBoolean(),
      'unsettable',
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
      this.getEStructuralFeature_Derived(),
      this.getEBoolean(),
      'derived',
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
      this.getEStructuralFeature_EContainingClass(),
      this.getEClass(),
      this.getEClass_EStructuralFeatures(),
      'eContainingClass',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.eReferenceEClass.getESuperTypes().add(this.getEStructuralFeature());
    this.initEClass(this.eReferenceEClass, 'EReference', false, false, true);
    this.initEAttribute(
      this.getEReference_Containment(),
      this.getEBoolean(),
      'containment',
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
      this.getEReference_Container(),
      this.getEBoolean(),
      'container',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEReference_ResolveProxies(),
      this.getEBoolean(),
      'resolveProxies',
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
      this.getEReference_EOpposite(),
      this.getEReference(),
      undefined,
      'eOpposite',
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
      this.getEReference_EReferenceType(),
      this.getEClass(),
      undefined,
      'eReferenceType',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEReference_EKeys(),
      this.getEAttribute(),
      undefined,
      'eKeys',
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
    this.initEAttribute(
      this.getEReference_EOppositeId(),
      this.getEString(),
      'eOppositeId',
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
      this.getEReference_EReferenceTypeId(),
      this.getEString(),
      'eReferenceTypeId',
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
      this.getEReference_EKeysIds(),
      this.getEString(),
      'eKeysIds',
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
    this.eParameterEClass.getESuperTypes().add(this.getETypedElement());
    this.initEClass(this.eParameterEClass, 'EParameter', false, false, true);
    this.initEReference(
      this.getEParameter_EOperation(),
      this.getEOperation(),
      this.getEOperation_EParameters(),
      'eOperation',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.ePackageEClass.getESuperTypes().add(this.getENamedElement());
    this.initEClass(this.ePackageEClass, 'EPackage', false, false, true);
    this.initEAttribute(
      this.getEPackage_NsURI(),
      this.getEString(),
      'nsURI',
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
      this.getEPackage_NsPrefix(),
      this.getEString(),
      'nsPrefix',
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
      this.getEPackage_EFactoryInstance(),
      this.getEFactory(),
      undefined,
      'eFactoryInstance',
      '',
      0,
      1,
      '',
      true,
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
      this.getEPackage_EClassifiers(),
      this.getEClassifier(),
      this.getEClassifier_EPackage(),
      'eClassifiers',
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
      this.getEPackage_ESubpackages(),
      this.getEPackage(),
      this.getEPackage_ESuperPackage(),
      'eSubpackages',
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
      this.getEPackage_ESuperPackage(),
      this.getEPackage(),
      this.getEPackage_ESubpackages(),
      'eSuperPackage',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEPackage_EFactoryInstanceId(),
      this.getEString(),
      'eFactoryInstanceId',
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
    this.eOperationEClass.getESuperTypes().add(this.getETypedElement());
    this.initEClass(this.eOperationEClass, 'EOperation', false, false, true);
    this.initEReference(
      this.getEOperation_EContainingClass(),
      this.getEClass(),
      this.getEClass_EOperations(),
      'eContainingClass',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEOperation_ETypeParameters(),
      this.getETypeParameter(),
      undefined,
      'eTypeParameters',
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
      this.getEOperation_EParameters(),
      this.getEParameter(),
      this.getEParameter_EOperation(),
      'eParameters',
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
      this.getEOperation_EExceptions(),
      this.getEClassifier(),
      undefined,
      'eExceptions',
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
      this.getEOperation_EGenericExceptions(),
      this.getEGenericType(),
      undefined,
      'eGenericExceptions',
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
      this.getEOperation_EExceptionsIds(),
      this.getEString(),
      'eExceptionsIds',
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
    this.eFactoryEClass.getESuperTypes().add(this.getEModelElement());
    this.initEClass(this.eFactoryEClass, 'EFactory', false, false, true);
    this.initEReference(
      this.getEFactory_EPackage(),
      this.getEPackage(),
      undefined,
      'ePackage',
      '',
      0,
      1,
      '',
      true,
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
      this.getEFactory_EPackageId(),
      this.getEString(),
      'ePackageId',
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
    this.eEnumLiteralEClass.getESuperTypes().add(this.getENamedElement());
    this.initEClass(
      this.eEnumLiteralEClass,
      'EEnumLiteral',
      false,
      false,
      true
    );
    this.initEAttribute(
      this.getEEnumLiteral_Value(),
      this.getEInt(),
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
      this.getEEnumLiteral_Instance(),
      this.getEEnumerator(),
      'instance',
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
    this.initEAttribute(
      this.getEEnumLiteral_Literal(),
      this.getEString(),
      'literal',
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
      this.getEEnumLiteral_EEnum(),
      this.getEEnum(),
      this.getEEnum_ELiterals(),
      'eEnum',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.eClassifierEClass.getESuperTypes().add(this.getENamedElement());
    this.initEClass(this.eClassifierEClass, 'EClassifier', true, false, true);
    this.initEAttribute(
      this.getEClassifier_InstanceClassName(),
      this.getEString(),
      'instanceClassName',
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
    this.initEAttribute(
      this.getEClassifier_InstanceClass(),
      {} as EClass,
      'instanceClass',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEClassifier_DefaultValue(),
      this.getEJavaObject(),
      'defaultValue',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEClassifier_InstanceTypeName(),
      this.getEString(),
      'instanceTypeName',
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
      this.getEClassifier_EPackage(),
      this.getEPackage(),
      this.getEPackage_EClassifiers(),
      'ePackage',
      '',
      0,
      1,
      '',
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClassifier_ETypeParameters(),
      this.getETypeParameter(),
      undefined,
      'eTypeParameters',
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
    this.eDataTypeEClass.getESuperTypes().add(this.getEClassifier());
    this.initEClass(this.eDataTypeEClass, 'EDataType', false, false, true);
    this.initEAttribute(
      this.getEDataType_Serializable(),
      this.getEBoolean(),
      'serializable',
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
    this.eEnumEClass.getESuperTypes().add(this.getEDataType());
    this.initEClass(this.eEnumEClass, 'EEnum', false, false, true);
    this.initEReference(
      this.getEEnum_ELiterals(),
      this.getEEnumLiteral(),
      this.getEEnumLiteral_EEnum(),
      'eLiterals',
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
    this.eClassEClass.getESuperTypes().add(this.getEClassifier());
    this.initEClass(this.eClassEClass, 'EClass', false, false, true);
    this.initEAttribute(
      this.getEClass_Abstract(),
      this.getEBoolean(),
      'abstract',
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
      this.getEClass_Interface(),
      this.getEBoolean(),
      'interface',
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
      this.getEClass_ESuperTypes(),
      this.getEClass(),
      undefined,
      'eSuperTypes',
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
      this.getEClass_EOperations(),
      this.getEOperation(),
      this.getEOperation_EContainingClass(),
      'eOperations',
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
      this.getEClass_EAllAttributes(),
      this.getEAttribute(),
      undefined,
      'eAllAttributes',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EAllReferences(),
      this.getEReference(),
      undefined,
      'eAllReferences',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EReferences(),
      this.getEReference(),
      undefined,
      'eReferences',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EAttributes(),
      this.getEAttribute(),
      undefined,
      'eAttributes',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EAllContainments(),
      this.getEReference(),
      undefined,
      'eAllContainments',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EAllOperations(),
      this.getEOperation(),
      undefined,
      'eAllOperations',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EAllStructuralFeatures(),
      this.getEStructuralFeature(),
      undefined,
      'eAllStructuralFeatures',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EAllSuperTypes(),
      this.getEClass(),
      undefined,
      'eAllSuperTypes',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EIDAttribute(),
      this.getEAttribute(),
      undefined,
      'eIDAttribute',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEReference(
      this.getEClass_EStructuralFeatures(),
      this.getEStructuralFeature(),
      this.getEStructuralFeature_EContainingClass(),
      'eStructuralFeatures',
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
      this.getEClass_EGenericSuperTypes(),
      this.getEGenericType(),
      undefined,
      'eGenericSuperTypes',
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
      this.getEClass_EAllGenericSuperTypes(),
      this.getEGenericType(),
      undefined,
      'eAllGenericSuperTypes',
      '',
      0,
      -1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEClass_ESuperTypesIds(),
      this.getEString(),
      'eSuperTypesIds',
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
      this.getEClass_EAllAttributesIds(),
      this.getEString(),
      'eAllAttributesIds',
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
      this.getEClass_EAllReferencesIds(),
      this.getEString(),
      'eAllReferencesIds',
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
      this.getEClass_EReferencesIds(),
      this.getEString(),
      'eReferencesIds',
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
      this.getEClass_EAttributesIds(),
      this.getEString(),
      'eAttributesIds',
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
      this.getEClass_EAllContainmentsIds(),
      this.getEString(),
      'eAllContainmentsIds',
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
      this.getEClass_EAllOperationsIds(),
      this.getEString(),
      'eAllOperationsIds',
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
      this.getEClass_EAllStructuralFeaturesIds(),
      this.getEString(),
      'eAllStructuralFeaturesIds',
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
      this.getEClass_EAllSuperTypesIds(),
      this.getEString(),
      'eAllSuperTypesIds',
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
      this.getEClass_EIDAttributeId(),
      this.getEString(),
      'eIDAttributeId',
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
      this.getEClass_EAllGenericSuperTypesIds(),
      this.getEString(),
      'eAllGenericSuperTypesIds',
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
    this.eAnnotationEClass.getESuperTypes().add(this.getEModelElement());
    this.initEClass(this.eAnnotationEClass, 'EAnnotation', false, false, true);
    this.initEAttribute(
      this.getEAnnotation_Source(),
      this.getEString(),
      'source',
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
      this.getEAnnotation_Details(),
      this.getEStringToStringMapEntry(),
      undefined,
      'details',
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
      this.getEAnnotation_EModelElement(),
      this.getEModelElement(),
      this.getEModelElement_EAnnotations(),
      'eModelElement',
      '',
      0,
      1,
      '',
      true,
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
      this.getEAnnotation_Contents(),
      this.getEObject(),
      undefined,
      'contents',
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
      this.getEAnnotation_References(),
      this.getEObject(),
      undefined,
      'references',
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
    this.initEAttribute(
      this.getEAnnotation_ReferencesIds(),
      this.getEString(),
      'referencesIds',
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
    this.eAttributeEClass.getESuperTypes().add(this.getEStructuralFeature());
    this.initEClass(this.eAttributeEClass, 'EAttribute', false, false, true);
    this.initEAttribute(
      this.getEAttribute_ID(),
      this.getEBoolean(),
      'iD',
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
      this.getEAttribute_EAttributeType(),
      this.getEDataType(),
      undefined,
      'eAttributeType',
      '',
      0,
      1,
      '',
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    );
    this.initEAttribute(
      this.getEAttribute_EAttributeTypeId(),
      this.getEString(),
      'eAttributeTypeId',
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
    this.initEDataType(this.eBigDecimalEDataType, 'EBigDecimal');
    this.initEDataType(this.eBigIntegerEDataType, 'EBigInteger');
    this.initEDataType(this.eBooleanEDataType, 'EBoolean');
    this.initEDataType(this.eBooleanObjectEDataType, 'EBooleanObject');
    this.initEDataType(this.eByteEDataType, 'EByte');
    this.initEDataType(this.eByteArrayEDataType, 'EByteArray');
    this.initEDataType(this.eByteObjectEDataType, 'EByteObject');
    this.initEDataType(this.eCharEDataType, 'EChar');
    this.initEDataType(this.eCharacterObjectEDataType, 'ECharacterObject');
    this.initEDataType(this.eDateEDataType, 'EDate');
    this.initEDataType(this.eDiagnosticChainEDataType, 'EDiagnosticChain');
    this.initEDataType(this.eDoubleEDataType, 'EDouble');
    this.initEDataType(this.eDoubleObjectEDataType, 'EDoubleObject');
    this.initEDataType(this.eEListEDataType, 'EEList');
    this.initEDataType(this.eEnumeratorEDataType, 'EEnumerator');
    this.initEDataType(this.eFeatureMapEDataType, 'EFeatureMap');
    this.initEDataType(this.eFeatureMapEntryEDataType, 'EFeatureMapEntry');
    this.initEDataType(this.eFloatEDataType, 'EFloat');
    this.initEDataType(this.eFloatObjectEDataType, 'EFloatObject');
    this.initEDataType(this.eIntEDataType, 'EInt');
    this.initEDataType(this.eIntegerObjectEDataType, 'EIntegerObject');
    this.initEDataType(this.eJavaClassEDataType, 'EJavaClass');
    this.initEDataType(this.eJavaObjectEDataType, 'EJavaObject');
    this.initEDataType(this.dAnyEDataType, 'DAny');
    this.initEDataType(this.eLongEDataType, 'ELong');
    this.initEDataType(this.eLongObjectEDataType, 'ELongObject');
    this.initEDataType(this.eMapEDataType, 'EMap');
    this.initEDataType(this.eArrayEDataType, 'EArray');
    this.initEDataType(this.cudResultEDataType, 'CudResult');
    this.initEDataType(this.eResourceEDataType, 'EResource');
    this.initEDataType(this.eResourceSetEDataType, 'EResourceSet');
    this.initEDataType(this.eShortEDataType, 'EShort');
    this.initEDataType(this.eShortObjectEDataType, 'EShortObject');
    this.initEDataType(this.eStringEDataType, 'EString');
    this.initEDataType(this.eTreeIteratorEDataType, 'ETreeIterator');
    this.initEDataType(
      this.eInvocationTargetExceptionEDataType,
      'EInvocationTargetException'
    );
  }
}
