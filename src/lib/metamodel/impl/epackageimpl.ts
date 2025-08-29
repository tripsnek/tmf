import { EPackage } from '../api/epackage.js';
import { EcorePackage } from '../ecorepackage.js';
import { EFactory } from '../api/efactory.js';
import { EObject } from '../api/eobject.js';

export class EPackageImpl extends EPackage {
  ecorePackage: EcorePackage;

  public constructor(name: string, nsURI: string, nsPrefix?: string) {
    super(name, nsURI,nsPrefix);
    this.ecorePackage = EcorePackage.eINSTANCE;
  }

  protected getEcorePackage(): EcorePackage {
    return EcorePackage.eINSTANCE;
  }
  public override eContainer(): EObject  {
    return this.getESuperPackage();
  }
}
