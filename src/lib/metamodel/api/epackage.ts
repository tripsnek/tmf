import { ENamedElement } from './enamed-element';
import { EClass } from './eclass';
import { EClassifier } from './eclassifier';
import { EFactory } from './efactory';
import { EList } from './elist';
import { BasicEList } from '../basicelist';
import { EEnum } from './eenum';
import { EAttribute } from './eattribute';
import { EReference } from './ereference';
import { EStructuralFeature } from './estructural-feature';
import { EDataType } from './edata-type';
import { EEnumLiteral } from './eenum-literal';
import { EOperation } from './eoperation';
import { ENamedElementImpl } from '../enamed-element-impl';
import { EAttributeImpl } from '../eattribute-impl';
import { EClassImpl } from '../eclass-impl';
import { EOperationImpl } from '../eoperation-impl';
import { EReferenceImpl } from '../ereference-impl';
import { EEnumImpl } from '../eenum-impl';
import { EDataTypeImpl } from '../edata-type-impl';
import { EEnumLiteralImpl } from '../eenum-literal-impl';
import { EParameterImpl } from '../eparameter-impl';

export class EPackage extends ENamedElementImpl {
  public static EPACKAGE: EClass; // Initialized in EClass
  public static ECORE: EPackage; // Initialized in EClass

  /**
   * A map from {@link EPackage#getNsURI() namespace URI} to {@link EPackage}.
   *
   * NOTE: This is a significant simplication of the EPackage.Registry in EMF, in
   * that it consolidates several classes into one.
   */
  public static Registry = class Registry extends Map<string, EPackage> {
    static INSTANCE = new Registry();

    public register(pkg: EPackage) {
      if (!this.has(pkg.getNsURI())) {
        this.set(pkg.getNsURI(), pkg);
      }
    }

    /**
     * Looks up the value in the map.
     */
    getEPackage(nsURI: string): EPackage {
      return this.get(nsURI)!;
    }

    /**
     * Looks up the value in the map.
     */
    getEFactory(nsURI: string): EFactory {
      return this.get(nsURI)!.getEFactoryInstance();
    }
  };

  private _eClassifiers: EList<EClassifier> = new BasicEList();
  private _eSubPackages: EList<EPackage> = new BasicEList();
  private _eSuperPackage!: EPackage;
  private _nsPrefix!: string;
  private _nsURI!: string;

  protected _eFactoryInstance!: EFactory;

  public constructor(name: string, nsUri?: string, nsPrefix?: string) {
    super(name);
    if (nsUri) {
      this.setNsURI(nsUri);
      EPackage.Registry.INSTANCE.register(this);
    }
    if(nsPrefix){
      this.setNsPrefix(nsPrefix);
    }
  }

  public getEClassifier(name: string): EClassifier {
    return this._eClassifiers.find((e) => e.getName() === name)!;
  }

  public getESubPackageByName(name: string): EPackage {
    return this._eSubPackages.find((e) => e.getName() === name)!;
  }

  // TODO: Protected is probably not right
  // This method is probably to be invoked by setting an inverse field
  protected addEClassifier(eClassifier: EClassifier): void {
    this._eClassifiers.add(eClassifier);
  }

  public getEClassifiers(): EList<EClassifier> {
    return this._eClassifiers;
  }

  public getESubPackages(): EList<EPackage> {
    return this._eSubPackages;
  }

  public getESuperPackage(): EPackage {
    return this._eSuperPackage;
  }

  public setESuperPackage(superPkg: EPackage): void {
    //TODO: should handle inverse reference on both ends
    this._eSuperPackage = superPkg;
    if(!this._eSuperPackage.getESubPackages().contains(this))
      this._eSuperPackage.getESubPackages().add(this);
  }

  public getNsPrefix(): string {
    return this._nsPrefix;
  }

  public setNsPrefix(value: string): void {
    this._nsPrefix = value;
  }

  public getNsURI(): string {
    return this._nsURI;
  }

  public setNsURI(value: string): void {
    this._nsURI = value;
  }

  //======================================================================
  // Factory-related methods

  public getEFactoryInstance(): EFactory {
    return this._eFactoryInstance;
  }

  public setEFactoryInstance(value: EFactory): void {
    this._eFactoryInstance = value;
  }

  protected createEEnum(id: number): EEnum {
    const c = new EEnumImpl();
    c.setClassifierId(id);
    c.setEPackage(this);
    this.getEClassifiers().add(c);
    return c;
  }

  protected createEDataType(id: number): EDataType {
    const c = new EDataTypeImpl();
    c.setClassifierId(id);
    c.setEPackage(this);
    this.getEClassifiers().add(c);
    return c;
  }

  protected createEClass(id: number): EClass {
    const c = new EClassImpl();
    c.setClassifierId(id);
    this.getEClassifiers().add(c);
    c.setEPackage(this);
    return c;
  }

  protected addEEnumLiteral(
    owner: EEnum,
    literal: string,
    value: number
  ): void {
    //NOTE: This is different from the EMF implementation, which exploits the
    //fact that Java allows enums to implement interfaces. To replicate that in
    //typescript, we would probably have to use types. If so, we should need only
    //to pass in an instance of that base class (Enumerator in EMF) as 'literal'
    const l = new EEnumLiteralImpl();
    l.setLiteral(literal);
    l.setName(literal);
    l.setInstance(literal);
    l.setValue(value);
    l.setEEnum(owner);
    owner.getELiterals().add(l);
  }

