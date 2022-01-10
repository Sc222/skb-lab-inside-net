import { PersonModel } from "../Models/personModel";
import { AuthScope } from "../../Typings/Enums/authScope";

export const MockPersons: Map<string, PersonModel> = new Map<string, PersonModel>([
    [
        "33bc751f-a56b-4704-bfb6-03239f04dcfc",
        {
            Id: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Login: "regular",
            Password: "123",
            FullName: "Смирнов Андрей Иванович",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Junior Android Разработчик" },
            IsNewbie: false,
            Email: "regular@mail.com",
            PhoneNumber: "+78005553535",
            Telegram: "smirn.tg",
            Slack: "smirn.slack",
            //SlackId: string,
        },
    ],
    [
        "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
        {
            Id: "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
            Login: "admin",
            Password: "123",
            FullName: "Чемозин Иван Петрович",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Начальник отдела администрирования" },
            IsNewbie: false,
            Email: "admin@mail.com",
            //PhoneNumber: string,
            //Telegram: string,
            //Slack: string,
            //SlackId: string,
        },
    ],
]);
