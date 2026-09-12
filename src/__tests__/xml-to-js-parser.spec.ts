import { EcoreParser } from '@tripsnek/tmf';

// Regression tests for https://github.com/tripsnek/tmf/issues/1
//
// The Node.js XML parser (xml-to-js-parser.ts) tokenizes tags with a regex
// that has no notion of quoted attribute values:
//   /<\/?([^>\s]+)([^>]*)>/g
// XML only requires '<' and '&' to be escaped inside attribute values, so a
// literal '>' there (e.g. GenModel documentation annotations) truncates the
// match early. The rest of the attribute string leaks out as bogus text
// content and every element that follows gets nested one level too deep,
// silently corrupting the parsed structure instead of raising an error.

function wrapEcore(inner: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" name="model" nsURI="http://x" nsPrefix="x">
  ${inner}
  <eClassifiers xsi:type="ecore:EClass" name="Bar"/>
</ecore:EPackage>`;
}

const parser = new EcoreParser();

describe('EcoreParser XML tokenizer edge cases', () => {
  it('parses an attribute value containing an unescaped ">" on a self-closing tag (issue #1 repro)', () => {
    const xml = wrapEcore(`
  <eClassifiers xsi:type="ecore:EClass" name="Foo">
    <eAnnotations source="http://www.eclipse.org/emf/2002/GenModel">
      <details key="documentation" value="a &lt;b> c"/>
    </eAnnotations>
  </eClassifiers>`);

    const js = parser.xmlToJs(xml);
    const classifiers = js['ecore:EPackage'].eClassifiers;

    // 'Bar' must be a sibling of 'Foo', not nested inside it
    expect(classifiers).toHaveLength(2);
    expect(classifiers[0].$.name).toBe('Foo');
    expect(classifiers[1].$.name).toBe('Bar');

    const details = classifiers[0].eAnnotations[0].details[0];
    expect(details.$.value).toBe('a &lt;b> c');

    // and the full pipeline should surface both classifiers
    const pkg = parser.parseFromXmlString(xml);
    expect(pkg.getEClassifiers().size()).toBe(2);
    expect(pkg.getEClassifier('Foo')).toBeTruthy();
    expect(pkg.getEClassifier('Bar')).toBeTruthy();
  });

  it('parses an attribute value containing an unescaped ">" on a non-self-closing tag', () => {
    const xml = wrapEcore(`
  <eClassifiers xsi:type="ecore:EClass" name="Foo">
    <eAnnotations source="test > value">
      <details key="documentation" value="doc"/>
    </eAnnotations>
  </eClassifiers>`);

    const js = parser.xmlToJs(xml);
    const classifiers = js['ecore:EPackage'].eClassifiers;

    expect(classifiers).toHaveLength(2);
    expect(classifiers[1].$.name).toBe('Bar');

    const annotation = classifiers[0].eAnnotations[0];
    expect(annotation.$.source).toBe('test > value');
    expect(annotation.details[0].$.value).toBe('doc');
  });

  it('parses an attribute value containing an unescaped ">" inside single quotes', () => {
    const xml = wrapEcore(`
  <eClassifiers xsi:type="ecore:EClass" name="Foo">
    <eAnnotations source='http://www.eclipse.org/emf/2002/GenModel'>
      <details key='documentation' value='a > b'/>
    </eAnnotations>
  </eClassifiers>`);

    const js = parser.xmlToJs(xml);
    const classifiers = js['ecore:EPackage'].eClassifiers;

    expect(classifiers).toHaveLength(2);
    expect(classifiers[1].$.name).toBe('Bar');
    expect(classifiers[0].eAnnotations[0].details[0].$.value).toBe('a > b');
  });

  it('parses a CDATA section containing markup characters', () => {
    const xml = wrapEcore(`
  <eClassifiers xsi:type="ecore:EClass" name="Foo">
    <eAnnotations source="http://www.eclipse.org/emf/2002/GenModel">
      <details key="documentation"><![CDATA[some <html> content]]></details>
    </eAnnotations>
  </eClassifiers>`);

    const js = parser.xmlToJs(xml);
    const classifiers = js['ecore:EPackage'].eClassifiers;

    expect(classifiers).toHaveLength(2);
    expect(classifiers[1].$.name).toBe('Bar');
    expect(classifiers[0].eAnnotations[0].details[0]._).toBe(
      'some <html> content'
    );
  });
});
