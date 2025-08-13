import { EObject } from "@tripsnek/tmf";
import { TUtils } from "@tripsnek/tmf";
import { EStructuralFeature } from "@tripsnek/tmf";
import { BasicEList } from "@tripsnek/tmf";
import { EClass } from "@tripsnek/tmf";
import { EList } from "@tripsnek/tmf";
import { EEnum } from "@tripsnek/tmf";
import { EDataType } from "@tripsnek/tmf";
import { EObjectImpl } from "@tripsnek/tmf";

import { NamedEntity } from "../api/named-entity";
import { Foo } from "../api/foo";
import { Bazzle } from "../api/bazzle";
import { User } from "../api/user";
import { BarGen } from "../gen/bar-gen";
import { Bar } from "../api/bar";

/**
 * Editable Impl class.
 */
export class BarImpl extends BarGen {}
