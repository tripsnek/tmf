import { ModelPackage } from './model-package';
import { CorePackage } from './core/core-package';
import { CapitalizedPackagePackage } from './core/CapitalizedPackage/capitalized-package-package';
import { AnalysisPackage } from './analysis/analysis-package';

/**
 * A "global initializer" solution for ensuring that package contents
 * for an entire package hierarchy can be initialized on the first
 * 'touch' of any individual package, without triggering circular import
 * issues.
 *
 * The way it works:
 *  1. Whenever any package is 'touched' (by simply being referenced in code) it
 *     initialized it's '_eINSTANCE' field, and uses it to create its initial structures
 *     and Literals references. This does *not* require touching other packages, so there
 *     is no risk of circular imports.
 *  2. When the first invocation of '<package>.eINSTANCE' is made, each package intercepts
 *     that as a static 'get' on the property, and calls registerAll() on this instance to ensure that
 *     ALL packages are touched and have their initial contents created.
 *  3. The first time registerAll() is called, the package hierarchy (sub/super) is created, and
 *     all package contents are initialized.
 */
export class ModelPackageInitializer {
  private static registered = false;

  static registerAll() {
    //if registration is completed, return immediately
    if (this.registered) return;
    this.registered = true;
    const model = ModelPackage._eINSTANCE;
    const core = CorePackage._eINSTANCE;
    const capitalizedPackage = CapitalizedPackagePackage._eINSTANCE;
    const analysis = AnalysisPackage._eINSTANCE;

    //set package/sub-package relationships
    core.setESuperPackage(model);
    capitalizedPackage.setESuperPackage(core);
    analysis.setESuperPackage(model);

    //initialize package contents
    model.initializePackageContents();
    core.initializePackageContents();
    capitalizedPackage.initializePackageContents();
    analysis.initializePackageContents();
  }
}
