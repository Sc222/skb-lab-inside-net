//FIXME use normal model instead
export interface SlackAccessRequestModelExtended {
    readonly Id: string;
    readonly PersonId: string;
    readonly SlackUserId: string;
    readonly ChannelId: string;
    readonly Status: "pending" | "approved" | "disapproved";
    readonly AdminMessage: string;

    //fixme it's temporary
    readonly ChannelName: string;
    readonly PersonName: string;
    readonly PersonPosition: string;
    readonly PersonAvatar?: string;
}
