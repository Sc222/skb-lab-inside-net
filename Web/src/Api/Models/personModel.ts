import { PositionModel } from "./positionModel";
import { DepartmentModel } from "./departmentModel";

export interface PersonModel {
    readonly Id?: string;
    readonly Login: string;
    readonly Password: string;
    readonly FullName: string;
    readonly AuthScope: string;
    readonly Position: PositionModel; //TODO: who changes positions? admin?
    readonly IsNewbie: boolean;
    readonly Email: string;
    readonly PhoneNumber?: string;
    readonly Telegram?: string;
    readonly Slack?: string;
    readonly SlackId?: string;

    // Other (add them...)
    readonly AvatarUrl?: string; // url to avatar
    readonly Department: DepartmentModel; //TODO: who changes positions? admin? + add to backend
}
