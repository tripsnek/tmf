import { EClass } from './eclass';
import { EModelElementImpl } from './emodel-element-impl';
import { ENamedElement } from './enamed-element';

export abstract class ENamedElementImpl
  extends EModelElementImpl
  implements ENamedElement
{
  name!: string;

  public constructor(eClass?: EClass, name?: string) {
    super(eClass);
    if (name) this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
