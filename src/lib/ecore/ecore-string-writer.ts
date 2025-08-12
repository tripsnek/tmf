import { EPackage } from '../metamodel/epackage';
import { EClass } from '../metamodel/eclass';
import { EClassifier } from '../metamodel/eclassifier';
import { EDataType } from '../metamodel/edata-type';
import { EEnum } from '../metamodel/eenum';
import { EStructuralFeature } from '../metamodel/estructural-feature';
import { EAttribute } from '../metamodel/eattribute';
import { EReference } from '../metamodel/ereference';
import { EOperation } from '../metamodel/eoperation';
import { EParameter } from '../metamodel/eparameter';
import { EEnumLiteral } from '../metamodel/eenum-literal';
import { EEnumImpl } from '../metamodel/eenum-impl';
import { EClassImpl } from '../metamodel/eclass-impl';
import { EDataTypeImpl } from '../metamodel/edata-type-impl';
import { EAttributeImpl } from '../metamodel/eattribute-impl';

/**
 * Writes EPackage metamodels to Ecore XML string format.
 * This class handles the core writing logic without file system dependencies.
 */
export class EcoreStringWriter {
  private indentLevel = 0;
  private indentString = '    ';
  
  /**
   * Converts an EPackage to Ecore XML string format.
   * @param ePackage The root package to serialize
   * @returns The XML string representation
   */
  public writeToString(ePackage: EPackage): string {
    const xml = this.buildPackageXml(ePackage, true);
    return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
  }
  
  /**
   * Builds the XML for a package.
   */
  private buildPackageXml(ePackage: EPackage, isRoot: boolean = false): string {
    const indent = this.getIndent();
    let xml = '';
    
    if (isRoot) {
      // Root package with full namespace declarations
      xml = `<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore"`;
    } else {
      xml = `${indent}<eSubpackages`;
    }
    
    // Add package attributes
    xml += ` name="${this.escapeXml(ePackage.getName())}"`;
    if (ePackage.getNsURI()) {
      xml += ` nsURI="${this.escapeXml(ePackage.getNsURI())}"`;
    }
    if (ePackage.getNsPrefix()) {
      xml += ` nsPrefix="${this.escapeXml(ePackage.getNsPrefix())}"`;
    }
    xml += '>';
    
    this.indentLevel++;
    
    // Add classifiers
    for (const classifier of ePackage.getEClassifiers()) {
      xml += '\n' + this.buildClassifierXml(classifier, ePackage);
    }
    
    // Add subpackages
    for (const subPackage of ePackage.getESubPackages()) {
      xml += '\n' + this.buildPackageXml(subPackage, false);
    }
    
    this.indentLevel--;
    
    if (isRoot) {
      xml += '\n</ecore:EPackage>';
    } else {
      xml += `\n${indent}</eSubpackages>`;
    }
    
    return xml;
  }
  
  /**
   * Builds the XML for a classifier (EClass, EEnum, or EDataType).
   */
  private buildClassifierXml(classifier: EClassifier, containingPackage: EPackage): string {
    const indent = this.getIndent();
    
    if (classifier instanceof EEnumImpl) {
      return this.buildEnumXml(classifier as EEnum);
    } else if (classifier instanceof EClassImpl) {
      return this.buildClassXml(classifier as EClass, containingPackage);
    } else if (classifier instanceof EDataTypeImpl) {
      return this.buildDataTypeXml(classifier as EDataType);
    }
    
    return '';
  }
  
  /**
   * Builds the XML for an EClass.
   */
  private buildClassXml(eClass: EClass, containingPackage: EPackage): string {
    const indent = this.getIndent();
    let xml = `${indent}<eClassifiers xsi:type="ecore:EClass" name="${this.escapeXml(eClass.getName())}"`;
    
    // Add super types if any
    const superTypes = eClass.getESuperTypes();
    if (superTypes && superTypes.size() > 0) {
      const superTypeRefs: string[] = [];
      for (let i = 0; i < superTypes.size(); i++) {
        const superType = superTypes.get(i);
        superTypeRefs.push(this.getClassifierReference(superType, containingPackage));
      }
      xml += ` eSuperTypes="${superTypeRefs.join(' ')}"`;
    }
    
    // Add abstract/interface flags if set
    if (eClass.isAbstract()) {
      xml += ' abstract="true"';
    }
    if (eClass.isInterface()) {
      xml += ' interface="true"';
    }
    
    // Check if class has content
    const hasFeatures = eClass.getEStructuralFeatures() && eClass.getEStructuralFeatures().size() > 0;
    const hasOperations = eClass.getEOperations() && eClass.getEOperations().size() > 0;
    
    if (!hasFeatures && !hasOperations) {
      xml += '/>';
      return xml;
    }
    
    xml += '>';
    this.indentLevel++;
    
    // Add operations
    if (hasOperations) {
      for (let i = 0; i < eClass.getEOperations().size(); i++) {
        const operation = eClass.getEOperations().get(i);
        xml += '\n' + this.buildOperationXml(operation, containingPackage);
      }
    }
    
    // Add structural features
    if (hasFeatures) {
      for (let i = 0; i < eClass.getEStructuralFeatures().size(); i++) {
        const feature = eClass.getEStructuralFeatures().get(i);
        xml += '\n' + this.buildFeatureXml(feature, containingPackage);
      }
    }
    
    this.indentLevel--;
    xml += `\n${indent}</eClassifiers>`;
    
    return xml;
  }
  
