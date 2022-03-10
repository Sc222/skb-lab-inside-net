import { ApiResponse } from "./apiResponse";
import { MockUtils } from "./TestingMocks/mockUtils";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { MockChannels } from "./TestingMocks/mockChannels";
import { SlackChannelModel } from "./Models/slackChannelModel";
import { v4 } from "uuid";
import { SlackAccessRequestModel } from "./Models/slackAccessRequestModel";
import { MockSlackAccessRequests } from "./TestingMocks/mockSlackAccessRequests";
import { MockPersons } from "./TestingMocks/mockPersons";
import { MockChannelsMap } from "./TestingMocks/mockChannelsMap";

export class SlackAccessesApi {
    public static async GetSlackChannels(
        personId: string,
        token: string,
        useTestingMocks = false
    ): Promise<ApiResponse<SlackChannelModel[]>> {
        if (useTestingMocks) {
            let result: ApiResponse<SlackChannelModel[]> = {
                data: MockChannels.map((c) => ({
                    channelId: c.ChannelId,
                    channelName: c.ChannelName,
                    channelDescription: c.ChannelDescription,
                    isInChannel: c.PersonsInChannel.has(personId),
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
            .get<SlackChannelModel[]>(`/slackAccesses/channels/${personId}`, {
                headers: Api.AuthorizationHeaders(token),
            })
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
        accessRequest: Omit<SlackAccessRequestModel, "id">,
        token: string,
        useTestingMocks = false
    ): Promise<ApiResponse<string>> {
        if (useTestingMocks) {
            const dbId = v4();

            let reqData: SlackAccessRequestModel = { ...accessRequest, id: dbId };

            let result: ApiResponse<string> = {
                data: dbId,
                status: 200,
                error: null,
            };
            MockSlackAccessRequests.set(reqData.id, reqData);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<string>(`/slackAccesses/accessRequests/${accessRequest.person.id!}`, accessRequest, {
                headers: Api.PostRequestHeaders(token),
            })
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
        useTestingMocks = false
    ): Promise<ApiResponse<SlackAccessRequestModel[]>> {
        if (useTestingMocks) {
            let result: ApiResponse<SlackAccessRequestModel[]> = {
                data: null,
                status: 200,
                error: null,
            };
            //let reqData: SlackAccessRequestModel = { ...accessRequest, Id: v4() };
            //MockSlackAccessRequests.set(reqData.Id, reqData);
            let allRequests = Array.from(MockSlackAccessRequests.values());
            let allRequestsExtended: SlackAccessRequestModel[] = allRequests.map((r) => {
                let person = MockPersons.get(r.person.id!)!;
                let channel = MockChannelsMap.get(r.channelId)!;
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
            .get<SlackAccessRequestModel[]>(`/slackAccesses/accessRequests`, {
                headers: Api.AuthorizationHeaders(token),
            })
            .then((response) => {
                let result: ApiResponse<SlackAccessRequestModel[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<SlackAccessRequestModel[]> = {
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
        useTestingMocks = false
    ): Promise<ApiResponse<SlackAccessRequestModel[]>> {
        if (useTestingMocks) {
            let result: ApiResponse<SlackAccessRequestModel[]> = {
                data: null,
                status: 200,
                error: null,
            };
            //let reqData: SlackAccessRequestModel = { ...accessRequest, Id: v4() };
            //MockSlackAccessRequests.set(reqData.Id, reqData);
            let allRequests = Array.from(MockSlackAccessRequests.values());
            let allRequestsExtended: SlackAccessRequestModel[] = allRequests.map((r) => {
                let person = MockPersons.get(r.person.id!)!;
                let channel = MockChannelsMap.get(r.channelId)!;
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
            result.data = allRequestsExtended.filter((r) => r.person.id === personId);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<SlackAccessRequestModel[]>(`/slackAccesses/accessRequests/${personId}`, {
                headers: Api.AuthorizationHeaders(token),
            })
            .then((response) => {
                let result: ApiResponse<SlackAccessRequestModel[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<SlackAccessRequestModel[]> = {
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
        useTestingMocks = false
    ): Promise<ApiResponse<string | undefined>> {
        if (useTestingMocks) {
            let currentAccessRequest = MockSlackAccessRequests.get(accessRequest.id);

            if (!currentAccessRequest) {
                //todo process 404 error
            }

            MockSlackAccessRequests.set(accessRequest.id, accessRequest);

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
            .post<string | undefined>(`/slackAccesses/accessRequests/approve`, accessRequest, {
                headers: Api.PostRequestHeaders(token),
            })
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
        useTestingMocks = false
    ): Promise<ApiResponse<string | undefined>> {
        if (useTestingMocks) {
            let currentAccessRequest = MockSlackAccessRequests.get(accessRequest.id);

            if (!currentAccessRequest) {
                //todo process 404 error
            }

            MockSlackAccessRequests.set(accessRequest.id, accessRequest);

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
            .post<string | undefined>(`/slackAccesses/accessRequests/disapprove`, accessRequest, {
                headers: Api.PostRequestHeaders(token),
            })
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
