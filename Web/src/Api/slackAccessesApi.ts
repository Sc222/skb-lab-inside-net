import { DepartmentModel } from "./Models/departmentModel";
import { MockDepartments } from "./TestingMocks/mockDepartments";
import { ApiResponse } from "./apiResponse";
import { MockUtils } from "./TestingMocks/mockUtils";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { MockChannels } from "./TestingMocks/mockChannels";
import { SlackChannelModel } from "./Models/slackChannelModel";

export class SlackAccessesApi {
    public static async GetSlackChannels(
        personId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<SlackChannelModel[]>> {
        if (useTestingMocks) {
            let result = {
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
            .get<SlackChannelModel[]>(`/slack-accesses/channels/${personId}`, Api.AuthorizationHeaders(token))
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

    public static async GetAll(token: string, useTestingMocks = true): Promise<ApiResponse<DepartmentModel[]>> {
        if (useTestingMocks) {
            let result = {
                data: MockDepartments,
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
            .get<DepartmentModel[]>(`/departments/all`, Api.AuthorizationHeaders(token))
            .then((response) => {
                let result: ApiResponse<DepartmentModel[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<DepartmentModel[]> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }
}
