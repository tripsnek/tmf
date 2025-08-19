/**
 * A drop-in replacement for xml2js that converts XML to JavaScript objects
 * with the same structure and behavior as xml2js.parseString()
 */

// Type declarations for DOM types when not available
declare global {
  interface DOMParser {
    parseFromString(source: string, mimeType: string): Document;
  }

  interface Document {
    documentElement: Element | null;
    querySelector(selector: string): Element | null;
  }

  interface Element {
    tagName: string;
    attributes: NamedNodeMap;
    childNodes: NodeList;
    textContent: string | null;
  }

  interface NamedNodeMap {
    length: number;
    [index: number]: Attr;
  }

  interface Attr {
    name: string;
    value: string;
  }

  interface NodeList {
    length: number;
    [index: number]: Node;
  }

  interface Node {
    nodeType: number;
    textContent: string | null;
  }

  const Node: {
    ELEMENT_NODE: number;
    TEXT_NODE: number;
    CDATA_SECTION_NODE: number;
  };
}

// Node type constants (in case Node global is not available)
const NODE_TYPES = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
} as const;

export interface XmlToJsOptions {
  explicitArray?: boolean; // Default: true - always use arrays for child elements
  mergeAttrs?: boolean; // Default: false - keep attributes in $ object
  explicitRoot?: boolean; // Default: true - keep root element
  ignoreAttrs?: boolean; // Default: false - include attributes
  trim?: boolean; // Default: false - trim text content
  normalize?: boolean; // Default: false - normalize whitespace
}

export class XmlToJsParser {
  private options: Required<XmlToJsOptions>;

  constructor(options: XmlToJsOptions = {}) {
    this.options = {
      explicitArray: options.explicitArray !== false,
      mergeAttrs: options.mergeAttrs === true,
      explicitRoot: options.explicitRoot !== false,
      ignoreAttrs: options.ignoreAttrs === true,
      trim: options.trim === true,
      normalize: options.normalize === true,
      ...options,
    };
  }

