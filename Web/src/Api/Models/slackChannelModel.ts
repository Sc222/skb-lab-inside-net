export interface SlackChannelModel {
    readonly ChannelId: string;
    readonly ChannelName: string;
    readonly IsInChannel: boolean;

    //Other
    readonly ChannelDescription: string;
}
