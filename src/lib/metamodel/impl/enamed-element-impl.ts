import { EClass } from '../api/eclass.js';
import { EModelElementImpl } from './emodel-element-impl.js';
import { ENamedElement } from '../api/enamed-element.js';

export abstract class ENamedElementImpl
  extends EModelElementImpl
  implements ENamedElement
{
  name!: string;

  public constructor(name?: string) {
    super();
    if (name) this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
