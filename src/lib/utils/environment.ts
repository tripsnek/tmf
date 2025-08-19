// Type-safe global checks
declare const window: any;
declare const document: any;
declare const process: any;
declare const DOMParser: any;

/**
 * Enables enviromental checks for conditional imports, ensuring
 * that Node functionality in bundle that is not used does not cause
 * issues in browsers or WebView
 */
export class Environment {
  private static _isNode: boolean | null = null;
  private static _isBrowser: boolean | null = null;

  static get isNode(): boolean {
    if (this._isNode === null) {
      try {
        this._isNode = typeof process !== 'undefined' && 
                       process.versions != null && 
                       process.versions.node != null;
      } catch {
        this._isNode = false;
      }
    }
    return this._isNode;
  }

  static get isBrowser(): boolean {
    if (this._isBrowser === null) {
      try {
        this._isBrowser = typeof window !== 'undefined' && 
                          typeof document !== 'undefined';
      } catch {
        this._isBrowser = false;
      }
    }
    return this._isBrowser;
  }

  static get hasDOMParser(): boolean {
    try {
      return typeof DOMParser !== 'undefined';
    } catch {
      return false;
    }
  }

  static requireNodeEnvironment(operation: string): void {
    if (!this.isNode) {
      throw new Error(`${operation} is only available in Node.js environment`);
    }
  }
}

// Conditional imports helper - now redundant but kept for backward compatibility
export class ConditionalImports {
  private static nodeModules: Map<string, any> = new Map();

  /**
   * @deprecated Use direct dynamic imports instead: await import('moduleName')
   * This method is kept for backward compatibility but direct imports are preferred
   */
  static async getNodeModule(moduleName: string): Promise<any> {
    Environment.requireNodeEnvironment(`Loading ${moduleName}`);
    
    if (!this.nodeModules.has(moduleName)) {
      try {
        const module = await import(moduleName);
        this.nodeModules.set(moduleName, module);
        return module;
      } catch (error: any) {
        throw new Error(`Failed to load Node.js module '${moduleName}': ${error.message}`);
      }
    }
    
    return this.nodeModules.get(moduleName);
  }

  /**
   * Helper method for safe dynamic imports with better error messages
   */
  static async safeImport(moduleName: string, operation: string): Promise<any> {
    Environment.requireNodeEnvironment(operation);
    
    try {
      return await import(moduleName);
    } catch (error: any) {
      throw new Error(`${operation} failed: Cannot load '${moduleName}' module. This operation requires Node.js environment. ${error.message}`);
    }
  }
}