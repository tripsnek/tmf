import { EcoreStringParser, EcoreWriter, EPackage } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EcoreParser } from '@tripsnek/tmf';
import path from 'path';
import fs from 'fs';
import { CorePackage } from './src/model/core/core-package';

//parse the ecore file
const parser: EcoreParser = new EcoreParser();

let rootPkg!: EPackage;
let corePkg!: CorePackage;
let writtenXml!: string;
let foo!: EClass;

beforeAll(async () => {
  const xmlString = fs.readFileSync(path.resolve('src/__tests__/TMFTest.ecore'), "utf8");

  const jsonString = JSON.stringify(
    parser.xmlToJs(
      xmlString
    )
  );

  rootPkg = new EcoreStringParser().parseFromJsString(jsonString);

  const writer: EcoreWriter = new EcoreWriter();
  writtenXml = writer.writeToString(rootPkg);
  // console.log(writtenXml);

  //validate the correct number of subpackages
  corePkg = rootPkg.getESubPackageByName('core');

  //verify concrete class
  foo = corePkg.getEClassifier('Foo') as EClass;
});

describe('EcoreParser', () => {
  //verify we can convert XML to JSON string, then parse THAT after simple JSON parse (useful for vscode extension)
  // console.log(jsonString);

  // console.log(tutils.safeStringify(rootPkg));

  it('should create an instance', () => {
    expect(new EcoreParser()).toBeTruthy();
  });

  it('should parse subpackages', () => {
    expect(rootPkg.getESubPackages().size()).toBe(2);
    expect(corePkg).toBeTruthy();
  });

  it('should parse eclasses', () => {
    expect(foo).toBeTruthy();
  });

  //verify attribute

  it('should parse eattributes', () => {
    const fooClass = foo.getEStructuralFeature('fooClass');
    expect(fooClass?.getName()).toBe('fooClass');
  });

  it('rewritten ecore has correct paths in root package references', () => {
    expect(writtenXml).toContain(
      '<eStructuralFeatures xsi:type="ecore:EReference" name="contained" eType="#//ContainedRootType" upperBound="-1" containment="true" eOpposite="#//ContainedRootType/container"/>'
    );
  });

  it('rewritten ecore has parameters', () => {
    expect(writtenXml).toContain(
      '<eParameters name="bazzles" upperBound="-1" eType="#//core/Bazzle"/>'
    );
  });

  it('rewritten ecore has correct package relative paths in references', () => {
    expect(writtenXml).toContain(
      '<eClassifiers xsi:type="ecore:EClass" name="NamedEntity" eSuperTypes="#//core/IdedEntity" abstract="true">'
    );
  });

  it('rewritten ecore has correct paths in eopposites', () => {
    expect(writtenXml).toContain('eOpposite="#//core/Bazzle/backupBar"');
  });
});
