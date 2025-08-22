import { EPackage } from '../metamodel/epackage';
import { EEnum } from '../metamodel/eenum';
import { EClass } from '../metamodel/eclass';
import { EReference } from '../metamodel/ereference';
import { EAttribute } from '../metamodel/eattribute';
import { EDataType } from '../metamodel/edata-type';
import { EStructuralFeature } from '../metamodel/estructural-feature';
import { EClassifier } from '../metamodel/eclassifier';
import { BasicEList } from '../metamodel/basicelist';
import { TGenUtils as DU } from './tgen-utils';
import { EAttributeImpl } from '../metamodel/eattribute-impl';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EReferenceImpl } from '../metamodel/ereference-impl';
import { EEnumImpl } from '../metamodel/eenum-impl';
import { EDataTypeImpl } from '../metamodel/edata-type-impl';
import { TGeneratorPackageInitializer } from './tgenerator-package-initializer';

/**
 * Responsible for generating the interface and implementation of an
 * EPackage source file, which provides static access to all the elements
 * of a package in a TMF model.
 *
 * Note that generation of several swathes of the package content
 * are ganged together into a single pass over the model. This owes
 * to the fact that sufficient logic is shared across their computations, largely
 * related to the tracking of IDs for individual elements, that it would
 * be difficult to separate them out.
 */
export class TGeneratorPackage {

   rootPackage! : EPackage;

