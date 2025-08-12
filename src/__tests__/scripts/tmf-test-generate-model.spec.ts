import { generateFromEcore } from "../../lib/source-generators/modelgenutils";

describe('test model', () => {
  it('should generate model', () => {
    generateFromEcore('./src/__tests__/TmfTest.ecore',false,'..');
  });
});
