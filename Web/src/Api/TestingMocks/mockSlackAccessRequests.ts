import { SlackAccessRequestModel } from "../Models/slackAccessRequestModel";

// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockSlackAccessRequests: Map<string, SlackAccessRequestModel> = new Map<string, SlackAccessRequestModel>([
    // requests from крылова
    [
        "111c751f-aaaa-4704-bbbb-03239f04d111",
        {
            Id: "111c751f-aaaa-4704-bbbb-03239f04d111",
            ChannelId: "C5105QCSD",
            PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "001c751f-aaaa-4704-bbbb-03239f04d100",
        {
            Id: "001c751f-aaaa-4704-bbbb-03239f04d100",
            ChannelId: "C2655QGSD",
            PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "331c751f-aaaa-4704-bbbb-03239f04d133",
        {
            Id: "331c751f-aaaa-4704-bbbb-03239f04d133",
            ChannelId: "C4655GHBD",
            PersonId: "33bc751f-a56b-4704-bfb6-03239f04dcfc",
            Status: "pending",
            AdminMessage: "",
        },
    ],

    //other
    [
        "222c751f-bbbb-4704-cccc-03239f04d222",
        {
            Id: "222c751f-bbbb-4704-cccc-03239f04d222",
            ChannelId: "C2655QGSD",
            PersonId: "ad59dd3c-bdec-4cc8-bb72-e460479a77e7",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "333c751f-cccc-4704-dddd-03239f04d333",
        {
            Id: "333c751f-cccc-4704-dddd-03239f04d333",
            ChannelId: "C4655GHBD",
            PersonId: "b082dfe1-ab44-4547-9e31-0237e9e32eb4",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "4442dfe1-dddd-4547-eeee-0237e9e32444",
        {
            Id: "4442dfe1-dddd-4547-eeee-0237e9e32444",
            ChannelId: "C4755SHSK",
            PersonId: "0a3bba87-2322-493f-995c-f5f560d9f49b",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "5552dfe1-eeee-4547-ffff-0237e9e32555",
        {
            Id: "5552dfe1-eeee-4547-ffff-0237e9e32555",
            ChannelId: "C4755SHSK",
            PersonId: "419c3781-75ad-4792-9ad1-da30021bcbe7",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "6662dfe1-ffff-4547-gggg-0237e9e32666",
        {
            Id: "6662dfe1-ffff-4547-gggg-0237e9e32666",
            ChannelId: "C1155GHSF",
            PersonId: "0a3bba87-2322-493f-995c-f5f560d9f49b",
            Status: "pending",
            AdminMessage: "",
        },
    ],
    [
        "7772dfe1-gggg-4547-hhhh-0237e9e32777",
        {
            Id: "7772dfe1-gggg-4547-hhhh-0237e9e32777",
            ChannelId: "C1155GHSF",
            PersonId: "419c3781-75ad-4792-9ad1-da30021bcbe7",
            Status: "pending",
            AdminMessage: "",
        },
    ],
]);
