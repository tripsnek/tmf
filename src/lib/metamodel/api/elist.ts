/**
 * A typescript type which represents a compression Java's List
 * and EMF's EList, with some added TMF and TypeScript goodies (e.g.
 * find(), some(), filter(), and map()).
 *
 * This is interface for ALL TMF multi-valued fields.
 */
export interface EList<T> extends Iterable<T> {
  /**
   * Swaps the elements at the given positions, if they exist.
   * @param idx1
   * @param idx2
   */
  swap(idx1: number, idx2: number) : void;

  /**
   * Returns the number of elements in this list.  If this list contains
   * more than <tt>Integer.MAX_VALUE</tt> elements, returns
   * <tt>Integer.MAX_VALUE</tt>.
   *
   * @return {number} the number of elements in this list
   */
  size(): number;

  /**
   * Returns <tt>true</tt> if this list contains no elements.
   *
   * @return {boolean} <tt>true</tt> if this list contains no elements
   */
  isEmpty(): boolean;

  /**
   * Returns <tt>true</tt> if this list contains the specified element.
   * More formally, returns <tt>true</tt> if and only if this list contains
   * at least one element <tt>e</tt> such that
   * <tt>(o==null&nbsp;?&nbsp;e==null&nbsp;:&nbsp;o.equals(e))</tt>.
   *
   * @param {*} o element whose presence in this list is to be tested
   * @return {boolean} <tt>true</tt> if this list contains the specified element
   */
  contains(o: any): boolean;

  /**
   * Removes the first occurrence of the specified element from this list,
   * if it is present (optional operation).  If this list does not contain
   * the element, it is unchanged.  More formally, removes the element with
   * the lowest index <tt>i</tt> such that
   * <tt>(o==null&nbsp;?&nbsp;get(i)==null&nbsp;:&nbsp;o.equals(get(i)))</tt>
   * (if such an element exists).  Returns <tt>true</tt> if this list
   * contained the specified element (or equivalently, if this list changed
   * as a result of the call).
   *
   * @param {*} o element to be removed from this list, if present
   * @return {boolean} <tt>true</tt> if this list contained the specified element
   */
  remove(o?: any): any;

  /**
   * Adds item to underlying array without enforcing inverse relationships. This
   * is used by TMF object internally to enforce an inverse without triggering infinite
   * recursion.
   * @param object
   */
  basicAdd(object: T): void;
  /**
   * Removes item from underlying array without enforcing inverse relationships. This
   * is used by TMF object internally to enforce an inverse without triggering infinite
   * recursion.
   * @param object
   */
  basicRemove(object: T): void;

  /**
   * Inserts all of the elements in the specified collection into this
   * list at the specified position (optional operation).  Shifts the
   * element currently at that position (if any) and any subsequent
   * elements to the right (increases their indices).  The new elements
   * will appear in this list in the order that they are returned by the
   * specified collection's iterator.  The behavior of this operation is
   * undefined if the specified collection is modified while the
   * operation is in progress.  (Note that this will occur if the specified
   * collection is this list, and it's nonempty.)
   *
   * @param {number} index index at which to insert the first element from the
   * specified collection
   * @param {*} c collection containing elements to be added to this list
   * @return {boolean} <tt>true</tt> if this list changed as a result of the call
   */
  addAll(list: Iterable<T>): any;

  /**
   * Returns <tt>true</tt> if this list contains all of the elements of the
   * specified collection.
   *
   * @param  {*} c collection to be checked for containment in this list
   * @return {boolean} <tt>true</tt> if this list contains all of the elements of the
   * specified collection
   * @see #contains(Object)
   */
  containsAll(c: EList<any>): boolean;

  /**
   * Removes from this list all of its elements that are contained in the
   * specified collection (optional operation).
   *
   * @param {*} c collection containing elements to be removed from this list
   * @return {boolean} <tt>true</tt> if this list changed as a result of the call
   * @see #remove(Object)
   * @see #contains(Object)
   */
  removeAll(c: EList<any>): boolean;

