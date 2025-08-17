import { EDataTypeImpl } from '../metamodel/edata-type-impl';
import { EClass } from '../metamodel/eclass';
import { EEnumLiteralImpl } from '../metamodel/eenum-literal-impl';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EEnumImpl } from '../metamodel/eenum-impl';
import { EClassifier } from '../metamodel/eclassifier';
import { EEnum } from '../metamodel/eenum';
import { EStructuralFeature } from '../metamodel/estructural-feature';
import { EPackage } from '../metamodel/epackage';
import { EAttributeImpl } from '../metamodel/eattribute-impl';
import { EReferenceImpl } from '../metamodel/ereference-impl';
import { EAttribute } from '../metamodel/eattribute';
import { EOperation } from '../metamodel/eoperation';
import { EOperationImpl } from '../metamodel/eoperation-impl';
import { EParameterImpl } from '../metamodel/eparameter-impl';
import { EReference } from '../metamodel/ereference';
import { TUtils } from '../tutils';
import { EPackageImpl } from '../metamodel/epackageimpl';

/**
 * Parses Ecore XML strings into TMF metamodel instances.
 * This class handles the core parsing logic without file system dependencies.
 */
export class EcoreStringParser {

    public parseFromJsString(ecoreJsonStr: any) {
      return this.parseFromJs(JSON.parse(ecoreJsonStr));
    }

  public parseFromJs(ecoreJs: any) {
    const ePackage = ecoreJs['ecore:EPackage'];

    //holds all types and features in a map for reference resolution (e.g. assigning
    //types to references and attributes, enforcing EOpposites)
    const typesMap = new Map<string, EClassifier>();
    const featuresMap = new Map<string, EStructuralFeature>();

    //add primitive types
    const primitiveTypes = TUtils.PRIMITIVES;
    for (const type of primitiveTypes) {
      typesMap['ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//' + type] = new EDataTypeImpl(null, null, type);
    }
    for (const key of typesMap.keys()) {
      console.error('KEY ' + key + ' : ' + typeof typesMap[key]);
    }

    //parse all classifiers first, so that we can resolve them later
    this.instantiateAllClassifiersAndFeatures(
      ePackage,
      typesMap,
      featuresMap,
      []
    );

    //parse the root EPackage and all contents
    const pkgPath = [];
    const rootPackage = this.parsePackage(
      ePackage,
      null,
      typesMap,
      featuresMap,
      pkgPath
    );

    return rootPackage;
  }