  /**
   * Builds the XML for an EOperation.
   */
  private buildOperationXml(operation: EOperation, containingPackage: EPackage): string {
    const indent = this.getIndent();
    let xml = `${indent}<eOperations name="${this.escapeXml(operation.getName())}"`;
    
    // Add return type if present
    if (operation.getEType()) {
      xml += ` eType="${this.getClassifierReference(operation.getEType(), containingPackage)}"`;
    }
    
    // Add upper bound if not 1
    if (operation.getUpperBound() !== 1 && operation.getUpperBound() !== undefined && operation.getUpperBound()!==-2) {
      xml += ` upperBound="${operation.getUpperBound()}"`;
    }
    
    // Check if operation has parameters
    const hasParameters = operation.getEParameters() && operation.getEParameters().size() > 0;
    
    if (!hasParameters) {
      xml += '/>';
      return xml;
    }
    
    xml += '>';
    this.indentLevel++;
    
    // Add parameters
    for (let i = 0; i < operation.getEParameters().size(); i++) {
      const param = operation.getEParameters().get(i);
      xml += '\n' + this.buildParameterXml(param, containingPackage);
    }
    
    this.indentLevel--;
    xml += `\n${indent}</eOperations>`;
    
    return xml;
  }
  
  /**
   * Builds the XML for an EParameter.
   */
  private buildParameterXml(parameter: EParameter, containingPackage: EPackage): string {
    const indent = this.getIndent();
    let xml = `${indent}<eParameters name="${this.escapeXml(parameter.getName())}"`;
    
    if (parameter.getUpperBound() !== 1 && parameter.getUpperBound() !== undefined && parameter.getUpperBound()!==-2) {
      xml += ` upperBound="${parameter.getUpperBound()}"`;
    }

    if (parameter.getEType()) {
      xml += ` eType="${this.getClassifierReference(parameter.getEType(), containingPackage)}"`;
    }
      
    xml += '/>';
    return xml;
  }
  
  /**
   * Builds the XML for a structural feature (EAttribute or EReference).
   */
  private buildFeatureXml(feature: EStructuralFeature, containingPackage: EPackage): string {
    const indent = this.getIndent();
    const isAttribute = feature instanceof EAttributeImpl;
    const featureType = isAttribute ? 'ecore:EAttribute' : 'ecore:EReference';
    
    let xml = `${indent}<eStructuralFeatures xsi:type="${featureType}" name="${this.escapeXml(feature.getName())}"`;
    
    // Add type
    if (feature.getEType()) {
      xml += ` eType="${this.getClassifierReference(feature.getEType(), containingPackage)}"`;
    }
    
    // Add bounds if not default
    if (feature.getLowerBound() !== undefined && feature.getLowerBound() !== 0 && feature.getLowerBound()!==-2) {
      xml += ` lowerBound="${feature.getLowerBound()}"`;
    }
    if (feature.getUpperBound() !== undefined && feature.getUpperBound() !== 1 && feature.getUpperBound()!==-2) {
      xml += ` upperBound="${feature.getUpperBound()}"`;
    }
    
    // Add feature-specific attributes
    if (isAttribute) {
      const attr = feature as EAttribute;
      if (attr.isId()) {
        xml += ' iD="true"';
      }
    } else {
      const ref = feature as EReference;
      if (ref.isContainment()) {
        xml += ' containment="true"';
      }
      if (ref.getEOpposite()) {
        xml += ` eOpposite="${this.getFeatureReference(ref.getEOpposite())}"`;
      }
    }
    
    // Add other properties
    if (feature.isTransient()) {
      xml += ' transient="true"';
    }
    if (feature.isDerived()) {
      xml += ' derived="true"';
    }
    if (!feature.isChangeable()) {
      xml += ' changeable="false"';
    }
    if (feature.isVolatile()) {
      xml += ' volatile="true"';
    }
    if (feature.getDefaultValueLiteral()) {
      xml += ` defaultValueLiteral="${this.escapeXml(feature.getDefaultValueLiteral())}"`;
    }
    
    xml += '/>';
    return xml;
  }
  
