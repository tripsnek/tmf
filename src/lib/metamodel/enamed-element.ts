import { EModelElement } from './emodel-element';

export interface ENamedElement extends EModelElement {
  name: string;

  getName(): string;

  setName(name: string);
}
