import { EcoreStringParser, EcoreWriter, EPackage } from '@tripsnek/tmf';
import { EClass } from '@tripsnek/tmf';
import { EcoreParser } from '@tripsnek/tmf';

describe('EcoreParser', () => {
  it('should create an instance', () => {
    expect(new EcoreParser()).toBeTruthy();
  });

  //parse the ecore file
  const parser: EcoreParser = new EcoreParser();

  //verify we can convert XML to JSON string, then parse THAT after simple JSON parse (useful for vscode extension)
  const jsonString = JSON.stringify(parser.xmlToJs(parser.fileToXmlString('src/__tests__/TMFTest.ecore')));

  const rootPkg: EPackage = new EcoreStringParser().parseFromJsString(jsonString);
  // console.log(tutils.safeStringify(rootPkg));

  const writer: EcoreWriter = new EcoreWriter();
  const writtenXml = writer.writeToString(rootPkg);

  //validate the correct number of subpackages
  const corePkg = rootPkg.getESubPackageByName('core');

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

  it('should write back to ecore', () => {
    expect(writtenXml).toContain('<eParameters name="bazzles" upperBound="-1" eType="#//Bazzle"/>');
  });


});
