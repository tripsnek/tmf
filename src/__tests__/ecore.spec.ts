import { EcoreStringParser, EcoreWriter, EPackage } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EcoreParser } from '@tripsnek/tmf';

describe('EcoreParser', () => {
  //parse the ecore file
  const parser: EcoreParser = new EcoreParser();

  //verify we can convert XML to JSON string, then parse THAT after simple JSON parse (useful for vscode extension)
  const jsonString = JSON.stringify(
    parser.xmlToJs(parser.fileToXmlString('src/__tests__/TMFTest.ecore'))
  );
  // console.log(jsonString);

  const rootPkg: EPackage = new EcoreStringParser().parseFromJsString(
    jsonString
  );
  // console.log(tutils.safeStringify(rootPkg));

  const writer: EcoreWriter = new EcoreWriter();
  const writtenXml = writer.writeToString(rootPkg);
  // console.log(writtenXml);

  //validate the correct number of subpackages
  const corePkg = rootPkg.getESubPackageByName('core');

  it('should create an instance', () => {
    expect(new EcoreParser()).toBeTruthy();
  });

  it('should parse subpackages', () => {
    expect(rootPkg.getESubPackages().size()).toBe(2);
    expect(corePkg).toBeTruthy();
  });

  //verify concrete class
  const foo: EClass = corePkg.getEClassifier('Foo') as EClass;
  it('should parse eclasses', () => {
    expect(foo).toBeTruthy();
  });

  //verify attribute
  const fooClass = foo.getEStructuralFeature('fooClass');
  it('should parse eattributes', () => {
    expect(fooClass).toBeTruthy();
  });

  it('rewritten ecore has correct paths in root package references', () => {
    expect(writtenXml).toContain(
      '<eStructuralFeatures xsi:type="ecore:EReference" name="contained" eType="#//ContainedRootType" upperBound="-1" containment="true"/>'
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
