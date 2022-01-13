//FIXME use normal model instead
export interface SlackAccessRequestModelExtended {
    readonly Id: string;
    readonly PersonId: string;
    readonly SlackUserId: string;
    readonly ChannelId: string;
    readonly IsDisapproved: boolean;
    readonly DisapproveReason: string;

    //fixme it's temporary
    readonly ChannelName: string;
    readonly PersonName: string;
    readonly PersonAvatar?: string;
}
