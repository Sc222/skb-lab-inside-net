import { PersonModel } from "./personModel";

export interface SlackAccessRequestModel {
    readonly id: string;
    readonly channelId: string;
    readonly channelName: string;
    readonly isDisapproved: boolean;
    //readonly Status: "pending" | "approved" | "disapproved"; //todo: replace with status: pending, approved, disapproved
    readonly disapproveReason: string;
    readonly person: PersonModel;
}
