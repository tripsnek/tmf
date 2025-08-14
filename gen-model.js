require('ts-node/register');
const { generateFromEcore } = require('./src/lib/source-generators/modelgenutils');

generateFromEcore(process.argv[2] || './src/__tests__/TmfTest.ecore', null, false, true);