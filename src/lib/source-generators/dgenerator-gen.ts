import { EPackage } from '../metamodel/epackage';
import { EClassifier } from '../metamodel/eclassifier';
import { EClass } from '../metamodel/eclass';
import { EReference } from '../metamodel/ereference';
import { TGenUtils as DU } from './tgen-utils';
import { TUtils } from '../tutils';
import { EStructuralFeature } from '../metamodel/estructural-feature';
import { EReferenceImpl } from '../metamodel/ereference-impl';

/**
 * Source code generation for *gen.ts files for EClasses.
 *
 * @tripsnek
 */
export class DGeneratorGen {
  private _pkg: EPackage;
  private _packageName: string;

  /**
   * Generates a template string containing all source code for the *gen.ts
   * file for the given EClass.
   *
   * @param eClass
   * @param toImport
   * @param genToImport
   * @param pkgToImport
   */
  public generate(
    eClass: EClass,
    toImport: Set<EClassifier>,
    genToImport: Set<EClassifier>,
    pkgToImport: Set<EPackage>
  ): string {
    this._pkg = eClass.getEPackage();
    this._packageName = DU.genPackageClassName(this._pkg);
    const genClassName = DU.genGenClassName(eClass);
    const apiClassName = eClass.getName();

    return `${this.generateAllImportStatements(
      eClass,
      toImport,
      genToImport,
      pkgToImport
    )}
/**
 * This file is source-code generated and should never be edited. It implements
 * the core TMF functionality for ${eClass.getName()}.
 */
export abstract class ${genClassName} ${this.generateExtends(
      eClass
    )} implements ${apiClassName}{
  /** feature declarations */
${this.genFeatureDeclarations(eClass)}
${this.genConstructor(eClass)}
${this.genGettersAndSetters(eClass)}
${this.genEoperations(eClass)}
      
  //======================================================================
  // Standard EObject behavior

${this.genEGet(eClass)};
${this.genESet(eClass)};
${this.genEIsSet(eClass)};
${this.genEUnset(eClass)};
${this.genBasicSetters(eClass)};
${this.genEInverseAdd(eClass)};
${this.genEInverseRemove(eClass)};

  //======================================================================
  // eClass()

  public eClass(): EClass {
    return ${this._packageName}.Literals.${DU.snakeUpperCase(
      eClass.getName()
    )};
  }
}`;
  }

  /**
   * Generates import statements for all APIs, Gen classes
   * and packages to import.
   *
   * @param eClass
   * @param toImport
   * @param genToImport
   * @param pkgToImport
   */
  private generateAllImportStatements(
    eClass: EClass,
    toImport: Set<EClassifier>,
    genToImport: Set<EClassifier>,
    pkgToImport: Set<EPackage>,
    async?: boolean
  ) {
    let className = eClass.getName();
    if (async) className += 'Async';
    const isEcore = eClass.getEPackage().getName() == 'ecore';

    let result = `${isEcore ? DU.ECORE_DEFAULT_IMPORTS : DU.DEFAULT_IMPORTS}
${DU.genApiImports(eClass, toImport, `..${DU.API_PATH}`)}
import { ${this._packageName} } from '../${DU.genPackageFileName(
      this._pkg
    )}';
import { ${className} } from '..${DU.API_PATH}/${DU.genClassApiName(
      eClass,
      async
    )}';
`;

    //gen and impl classes that need to be imported
    for (const ec of genToImport) {
      if (ec) {
        let pathToImport = './';
        if (ec.getEPackage() !== eClass.getEPackage()) {
          //if root package is shared, the classes are assumed to exist in the same lib, and can be imported with relative paths
          if (ec.getRootPackage() === eClass.getRootPackage()) {
            pathToImport = `${DU.getPathToTypeInOtherPkg(eClass, ec)}/`;
            result += `import {${ec.getName()}Gen } from '${
              pathToImport + 'gen/' + DU.genClassGenName(<EClass>ec)
            }';\n`;
            result += `import {${ec.getName()}Impl } from '${
              pathToImport + 'impl/' + DU.genClassImplName(<EClass>ec)
            }';\n`;
          }
          //otherwise, use non-relative paths
          else {
            console.log('WARNING: CROSS-PACKAGE IMPORTS NOT SUPPORTED');
          }
        } else {
          result += `import {${ec.getName()}Gen } from './${DU.genClassGenName(
            ec as EClass
          )}';\n`;
          result += `import {${ec.getName()}Impl } from '../impl/${DU.genClassImplName(
            ec as EClass
          )}';\n`;
        }
      }
    }

    //add package imports (e.g. for references to types in external packages)
    result += DU.generateImportStatementsForExternalPackages(
      pkgToImport,
      this._pkg,
      '../'
    );
    return result;
  }