  /**
   * Parse XML string to JavaScript object (async version)
   */
  public parseString(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const result = this.parseStringSync(xml);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Parse XML string to JavaScript object (sync version)
   */
  public parseStringSync(xml: string): any {
    if (this.isDOMParserAvailable()) {
      return this.parseInBrowser(xml);
    } else {
      // For Node.js environment, we'll need to implement our own XML parser
      // or use a lightweight alternative
      return this.parseInNode(xml);
    }
  }

  /**
   * Check if DOMParser is available (browser environment)
   */
  private isDOMParserAvailable(): boolean {
    return (
      typeof globalThis !== 'undefined' &&
      typeof (globalThis as any).DOMParser !== 'undefined'
    );
  }

  /**
   * Browser implementation using DOMParser
   */
  private parseInBrowser(xml: string): any {
    try {
      const parser = new (globalThis as any).DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');

      // Check for parser errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error(`XML Parse Error: ${parserError.textContent}`);
      }

      if (!xmlDoc.documentElement) {
        throw new Error('Invalid XML: No document element found');
      }

      const result = this.domElementToJs(xmlDoc.documentElement, true); // true = isRootLevel

      if (this.options.explicitRoot) {
        return { [xmlDoc.documentElement.tagName]: result };
      } else {
        return result;
      }
    } catch (error) {
      throw new Error(
        `XML parsing failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Node.js implementation using simple regex-based parser
   * This is a lightweight XML parser that handles most common cases
   */
  private parseInNode(xml: string): any {
    // Remove XML declaration and comments
    xml = xml.replace(/<\?xml[^>]*\?>/g, '');
    xml = xml.replace(/<!--[\s\S]*?-->/g, '');
    xml = xml.trim();

    const stack: any[] = [];
    const result: any = {};
    let current = result;
    let isRootLevel = true;

    // Simple regex to match XML tags and content
    const tagRegex = /<\/?([^>\s]+)([^>]*)>/g;
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(xml)) !== null) {
      const [fullMatch, tagName, attributesStr] = match;
      const isClosing = fullMatch.startsWith('</');
      const isSelfClosing = fullMatch.endsWith('/>');

      // Handle text content before this tag
      if (match.index > lastIndex) {
        const textContent = xml.substring(lastIndex, match.index);
        if (textContent.trim()) {
          this.addTextContent(current, textContent);
        }
      }

      if (isClosing) {
        // Closing tag - pop from stack
        if (stack.length > 0) {
          current = stack.pop();
          if (stack.length === 0) {
            isRootLevel = true;
          }
        }
      } else {
        // Opening tag or self-closing tag
        const element: any = {};

        // Parse attributes
        if (attributesStr) {
          if (!this.options.ignoreAttrs && attributesStr.trim()) {
            const attrs = this.parseAttributes(attributesStr);
            if (Object.keys(attrs).length > 0) {
              if (this.options.mergeAttrs) {
                Object.assign(element, attrs);
              } else {
                element.$ = attrs;
              }
            }
          }
        }

        // Add element to current parent (don't force array for root level)
        if (tagName)
          this.addChildElement(current, tagName, element, isRootLevel);

        // If not self-closing, push to stack for children
        if (!isSelfClosing) {
          stack.push(current);
          current = element;
          isRootLevel = false;
        }
      }

      lastIndex = tagRegex.lastIndex;
    }

    // Handle any remaining text content
    if (lastIndex < xml.length) {
      const textContent = xml.substring(lastIndex);
      if (textContent.trim()) {
        this.addTextContent(current, textContent);
      }
    }

    // Return the root element
    const rootKeys = Object.keys(result);
    if (rootKeys.length === 1 && this.options.explicitRoot) {
      return result;
    } else if (rootKeys.length === 1) {
      return result[rootKeys[0]!];
    } else {
      return result;
    }
  }

  /**
   * Convert DOM element to JavaScript object (for browser)
   */
  private domElementToJs(element: any, isRootLevel: boolean = false): any {
    const result: any = {};

    // Handle attributes
    if (
      !this.options.ignoreAttrs &&
      element.attributes &&
      element.attributes.length > 0
    ) {
      const attrs: any = {};
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attrs[attr.name] = attr.value;
      }

      if (this.options.mergeAttrs) {
        Object.assign(result, attrs);
      } else {
        result.$ = attrs;
      }
    }

    // Group child elements by tag name
    const childElements: { [key: string]: any[] } = {};
    const textParts: string[] = [];

    // Process all child nodes
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];

      if (child.nodeType === NODE_TYPES.ELEMENT_NODE) {
        const childElement = child;
        const tagName = childElement.tagName;

        if (!childElements[tagName]) {
          childElements[tagName] = [];
        }
        childElements[tagName].push(childElement);
      } else if (
        child.nodeType === NODE_TYPES.TEXT_NODE ||
        child.nodeType === NODE_TYPES.CDATA_SECTION_NODE
      ) {
        const textContent = child.textContent || '';
        if (textContent.trim()) {
          textParts.push(textContent);
        }
      }
    }

    // Add child elements to result
    for (const [tagName, elements] of Object.entries(childElements)) {
      const childObjects = elements.map((el) => this.domElementToJs(el, false)); // children are not root level

      // Use the helper method to maintain consistency with Node.js implementation
      if (elements.length === 1) {
        this.addChildElement(result, tagName, childObjects[0], false);
      } else {
        // Multiple elements with same tag name always become arrays
        result[tagName] = childObjects;
      }
    }

    // Handle text content
    if (textParts.length > 0 && Object.keys(childElements).length === 0) {
      const textContent = textParts.join('');
      const finalText = this.options.trim ? textContent.trim() : textContent;
      if (this.options.normalize) {
        result._ = finalText.replace(/\s+/g, ' ');
      } else {
        result._ = finalText;
      }
    }

    return result;
  }

  /**
   * Parse attribute string into object
   */
  private parseAttributes(attributesStr: string): any {
    const attrs: any = {};
    const attrRegex = /(\S+)=["']([^"']*)["']/g;
    let match;

    while ((match = attrRegex.exec(attributesStr)) !== null) {
      const [, name, value] = match;
      if(name)
        attrs[name] = value;
    }

    return attrs;
  }

  /**
   * Add text content to current element
   */
  private addTextContent(current: any, textContent: string): void {
    const trimmed = textContent.trim();
    if (trimmed) {
      const finalText = this.options.trim ? trimmed : textContent;
      const normalizedText = this.options.normalize
        ? finalText.replace(/\s+/g, ' ')
        : finalText;

      if (current._) {
        current._ += normalizedText;
      } else {
        current._ = normalizedText;
      }
    }
  }

  /**
   * Add child element to parent
   */
  private addChildElement(
    parent: any,
    tagName: string,
    element: any,
    isRootLevel: boolean = false
  ): void {
    if (parent[tagName]) {
      // Convert to array if not already
      if (!Array.isArray(parent[tagName])) {
        parent[tagName] = [parent[tagName]];
      }
      parent[tagName].push(element);
    } else {
      // For root level elements, don't force array even if explicitArray is true
      // xml2js only uses arrays for child elements, not the root element
      if (this.options.explicitArray && !isRootLevel) {
        parent[tagName] = [element];
      } else {
        parent[tagName] = element;
      }
    }
  }
}

// Default instance with xml2js-compatible defaults
const defaultParser = new XmlToJsParser({
  explicitArray: true,
  mergeAttrs: false,
  explicitRoot: true,
  ignoreAttrs: false,
  trim: false,
  normalize: false,
});

/**
 * Drop-in replacement for xml2js.parseString()
 */
export function parseString(
  xml: string,
  callback?: (err: Error | null, result?: any) => void
): Promise<any> {
  if (callback) {
    defaultParser
      .parseString(xml)
      .then((result) => callback(null, result))
      .catch((err) => callback(err));
    return Promise.resolve();
  } else {
    return defaultParser.parseString(xml);
  }
}

/**
 * Synchronous version
 */
export function parseStringSync(xml: string): any {
  return defaultParser.parseStringSync(xml);
}
