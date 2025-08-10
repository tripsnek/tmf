/**
 * Generic type for pairing two instances together. This is not a
 * part of the TMF metamodel, and thus cannot be serialized
 * or persisted without special logic.
 */
export class Pair<T1, T2> {
  private first: T1;
  private second: T2;
  constructor(first: T1, second: T2) {
    this.first = first;
    this.second = second;
  }

  public getFirst(): T1 {
    return this.first;
  }
  public getSecond(): T2 {
    return this.second;
  }
}
