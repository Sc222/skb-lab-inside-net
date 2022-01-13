export interface SlackAccessRequestModel {
    readonly Id: string;
    readonly PersonId: string;
    readonly ChannelId: string;
    readonly IsDisapproved: boolean;
    readonly DisapproveReason: string;

    //readonly SlackUserId: string;

    //fixme i think channelName and channelDescription should be removed from here
    //readonly ChannelName: string;
}
