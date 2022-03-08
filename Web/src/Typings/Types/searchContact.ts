import { PersonModel } from "../../Api/Models/personModel";

export type SearchContact = Pick<PersonModel, "id" | "avatarUrl" | "position" | "department" | "fullName">;
