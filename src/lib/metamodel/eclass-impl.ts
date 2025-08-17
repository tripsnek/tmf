import { EPackage } from './epackage';
import { EOperation } from './eoperation';
import { EAttribute } from './eattribute';
import { EReference } from './ereference';
import { EStructuralFeature } from './estructural-feature';
import { BasicEList } from './basicelist';
import { EList } from './elist';
import { EObject } from './eobject';
import { EAttributeImpl } from './eattribute-impl';
import { EClassifierImpl } from './eclassifier-impl';
import { EClass } from './eclass';
import { EReferenceImpl } from './ereference-impl';

export class EClassImpl extends EClassifierImpl implements EClass {
  private classIsAbstract = false;
  private classIsInterface = false;

  private eSuperTypes: EList<EClass> = new BasicEList();
  private eStructuralFeatures: EList<EStructuralFeature> = new BasicEList();
  private eOperations: EList<EOperation> = new BasicEList();

  // pr-computed and cached lists
  private eReferences: EList<EReference>;
  private eAllSuperTypes: EList<EClass>;
  private eAllStructuralFeatures: EList<EStructuralFeature>;
  private eAttributes: EList<EAttribute>;
  private eAllAttributes: EList<EAttribute>;
  private eAllReferences: EList<EReference>;
  private eAllContainments: EList<EReference>;
  private eAllOperations: EList<EOperation>;

  public constructor(
    eClass?: EClass,
    owner?: EPackage,
    name?: string,
    abstract?: boolean,
    isInterface?: boolean
  ) {
    super(eClass, owner, name);
    if (abstract) this.classIsAbstract = abstract;
    if (isInterface) this.classIsInterface = isInterface;
  }

  public isAbstract(): boolean {
    return this.classIsAbstract;
  }

  public isInterface(): boolean {
    return this.classIsInterface;
  }

  public setAbstract(value: boolean): void {
    this.classIsAbstract = value;
  }

  public setInterface(value: boolean): void {
    this.classIsInterface = value;
  }

  public getEAttributes(): EList<EAttribute> {
    if (this.eAttributes === undefined) {
      this.computeEAllAttributes();
    }
    return this.eAttributes;
  }

  public getEAllAttributes(): EList<EAttribute> {
    if (this.eAllAttributes === undefined) {
      this.computeEAllAttributes();
    }
    return this.eAllAttributes;
  }

  private computeEAllAttributes(): void {
    this.eAllAttributes = new BasicEList<EAttribute>();
    this.eAttributes = new BasicEList<EAttribute>();
    // Add features from this type
    for (const feature of this.getEStructuralFeatures()) {
      if (feature instanceof EAttributeImpl) {
        this.eAllAttributes.add(feature);
        this.eAttributes.add(feature);
      }
    }
    // Add features from all super types
    for (const superType of this.getEAllSuperTypes()) {
      for (const stFeature of superType.getEAttributes()) {
        this.eAllAttributes.add(stFeature);
      }
    }
  }

  public getEIDAttribute(): EAttribute {
    return this.getEAllAttributes().find((e) => e.isId());
  }

  public createInstance(): EObject {
    return this.getEPackage().getEFactoryInstance().create(this);
  }

  public isSuperTypeOf(someClass: EClassImpl): boolean {
    if (someClass === this) {
      return true;
    } else if (someClass === null) {
      return false;
    } else {
      return someClass.getESuperTypes().some((e) => this.isSuperTypeOf(e));
    }
  }

  public getESuperTypes(): EList<EClass> {
    return this.eSuperTypes;
  }

  public getEAllSuperTypes(): EList<EClass> {
    if (this.eAllSuperTypes === undefined) {
      this.calcEAllSuperTypes();
    }
    return this.eAllSuperTypes;
  }

  private calcEAllSuperTypes(): void {
    this.eAllSuperTypes = new BasicEList<EClass>();
    for (const st of this.eSuperTypes) {
      for (const rst of st.getEAllSuperTypes()) {
        this.eAllSuperTypes.add(rst);
      }
      this.eAllSuperTypes.add(st);
    }
  }

