import { EFactory } from './efactory';

export class EcoreFactory extends EFactory {
  /** Singleton */
  public static eINSTANCE: EcoreFactory = EcoreFactory.init();
  public static init(): EcoreFactory {
    if (!EcoreFactory.eINSTANCE) {
      EcoreFactory.eINSTANCE = new EcoreFactory();
    }
    return EcoreFactory.eINSTANCE;
  }
}
