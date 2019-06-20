import { PreferredAddress } from "../addresses/preferredAddress";
import { PreferredName } from "./preferredName";

export interface Person {
  uuid?: string;
  display?: string;
  gender?: string;
  birthdate?: Date;
  dead?: boolean;
  age?: number;
  deathDate?: any;
  birthdateEstimated?: boolean;
  causeOfDeath?: any;
  preferredName?: PreferredName;
  attributes?: any[];
  preferredAddress?: PreferredAddress;
}
