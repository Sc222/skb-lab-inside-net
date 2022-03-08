import { ApiResponse } from "./apiResponse";
import { MockUtils } from "./TestingMocks/mockUtils";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { MockChannels } from "./TestingMocks/mockChannels";
import { SlackChannelModel } from "./Models/slackChannelModel";
import { v4 } from "uuid";
import { SlackAccessRequestModel } from "./Models/slackAccessRequestModel";
import { MockSlackAccessRequests } from "./TestingMocks/mockSlackAccessRequests";
import { SlackAccessRequestModelExtended } from "./Models/slackAccessRequestModelExtended";
import { MockPersons } from "./TestingMocks/mockPersons";
import { MockChannelsMap } from "./TestingMocks/mockChannelsMap";

export class SlackAccessesApi {
    public static async GetSlackChannels(
        personId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<SlackChannelModel[]>> {
        if (useTestingMocks) {
            let result: ApiResponse<SlackChannelModel[]> = {
                data: MockChannels.map((c) => ({
                    ChannelId: c.ChannelId,
                    ChannelName: c.ChannelName,
                    ChannelDescription: c.ChannelDescription,
                    IsInChannel: c.PersonsInChannel.has(personId),
                })),
                status: 200,
                error: null,
            };

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<SlackChannelModel[]>(`/slackAccesses/channels/${personId}`, Api.AuthorizationHeaders(token))
            .then((response) => {
                let result: ApiResponse<SlackChannelModel[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<SlackChannelModel[]> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async CreateAccessRequest(
        accessRequest: Omit<SlackAccessRequestModel, "Id">,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<string>> {
        if (useTestingMocks) {
            const dbId = v4();

            let reqData: SlackAccessRequestModel = { ...accessRequest, Id: dbId };

            let result: ApiResponse<string> = {
                data: dbId,
                status: 200,
                error: null,
            };
            MockSlackAccessRequests.set(reqData.Id, reqData);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<string>(
                `/slackAccesses/accessRequests/${accessRequest.PersonId}`,
                accessRequest,
                Api.PostRequestHeaders(token)
            )
            .then((response) => {
                let result: ApiResponse<string> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<string> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    //FIXME temporarily returns info about profile + channel in single model
    public static async GetAllAccessRequests(
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<SlackAccessRequestModelExtended[]>> {
        if (useTestingMocks) {
            let result: ApiResponse<SlackAccessRequestModelExtended[]> = {
                data: null,
                status: 200,
                error: null,
            };
            //let reqData: SlackAccessRequestModel = { ...accessRequest, Id: v4() };
            //MockSlackAccessRequests.set(reqData.Id, reqData);
            let allRequests = Array.from(MockSlackAccessRequests.values());
            let allRequestsExtended: SlackAccessRequestModelExtended[] = allRequests.map((r) => {
                let person = MockPersons.get(r.PersonId)!;
                let channel = MockChannelsMap.get(r.ChannelId)!;
                //todo process if person or channel is null
                return {
                    ...r,
                    PersonName: person.fullName,
                    PersonPosition: person.position.name,
                    SlackUserId: person.slackId,
                    PersonAvatar: person.avatarUrl,
                    ChannelName: channel.ChannelName,
                };
            });
            result.data = allRequestsExtended;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<SlackAccessRequestModelExtended[]>(`/slackAccesses/accessRequests`, Api.AuthorizationHeaders(token))
            .then((response) => {
                let result: ApiResponse<SlackAccessRequestModelExtended[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<SlackAccessRequestModelExtended[]> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async GetPersonAccessRequests(
        personId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<SlackAccessRequestModelExtended[]>> {
        if (useTestingMocks) {
            let result: ApiResponse<SlackAccessRequestModelExtended[]> = {
                data: null,
                status: 200,
                error: null,
            };
            //let reqData: SlackAccessRequestModel = { ...accessRequest, Id: v4() };
            //MockSlackAccessRequests.set(reqData.Id, reqData);
            let allRequests = Array.from(MockSlackAccessRequests.values());
            let allRequestsExtended: SlackAccessRequestModelExtended[] = allRequests.map((r) => {
                let person = MockPersons.get(r.PersonId)!;
                let channel = MockChannelsMap.get(r.ChannelId)!;
                //todo process if person or channel is null
                return {
                    ...r,
                    PersonName: person.fullName,
                    PersonPosition: person.position.name,
                    SlackUserId: person.slackId,
                    PersonAvatar: person.avatarUrl,
                    ChannelName: channel.ChannelName,
                };
            });
            result.data = allRequestsExtended.filter((r) => r.PersonId === personId);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<SlackAccessRequestModelExtended[]>(
                `/slackAccesses/accessRequests/${personId}`,
                Api.AuthorizationHeaders(token)
            )
            .then((response) => {
                let result: ApiResponse<SlackAccessRequestModelExtended[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<SlackAccessRequestModelExtended[]> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    //FIXME DRY
    public static async ApproveAccessRequest(
        accessRequest: SlackAccessRequestModel,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<string | undefined>> {
        if (useTestingMocks) {
            let currentAccessRequest = MockSlackAccessRequests.get(accessRequest.Id);

            if (!currentAccessRequest) {
                //todo process 404 error
            }

            MockSlackAccessRequests.set(accessRequest.Id, accessRequest);

            let result: ApiResponse<string | undefined> = {
                data: undefined,
                status: 200,
                error: null,
            };
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<string | undefined>(
                `/slackAccesses/accessRequests/approve`,
                accessRequest,
                Api.PostRequestHeaders(token)
            )
            .then((response) => {
                let result: ApiResponse<string | undefined> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<string | undefined> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async DisapproveAccessRequest(
        accessRequest: SlackAccessRequestModel,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<string | undefined>> {
        if (useTestingMocks) {
            let currentAccessRequest = MockSlackAccessRequests.get(accessRequest.Id);

            if (!currentAccessRequest) {
                //todo process 404 error
            }

            MockSlackAccessRequests.set(accessRequest.Id, accessRequest);

            let result: ApiResponse<string | undefined> = {
                data: undefined,
                status: 200,
                error: null,
            };
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<string | undefined>(
                `/slackAccesses/accessRequests/disapprove`,
                accessRequest,
                Api.PostRequestHeaders(token)
            )
            .then((response) => {
                let result: ApiResponse<string | undefined> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<string | undefined> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }
}
