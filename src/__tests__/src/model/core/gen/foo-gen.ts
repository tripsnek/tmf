import { EObject } from '@tripsnek/tmf';
import { TUtils } from '@tripsnek/tmf';
import { EStructuralFeature } from '@tripsnek/tmf';
import { BasicEList } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EList } from '@tripsnek/tmf';
import { EEnum } from '@tripsnek/tmf';
import { EDataType } from '@tripsnek/tmf';
import { EObjectImpl } from '@tripsnek/tmf';
import { NamedEntity } from '../api/named-entity';
import { FooGroup } from '../api/foo-group';
import { FooClass } from '../api/foo-class';
import { BoundedNumber } from '../api/bounded-number';
import { Bar } from '../api/bar';
import { Bazzle } from '../api/bazzle';
import { ClassInCapitalizedPackage } from '../../core/CapitalizedPackage/api/class-in-capitalized-package';
import { User } from '../api/user';

import { CorePackage } from '../core-package';
import { Foo } from '../api/foo';
import { NamedEntityGen } from './named-entity-gen';
import { NamedEntityImpl } from '../impl/named-entity-impl';
import { FooGroupGen } from './foo-group-gen';
import { FooGroupImpl } from '../impl/foo-group-impl';
import { FooClassGen } from './foo-class-gen';
import { FooClassImpl } from '../impl/foo-class-impl';
import { BoundedNumberGen } from './bounded-number-gen';
import { BoundedNumberImpl } from '../impl/bounded-number-impl';
import { BarGen } from './bar-gen';
import { BarImpl } from '../impl/bar-impl';
import { BazzleGen } from './bazzle-gen';
import { BazzleImpl } from '../impl/bazzle-impl';
import { ClassInCapitalizedPackageGen } from '../../core/CapitalizedPackage//gen/class-in-capitalized-package-gen';
import { ClassInCapitalizedPackageImpl } from '../../core/CapitalizedPackage//impl/class-in-capitalized-package-impl';
import { UserGen } from './user-gen';
import { UserImpl } from '../impl/user-impl';
import { CapitalizedPackagePackage } from '../../core/CapitalizedPackage/capitalized-package-package';
/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for Foo.
 */
export abstract class FooGen extends NamedEntityImpl implements Foo {
  /** feature declarations */
  protected group!: FooGroup;
  protected creationDate!: Date;
  protected fooClass!: FooClass;
  protected range!: BoundedNumber;
  protected bars: EList<Bar> = new BasicEList<Bar>(
    undefined,
    this,
    CorePackage.FOO__BARS,
    CorePackage.BAR__FOO
  );
  protected oneToOneBazzle!: Bazzle;
  protected manyAttribute: EList<string> = new BasicEList<string>(
    undefined,
    this,
    CorePackage.FOO__MANY_ATTRIBUTE,
    undefined
  );
  protected unchangeableAttribute!: string;
  protected unchangeableReference!: Bazzle;
  protected transientAttribute!: string;
  protected transientReference!: Foo;
  protected volatileAttribute!: string;
  protected volatileReference!: Foo;
  protected manyCrossAggregate: EList<Foo> = new BasicEList<Foo>(
    undefined,
    this,
    CorePackage.FOO__MANY_CROSS_AGGREGATE,
    undefined
  );
  protected manyCrossAggregateNested: EList<Bar> = new BasicEList<Bar>(
    undefined,
    this,
    CorePackage.FOO__MANY_CROSS_AGGREGATE_NESTED,
    undefined
  );
  protected manyValueObjects: EList<BoundedNumber> =
    new BasicEList<BoundedNumber>(
      undefined,
      this,
      CorePackage.FOO__MANY_VALUE_OBJECTS,
      undefined
    );
  protected oneToOneContainment!: Bazzle;
  protected ownedFoos: EList<Foo> = new BasicEList<Foo>(
    undefined,
    this,
    CorePackage.FOO__OWNED_FOOS,
    undefined
  );
  protected subpackageReference!: ClassInCapitalizedPackage;

  //======================================================================
  // Getters and Setters

  public getGroup(): FooGroup {
    return this.group;
  }

