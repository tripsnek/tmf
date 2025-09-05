import { genmodel } from '@tripsnek/tmf';
await genmodel('./src/__tests__/TmfTest.ecore', { 
  attemptFormatWithPrettier: true 
});