  private generateExtends(eclass: EClass): string {
    if (eclass.getName() == 'EObject') return '';
    let result = `extends EObjectImpl`;
    let sti = 0;
    for (const superType of eclass.getESuperTypes()) {
      //TODO: Add support for multiple-inheritance on implementation class?
      if (sti === 0) {
        if (!superType.isInterface()) {
          result = ` extends ${superType.getName()}Impl`;
        }
      }
      sti++;
    }
    return result;
  }

  private genFeatureDeclarations(eclass: EClass) {
    let sourceContent = ``;
    for (const f of eclass.getEStructuralFeatures()) {
      const typeName = DU.getTypeName(f);
      let initializer = '';
      if (f.isMany()) {
        //get feature ID for inverse reference, if specified
        let inverseFeatureId = 'null';
        if (f instanceof EReferenceImpl) {
          if (f.getEOpposite()) {
            const oppRef = f.getEOpposite();

            inverseFeatureId = `${DU.genPackageClassName(
              oppRef.getEContainingClass().getEPackage()
            )}.${DU.genFeatureIdFieldName(oppRef)}`;
          }
        }
        //list is initialized with information about owning object, the
        //field it represents, and any inverse field
        initializer += ` = new Basic${typeName}(null,this,${
          this._packageName
        }.${DU.genFeatureIdFieldName(f)},${inverseFeatureId})`;
      }
      sourceContent += `  protected ${f.getName()}:${typeName}${initializer};\n`;
    }
    return sourceContent;
  }

  private genConstructor(eClass: EClass): string {
    // Build sorted list of all constructor arguments
    let argFields = [];

    // Build sorted list constructor arguments from possible superType
    const superFields = [];

    let result = '';
    if (argFields.length > 0) {
      // Now build up the constructor code...
      result += `
      //======================================================================
      // Constructor
      
      public constructor(`;
      for (const field of argFields) {
        if (field.isMany()) {
          const type = TUtils.getTypescriptName(field.getEType());
          result += `_${field.getName()}?: EList<${type}>, `;
        } else {
          const type = TUtils.getTypescriptName(field.getEType());
          result += `_${field.getName()}?: ${type}, `;
        }
      }
      result += ') {';
      // Deal with invoking 'super(....)' if necessary
      if (superFields) {
        result += 'super(';
        for (const field of superFields) {
          result += `_${field.getName()}, `;
        }
        result += ');';
        argFields = argFields.filter((f) => !superFields.includes(f));
      } else {
        result += 'super();';
      }
      // Deal with setting the remaining (locally defined) fields
      for (const field of argFields) {
        if (field.isMany()) {
          const eListVar = field.getName() + 'EList';
          result += `if (_${field.getName()}) {
            const ${eListVar} = this.${DU.getterName(field)}();
            for(const val of _${field.getName()}) { ${eListVar}.add(val); }
          }`;
        } else {
          result += `this.${DU.setterName(field)}(_${field.getName()});`;
        }
      }
      result += '}';
    }
    return result;
  }

  private genGettersAndSetters(eClass: EClass): string {
    let result = `
    //======================================================================
    // Getters and Setters

    `;
    for (const field of eClass.getEStructuralFeatures()) {
      result += this.genGetter(eClass, field);
      result += this.genSetter(eClass, field);
    }
    return result;
  }

  private genGetter(eClass: EClass, field: EStructuralFeature): string {
    const visibility = 'public';
    let result = `

      ${visibility} ${DU.getterSig(field)}{`;
    if (field.isVolatile()) {
      result += `throw new Error('Unsupported operation on volatile field. Override in ${eClass.getName()}Impl.');`;
    } else {
      result += `return this.${field.getName()};`;
    }
    result += `}`; // End of Getter definition
    return result;
  }

