import { PersonModel } from "../../Api/Models/personModel";

export type MyContact = Pick<
    PersonModel,
    "Email" | "PhoneNumber" | "Id" | "AvatarUrl" | "Position" | "Department" | "FullName"
>;
