import { Location } from "../addresses/location";
import { IdentifierType } from "./identifierType";

export interface Identifier {
  identifier?: string;
  uuid?: string;
  preferred?: boolean;
  location?: Location;
  identifierType?: IdentifierType;
}
