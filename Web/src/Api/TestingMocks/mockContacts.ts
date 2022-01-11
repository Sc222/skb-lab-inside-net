// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockContacts: { PersonId: string; ContactsIds: Set<string> }[] = [
    {
        //FullName: "Крылова Анастасия Викторовна",
        //Отдел мобильной разработки
        PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
        ContactsIds: new Set([
            "3f3b75de-efcd-48aa-a59e-e805496467e1",
            "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
            "0a3bba87-2322-493f-995c-f5f560d9f49b",
        ]),
    },
    {
        //FullName: "Гусева Мария Владимировна",
        //Отдел мобильной разработки
        PersonId: "3f3b75de-efcd-48aa-a59e-e805496467e1",
        ContactsIds: new Set([
            "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
            "0a3bba87-2322-493f-995c-f5f560d9f49b",
        ]),
    },
    {
        //FullName: "Шульц Наталья Викторовна",
        //Отдел мобильной разработки
        PersonId: "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
        ContactsIds: new Set([
            "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
            "0a3bba87-2322-493f-995c-f5f560d9f49b",
        ]),
    },
    {
        //FullName: "Афанасьев Андрей Дмитриевич",
        //Отдел мобильной разработки
        PersonId: "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
        ContactsIds: new Set([
            "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            "3f3b75de-efcd-48aa-a59e-e805496467e1",
            "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            "0a3bba87-2322-493f-995c-f5f560d9f49b",
        ]),
    },
    {
        //FullName: "Лебедев Виктор Антонович",
        //Отдел бекенд разработки
        PersonId: "0a3bba87-2322-493f-995c-f5f560d9f49b",
        ContactsIds: new Set([
            "419c3781-75ad-4792-9ad1-da30021bcbe7",
            "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            "3f3b75de-efcd-48aa-a59e-e805496467e1",
            "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
        ]),
    },

    {
        //FullName: "Купатов Руслан Дмитриевич",
        //Отдел бекенд разработки
        PersonId: "419c3781-75ad-4792-9ad1-da30021bcbe7",
        ContactsIds: new Set(["1d5aee70-b83a-4f11-a744-993b8b3bfc26", "0a3bba87-2322-493f-995c-f5f560d9f49b"]),
    },

    {
        //FullName: "Чемозин Игорь Петрович",
        //Отдел администрирования
        PersonId: "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
        ContactsIds: new Set(["419c3781-75ad-4792-9ad1-da30021bcbe7", "0a3bba87-2322-493f-995c-f5f560d9f49b"]),
    },
];