  private genSetter(eClass: EClass, field: EStructuralFeature): string {
    let result = ``;
    if (!field.isMany()) {
      const paramName = DU.setterParamName(field);
      const visibility = field.isChangeable() ? 'public' : 'private';
      result += `

        ${visibility} ${DU.setterSig(field)}{`;
      if (field.isVolatile()) {
        result += `throw new Error('Unsupported operation on volatile field. Override in ${eClass.getName()}Impl.');`;
      } else {
        //handle containment enforcement if appropriate
        if (field instanceof EReferenceImpl && field.isContainment()) {
          const oldVar = 'old' + DU.capitalize(field.getName());
          result += `const ${oldVar} = this.${field.getName()};
              if (${oldVar}) ${oldVar}.setEContainer(null,null);
              if (${paramName})${paramName}.setEContainer(this,${DU.genPackageClassName(
            this._pkg
          )}.${DU.genFeatureIdFieldName(field)});`;
        }
        //handle inverse references if appropriate
        if (field instanceof EReferenceImpl && field.getEOpposite()) {
          //TODO: handle opposites in other packages?
          const oppositeIdField = `${
            this._packageName
          }.${DU.genFeatureIdFieldName(field.getEOpposite())}`;
          result += `if (this.${field.getName()} !== ${paramName}) {
              if (this.${field.getName()}) {
              this.${field.getName()}.eInverseRemove(this, ${oppositeIdField});
              }
              if (${paramName}) {
                ${paramName}.eInverseAdd(this, ${oppositeIdField});
              }
            }`;
        }
        result += `this.basic${DU.capitalize(
          DU.setterName(field)
        )}(${paramName});`;
        // sourceContent += `this.${f.getName()} = ${paramName};}`;
      }
      result += `}`; // End of Setter definition
    }
    return result;
  }

  private genBasicSetters(eClass: EClass): string {
    let result = `
    //======================================================================
    // Basic setters (allow EOpposite enforcement without triggering infinite cycles)

    `;
    for (const field of eClass.getEStructuralFeatures()) {
      //only include basic setters for internal references
      if (!field.isMany() && !field.isVolatile()) {
        const visibility = field.isChangeable() ? 'public' : 'private';
        const paramName = DU.setterParamName(field);
        result += `

            ${visibility} basic${DU.capitalize(DU.setterSig(field))}{`;
        if (
          field instanceof EReferenceImpl &&
          field.getEOpposite() &&
          field.getEOpposite().isContainment()
        ) {
          result += `this.eBasicSetContainer(${paramName},${DU.genPackageClassName(
            eClass.getEPackage()
          )}.${DU.genFeatureIdFieldName(field)});`;
        }
        result += `this.${field.getName()} = ${paramName};
            }`;
      }
    }
    return result;
  }

  private genEoperations(eClass: EClass) {
    let result = `
    //======================================================================
    // API Operations

    `;
    for (const eop of eClass.getEOperations()) {
      result += `
        
        public ${DU.eopSignature(eop)} {
          throw new Error('Not implemented');
        }`;
    }
    return result;
  }

  private genEGet(eClass: EClass): string {
    let result = `
    /**
     * eGet() - provides reflective access to all features.
     */
    public eGet(feature: number | EStructuralFeature): any {
        const featureID: number =  typeof feature === 'number' ? feature : (<EStructuralFeature>feature).getFeatureID();
          switch (featureID) {`;
    for (const feature of eClass.getEStructuralFeatures()) {
      const featureIdField = DU.genFeatureIdFieldName(feature);
      result += `case ${this._packageName}.${featureIdField}:
        return this.${DU.getterName(feature)}();`;
    }
    result += `}
    return super.eGet(featureID);
    }`;
    return result;
  }

  private genESet(eClass: EClass): string {
    let result = `
    
    /**
     * eSet() - provides ability to reflectively set all features.
     */
    public eSet(feature: number | EStructuralFeature, newValue: any): void {
        const featureID: number =  typeof feature === 'number' ? feature : (<EStructuralFeature>feature).getFeatureID();
          switch (featureID) {`;
    for (const feature of eClass.getEStructuralFeatures()) {
      const featureIdField = DU.genFeatureIdFieldName(feature);
      result += `case ${this._packageName}.${featureIdField}:`;

      if (!feature.isMany()) {
        result += `this.${DU.setterName(feature)}(newValue);
        return;`;
      } else {
        const getter = DU.getterName(feature);
        result += `this.${getter}().clear();
          this.${getter}().addAll(newValue);
          return;`;
      }
    }
    result += `}
      return super.eSet(featureID, newValue);
    }`;
    return result;
  }

