import { EPackage } from './epackage';
import { EcorePackage } from './ecorepackage';
import { EFactory } from './efactory';
import { EObject } from './eobject';

export class EPackageImpl extends EPackage {
  ecorePackage: EcorePackage;
  ecoreFactory: EFactory;

  public constructor(name: string, nsURI: string) {
    super(name, nsURI);
    this.ecorePackage = EcorePackage.eINSTANCE;
    // this.ecoreFactory = EcoreFactory.eINSTANCE;
  }

  protected getEcorePackage(): EcorePackage {
    return EcorePackage.eINSTANCE;
  }
  public eContainer(): EObject  {
    return this.getESuperPackage();
  }
}