  /**
   * Instantiates all the EClassifiers, which need to exist in-memory for a full
   * pass so that features can be assigned types.
   *
   * @param pkgJson
   * @param typesMap
   * @param path
   */
  private instantiateAllClassifiersAndFeatures(
    pkgJson: any,
    typesMap: Map<string, EClassifier>,
    featuresMap: Map<string, EStructuralFeature>,
    path: string[]
  ) {
    //keeps track of the path to the current package
    path.push(pkgJson['$'].name);

    if (pkgJson['eClassifiers']) {
      for (const classEntry of pkgJson['eClassifiers']) {
        let eclassifier: EClassifier = new EClassImpl();
        const eType = classEntry['$']['xsi:type'];
        if (eType === 'ecore:EEnum') {
          eclassifier = new EEnumImpl();
          for (const literalEntry of classEntry['eLiterals']) {
            const literal = new EEnumLiteralImpl();
            if (literalEntry['$']['name'])
              literal.setName(literalEntry['$']['name']);
            if (literalEntry['$']['value'])
              literal.setValue(Number.parseInt(literalEntry['$']['value']));
            if (literalEntry['$']['literal'])
              literal.setLiteral(literalEntry['$']['literal']);

            //TODO: Would not have to do both if model was source generated
            (<EEnum>eclassifier).addLiteral(literal);
            literal.setEEnum(eclassifier as EEnum);
          }
        } else if (eType === 'ecore:EDataType') {
          eclassifier = new EDataTypeImpl();
        }
        eclassifier.setName(classEntry['$']['name']);
        if (classEntry['$']['abstract']) {
          (<EClass>eclassifier).setAbstract(classEntry['$']['abstract']);
        }
        if (classEntry['$']['interface']) {
          (<EClass>eclassifier).setInterface(classEntry['$']['interface']);
        }
        const eclassUri = this.getEClassifierUri(path, eclassifier.getName());
        typesMap[eclassUri] = eclassifier;

        if (classEntry['eStructuralFeatures']) {
          for (const featureEntry of classEntry['eStructuralFeatures']) {
            //instantiate the feature
            const fprops = featureEntry['$'];
            let efeature: EStructuralFeature = null;
            if (fprops['xsi:type'] === 'ecore:EAttribute') {
              efeature = new EAttributeImpl();
              if (fprops.iD) (<EAttribute>efeature).setId(true);
            } else if (fprops['xsi:type'] === 'ecore:EReference') {
              efeature = new EReferenceImpl();
            } else {
              console.error('Unknown type: ' + fprops['xsi:eType']);
              console.log(fprops);
            }

            //create map entry from uri to the feature
            featuresMap[eclassUri + '/' + fprops['name']] = efeature;
          }
        }
      }
    }

    //recurse subdirectories
    if (pkgJson['eSubpackages']) {
      for (const packageEntry of pkgJson['eSubpackages']) {
        this.instantiateAllClassifiersAndFeatures(
          packageEntry,
          typesMap,
          featuresMap,
          path
        );
      }
    }
    path.pop();
  }

  //builds up the URI by which EClassifiers are referenced (e.g. to type features)
  private getEClassifierUri(path: string[], className: string): string {
    let uri = '#//';
    for (let i = 1; i < path.length; i++) {
      uri += path[i] + '/';
    }
    uri += className;
    return uri;
  }

  /**
   * Parses the package represented by pkgJson.
   *
   * @param pkgJson
   * @param parentPkg
   * @param typesMap
   * @param path
   */
  private parsePackage(
    pkgJson: any,
    parentPkg: EPackage,
    typesMap: Map<string, EClassifier>,
    featuresMap: Map<string, EStructuralFeature>,
    path: string[]
  ): EPackage {
    const thisPkg = new EPackageImpl(pkgJson['$'].name,pkgJson['$'].nsURI);
    thisPkg.setNsPrefix(pkgJson['$'].nsPrefix);

    //keeps track of the current path to the package
    path.push(pkgJson['$'].name);
    if (parentPkg) {

     //TODO: Should not have to do both of these, should be inverses
      parentPkg.getESubPackages().add(thisPkg);
      thisPkg.setESuperPackage(parentPkg);
    }
    if (pkgJson['eClassifiers']) {
      for (const classEntry of pkgJson['eClassifiers']) {
        const eclassUri = this.getEClassifierUri(path, classEntry['$']['name']);
        const eclass: EClassifier = typesMap[eclassUri];
        if (!eclass) {
          console.error('COULD NOT FIND ECLASS IDENTIFIED BY ' + eclassUri);
        }

        //TODO: Should not have to do both of these, should be inverses
        eclass.setEPackage(thisPkg);
        thisPkg.getEClassifiers().add(eclass);

        //parse out super types
        if (classEntry['$']['eSuperTypes']) {
          for (const superType of classEntry['$']['eSuperTypes'].split(' ')) {
            const superTypeEClass = <EClass>typesMap[superType];
            if (!superTypeEClass) {
              console.error('COULD NOT FIND ECLASS IDENTIFIED BY ' + superType);
            }
            (<EClass>eclass).getESuperTypes().add(superTypeEClass);
          }
        }

        if (eclass instanceof EClassImpl) {
          //parse out features
          this.parseFeatures(
            classEntry,
            typesMap,
            featuresMap,
            eclass,
            eclassUri
          );

          //parse EOperations
          if ('eOperations' in classEntry) {
            const nameToEop = new Map<string, EOperation>();
            for (const operationEntry of classEntry['eOperations']) {
              const fprops = operationEntry['$'];
              const prevExistingEop = nameToEop.get(fprops.name);

              const eOperation = prevExistingEop
                ? prevExistingEop
                : new EOperationImpl();
              if (!prevExistingEop) {
                eOperation.setName(fprops.name);
                nameToEop.set(eOperation.getName(), eOperation);
                eclass.getEOperations().add(eOperation);
                eOperation.setEContainingClass(eclass);
                if (fprops.eType) eOperation.setEType(typesMap[fprops.eType]);
                if (fprops.upperBound) {
                  eOperation.setUpperBound(Number(fprops.upperBound));
                }
              }

              if ('eParameters' in operationEntry) {
                for (const paramEntry of operationEntry['eParameters']) {
                  const name = paramEntry.$.name;
                  let paramExists = false;
                  for (const p of eOperation.getEParameters())
                    if (name == p.getName()) paramExists = true;
                  if (!paramExists) {
                    const param = new EParameterImpl();
                    param.setName(paramEntry.$.name);
                    if (paramEntry.$.eType) {
                      param.setEType(typesMap[paramEntry.$.eType]);
                    }
                    if (paramEntry.$.upperBound) {
                      param.setUpperBound(Number(paramEntry.$.upperBound));
                    }
                    
                    //TODO: Would not have to do both if model was source generated
                    eOperation.getEParameters().add(param);
                    param.setEOperation(eOperation);
                  }
                }
              }
            }
          }
        }
      }
    }

    //recurse sub-packages
    if (pkgJson['eSubpackages']) {
      for (const packageEntry of pkgJson['eSubpackages']) {
        this.parsePackage(packageEntry, thisPkg, typesMap, featuresMap, path);
      }
    }

    path.pop();

    return thisPkg;
  }

