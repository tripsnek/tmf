import { EPackage } from '../api/epackage';
import { EcorePackage } from '../ecorepackage';
import { EFactory } from '../api/efactory';
import { EObject } from '../api/eobject';

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
