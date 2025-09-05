#!/usr/bin/env node

import { genmodel } from '../index.js';
import { parseArgs } from 'node:util';

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    help: {
      type: 'boolean',
      short: 'h',
    },
    output: {
      type: 'string',
      short: 'o',
    },
    'overwrite-impl': {
      type: 'boolean',
    },
    format: {
      type: 'string',
    },
  },
  allowPositionals: true,
});

if (values.help) {
  console.log(`
TMF Code Generator

Usage: npx @tripsnek/tmf <ecore-file> [options]

Arguments:
  <ecore-file>        Path to the .ecore file to process

Options:
  -h, --help         Show this help message
  -o, --output       Output directory (default: same as ecore file)
  --overwrite-impl   Overwrite existing implementation files
  --format           Format output with specified tool (e.g., 'prettier')

Examples:
  npx @tripsnek/tmf ./lib/data-model/model.ecore
  npx @tripsnek/tmf model.ecore -o ./generated
  npx @tripsnek/tmf model.ecore --overwrite-impl --format prettier
`);
  process.exit(0);
}

const ecoreFile = positionals[0];

if (!ecoreFile) {
  console.error('Error: Please provide an .ecore file path');
  console.error('Run with --help for usage information');
  process.exit(1);
}

try {
  const options: any = {
    attemptFormatWithPrettier: values.format === 'prettier',
  };
  
  if (values.output !== undefined) {
    options.destinationPath = values.output;
  }
  
  if (values['overwrite-impl'] !== undefined) {
    options.overwriteImpl = values['overwrite-impl'];
  }
  
  const outputPath = await genmodel(ecoreFile, options);
  
  console.log(`✅ Generated TypeScript code at: ${outputPath}`);
} catch (error) {
  console.error('❌ Generation failed:', (error as Error).message);
  process.exit(1);
}