  /**
   * Parses eStructuralFeatures elements from Ecore XMI element.
   *
   * @param classEntry
   * @param typesMap
   * @param featuresMap
   * @param eclass
   * @param eclassUri
   */
  private parseFeatures(
    classEntry: any,
    typesMap: Map<string, EClassifier>,
    featuresMap: Map<string, EStructuralFeature>,
    eclass: EClass,
    eclassUri: string
  ) {
    if ('eStructuralFeatures' in classEntry) {
      for (const featureEntry of classEntry['eStructuralFeatures']) {
        const fprops = featureEntry['$'];
        const efeature: EStructuralFeature =
          featuresMap[eclassUri + '/' + fprops['name']];
        if (efeature) {
          efeature.setName(fprops['name']);
          const type: EClassifier = typesMap[fprops['eType']];
          if (!type) {
            console.error(
              'WARNING: COULD NOT LOCATE TYPE FOR ' +
                fprops.name +
                ' with etype ' +
                fprops.eType
            );
            continue;
          }
          efeature.setEType(type);
          if (fprops['upperBound']) {
            efeature.setUpperBound(Number(fprops['upperBound']));
          } else {
            efeature.setUpperBound(1);
          }

          //transient,changeable,volatile
          efeature.setVolatile(
            fprops.volatile == null ? false : JSON.parse(fprops.volatile)
          );
          efeature.setChangeable(
            fprops.changeable == null ? true : JSON.parse(fprops.changeable)
          );
          efeature.setTransient(
            fprops.transient == null ? false : JSON.parse(fprops.transient)
          );

          //eopposites and containment
          if (efeature instanceof EReferenceImpl) {
            if (fprops['eOpposite']) {
              const eopp = <EReference>featuresMap[fprops['eOpposite']];
              efeature.setEOpposite(eopp);
            }
            efeature.setContainment(
              fprops.containment == null
                ? false
                : JSON.parse(fprops.containment)
            );
          }

          //TODO: This should be handled automatically be einverse enforcement (if tmf were source-generated)
          eclass.getEStructuralFeatures().add(efeature);
          efeature.setEContainingClass(eclass);
        }
      }
    }
  }
}