import { PersonModel } from "../../Api/Models/personModel";

export type SearchContact = Pick<PersonModel, "Id" | "AvatarUrl" | "Position" | "Department" | "FullName">;