  protected initEClass(
    c: EClass,
    instanceClassName: string,
    isAbstract: boolean,
    isInterface: boolean,
    isGenerated: boolean
  ): EClass {
    this.initEClassifier(c, instanceClassName, isGenerated);
    c.setAbstract(isAbstract);
    c.setInterface(isInterface);
    return c;
  }

  protected initEEnum(e: EEnum, instanceClassName: string): EEnum {
    this.initEClassifier(e, instanceClassName, true);
    return e;
  }

  protected initEDataType(e: EDataType, instanceClassName: string): EDataType {
    this.initEClassifier(e, instanceClassName, true);
    return e;
  }

  private initEClassifier(
    o: EClassifier,
    instanceClassName: string,
    isGenerated: boolean
  ) {
    o.setName(instanceClassName);
    // if (instanceClassName != null) {
    //   o.setInstanceClass(instanceClassName);
    // }
    if (isGenerated) {
      //TODO: Should we add this generated class name stuff to EClassifier?
      // setGeneratedClassName(o);
    }
  }

  protected initEReference(
    r: EReference,
    type: EClassifier,
    otherEnd: EReference | undefined,
    name: string,
    defaultValue: string,
    lowerBound: number,
    upperBound: number,
    containerClass: string,
    isTransient: boolean,
    isVolatile: boolean,
    isChangeable: boolean,
    isContainment: boolean,
    isResolveProxies: boolean,
    isUnsettable: boolean,
    isUnique: boolean,
    isDerived: boolean,
    isOrdered: boolean
  ): EReference {
    this.initEStructuralFeature(
      r,
      type,
      name,
      defaultValue,
      lowerBound,
      upperBound,
      containerClass,
      isTransient,
      isVolatile,
      isChangeable,
      isUnsettable,
      isUnique,
      isDerived,
      isOrdered
    );
    r.setContainment(isContainment);
    if (otherEnd != null) {
      r.setEOpposite(otherEnd);
    }
    // r.setResolveProxies(isResolveProxies);
    return r;
  }

  protected initEAttribute(
    a: EAttribute,
    type: EClassifier,
    name: string,
    defaultValue: string,
    lowerBound: number,
    upperBound: number,
    containerClass: string,
    isTransient: boolean,
    isVolatile: boolean,
    isChangeable: boolean,
    isUnsettable: boolean,
    isID: boolean,
    isUnique: boolean,
    isDerived: boolean,
    isOrdered: boolean
  ): EAttribute {
    this.initEStructuralFeature(
      a,
      type,
      name,
      defaultValue,
      lowerBound,
      upperBound,
      containerClass,
      isTransient,
      isVolatile,
      isChangeable,
      isUnsettable,
      isUnique,
      isDerived,
      isOrdered
    );
    a.setId(isID);
    return a;
  }

  private initEStructuralFeature(
    s: EStructuralFeature,
    type: EClassifier,
    name: string,
    defaultValue: string,
    lowerBound: number,
    upperBound: number,
    containerClass: string,
    isTransient: boolean,
    isVolatile: boolean,
    isChangeable: boolean,
    isUnsettable: boolean,
    isUnique: boolean,
    isDerived: boolean,
    isOrdered: boolean
  ): void {
    s.setName(name);
    // s.setContainerClass(containerClass);
    s.setTransient(isTransient);
    s.setVolatile(isVolatile);
    s.setChangeable(isChangeable);
    // s.setUnsettable(isUnsettable);
    s.setUnique(isUnique);
    // s.setDerived(isDerived);
    // s.setOrdered(isOrdered);
    s.setLowerBound(lowerBound);
    s.setUpperBound(upperBound);
    s.setEType(type);
    if (defaultValue != null) {
      s.setDefaultValueLiteral(defaultValue);
    }
  }

  protected initEOperation(
    eOperation: EOperation,
    type: EClassifier | undefined,
    name: string,
    lowerBound?: number,
    upperBound?: number,
    isUnique?: boolean,
    isOrdered?: boolean
  ): EOperation {
    if (type) eOperation.setEType(type);
    eOperation.setName(name);
    if (lowerBound) eOperation.setLowerBound(lowerBound);
    if (upperBound) eOperation.setUpperBound(upperBound);
    eOperation.setUnique(isUnique ?? false);
    // eOperation.setOrdered(isOrdered ?? false);
    return eOperation;
  }

  protected createEOperation(owner: EClass, id: number): void {
    const o = new EOperationImpl();
    o.setOperationID(id);
    o.setEContainingClass(owner);
    owner.getEOperations().add(o);
  }

  protected createEParameter(
    owner: EOperation,
    name: string,
    upperBound: number,
    type?: EClassifier
  ) : void {
    const param = new EParameterImpl();
    param.setName(name);
    if (type) param.setEType(type);
    param.setUpperBound(upperBound);

    //TODO: Would not have to do both if model was source generated
    owner.getEParameters().add(param);
  }

  protected createEAttribute(owner: EClass, id: number): void {
    const a = <EAttribute>new EAttributeImpl();
    a.setFeatureID(id);
    owner.getEStructuralFeatures().add(a);
    a.setEContainingClass(owner);
  }

  protected createEReference(owner: EClass, id: number): void {
    const r = <EReference>new EReferenceImpl();
    r.setFeatureID(id);
    owner.getEStructuralFeatures().add(r);
    r.setEContainingClass(owner);
  }

  public getRootPackage(): EPackage {
    if (!this.getESuperPackage()) return this;
    let cursor = this.getESuperPackage();
    while (cursor.getESuperPackage() != null)
      cursor = cursor.getESuperPackage();
    return cursor;
  }
}
