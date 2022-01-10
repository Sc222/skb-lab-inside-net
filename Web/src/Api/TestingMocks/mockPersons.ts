import { PersonModel } from "../Models/personModel";
import { AuthScope } from "../../Typings/Enums/authScope";
import AvatarAnastasia from "../../assets/avatar-anastasia.jpg";
import AvatarIgor from "../../assets/avatar-igor.jpg";

export const MockPersons: Map<string, PersonModel> = new Map<string, PersonModel>([
    [
        "33bc751f-a56b-4704-bfb6-03239f04dcfc",
        {
            Id: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Login: "regular",
            Password: "123",
            FullName: "Крылова Анастасия Викторовна",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Junior Android Разработчик" },
            IsNewbie: false,
            Email: "regular@mail.com",
            PhoneNumber: "+78005553535",
            Telegram: "stacy_tg",
            Slack: "stacy_slack",
            //SlackId: string,
            AvatarUrl: AvatarAnastasia,
        },
    ],
    [
        "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
        {
            Id: "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
            Login: "admin",
            Password: "123",
            FullName: "Чемозин Игорь Петрович",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Начальник отдела администрирования" },
            IsNewbie: false,
            Email: "admin@mail.com",
            //PhoneNumber: string,
            //Telegram: string,
            //Slack: string,
            //SlackId: string,
            AvatarUrl: AvatarIgor,
        },
    ],
]);
