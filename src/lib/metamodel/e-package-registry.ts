import { EPackage } from './api/epackage';

export class EPackageRegistry {
  pathToPkg = new Map<string, EPackage>();

  /** Singleton */
  private static eINSTANCE: EPackageRegistry;

  // Add a getter that ensures proper initialization order
  public static getInstance(): EPackageRegistry {
    if (!this.eINSTANCE) {
      // Ensure CorePackage is initialized first
      this.eINSTANCE = new EPackageRegistry();
    }
    return this.eINSTANCE;
  }

  public register(path: string, pkg: EPackage){
    this.pathToPkg.set(path,pkg);
  }

  public getPackage(path: string){
    return this.pathToPkg.get(path);
  }
}
