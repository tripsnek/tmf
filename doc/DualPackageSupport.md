## Dual Package Support

This package is built as a **dual package** that works identically in both Node.js and browser environments (including Angular) using the same import syntax. This setup involves multiple TypeScript configurations and package.json modifications to ensure optimal compatibility across all JavaScript environments.

### Why Dual Packages?

Modern JavaScript environments have different module system requirements:
- **Node.js**: Prefers CommonJS (`require()`) for compatibility with existing ecosystem
- **Angular/Bundlers**: Require ESM (`import`) for tree-shaking, static analysis, and modern tooling
- **TypeScript**: Needs consistent type definitions regardless of module format

Rather than forcing users to choose between formats or use different import syntax, this package automatically serves the correct format based on how it's imported.

### TypeScript Configuration Architecture

The build system uses six specialized TypeScript configuration files, each serving a specific purpose:

#### `tsconfig.base.json`
The **foundation configuration** that contains all shared compiler options including strict type checking, decorators, path mapping, and common settings. All other configs extend this to ensure consistency while avoiding duplication.

#### `tsconfig.json` 
The **main development configuration** used by your IDE and development tools. Extends the base config with ESM settings and enables declaration generation for development-time type checking.

#### `tsconfig.build.json`
The **legacy build configuration** maintained for backward compatibility. Now essentially identical to the main tsconfig but kept as a separate entry point for existing build processes.

#### `tsconfig.esm.json`
Generates the **ESM (ES Modules) build** in `dist/esm/`. Uses `module: "ES2022"` and `moduleResolution: "Bundler"` to create modern JavaScript modules optimized for bundlers like Webpack (Angular), Rollup, and Vite. No declarations generated since types are shared.

#### `tsconfig.cjs.json`
Generates the **CommonJS build** in `dist/cjs/`. Uses `module: "CommonJS"` and `moduleResolution: "node"` to create Node.js-compatible modules. This ensures backward compatibility with existing Node.js applications and tools that expect CommonJS.

#### `tsconfig.types.json`
Generates **shared TypeScript declarations** in `dist/types/`. Uses `emitDeclarationOnly: true` to create only `.d.ts` files that work with both module formats. This prevents type duplication and ensures consistent typing across environments.

### Package.json Modifications

Several key changes to `package.json` enable the dual package functionality:

#### Module Type Declaration
```json
"type": "module"
```
Declares the package as ESM-first, which is required for the exports field to work correctly with modern Node.js versions.

#### Export Map
```json
"exports": {
  ".": {
    "import": {
      "types": "./dist/types/index.d.ts",
      "default": "./dist/esm/index.js"
    },
    "require": {
      "types": "./dist/types/index.d.ts", 
      "default": "./dist/cjs/index.js"
    }
  }
}
```
The **conditional exports** field tells Node.js and bundlers which files to load based on import method. `import` statements get ESM, `require()` calls get CommonJS, both get the same TypeScript definitions.

#### Legacy Fields
```json
"main": "./dist/cjs/index.js",
"module": "./dist/esm/index.js", 
"types": "./dist/types/index.d.ts"
```
Maintained for compatibility with older tools that don't understand the exports field.

#### Build Script Orchestration
```json
"build": "npm run clean && npm run build:types && npm run build:esm && npm run build:cjs",
"build:cjs": "tsc -p tsconfig.cjs.json && node -e \"require('fs').writeFileSync('dist/cjs/package.json', JSON.stringify({type: 'commonjs'}, null, 2))\""
```
The build process creates all three outputs (types, ESM, CommonJS) and includes a **cross-platform package.json injection** that marks the CommonJS directory as `"type": "commonjs"` to override the root package's ESM declaration.

### How It Works

When you import the package:

```typescript
// Same syntax everywhere:
import { YourClass } from '@tripsnek/tmf';
```

1. **Node.js** checks the exports field and serves `dist/cjs/index.js` (CommonJS)
2. **Angular/Webpack** uses the exports field and serves `dist/esm/index.js` (ESM)  
3. **TypeScript** in both environments uses `dist/types/index.d.ts` for type information
4. **Tree shaking** works in bundlers because they receive true ESM modules
5. **Backward compatibility** is maintained because older tools fall back to the legacy main/module fields

### Benefits

✅ **Universal compatibility** - works in Node.js, Angular, React, Vue, and any modern JavaScript environment  
✅ **Same import syntax** - no environment-specific code or import paths needed  
✅ **Tree shaking enabled** - bundlers can eliminate unused code via ESM  
✅ **Full TypeScript support** - consistent typing across all environments  
✅ **Optimal performance** - each environment gets its preferred module format  
✅ **Future-proof** - supports both current and emerging JavaScript tooling