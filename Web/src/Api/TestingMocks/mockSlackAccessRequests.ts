import { SlackAccessRequestModel } from "../Models/slackAccessRequestModel";

// Used as demo mock db, can be updated during run by "post", "update" and "put requests"
export const MockSlackAccessRequests: Map<string, SlackAccessRequestModel> = new Map<string, SlackAccessRequestModel>([
    [
        "111c751f-aaaa-4704-bbbb-03239f04d111",
        {
            Id: "111c751f-aaaa-4704-bbbb-03239f04d111",
            ChannelId: "C5105QCSD",
            PersonId: "3f3b75de-efcd-48aa-a59e-e805496467e1",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],
    /*  [
        "222c751f-bbbb-4704-cccc-03239f04d222",
        {
            Id: "222c751f-bbbb-4704-cccc-03239f04d222",
            ChannelId: "",
            PersonId: "",
            SlackUserId:"",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],
    [
        "333c751f-cccc-4704-dddd-03239f04d333",
        {
            Id: "333c751f-cccc-4704-dddd-03239f04d333",
            ChannelId: "",
            PersonId: "",
            SlackUserId:"",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],
    [
        "4442dfe1-dddd-4547-eeee-0237e9e32444",
        {
            Id: "4442dfe1-dddd-4547-eeee-0237e9e32444",
            ChannelId: "",
            PersonId: "",
            SlackUserId:"",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],
    [
        "5552dfe1-eeee-4547-ffff-0237e9e32555",
        {
            Id: "5552dfe1-eeee-4547-ffff-0237e9e32555",
            ChannelId: "",
            PersonId: "",
            SlackUserId:"",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],
    [
        "6662dfe1-ffff-4547-gggg-0237e9e32666",
        {
            Id: "6662dfe1-ffff-4547-gggg-0237e9e32666",
            ChannelId: "",
            PersonId: "",
            SlackUserId:"",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],
    [
        "7772dfe1-gggg-4547-hhhh-0237e9e32777",
        {
            Id: "7772dfe1-gggg-4547-hhhh-0237e9e32777",
            ChannelId: "",
            PersonId: "",
            SlackUserId:"",
            IsDisapproved: false,
            DisapproveReason: "",
        },
    ],*/
]);
