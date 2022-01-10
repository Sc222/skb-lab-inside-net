import { PositionModel } from "./positionModel";

export interface PersonModel {
    readonly Id?: string;
    readonly Login: string;
    readonly Password: string;
    readonly FullName: string;
    readonly AuthScope: string;
    readonly Position: PositionModel;
    readonly IsNewbie: boolean;
    readonly Email: string;
    readonly PhoneNumber?: string;
    readonly Telegram?: string;
    readonly Slack?: string;
    readonly SlackId?: string;

    // Other
    readonly AvatarUrl?: string; // url to avatar
}