  public generatePackageContents(pkg: EPackage): string {
    const className = DU.genPackageClassName(pkg);
    this.rootPackage = pkg;
    while(this.rootPackage.getESuperPackage()) this.rootPackage = this.rootPackage.getESuperPackage();

    //track package dependencies, import them at the end
    const pkgToImport = new Set<EPackage>();

    //static library of all package contents
    let literalsContent = `
  /** Provides static access to EClass and EStructuralFeature instances */
  public static Literals = class {`;

    let fieldDeclarationsContent = '';
    let gettersContent = '';

    //insert create/initialize methods
    let createContent = `  public createPackageContents(): void {
    if (this.isCreated) return;
    this.isCreated = true;`;

    let initContent = `  public initializePackageContents(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    //reusable handle for eoperations, used for adding parameters
    let op: EOperation;`;

    let idFieldsContent = '';

    //iterate over all classes and features, create and initialize them AND create getters using the feature IDs
    let ecIdCounter = 0;

    //sort eclassifiers in such a way that base types are guaranteed to precede derived types so
    //that we can reference feature IDs in correct order
    const sortedClassifiers = this.sortClassifiersWithBaseTypesFirst(pkg);

    //NOTE: This is the 'single-pass' loop for generating IDs, declaring element fields
    //and initializing each and hooking up their references where appropriate. The
    //content for all of these is then integrated into the full template of the package
    //file in the return statement for this method
    for (const eclassifier of sortedClassifiers) {
      const eclassIdField = DU.genClassIdFieldName(eclassifier);
      idFieldsContent += `
  public static ${eclassIdField} = ${ecIdCounter};`;
      ecIdCounter++;

      //add eclassifier field
      let type = 'EClass';
      if (eclassifier instanceof EEnumImpl) type = 'EEnum';
      else if (eclassifier instanceof EDataTypeImpl) type = 'EDataType';
      const eclassFieldName = DU.uncapitalize(eclassifier.getName()) + type;
      fieldDeclarationsContent += `
  private ${eclassFieldName}!: ${type};`;

      //add eclass getter
      const eclassGetter = DU.genEclassGetterName(eclassifier);
      gettersContent += `
  public ${eclassGetter}(): ${type} {
    return this.${eclassFieldName};
  }`;

      //add creation
      createContent += `
    this.${eclassFieldName} = this.create${type}(${className}.${eclassIdField});`;

      //add Literals entry for EClassifier
      literalsContent += `
    static ${eclassIdField}: ${type} = ${className}._eINSTANCE.${DU.genEclassGetterName(
        eclassifier
      )}();`;

      //add class initialization
      if (eclassifier instanceof EClassImpl) {
        const eclass = <EClass>eclassifier;
        for (const superType of eclassifier.getESuperTypes()) {
          const pkgRef = DU.getReferenceToPackageInstance(
            superType,
            eclassifier,
            pkgToImport
          );
          initContent += `
    this.${eclassFieldName}.getESuperTypes().add(${pkgRef}.${DU.genEclassGetterName(
            superType
          )}());`;
        }
        initContent += `
    this.init${type}(
      this.${eclassFieldName},
      '${eclassifier.getName()}',
      ${eclassifier.isAbstract()},
      ${eclassifier.isInterface()},
      true
    );`;
      } else {
        initContent += `
    this.init${type}(
      this.${eclassFieldName}, '${eclassifier.getName()}');`;

        if (eclassifier instanceof EEnumImpl) {
          let literalInd = 0;
          for (const literal of (<EEnum>eclassifier).getELiterals()) {
            const litRef = eclassifier.getName() + '.' + literal.getName();
            initContent += `
    this.addEEnumLiteral(this.${eclassFieldName}, '${literal.getName()}', ${literalInd});`;
            literalInd++;
          }
        }
      }

      //process references and attributes
      if (eclassifier instanceof EClassImpl) {
        //find super type
        const superType =
          eclassifier.getESuperTypes().size() > 0
            ? eclassifier.getESuperTypes().get(0)
            : null;

        //write out feature count field (will be the starting point for ID'ing new fields on this eclass)
        const featureCountField = DU.genFeatureCountFieldName(eclassifier);

        const superTypeFeatureCount =  superType? superType.getEAllStructuralFeatures().size() : 0;
        
          //Eliminating references to super types in static initializers, since they could be in other packages (circular import)
        // const superTypeCountField = superType
        //   ? DU.genPackageClassName(superType.getEPackage()) +
        //     '.' +
        //     DU.genFeatureCountFieldName(superType) +
        //     ' + '
        //   : '';
        
  //       if (superTypeCountField) {
  //         idFieldsContent += `
  // public static ${featureCountField} =
  //   ${superTypeCountField}${eclassifier.getEStructuralFeatures().size()};`;
  //       } else {
  //         idFieldsContent += `
  // public static ${featureCountField} = ${eclassifier.getEStructuralFeatures().size()};`;
  //       }

          //this is the replacement - just a straight count of all features, shoudl be same
          idFieldsContent += `
  public static ${featureCountField} = ${eclassifier.getEAllStructuralFeatures().size()};`;

        //keeps track of the feature's index in it's eClass (used for feature getter)
        let thisClassFeatureIndex = 0;
        for (const feature of (<EClass>eclassifier).getEStructuralFeatures()) {
          const featureIdField = DU.genFeatureIdFieldName(feature);
          
          //Eliminating references to super types in static initializers, since they could be in other packages (circular import)          
  //         if (superTypeCountField) {
  //           idFieldsContent += `
  // public static ${featureIdField} = ${superTypeCountField}${thisClassFeatureIndex};`;
  //         } else {
  //           idFieldsContent += `
  // public static ${featureIdField} = ${thisClassFeatureIndex};`;
  //         }

        //this is the replacement - just add to the super type feature count
            idFieldsContent += `
  public static ${featureIdField} = ${superTypeFeatureCount + thisClassFeatureIndex};`;        


          const featureType =
            feature instanceof EAttributeImpl ? 'EAttribute' : 'EReference';
          literalsContent += `
    static ${featureIdField}: ${featureType} =
      ${className}._eINSTANCE.get${DU.capitalize(
            eclassifier.getName()
          )}_${DU.capitalize(feature.getName())}();`;

          //create features
          createContent += `
    this.create${featureType}(
      this.${eclassFieldName},
      ${className}.${featureIdField}
    );`;

          const featureGetterName = DU.genFeatureGetterName(feature);

          //add feature getter
          gettersContent += `
  public ${featureGetterName}(): ${featureType} {
    return <${featureType}>this.${eclassFieldName}.getEStructuralFeatures().get(${thisClassFeatureIndex});
  }`;

          //the getter for the feature's type (Eclassifier instance)
          const featureTypeGetter = this.getterForEType(
            feature.getEType()!,
            eclassifier,
            pkgToImport,
            pkg
          );

          //initializers
          initContent += `
    this.init${featureType}(
      this.${featureGetterName}()`;
          if (feature instanceof EAttributeImpl) {
            initContent += `,
      ${featureTypeGetter},
      '${feature.getName()}',
      ${feature.getDefaultValueLiteral() ? feature.getDefaultValueLiteral() : `''`},
      ${feature.getLowerBound()},
      ${feature.getUpperBound()},
      '',
      ${feature.isTransient() ?? false},
      ${feature.isVolatile() ?? false},
      ${feature.isChangeable() ?? true},
      true, //TODO: isUnsettable,
      ${feature.isId() ?? false},
      ${feature.isUnique() ?? false},
      false, //TODO: isDerived
      false //TODO: isOrdered;` 
          } else if (feature instanceof EReferenceImpl) {
            const pkgRef = DU.getReferenceToPackageInstance(
              feature.getEType()!,
              eclassifier,
              pkgToImport
            );
            let eopposite = 'undefined';
            if (feature.getEOpposite()) {
              eopposite = `${pkgRef}.${DU.genFeatureGetterName(
                feature.getEOpposite()!
              )}()`;
            }
            initContent += `,
      ${featureTypeGetter},
      ${eopposite},
      '${feature.getName()}',
      '',
      ${feature.getLowerBound()},
      ${feature.getUpperBound()},
      '', //TODO: Container Class
      ${feature.isTransient() ?? false},
      ${feature.isVolatile() ?? false},
      ${feature.isChangeable() ?? false},
      ${feature.isContainment() ?? false},
      false,
      true, //TODO: isUnsettable
      ${feature.isUnique() ?? false},
      false, //TODO: isDerived
      false //TODO: isOrdered`;
          }
          initContent += `
    );`;
          thisClassFeatureIndex++;
        }

        //logic for creating and initializing EOperations
        let eopIndex = 0;
        for (const eop of eclassifier.getEOperations()) {
          const eopIdField = DU.genOperationIdFieldName(eop);
          //add ID content
          idFieldsContent += `
  public static ${eopIdField} = ${eopIndex};`;
          createContent += `
    this.createEOperation(this.${eclassFieldName}, ${className}.${eopIdField});`;
          const featureGetterName = DU.genOperationGetterName(eop);
          gettersContent += `
  public ${featureGetterName}(): EOperation {
    return this.${eclassFieldName}.getEOperations().get(${eopIndex});
  }`;
          initContent += `
    op = this.initEOperation(
      this.${featureGetterName}(),
      ${this.getterForEType(eop.getEType()!, eclassifier, pkgToImport, pkg)},
      '${eop.getName()}',
      0,
      ${eop.isMany() ? -1 : 1},
      true,
      true
    );`;
          for (const p of eop.getEParameters()) {
            //TODO: Create parameters and add them to EOphere
            initContent += `
    this.createEParameter(
      op,
      '${p.getName()}',
      ${p.isMany() ? -1 : 1},
       ${this.getterForEType(p.getEType(), eclassifier, pkgToImport, pkg)}
    );`
          }
          eopIndex++;
        }
      }
    }

    createContent += `
  }`;
    initContent += `
  }`;
    literalsContent += `
  };`;

    //EcorePackage cannot extend EPackageImpl, as it it would create circular reference
    const toExtend =
      pkg.getName().toLowerCase() === 'ecore' ? 'EPackage' : 'EPackageImpl';

  let subPkgSetters = '';

    // for(const subPkg of pkg.getESubPackages()){
    //   if(!pkgToImport.has(subPkg)){
    //     pkgToImport.add(subPkg);
    //   }
    //   subPkgSetters += `
    // ${DU.genPackageClassName(subPkg)}.eINSTANCE.setESuperPackage(the${className})`;
    // }

    return `${this.generateImports(pkgToImport, pkg)}
export class ${className} extends ${toExtend} {${idFieldsContent}

  /** Singleton */
  public static _eINSTANCE: ${className} = ${className}.init();

  //if the singleton is initialized
  private static isInited = false;

  static eNS_URI =
    '${pkg.getNsURI()}';
  static eNAME = '${pkg.getName()}';
  static eNS_PREFIX = '${pkg.getNsPrefix()}';
${literalsContent}

  //flags that keep track of whether package is initialized
  private isCreated = false;
  private isInitialized = false;
${fieldDeclarationsContent}

  //causes EPackage.Registry registration event
  //hard-coded URI, since referring to the static eNS_URI field in constructor can cause issues
  constructor() {
    super(
      '${pkg.getName()}',
      '${pkg.getNsURI()}',
      '${pkg.getNsPrefix()}'
    );
  }

  /**
   * Invoked once. Initializes the Singleton.
   *
   * NOTE: Lots of differences here with the EMF version, which interacts with the package Registry,
   * other packages from the same model to register interdependencies, and freezes the package meta-data.
   */
  private static init(): ${className} {
    if (${className}.isInited) return this._eINSTANCE;
    // Obtain or create and register package
    const the${className} = new ${className}();
    //this is necessary specifically for EcorePackage generation, which needs to refer to itself
    this._eINSTANCE = the${className};
    ${className}.isInited = true;
${subPkgSetters}    

    // Create package meta-data objects
    the${className}.createPackageContents();

    // Initialize created meta-data
    // the${className}.initializePackageContents();
    return this._eINSTANCE;
  }

  static get eINSTANCE(): ${className}{
    ${TGeneratorPackageInitializer.generateClassName(this.rootPackage)}.registerAll();
    return this._eINSTANCE;
  }  

  //this used to be direct lazy retrieval of the
  //factory instance from the corresponding .ts factory file, but
  //that was eliminated to avoid circular imports
  public override getEFactoryInstance(): EFactory {
    return this._eFactoryInstance;
  }

  /**
   * This will be invoked by the Factory when it is initialized, any invocations
   * afterwards will have no effect.
   */
  public override setEFactoryInstance(factoryInst: EFactory): void {
    if (!this._eFactoryInstance) this._eFactoryInstance = factoryInst;
  }
${gettersContent}

${createContent}

${initContent}
}
`;
  }

