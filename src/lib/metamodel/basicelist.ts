import { EList } from './elist';
import { EObject } from './eobject';

/**
 * Default implementation for all TMF Lists, and hence all
 * multi-valued fields.
 *
 * This implementation wraps around a simple Javascript Array.
 */
export class BasicEList<T> implements EList<T> {
  //set when the list belongs to an EObject
  private owner: EObject = null;
  private eFeatureId: number = null;

  //set when a feature on objects in the list points back to the list owningEObject
  private inverseEFeatureID: number = null;

  //the underlying array containing all List elements
  private _elements: T[] = [];

  constructor(
    elems?: T[],
    owner?: EObject,
    featID?: number,
    inverseFeatID?: number
  ) {
    this.owner = owner;
    this.eFeatureId = featID;
    this.inverseEFeatureID = inverseFeatID;
    if (elems) this._elements = [...elems];
  }

  public add(item: T, index?: number): void {
    //if there is an inverse reference (container or eopposite), the list must be unique
    if (!this.hasInverseFeature() || !this.contains(item)) {
      this.basicAdd(item, index);
      if (this.hasInverseFeature()) {
        this.inverseAdd(<EObject>(<unknown>item));
      }
    }
  }

  //should only be used for new objects with no existing container (optimization)
  //doesn't seem to actually do anything useful
  public fastContainmentAddHack(item: T): void {
    this._elements.push(item);
    item['_eContainer'] = this.owner;
    item['_eContainingFeature'] = this.eFeatureId;
  }

  public basicAdd(item: T, index?: number): void {
    if (!index && index !== 0) this._elements.push(item);
    else this._elements.splice(index, 0, item);
  }

  private inverseAdd(item: EObject): void {
    //handle containment inverse references (TODO: Should this be handled by the item's eInverseAdd?)
    if (this.isContainment()) {
      item.setEContainer(this.owner, this.eFeatureId);
    }
    //handle inverse references (which may also be explicit references to the container)
    if (this.inverseEFeatureID) {
      //Remove from existing EOpposite, if it is single-valued (many-many eopposites do not need to be removed)
      const inverseFeature = item
        .eClass()
        .getEStructuralFeature(this.inverseEFeatureID);
      if (!inverseFeature.isMany()) {
        const curOpposite = item.eGet(inverseFeature);
        if (curOpposite) {
          curOpposite.eInverseRemove(item, this.eFeatureId);
        }
      }
      item.eInverseAdd(this.owner, this.inverseEFeatureID);
    }
  }

  public remove(item?: T) {
    //remove item from the array
    const removed = this.basicRemove(item);
    //only proceed with inverse removal if removal was successful
    if (removed && this.hasInverseFeature()) {
      this.inverseRemove(<EObject>(<unknown>item));
    }
  }

  public basicRemove(item: T) {
    let removed = false;
    this._elements.forEach((arrItem, index) => {
      if (item === arrItem) {
        this._elements.splice(index, 1);
        removed = true;
      }
    });
    return removed;
  }

  private inverseRemove(item: EObject): void {
    //only directly set container to null if there is no inverse feature
    if (this.isContainment() && !this.inverseEFeatureID) {
      item.setEContainer(null, null);
    }
    //otherwise, do an inverse remove on the field (whether it is a container or not)
    else {
      item.eInverseRemove(this.owner, this.inverseEFeatureID);
    }
  }

  public containsAll(c: EList<any>): boolean {
    throw new Error('Method not implemented.');
  }

  public addAll(list: Iterable<T>) {
    for (const item of list) {
      this.add(item);
    }
  }

  public equals(o: Object): boolean {
    throw new Error('Method not implemented.');
  }

  public size(): number {
    return this._elements.length;
  }
  public isEmpty(): boolean {
    return this._elements.length === 0;
  }
  public contains(o: T): boolean {
    for (const obj of this._elements) {
      if (o === obj) return true;
    }
    return false;
  }

  public get(index: number): T {
    return this._elements[index];
  }

  public set(index: number, element: T): T {
    if (!this.hasInverseFeature() && !this.isContainment()) {
      this._elements[index] = element;
      return element;
    }
    //TODO: This method MUST handle inverse references
    else {
      throw new Error(
        'BasicEList.set(index,element) not implemented for EReferences with containment or inverses.'
      );
    }
  }

  /**
   * Indicate whether this list represents a containment relationship
   * between the list owningEObject and the list contents.
   */
  private isContainment(): boolean {
    if (!this.eFeatureId || !this.owner) return false;
    else {
      const feature = this.owner
        .eClass()
        .getEStructuralFeature(this.eFeatureId);
      if (!feature) {
        return false;
      }
      //return feature instanceof EReferenceImpl && feature.isContainment();
      return feature.isContainment();
    }
  }

  public indexOf(o: T): number {
    let idx = 0;
    for (const element of this._elements) {
      if (element === o) return idx;
      idx++;
    }
    return -1;
  }

  public lastIndexOf(o: Object): number {
    throw new Error('Method not implemented.');
  }

  public removeAll(list: Iterable<T>): boolean {
    const startSize = this.size();
    for (const item of list) {
      this.remove(item);
    }
    return startSize !== this.size();
  }

  public clear() {
    this.removeAll(Object.assign([], this._elements));
  }

  //implementation of Iterable interface - simply returns the iterator for the wrapped array
  [Symbol.iterator](): Iterator<T> {
    return this._elements[Symbol.iterator]();
  }

  /**
   * Indicates whether objects in the list have a feature which refers
   * back to this list's owningEObject.
   */
  private hasInverseFeature(): boolean {
    if (this.inverseEFeatureID || this.isContainment()) return true;
    return false;
  }

  //======================================================================
  // TMF-specific methods (to work better with TypeScript)

  /**
   * Swaps the elements at the given positions, if they exist.
   * @param idx1
   * @param idx2
   */
  public swap(idx1: number, idx2: number) {
    if (this._elements.length > idx1 && this._elements.length > idx2) {
      const temp = this._elements[idx1];
      this._elements[idx1] = this._elements[idx2];
      this._elements[idx2] = temp;
    }
  }

  /**
   * Returns a new native TypeScript Array of the EList's elements
   */
  public elements(): T[] {
    const size = this.size();
    const result = new Array<T>(size);
    for (let i = 0; i < size; i++) {
      result[i] = this.get(i);
    }
    return result;
  }

  public filter(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    thisArg?: any
  ): EList<T> {
    const result = new BasicEList<T>();
    for (const element of this._elements.filter(predicate)) {
      result.add(element);
    }
    return result;
  }

  public forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void {
    return this._elements.forEach(callbackfn, thisArg);
  }

  public find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T {
    return this._elements.find(predicate);
  }

  public some(arg0: (e: any) => boolean): boolean {
    return this._elements.some(arg0);
  }

  public map(
    func: (value: T, index: number, obj: T[]) => any,
    thisArg?: any
  ): EList<any> {
    const result = new BasicEList<T>();
    for (const element of this._elements.map(func)) {
      result.add(element);
    }
    return result;
  }

  public last(): T {
    if (this._elements.length == 0) return null;
    return this._elements.slice(-1)[0];
  }

  /**
   * Removes the last element of the List and returns it.
   */
  public pop(): T {
    if (this.size() === 0) return null;
    const popped = this.get(this.size() - 1);
    this.remove(popped);
    return popped;
  }
}