  public getEStructuralFeatures(): EList<EStructuralFeature> {
    return this.eStructuralFeatures;
  }

  public getEAllStructuralFeatures(): EList<EStructuralFeature> {
    if (this.eAllStructuralFeatures === undefined) {
      this.computeAllStructuralFeatures();
    }
    return this.eAllStructuralFeatures;
  }

  private computeAllStructuralFeatures(): void {
    this.eAllStructuralFeatures = new BasicEList<EStructuralFeature>();
    // Add features from this type
    for (const feature of this.eStructuralFeatures) {
      this.eAllStructuralFeatures.add(feature);
    }
    // Add features from all super types
    for (const superType of this.getESuperTypes()) {
      for (const stFeature of superType.getEAllStructuralFeatures()) {
        this.eAllStructuralFeatures.add(stFeature);
      }
    }
  }

  /**
   * Returns the feature identified by either it's feature ID (a number) or
   * name (a string).
   * @param featureIdOrName
   */
  public getEStructuralFeature(
    featureIdOrName: number | string
  ): EStructuralFeature {
    if (typeof featureIdOrName === 'number')
      return this.getEAllStructuralFeatures().find(
        (e) => e.getFeatureID() === featureIdOrName
      );
    else
      return this.getEAllStructuralFeatures().find(
        (e) => e.getName() === featureIdOrName
      );
  }

  public getFeatureCount(): number {
    return this.getEAllStructuralFeatures().size();
  }

  public getFeatureID(feature: EStructuralFeature): number {
    const features = this.getEStructuralFeatures();
    if (feature.getFeatureID() >= 0) return feature.getFeatureID();
    for (let i = 0; i < features.size(); i++) {
      if (features.get(i) === feature) {
        return i;
      }
    }
    return -1;
  }

  //======================================================================
  // References

  public getEReferences(): EList<EReference> {
    if (this.eReferences === undefined) {
      this.computeEAllReferences();
    }
    return this.eReferences;
  }

  public getEAllReferences(): EList<EReference> {
    if (this.eAllReferences === undefined) {
      this.computeEAllReferences();
    }
    return this.eAllReferences;
  }

  private computeEAllReferences(): void {
    this.eAllReferences = new BasicEList<EReference>();
    this.eReferences = new BasicEList<EReference>();
    // Add features from this type
    for (const feature of this.eStructuralFeatures) {
      if (feature instanceof EReferenceImpl) {
        this.eAllReferences.add(feature);
        this.eReferences.add(feature);
      }
    }
    // Add features from all super types
    for (const superType of this.getEAllSuperTypes()) {
      for (const stFeature of superType.getEReferences()) {
        this.eAllReferences.add(stFeature);
      }
    }
  }

  public getEAllContainments(): EList<EReference> {
    if (this.eAllContainments === undefined) {
      this.computeEAllContainments();
    }
    return this.eAllContainments;
  }

  private computeEAllContainments(): void {
    this.eAllContainments = new BasicEList<EReference>();
    for (const f of this.getEAllReferences()) {
      if (f.isContainment()) {
        this.eAllContainments.add(f);
      }
    }
  }

  //======================================================================
  // Operations

  public getEOperations(): EList<EOperation> {
    return this.eOperations;
  }

  public getEAllOperations(): EList<EOperation> {
    if (this.eAllOperations === undefined) {
      this.computeEAllOperations();
    }
    return this.eAllOperations;
  }

  private computeEAllOperations(): void {
    this.eAllOperations = new BasicEList<EOperation>();
    for (const superType of this.getEAllSuperTypes()) {
      for (const eOperation of superType.getEOperations()) {
        this.eAllOperations.add(eOperation);
      }
    }
  }

  //hacky method for when a metamodel is being manipulated at runtime (e.g. in Ecore Editor)
  public recomputeAllLists(){
    this.computeAllStructuralFeatures();
    this.computeEAllAttributes();
    this.computeEAllReferences();
    this.computeEAllContainments();
    this.computeEAllOperations();
  }
}