  /**
   * Removes all of the elements from this list (optional operation).
   * The list will be empty after this call returns.
   */
  clear() : void;

  /**
   * Compares the specified object with this list for equality.  Returns
   * <tt>true</tt> if and only if the specified object is also a list, both
   * lists have the same size, and all corresponding pairs of elements in
   * the two lists are <i>equal</i>.  (Two elements <tt>e1</tt> and
   * <tt>e2</tt> are <i>equal</i> if <tt>(e1==null ? e2==null :
   * e1.equals(e2))</tt>.)  In other words, two lists are defined to be
   * equal if they contain the same elements in the same order.  This
   * definition ensures that the equals method works properly across
   * different implementations of the <tt>List</tt> interface.
   *
   * @param {*} o the object to be compared for equality with this list
   * @return {boolean} <tt>true</tt> if the specified object is equal to this list
   */
  equals(o: any): boolean;

  /**
   * Returns the element at the specified position in this list.
   *
   * @param {number} index index of the element to return
   * @return {*} the element at the specified position in this list
   */
  get(index: number): T;

  /**
   * Replaces the element at the specified position in this list with the
   * specified element (optional operation).
   *
   * @param {number} index index of the element to replace
   * @param {*} element element to be stored at the specified position
   * @return {*} the element previously at the specified position
   */
  set(index: number, element: T): T;

  /**
   * Inserts the specified element at the specified position in this list
   * (optional operation).  Shifts the element currently at that position
   * (if any) and any subsequent elements to the right (adds one to their
   * indices).
   *
   * @param {number} index index at which the specified element is to be inserted
   * @param {*} element element to be inserted
   */
  add(element?: T, index?: number): any;

  /**
   * Returns the index of the first occurrence of the specified element
   * in this list, or -1 if this list does not contain the element.
   * More formally, returns the lowest index <tt>i</tt> such that
   * <tt>(o==null&nbsp;?&nbsp;get(i)==null&nbsp;:&nbsp;o.equals(get(i)))</tt>,
   * or -1 if there is no such index.
   *
   * @param {*} o element to search for
   * @return {number} the index of the first occurrence of the specified element in
   * this list, or -1 if this list does not contain the element
   */
  indexOf(o: T): number;

  /**
   * Returns the index of the last occurrence of the specified element
   * in this list, or -1 if this list does not contain the element.
   * More formally, returns the highest index <tt>i</tt> such that
   * <tt>(o==null&nbsp;?&nbsp;get(i)==null&nbsp;:&nbsp;o.equals(get(i)))</tt>,
   * or -1 if there is no such index.
   *
   * @param {*} o element to search for
   * @return {number} the index of the last occurrence of the specified element in
   * this list, or -1 if this list does not contain the element
   */
  lastIndexOf(o: Object): number;

  //TypeScript goodies

  /**
   * Passes through a 'find' request to the underlying JavaScript Array.
   * @param predicate
   * @param thisArg
   */
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * Passes through a 'foreach' request to the underlying JavaScript Array.
   * @param callbackfn
   * @param thisArg
   */
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;

  /**
   * Passes through a 'some' request to the underlying JavaScript Array.
   * @param arg0
   */
  some(arg0: (e: any) => boolean): boolean;

  /**
   * Passes through a 'filter' request to the underlying JavaScript Array.
   * @param predicate
   * @param thisArg
   */
  filter(
    predicate: (value: T, index: number, obj: T[]) => boolean,
    thisArg?: any
  ): EList<T>;

  /**
   * Passes through a 'map' request to the underlying JavaScript Array.
   * @param function
   * @param thisArg
   */
  map(
    func: (value: T, index: number, obj: T[]) => any,
    thisArg?: any
  ): EList<any>;

  //======================================================================
  // TMF-specific methods (to work better with TypeScript)

  /**
   * Returns a native TypeScript Array of the EList's elements
   */
  elements(): T[];

  /**
   * Removes the last element of the List and returns it.
   */
  pop(): T | undefined;

  last(): T | undefined;
}