  public setGroup(newGroup: FooGroup): void {
    this.basicSetGroup(newGroup);
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public setCreationDate(newCreationDate: Date): void {
    this.basicSetCreationDate(newCreationDate);
  }

  public getFooClass(): FooClass {
    return this.fooClass;
  }

  public setFooClass(newFooClass: FooClass): void {
    this.basicSetFooClass(newFooClass);
  }

  public getRange(): BoundedNumber {
    return this.range;
  }

  public setRange(newRange: BoundedNumber): void {
    const oldRange = this.range;
    if (oldRange) oldRange.setEContainer(undefined, undefined);
    if (newRange) newRange.setEContainer(this, CorePackage.FOO__RANGE);
    this.basicSetRange(newRange);
  }

  public getBars(): EList<Bar> {
    return this.bars;
  }

  public getOneToOneBazzle(): Bazzle {
    return this.oneToOneBazzle;
  }

  public setOneToOneBazzle(newOneToOneBazzle: Bazzle): void {
    if (this.oneToOneBazzle !== newOneToOneBazzle) {
      if (this.oneToOneBazzle) {
        this.oneToOneBazzle.eInverseRemove(
          this,
          CorePackage.BAZZLE__ONE_TO_ONE_FOO
        );
      }
      if (newOneToOneBazzle) {
        newOneToOneBazzle.eInverseAdd(this, CorePackage.BAZZLE__ONE_TO_ONE_FOO);
      }
    }
    this.basicSetOneToOneBazzle(newOneToOneBazzle);
  }

  public getManyAttribute(): EList<string> {
    return this.manyAttribute;
  }

  public getUnchangeableAttribute(): string {
    return this.unchangeableAttribute;
  }

  private setUnchangeableAttribute(newUnchangeableAttribute: string): void {
    this.basicSetUnchangeableAttribute(newUnchangeableAttribute);
  }

  public getUnchangeableReference(): Bazzle {
    return this.unchangeableReference;
  }

  private setUnchangeableReference(newUnchangeableReference: Bazzle): void {
    const oldUnchangeableReference = this.unchangeableReference;
    if (oldUnchangeableReference)
      oldUnchangeableReference.setEContainer(undefined, undefined);
    if (newUnchangeableReference)
      newUnchangeableReference.setEContainer(
        this,
        CorePackage.FOO__UNCHANGEABLE_REFERENCE
      );
    this.basicSetUnchangeableReference(newUnchangeableReference);
  }

  public getTransientAttribute(): string {
    return this.transientAttribute;
  }

  public setTransientAttribute(newTransientAttribute: string): void {
    this.basicSetTransientAttribute(newTransientAttribute);
  }

  public getTransientReference(): Foo {
    return this.transientReference;
  }

  public setTransientReference(newTransientReference: Foo): void {
    this.basicSetTransientReference(newTransientReference);
  }

  public getVolatileAttribute(): string {
    throw new Error(
      'Unsupported operation on volatile field. Override in FooImpl.'
    );
  }

  public setVolatileAttribute(newVolatileAttribute: string): void {
    throw new Error(
      'Unsupported operation on volatile field. Override in FooImpl.'
    );
  }

  public getVolatileReference(): Foo {
    throw new Error(
      'Unsupported operation on volatile field. Override in FooImpl.'
    );
  }

  public setVolatileReference(newVolatileReference: Foo): void {
    throw new Error(
      'Unsupported operation on volatile field. Override in FooImpl.'
    );
  }

  public getManyCrossAggregate(): EList<Foo> {
    return this.manyCrossAggregate;
  }

  public getManyCrossAggregateNested(): EList<Bar> {
    return this.manyCrossAggregateNested;
  }

  public getManyValueObjects(): EList<BoundedNumber> {
    return this.manyValueObjects;
  }

  public getOneToOneContainment(): Bazzle {
    return this.oneToOneContainment;
  }

  public setOneToOneContainment(newOneToOneContainment: Bazzle): void {
    const oldOneToOneContainment = this.oneToOneContainment;
    if (oldOneToOneContainment)
      oldOneToOneContainment.setEContainer(undefined, undefined);
    if (newOneToOneContainment)
      newOneToOneContainment.setEContainer(
        this,
        CorePackage.FOO__ONE_TO_ONE_CONTAINMENT
      );
    this.basicSetOneToOneContainment(newOneToOneContainment);
  }

  public getOwnedFoos(): EList<Foo> {
    return this.ownedFoos;
  }

  public getSubpackageReference(): ClassInCapitalizedPackage {
    return this.subpackageReference;
  }

  public setSubpackageReference(
    newSubpackageReference: ClassInCapitalizedPackage
  ): void {
    this.basicSetSubpackageReference(newSubpackageReference);
  }

  //======================================================================
  // API Operations

  public copyFoo(): Foo {
    throw new Error('Not implemented');
  }
  //======================================================================
  // Standard EObject behavior

  /**
   * eGet() - provides reflective access to all features.
   */
  public override eGet(feature: number | EStructuralFeature): any {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.FOO__GROUP:
        return this.getGroup();
      case CorePackage.FOO__CREATION_DATE:
        return this.getCreationDate();
      case CorePackage.FOO__FOO_CLASS:
        return this.getFooClass();
      case CorePackage.FOO__RANGE:
        return this.getRange();
      case CorePackage.FOO__BARS:
        return this.getBars();
      case CorePackage.FOO__ONE_TO_ONE_BAZZLE:
        return this.getOneToOneBazzle();
      case CorePackage.FOO__MANY_ATTRIBUTE:
        return this.getManyAttribute();
      case CorePackage.FOO__UNCHANGEABLE_ATTRIBUTE:
        return this.getUnchangeableAttribute();
      case CorePackage.FOO__UNCHANGEABLE_REFERENCE:
        return this.getUnchangeableReference();
      case CorePackage.FOO__TRANSIENT_ATTRIBUTE:
        return this.getTransientAttribute();
      case CorePackage.FOO__TRANSIENT_REFERENCE:
        return this.getTransientReference();
      case CorePackage.FOO__VOLATILE_ATTRIBUTE:
        return this.getVolatileAttribute();
      case CorePackage.FOO__VOLATILE_REFERENCE:
        return this.getVolatileReference();
      case CorePackage.FOO__MANY_CROSS_AGGREGATE:
        return this.getManyCrossAggregate();
      case CorePackage.FOO__MANY_CROSS_AGGREGATE_NESTED:
        return this.getManyCrossAggregateNested();
      case CorePackage.FOO__MANY_VALUE_OBJECTS:
        return this.getManyValueObjects();
      case CorePackage.FOO__ONE_TO_ONE_CONTAINMENT:
        return this.getOneToOneContainment();
      case CorePackage.FOO__OWNED_FOOS:
        return this.getOwnedFoos();
      case CorePackage.FOO__SUBPACKAGE_REFERENCE:
        return this.getSubpackageReference();
    }
    return super.eGet(featureID);
  }

