// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockChannelsMap: Map<
    string,
    {
        ChannelId: string;
        ChannelName: string;
        ChannelDescription: string;
        PersonsInChannel: Set<string>;
    }
> = new Map([
    [
        "C81A5GHKG",
        {
            ChannelId: "C81A5GHKG",
            ChannelName: "#general",
            ChannelDescription: "Главный канал",
            PersonsInChannel: new Set<string>([
                "33bc751f-a56b-4704-bfb6-03239f04dcfc",
                "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
                "3f3b75de-efcd-48aa-a59e-e805496467e1",
                "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
                "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
                "0a3bba87-2322-493f-995c-f5f560d9f49b",
                "419c3781-75ad-4792-9ad1-da30021bcbe7",
                "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
            ]),
        },
    ],
    [
        "C4155GHSD",
        {
            ChannelId: "C4155GHSD",
            ChannelName: "#random",
            ChannelDescription: "Для офф-топ бесед",
            PersonsInChannel: new Set<string>([
                "33bc751f-a56b-4704-bfb6-03239f04dcfc",
                "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
                "3f3b75de-efcd-48aa-a59e-e805496467e1",
                "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
                "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
                "0a3bba87-2322-493f-995c-f5f560d9f49b",
                "419c3781-75ad-4792-9ad1-da30021bcbe7",
                "1d5aee70-b83a-4f11-a744-993b8b3bfc26",
            ]),
        },
    ],
    [
        "C5105QCSD",
        {
            ChannelId: "C5105QCSD",
            ChannelName: "#команда-mobile-разработки",
            ChannelDescription: "Все, связанное с мобильной разработкой",
            PersonsInChannel: new Set<string>(["1d5aee70-b83a-4f11-a744-993b8b3bfc26"]),
        },
    ],
    [
        "C2655QGSD",
        {
            ChannelId: "C2655QGSD",
            ChannelName: "#команда-android-разработки",
            ChannelDescription: "Все, связанное с Android разработкой",
            PersonsInChannel: new Set<string>(["1d5aee70-b83a-4f11-a744-993b8b3bfc26"]),
        },
    ],
    [
        "C4655GHBD",
        {
            ChannelId: "C4655GHBD",
            ChannelName: "#ios-команда",
            ChannelDescription: "Все, связанное с IOS разработкой",
            PersonsInChannel: new Set<string>(["1d5aee70-b83a-4f11-a744-993b8b3bfc26"]),
        },
    ],
    [
        "C4755SHSK",
        {
            ChannelId: "C4755SHSK",
            ChannelName: "#netcore-разработка",
            ChannelDescription: "Все, связанное с серверной разработкой",
            PersonsInChannel: new Set<string>(["1d5aee70-b83a-4f11-a744-993b8b3bfc26"]),
        },
    ],
    [
        "C1155GHSF",
        {
            ChannelId: "C1155GHSF",
            ChannelName: "#dev-ops",
            ChannelDescription: "Все, связанное с CI/CD",
            PersonsInChannel: new Set<string>([]),
        },
    ],
]);
