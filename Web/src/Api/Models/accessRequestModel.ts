export interface AccessRequestModel {
    readonly PersonId: string;
    readonly SlackUserId: string;
    readonly ChannelName: string;
    readonly ChannelId: string;
    readonly IsDisapproved: boolean;
    readonly DisapproveReason: string;
}