  /**
   * eSet() - provides ability to reflectively set all features.
   */
  public override eSet(
    feature: number | EStructuralFeature,
    newValue: any
  ): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.FOO__GROUP:
        this.setGroup(newValue);
        return;
      case CorePackage.FOO__CREATION_DATE:
        this.setCreationDate(newValue);
        return;
      case CorePackage.FOO__FOO_CLASS:
        this.setFooClass(newValue);
        return;
      case CorePackage.FOO__RANGE:
        this.setRange(newValue);
        return;
      case CorePackage.FOO__BARS:
        this.getBars().clear();
        this.getBars().addAll(newValue);
        return;
      case CorePackage.FOO__ONE_TO_ONE_BAZZLE:
        this.setOneToOneBazzle(newValue);
        return;
      case CorePackage.FOO__MANY_ATTRIBUTE:
        this.getManyAttribute().clear();
        this.getManyAttribute().addAll(newValue);
        return;
      case CorePackage.FOO__UNCHANGEABLE_ATTRIBUTE:
        this.setUnchangeableAttribute(newValue);
        return;
      case CorePackage.FOO__UNCHANGEABLE_REFERENCE:
        this.setUnchangeableReference(newValue);
        return;
      case CorePackage.FOO__TRANSIENT_ATTRIBUTE:
        this.setTransientAttribute(newValue);
        return;
      case CorePackage.FOO__TRANSIENT_REFERENCE:
        this.setTransientReference(newValue);
        return;
      case CorePackage.FOO__VOLATILE_ATTRIBUTE:
        this.setVolatileAttribute(newValue);
        return;
      case CorePackage.FOO__VOLATILE_REFERENCE:
        this.setVolatileReference(newValue);
        return;
      case CorePackage.FOO__MANY_CROSS_AGGREGATE:
        this.getManyCrossAggregate().clear();
        this.getManyCrossAggregate().addAll(newValue);
        return;
      case CorePackage.FOO__MANY_CROSS_AGGREGATE_NESTED:
        this.getManyCrossAggregateNested().clear();
        this.getManyCrossAggregateNested().addAll(newValue);
        return;
      case CorePackage.FOO__MANY_VALUE_OBJECTS:
        this.getManyValueObjects().clear();
        this.getManyValueObjects().addAll(newValue);
        return;
      case CorePackage.FOO__ONE_TO_ONE_CONTAINMENT:
        this.setOneToOneContainment(newValue);
        return;
      case CorePackage.FOO__OWNED_FOOS:
        this.getOwnedFoos().clear();
        this.getOwnedFoos().addAll(newValue);
        return;
      case CorePackage.FOO__SUBPACKAGE_REFERENCE:
        this.setSubpackageReference(newValue);
        return;
    }
    return super.eSet(featureID, newValue);
  }

  /**
   * eIsSet() - provides ability to reflectively check if any feature is set.
   */
  public override eIsSet(feature: number | EStructuralFeature): boolean {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.FOO__GROUP:
        return this.getGroup() != null;
      case CorePackage.FOO__CREATION_DATE:
        return this.getCreationDate() != null;
      case CorePackage.FOO__FOO_CLASS:
        return this.getFooClass() != null;
      case CorePackage.FOO__RANGE:
        return this.getRange() != null;
      case CorePackage.FOO__BARS:
        return !this.getBars().isEmpty();
      case CorePackage.FOO__ONE_TO_ONE_BAZZLE:
        return this.getOneToOneBazzle() != null;
      case CorePackage.FOO__MANY_ATTRIBUTE:
        return !this.getManyAttribute().isEmpty();
      case CorePackage.FOO__UNCHANGEABLE_ATTRIBUTE:
        return this.getUnchangeableAttribute() != null;
      case CorePackage.FOO__UNCHANGEABLE_REFERENCE:
        return this.getUnchangeableReference() != null;
      case CorePackage.FOO__TRANSIENT_ATTRIBUTE:
        return this.getTransientAttribute() != null;
      case CorePackage.FOO__TRANSIENT_REFERENCE:
        return this.getTransientReference() != null;
      case CorePackage.FOO__VOLATILE_ATTRIBUTE:
        return this.getVolatileAttribute() != null;
      case CorePackage.FOO__VOLATILE_REFERENCE:
        return this.getVolatileReference() != null;
      case CorePackage.FOO__MANY_CROSS_AGGREGATE:
        return !this.getManyCrossAggregate().isEmpty();
      case CorePackage.FOO__MANY_CROSS_AGGREGATE_NESTED:
        return !this.getManyCrossAggregateNested().isEmpty();
      case CorePackage.FOO__MANY_VALUE_OBJECTS:
        return !this.getManyValueObjects().isEmpty();
      case CorePackage.FOO__ONE_TO_ONE_CONTAINMENT:
        return this.getOneToOneContainment() != null;
      case CorePackage.FOO__OWNED_FOOS:
        return !this.getOwnedFoos().isEmpty();
      case CorePackage.FOO__SUBPACKAGE_REFERENCE:
        return this.getSubpackageReference() != null;
    }
    return super.eIsSet(featureID);
  }

  /**
   * eUnset() - provides ability to reflectively unset any feature.
   */
  public override eUnset(feature: number | EStructuralFeature): void {
    const featureID: number =
      typeof feature === 'number'
        ? feature
        : (<EStructuralFeature>feature).getFeatureID();
    switch (featureID) {
      case CorePackage.FOO__GROUP:
        this.setGroup(undefined!);
        return;
      case CorePackage.FOO__CREATION_DATE:
        this.setCreationDate(undefined!);
        return;
      case CorePackage.FOO__FOO_CLASS:
        this.setFooClass(undefined!);
        return;
      case CorePackage.FOO__RANGE:
        this.setRange(undefined!);
        return;
      case CorePackage.FOO__BARS:
        this.getBars().clear();
        return;
      case CorePackage.FOO__ONE_TO_ONE_BAZZLE:
        this.setOneToOneBazzle(undefined!);
        return;
      case CorePackage.FOO__MANY_ATTRIBUTE:
        this.getManyAttribute().clear();
        return;
      case CorePackage.FOO__UNCHANGEABLE_ATTRIBUTE:
        this.setUnchangeableAttribute(undefined!);
        return;
      case CorePackage.FOO__UNCHANGEABLE_REFERENCE:
        this.setUnchangeableReference(undefined!);
        return;
      case CorePackage.FOO__TRANSIENT_ATTRIBUTE:
        this.setTransientAttribute(undefined!);
        return;
      case CorePackage.FOO__TRANSIENT_REFERENCE:
        this.setTransientReference(undefined!);
        return;
      case CorePackage.FOO__VOLATILE_ATTRIBUTE:
        this.setVolatileAttribute(undefined!);
        return;
      case CorePackage.FOO__VOLATILE_REFERENCE:
        this.setVolatileReference(undefined!);
        return;
      case CorePackage.FOO__MANY_CROSS_AGGREGATE:
        this.getManyCrossAggregate().clear();
        return;
      case CorePackage.FOO__MANY_CROSS_AGGREGATE_NESTED:
        this.getManyCrossAggregateNested().clear();
        return;
      case CorePackage.FOO__MANY_VALUE_OBJECTS:
        this.getManyValueObjects().clear();
        return;
      case CorePackage.FOO__ONE_TO_ONE_CONTAINMENT:
        this.setOneToOneContainment(undefined!);
        return;
      case CorePackage.FOO__OWNED_FOOS:
        this.getOwnedFoos().clear();
        return;
      case CorePackage.FOO__SUBPACKAGE_REFERENCE:
        this.setSubpackageReference(undefined!);
        return;
    }
    return super.eUnset(featureID);
  }

  //======================================================================
  // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

  public basicSetGroup(newGroup: FooGroup): void {
    this.group = newGroup;
  }

  public basicSetCreationDate(newCreationDate: Date): void {
    this.creationDate = newCreationDate;
  }

  public basicSetFooClass(newFooClass: FooClass): void {
    this.fooClass = newFooClass;
  }

  public basicSetRange(newRange: BoundedNumber): void {
    this.range = newRange;
  }

  public basicSetOneToOneBazzle(newOneToOneBazzle: Bazzle): void {
    this.oneToOneBazzle = newOneToOneBazzle;
  }

  private basicSetUnchangeableAttribute(
    newUnchangeableAttribute: string
  ): void {
    this.unchangeableAttribute = newUnchangeableAttribute;
  }

  private basicSetUnchangeableReference(
    newUnchangeableReference: Bazzle
  ): void {
    this.unchangeableReference = newUnchangeableReference;
  }

  public basicSetTransientAttribute(newTransientAttribute: string): void {
    this.transientAttribute = newTransientAttribute;
  }

  public basicSetTransientReference(newTransientReference: Foo): void {
    this.transientReference = newTransientReference;
  }

  public basicSetOneToOneContainment(newOneToOneContainment: Bazzle): void {
    this.oneToOneContainment = newOneToOneContainment;
  }

  public basicSetSubpackageReference(
    newSubpackageReference: ClassInCapitalizedPackage
  ): void {
    this.subpackageReference = newSubpackageReference;
  }

  //======================================================================
  // Inverse Adders (if needed)
  public override eInverseAdd(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case CorePackage.FOO__BARS:
        return (<EList<EObject>>this.getBars()).basicAdd(otherEnd);
      case CorePackage.FOO__ONE_TO_ONE_BAZZLE:
        if (this.oneToOneBazzle)
          this.oneToOneBazzle.eInverseRemove(
            this,
            CorePackage.BAZZLE__ONE_TO_ONE_FOO
          );
        return this.basicSetOneToOneBazzle(<Bazzle>otherEnd);
    }
    return super.eInverseAdd(otherEnd, featureID);
  }

  //======================================================================
  // Inverse Removers (if needed)
  public override eInverseRemove(otherEnd: EObject, featureID: number): void {
    switch (featureID) {
      case CorePackage.FOO__BARS:
        return (<EList<EObject>>this.getBars()).basicRemove(otherEnd);
      case CorePackage.FOO__ONE_TO_ONE_BAZZLE:
        return this.basicSetOneToOneBazzle(undefined!);
    }
    return super.eInverseRemove(otherEnd, featureID);
  }

  //======================================================================
  // eClass()

  public override eClass(): EClass {
    return CorePackage.Literals.FOO;
  }
}
