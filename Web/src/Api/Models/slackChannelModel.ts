export interface SlackChannelModel {
    readonly channelId: string;
    readonly channelName: string;
    readonly isInChannel: boolean;

    //TODO: add this to slackService
    readonly channelDescription?: string;
}
