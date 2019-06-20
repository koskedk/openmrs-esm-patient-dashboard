import { Person } from "./person";
import { Identifier } from "../identifiers/identifier";

export interface Patient {
  uuid?: string;
  display?: string;
  identifiers?: Identifier[];
  person?: Person;
}
