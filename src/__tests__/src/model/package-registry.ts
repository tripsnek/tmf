import { TJson, EClassImpl, EFactory } from '@tripsnek/tmf';
import type { EPackageImpl } from '@tripsnek/tmf';

/**
 * Registry to track which packages have been initialized and registered with TJson.
 * This enables incremental initialization while preventing duplicate work.
 */
export class PackageRegistry {
  private static initializedPackages = new Set<string>();
  private static registeredWithTJson = new Set<string>();
  private static factoryClasses = new Map<string, () => any>();

  /**
   * Mark a package as initialized (contents created and relationships set up)
   */
  static markInitialized(packageName: string): void {
    this.initializedPackages.add(packageName);
  }

  /**
   * Check if a package has been initialized
   */
  static isInitialized(packageName: string): boolean {
    return this.initializedPackages.has(packageName);
  }

  /**
   * Register a factory class constructor for a package
   */
  static registerFactoryClass(
    packageName: string,
    factoryGetter: () => any
  ): void {
    this.factoryClasses.set(packageName, factoryGetter);
  }

  /**
   * Get the factory for a package and ensure it's initialized
   */
  static getFactory(packageName: string): EFactory | null {
    const factoryGetter = this.factoryClasses.get(packageName);
    if (factoryGetter) {
      try {
        const FactoryClass = factoryGetter();
        return FactoryClass?.eINSTANCE || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Register a package with TJson if not already registered
   */
  static registerWithTJson(packageName: string, pkg: EPackageImpl): void {
    if (this.registeredWithTJson.has(packageName)) {
      return;
    }

    this.registeredWithTJson.add(packageName);

    // Ensure factory is registered with package
    const factory = this.getFactory(packageName);
    if (factory && !pkg.getEFactoryInstance()) {
      pkg.setEFactoryInstance(factory);
    }

    // Recompute all lists for EClass instances
    for (const e of pkg.getEClassifiers()) {
      if (e instanceof EClassImpl) {
        e.recomputeAllLists();
      }
    }

    // Register with TJson
    TJson.addPackages([pkg]);
  }

  /**
   * Check if a package has been registered with TJson
   */
  static isRegisteredWithTJson(packageName: string): boolean {
    return this.registeredWithTJson.has(packageName);
  }
}
