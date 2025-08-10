import { EPackage } from './epackage';
import { EcorePackage } from './ecorepackage';
import { EFactory } from './efactory';

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
}
