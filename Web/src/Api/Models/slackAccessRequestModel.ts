export interface SlackAccessRequestModel {
    readonly Id: string;
    readonly PersonId: string;
    readonly ChannelId: string;
    readonly Status: "pending" | "approved" | "disapproved"; //todo: replace with status: pending, approved, disapproved
    readonly AdminMessage: string;

    //readonly SlackUserId: string;

    //fixme i think channelName and channelDescription should be removed from here
    //readonly ChannelName: string;
}
