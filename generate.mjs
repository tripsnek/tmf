import { generateFromEcore } from '@tripsnek/tmf';
await generateFromEcore(process.argv[2] || './src/__tests__/TmfTest.ecore', null, false, true);