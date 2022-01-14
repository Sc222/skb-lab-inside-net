import { PersonModel } from "../Models/personModel";
import { AuthScope } from "../../Typings/Enums/authScope";
import AvatarAnastasia from "../../assets/avatar-anastasia.jpg";
import AvatarAndrew from "../../assets/avatar-andrew.jpg";
import AvatarMaria from "../../assets/avatar-maria.jpg";
import AvatarNataly from "../../assets/avatar-nataly.jpg";
import AvatarVictor from "../../assets/avatar-victor.jpg";
import AvatarRuslan from "../../assets/avatar-ruslan.jpg";
import AvatarIgor from "../../assets/avatar-igor.jpg";
import { MockDepartments } from "./mockDepartments";

// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockPersons: Map<string, PersonModel> = new Map<string, PersonModel>([
    [
        "33bc751f-a56b-4704-bfb6-03239f04dcfc",
        {
            Id: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Login: "regular",
            Password: "123",
            FullName: "Крылова Анастасия Викторовна",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Junior Android разработчик" },
            IsNewbie: false,
            Email: "regular@mail.com",
            PhoneNumber: "+78005553535",
            Telegram: "stacy_tg",
            Slack: "stacy",
            SlackId: "UEM0NPR8Q",
            AvatarUrl: AvatarAnastasia,
            Department: MockDepartments[0],
        },
    ],
    [
        "3f3b75de-efcd-48aa-a59e-e805496467e1",
        {
            Id: "3f3b75de-efcd-48aa-a59e-e805496467e1",
            Login: "maria",
            Password: "maria",
            FullName: "Гусева Мария Владимировна",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Middle Android разработчик" },
            IsNewbie: false,
            Email: "i.am.maria@mail.com",
            PhoneNumber: "+78002343535",
            Telegram: "mary-is-here",
            Slack: "masha",
            SlackId: "AEM2NPR8F",
            AvatarUrl: AvatarMaria,
            Department: MockDepartments[0],
        },
    ],
    [
        "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
        {
            Id: "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            Login: "natalya",
            Password: "natalya",
            FullName: "Шульц Наталья Викторовна",
            AuthScope: AuthScope.regularUser,
            Position: { Name: "Senior Android разработчик" },
            IsNewbie: false,
            Email: "shulz@mail.com",
            PhoneNumber: "+78006783535",
            Telegram: "shulz-senior",
            Slack: "natali",
            SlackId: "PEM2NPR8G",
            AvatarUrl: AvatarNataly,
            Department: MockDepartments[0],
        },
    ],
    [
        "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
        {
            Id: "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
            Login: "departmentManager",
            Password: "12345",
            FullName: "Афанасьев Андрей Дмитриевич",
            AuthScope: AuthScope.departmentManager,
            Position: { Name: "Начальник отдела Android разработки" },
            IsNewbie: false,
            Email: "department.manager@mail.com",
            PhoneNumber: "+78309903535",
            Telegram: "andrew",
            Slack: "andr",
            SlackId: "VEM2NPR8R",
            AvatarUrl: AvatarAndrew,
            Department: MockDepartments[0],
        },
    ],
    [
        "0a3bba87-2322-493f-995c-f5f560d9f49b",
        {
            Id: "0a3bba87-2322-493f-995c-f5f560d9f49b",
            Login: "victor",
            Password: "victor",
            FullName: "Лебедев Виктор Антонович",
            AuthScope: AuthScope.admin,
            Position: { Name: "Senior бекенд разработчик" },
            IsNewbie: false,
            Email: "victor@mail.com",
            PhoneNumber: "+79235153535",
            Telegram: "vitek",
            Slack: "victor",
            SlackId: "AEM2NPV8F",
            AvatarUrl: AvatarVictor,
            Department: MockDepartments[2],
        },
    ],
    [
        "419c3781-75ad-4792-9ad1-da30021bcbe7",
        {
            Id: "419c3781-75ad-4792-9ad1-da30021bcbe7",
            Login: "ruslan",
            Password: "ruslan",
            FullName: "Купатов Руслан Дмитриевич",
            AuthScope: AuthScope.departmentManager,
            Position: { Name: "Начальник отдела бекенд разработки" },
            IsNewbie: false,
            Email: "rusik@mail.com",
            PhoneNumber: "+79535553535",
            Telegram: "rus_tut",
            Slack: "ruslan",
            SlackId: "CFM2NPV8B",
            AvatarUrl: AvatarRuslan,
            Department: MockDepartments[2],
        },
    ],
    [
        "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
        {
            Id: "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
            Login: "admin",
            Password: "admin",
            FullName: "Чемозин Игорь Петрович",
            AuthScope: AuthScope.slackAdmin,
            Position: { Name: "Начальник отдела администрирования" },
            IsNewbie: false,
            Email: "admin@mail.com",
            PhoneNumber: "+79535553535",
            Telegram: "igoryanchik",
            Slack: "igorr",
            SlackId: "PFM2NPN8H",
            AvatarUrl: AvatarIgor,
            Department: MockDepartments[1],
        },
    ],
]);
