# Custom Directory

This directory is automatically created by the TMF code generator to store your custom TypeScript files.

## Purpose

Files placed in this directory (and its subdirectories) are automatically exported in the barrel file (index.ts)
alongside the generated model code. This allows you to:

- Add custom utility functions related to your model
- Create custom business logic that works with your model
- Add helper types and interfaces

## Usage

- Place any `.ts` files in this directory or its subdirectories
- **GENERATE YOUR MODEL AGAIN**: All \`.ts\` files will be automatically included in the barrel exports
- Files are exported using relative paths from the project root
- The directory structure is preserved in the export paths

## Examples

```typescript
// src/custom/utilities.ts
export function customModelHelper() {
  // Your custom code here
}

// src/custom/types/custom-types.ts
export interface CustomModelExtension {
  // Your custom types here
}
```

These will automatically be exported as:

```typescript
export * from './src/custom/utilities';
export * from './src/custom/types/custom-types';
```
