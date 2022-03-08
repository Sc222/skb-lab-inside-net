import { PositionModel } from "./positionModel";
import { DepartmentModel } from "./departmentModel";

export interface PersonModel {
    readonly id?: string;
    readonly login: string;
    readonly password: string;
    readonly fullName: string;
    readonly authScope: string;
    readonly position: PositionModel; //TODO: who changes positions? admin?
    readonly isNewbie: boolean;
    readonly email: string;
    readonly phoneNumber?: string;
    readonly telegram?: string;
    readonly slack?: string;
    readonly slackId: string; //fixme make it required

    // Other (add them...)
    readonly avatarUrl?: string; // url to avatar
    readonly department: DepartmentModel; //TODO: who changes positions? admin? + add to backend
}
