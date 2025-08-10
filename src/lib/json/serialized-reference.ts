import { EObject } from '../metamodel/eobject';

export class SerializedReference {
  fromId: string;
  toId: string;
  refName: string;

  constructor(from: string, to: string, ref: string) {
    this.fromId = from;
    this.toId = to;
    this.refName = ref;
  }

  public static create(
    fromDId: string,
    toDId: string,
    fromRef: string
  ): SerializedReference {
    return new SerializedReference(fromDId, toDId, fromRef);
  }

  /**
   * Swizzles the object to JSON.
   */
  public serialize(): any {
    return this.toId;
  }

  /**
   * Restores the swizzled reference.
   *
   * @param allObjs
   */
  public deserialize(allObjs: Map<String, EObject>) {
    //gather the objects and feature
    const fromObj = allObjs.get(this.fromId);
    const toObj = allObjs.get(this.toId);
    const feature = fromObj.eClass().getEStructuralFeature(this.refName);

    //enforce the reference
    if (fromObj && toObj && feature) {
      if (feature.isMany()) fromObj.eGet(feature).add(toObj);
      else fromObj.eSet(feature, toObj);
    }
  }
}