  private genEIsSet(eClass: EClass): string {
    let result = `
    /**
     * eIsSet() - provides ability to reflectively check if any feature is set.
     */
    public eIsSet(feature: number | EStructuralFeature): boolean {
        const featureID: number =  typeof feature === 'number' ? feature : (<EStructuralFeature>feature).getFeatureID();
          switch (featureID) {`;
    for (const feature of eClass.getEStructuralFeatures()) {
      const featureIdField = DU.genFeatureIdFieldName(feature);
      result += `case ${this._packageName}.${featureIdField}:`;
      if (!feature.isMany()) {
        result += `return this.${DU.getterName(feature)}===undefined;`;
      } else {
        const getter = DU.getterName(feature);
        result += `return this.${getter}().isEmpty();`;
      }
    }
    result += `}
      return super.eIsSet(featureID);
    }`;
    return result;
  }

  private genEUnset(eClass: EClass): string {
    let result = `
    /**
     * eUnset() - provides ability to reflectively unset any feature.
     */
    public eUnset(feature: number | EStructuralFeature): void {
        const featureID: number =  typeof feature === 'number' ? feature : (<EStructuralFeature>feature).getFeatureID();
          switch (featureID) {`;
    for (const feature of eClass.getEStructuralFeatures()) {
      const featureIdField = DU.genFeatureIdFieldName(feature);
      result += `
      case ${this._packageName}.${featureIdField}:`;
      if (!feature.isMany()) {
        result += `
        this.${DU.setterName(feature)}(undefined);
        return;`;
      } else {
        const getter = DU.getterName(feature);
        result += `
        this.${getter}().clear();
        return;`;
      }
    }
    result += `}
      return super.eUnset(featureID);
    }`;
    return result;
  }

  private genEInverseAdd(eClass: EClass) {
    let result = `
    //======================================================================
    // Inverse Adders (if needed)
  
    `;
    let numSwitches = 0;
    for (const f of eClass.getEStructuralFeatures()) {
      if (f instanceof EReferenceImpl) {
        if (!f.isVolatile() && f.getEOpposite()) {
          if (numSwitches === 0) {
            result += `public eInverseAdd(otherEnd: EObject, featureID: number): void{
              switch (featureID){`;
          }
          //TODO: Do I also need to do a basic remove from container if this sets a new container?
          result += `case ${this._packageName}.${DU.genFeatureIdFieldName(f)}:`;
          if (f.isMany()) {
            result += `return (<EList<EObject>>this.${DU.getterName(
              f
            )}()).basicAdd(otherEnd);
            `;
          } else {
            if (f.getEOpposite()) {
              const oppositeFeatureField = `${
                this._packageName
              }.${DU.genFeatureIdFieldName(f.getEOpposite())}`;
              result += `if (this.${f.getName()})
              this.${f.getName()}.eInverseRemove(
                this,
                ${oppositeFeatureField}
              );`;
            }
            result += `return this.basic${DU.capitalize(DU.setterName(f))}(<${f
              .getEType()
              .getName()}>otherEnd);`;
          }
          numSwitches++;
        }
      }
    }
    if (numSwitches > 0) {
      result += `}
      return super.eInverseAdd(otherEnd,featureID);
    }`;
    }
    return result;
  }

  private genEInverseRemove(eClass: EClass) {
    let result = `
    //======================================================================
    // Inverse Removers (if needed)
  
    `;
    let numSwitches = 0;
    for (const f of eClass.getEStructuralFeatures()) {
      if (f instanceof EReferenceImpl) {
        if (!f.isVolatile() && f.getEOpposite()) {
          if (numSwitches === 0) {
            result += `public eInverseRemove(otherEnd: EObject, featureID: number): void{
                  switch (featureID){`;
          }
          result += `case ${this._packageName}.${DU.genFeatureIdFieldName(f)}:`;
          if (f.isMany()) {
            result += `return (<EList<EObject>>this.${DU.getterName(
              f
            )}()).basicRemove(otherEnd);
                `;
          } else {
            result += `return this.basic${DU.capitalize(
              DU.setterName(f)
            )}(null);`;
          }
          numSwitches++;
        }
      }
    }
    if (numSwitches > 0) {
      result += `}
          return super.eInverseRemove(otherEnd,featureID);
        }`;
    }
    return result;
  }
}
