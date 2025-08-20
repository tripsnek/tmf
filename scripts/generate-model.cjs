const { generateFromEcore } = require('../dist/cjs/lib/source-generators/modelgenutils');

const ecoreFile = process.argv[2] || './src/__tests__/TmfTest.ecore';
console.log(`Generating model from: ${ecoreFile}`);

try {
  generateFromEcore(ecoreFile, false, undefined, true);
  console.log('Model generation completed successfully');
} catch (error) {
  console.error('Model generation failed:', error);
  process.exit(1);
}