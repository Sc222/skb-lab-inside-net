import { PositionModel } from "./positionModel";

export interface PersonModel {
    Id?: string;
    Login: string;
    Password: string;
    FullName: string;
    AuthScope: string;
    Position: PositionModel;
    IsNewbie: boolean;
    Email: string;
    PhoneNumber?: string;
    Telegram?: string;
    Slack?: string;
    SlackId?: string;
}