  /**
   * Builds the XML for an EEnum.
   */
  private buildEnumXml(eEnum: EEnum): string {
    const indent = this.getIndent();
    let xml = `${indent}<eClassifiers xsi:type="ecore:EEnum" name="${this.escapeXml(eEnum.getName())}"`;
    
    const hasLiterals = eEnum.getELiterals() && eEnum.getELiterals().size() > 0;
    
    if (!hasLiterals) {
      xml += '/>';
      return xml;
    }
    
    xml += '>';
    this.indentLevel++;
    
    // Add enum literals
    for (let i = 0; i < eEnum.getELiterals().size(); i++) {
      const literal = eEnum.getELiterals().get(i);
      xml += '\n' + this.buildEnumLiteralXml(literal);
    }
    
    this.indentLevel--;
    xml += `\n${indent}</eClassifiers>`;
    
    return xml;
  }
  
  /**
   * Builds the XML for an EEnumLiteral.
   */
  private buildEnumLiteralXml(literal: EEnumLiteral): string {
    const indent = this.getIndent();
    let xml = `${indent}<eLiterals name="${this.escapeXml(literal.getName())}"`;
    
    if (literal.getValue() !== undefined && literal.getValue() !== null) {
      xml += ` value="${literal.getValue()}"`;
    }
    
    if (literal.getLiteral() && literal.getLiteral() !== literal.getName()) {
      xml += ` literal="${this.escapeXml(literal.getLiteral())}"`;
    }
    
    xml += '/>';
    return xml;
  }
  
  /**
   * Builds the XML for an EDataType.
   */
  private buildDataTypeXml(dataType: EDataType): string {
    const indent = this.getIndent();
    let xml = `${indent}<eClassifiers xsi:type="ecore:EDataType" name="${this.escapeXml(dataType.getName())}"`;
    
    if (dataType.getInstanceClassName()) {
      xml += ` instanceClassName="${this.escapeXml(dataType.getInstanceClassName())}"`;
    }
    
    xml += '/>';
    return xml;
  }
  
  /**
   * Gets a reference string for a classifier.
   */
  private getClassifierReference(classifier: EClassifier, fromPackage: EPackage): string {
    // Check if it's a primitive type
    const primitiveTypes = ['EString', 'EBoolean', 'EDouble', 'EDoubleObject', 
                           'EFloat', 'EFloatObject', 'EInt', 'EIntegerObject', 'EDate'];
    if (primitiveTypes.includes(classifier.getName())) {
      return `ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//${classifier.getName()}`;
    }
    
    // Build reference path
    return this.buildReferencePath(classifier, fromPackage);
  }
  
  /**
   * Gets a reference string for a feature.
   */
  private getFeatureReference(feature: EStructuralFeature): string {
    const containingClass = feature.getEContainingClass();
    if (!containingClass) {
      return `#//${feature.getName()}`;
    }
    
    return `#//${containingClass.getName()}/${feature.getName()}`;
  }
  
  /**
   * Builds a reference path to a classifier.
   */
  private buildReferencePath(classifier: EClassifier, fromPackage: EPackage): string {
    const classifierPackage = classifier.getEPackage();
    
    // If in same package, use simple reference
    if (classifierPackage === fromPackage) {
      return `#//${classifier.getName()}`;
    }
    
    // Build full path
    const path = this.getPackagePath(classifierPackage);
    return `#//${path.join('/')}/${classifier.getName()}`;
  }
  
  /**
   * Gets the path to a package from root.
   */
  private getPackagePath(pkg: EPackage): string[] {
    const path: string[] = [];
    let current = pkg;
    
    while (current) {
      path.unshift(current.getName());
      current = current.getESuperPackage();
    }
    
    // Remove root package name from path
    if (path.length > 0) {
      path.shift();
    }
    
    return path;
  }
  
  /**
   * Escapes special XML characters.
   */
  private escapeXml(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
  
  /**
   * Gets the current indentation string.
   */
  private getIndent(): string {
    return this.indentString.repeat(this.indentLevel);
  }
}