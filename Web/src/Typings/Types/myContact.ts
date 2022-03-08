import { PersonModel } from "../../Api/Models/personModel";

export type MyContact = Pick<
    PersonModel,
    "email" | "phoneNumber" | "id" | "avatarUrl" | "position" | "department" | "fullName"
>;
