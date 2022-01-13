export interface SlackChannelModel {
    readonly ChannelId: string;
    readonly ChannelName: string;
    readonly IsInChannel: boolean;

    //Other
    readonly ChannelDescription: string;
   // readonly IsRequested: boolean;//todo временно, затем вместо этого поля запрашивать AccessRequest'ы
}
