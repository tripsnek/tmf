# development.md

This file provides guidance on the structure of the TMF codebase.

## Project Overview

TMF (TypeScript Modeling Framework) is a TypeScript port of the Eclipse Modeling Framework (EMF) that provides runtime reflection, code generation, and model-driven development capabilities. It's a metamodeling library that generates type-safe TypeScript classes from .ecore model definitions.

## Common Commands

### Build and Development
- `npm run build` - Clean build of the library using TypeScript compiler
- `npm run build:watch` - Watch mode for development 
- `npm run clean` - Remove dist directory
- `npm run prepublishOnly` - Build before publishing

### Testing and Quality
- `npm test` - Run all Jest tests
- `npm run lint` - Lint source code with ESLint 
- `npm run format` - Format code with Prettier

### Code Generation
- `npm run gen-model` - Generate TypeScript from test .ecore models (runs `src/__tests__/scripts/generate.mjs`)
- `node generate.mjs` - Generate from custom .ecore files using the root generate script

## Architecture Overview

### Core Components

**Metamodel Layer** (`src/lib/metamodel/`)
- API interfaces (`api/`) define the metamodel structure (EObject, EClass, EAttribute, EReference, etc.)
- Implementation classes (`impl/`) provide concrete implementations
- `ecorepackage.ts` - Core Ecore metamodel package
- `basicelist.ts` - Observable collections for model consistency

**JSON Serialization** (`src/lib/json/`)
- `tjson.ts` - Core serialization engine with `makeJson()` and `makeEObject()` methods
- `serialized-reference.ts` - Handles cross-references in object graphs

**Code Generation** (`src/lib/source-generators/`)
- `tgenerator-main.ts` - Main generator orchestrator
- Individual generators for APIs, implementations, factories, packages, enums
- Generates from .ecore files to TypeScript classes with full metamodel support

**Ecore Processing** (`src/lib/ecore/`)
- `ecoreparser.ts`/`ecorewriter.ts` - Parse and write .ecore XML files
- String-based parsers for alternate formats

**Utilities**
- `tutils.ts` - Core utilities including cloning, reflection helpers, root class detection
- Generated test models in `src/__tests__/src/model/` demonstrate complex hierarchies

### Key Patterns

**Containment Hierarchies**: Parent-child relationships with automatic lifecycle management
**Inverse References**: Bidirectional relationships maintained automatically
**Runtime Reflection**: Full introspection of model structure via EClass/EStructuralFeature APIs
**Observable Collections**: EList collections that maintain model integrity

### Generated Code Structure

Generated models follow this pattern:
```
generated/
├── api/                        # Interface definitions
├── impl/                       # Concrete implementations  
├── gen/                        # Generated base classes
├── <package-name>-factory.ts   # Factory for creating instances
├── <package-name>-package.ts   # Package metadata
└── index.ts                    # Barrel exports
```

## Development Notes

- Uses ES modules with .js imports in TypeScript files
- Tests are co-located in `src/__tests__/` with complex generated test models
- TypeScript compilation targets ES2022 with bundler module resolution
- Package exports both library code and code generation tools
- VSCode extension (TMF Ecore Editor) provides visual model editing