  /**
   * User for generating 'get' on the EType for a feature or operation.
   *
   * @param etype
   * @param owningEClass
   * @param pkgToImport
   * @param pkg
   * @returns
   */
  private getterForEType(
    etype: EClassifier,
    owningEClass: EClass,
    pkgToImport: Set<EPackage>,
    pkg: EPackage
  ) {
    let featureTypeGetter = undefined;
    if (etype) {
      const pkgRef = DU.getReferenceToPackageInstance(
        etype,
        owningEClass,
        pkgToImport
      );
      if (etype instanceof EEnumImpl) {
        featureTypeGetter = `${pkgRef}.get${etype.getName()}()`;
      } else if (etype instanceof EClassImpl) {
        const pkgRef = DU.getReferenceToPackageInstance(
          etype,
          owningEClass,
          pkgToImport
        );
        if (etype) {
          featureTypeGetter = `${pkgRef}.${DU.genEclassGetterName(etype)}()`;
        }
      } else {
        let ecorePkgGetter = 'this.getEcorePackage()';
        if (pkg.getName().toLowerCase() === 'ecore') ecorePkgGetter = 'this';
        featureTypeGetter = ecorePkgGetter + '.get' + etype.getName() + '()';
      }
    }
    return featureTypeGetter;
  }

  private generateImports(pkgToImport: Set<EPackage>, pkg: EPackage) {

    //build path to root package initializer
    const pathToRoot = DU.getPathToRoot(pkg);

    let imports = `${DU.generateImportStatementsForExternalPackages(pkgToImport, pkg, './')}
${DU.DEFAULT_IMPORTS}

import { ${TGeneratorPackageInitializer.generateClassName(this.rootPackage)}} from '${pathToRoot}${TGeneratorPackageInitializer.generateFileName(this.rootPackage)}';
import { EPackage } from '@tripsnek/tmf';
import { EPackageImpl } from '@tripsnek/tmf';
import { EAttribute } from '@tripsnek/tmf';
import { EFactory } from '@tripsnek/tmf';
import { EReference } from '@tripsnek/tmf';
import { EOperation } from '@tripsnek/tmf';`;

    //we use relative imports for the EcorePackage, since it is in the same lib as the metamodel
    if (pkg.getName().toLowerCase() === 'ecore') {
      imports = `${DU.generateImportStatementsForExternalPackages(pkgToImport, pkg, '')}
import { EPackage } from './epackage';
import { EDataType } from './edata-type';
import { EClass } from './eclass';
import { EReference } from './ereference';
import { EAttribute } from './eattribute';
import { EFactory } from './efactory';`;
    } else {
      imports += `
import { EcorePackage } from '@tripsnek/tmf';`;
    }

    //imports of Enum classes
    for (const ec of pkg.getEClassifiers()) {
      if (ec instanceof EEnumImpl) {
        imports += `
import { ${ec.getName()} } from './api/${DU.genClassApiName(ec)}';`;
      }
    }
    return imports;
  }

  /**
   * Sort eclassifiers in such a way that base types are guaranteed to precede derived types so
   * that we can reference feature IDs in correct order
   */
  private sortClassifiersWithBaseTypesFirst(pkg: EPackage) {
    const sortedClassifiers = new Array<EClassifier>();
    for (const eclassifier of pkg.getEClassifiers()) {
      if (eclassifier instanceof EClassImpl) {
        const eclass = <EClass>eclassifier;
        if (sortedClassifiers.indexOf(eclass) === -1) {
          //insert eclass after it's last super type
          let idxLastSuperType = -1;
          for (const st of eclass.getEAllSuperTypes()) {
            if (sortedClassifiers.indexOf(st) > -1) {
              const index = sortedClassifiers.indexOf(st);
              if (index > idxLastSuperType) idxLastSuperType = index;
            }
          }
          if (idxLastSuperType >= 0)
            sortedClassifiers.splice(idxLastSuperType + 1, 0, eclass);
          else sortedClassifiers.splice(0, 0, eclass);
        }
      }

      //enums and other EClassifiers can go wherever
      else {
        sortedClassifiers.push(eclassifier);
      }
    }
    return sortedClassifiers;
  }
}