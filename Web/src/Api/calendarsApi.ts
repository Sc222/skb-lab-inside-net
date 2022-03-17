import { Api } from "./api";
import { CalendarModel } from "./Models/calendarModel";
import { ApiResponse } from "./apiResponse";
import axios, { AxiosError } from "axios";
import update from "immutability-helper";
import { Utils } from "../Utils/utils";

export class CalendarsApi {
    // Get personal calendar info
    public static GetForPerson = (
        personId: string,
        searchParams: URLSearchParams,
        token: string,
        onSuccess: (data: CalendarModel[], request: XMLHttpRequest) => void,
        onError: (request: XMLHttpRequest) => void
    ): void => {
        const xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if ((xhttp.status >= 200 && xhttp.status <= 299) || xhttp.status === 304) {
                    const data: CalendarModel[] = JSON.parse(xhttp.responseText);
                    onSuccess(data, xhttp);
                } else {
                    onError(xhttp);
                }
            }
        };
        xhttp.open("GET", `${Api.BaseUrl}/calendars/${personId}?${searchParams.toString()}`, true);
        xhttp.setRequestHeader("Authorization", `Bearer ${token}`);
        xhttp.send();
        //TODO: use this to send body xhttp.send(option.data);
    };

    public static async Create(calendar: CalendarModel, token: string): Promise<ApiResponse<Record<string, never>>> {
        //fixme dry
        let calendarToSend = update(calendar, {});
        calendarToSend.startTime = Utils.DateToJsonWithTimezoneShift(new Date(calendar.startTime));
        calendarToSend.endTime = Utils.DateToJsonWithTimezoneShift(new Date(calendar.endTime));

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<Record<string, never>>("/calendars/", calendarToSend, { headers: Api.PostRequestHeaders(token) })
            .then((response) => {
                let result: ApiResponse<Record<string, never>> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<Record<string, never>> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data?.message?.toString() ?? "Произошла ошибка",
                };
                return result;
            });
    }

    //fixme DRY
    public static async Update(calendar: CalendarModel, token: string): Promise<ApiResponse<Record<string, never>>> {
        let calendarToSend = update(calendar, {});
        calendarToSend.startTime = Utils.DateToJsonWithTimezoneShift(new Date(calendar.startTime));
        calendarToSend.endTime = Utils.DateToJsonWithTimezoneShift(new Date(calendar.endTime));

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .put<Record<string, never>>("/calendars/", calendarToSend, { headers: Api.PostRequestHeaders(token) })
            .then((response) => {
                let result: ApiResponse<Record<string, never>> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<Record<string, never>> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data?.message?.toString() ?? "Произошла ошибка",
                };
                return result;
            });
    }

    //fixme DRY
    public static async Delete(calendarId: string, token: string): Promise<ApiResponse<Record<string, never>>> {
        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .delete<Record<string, never>>(`/calendars/delete/${calendarId}`, {
                headers: Api.AuthorizationHeaders(token),
            })
            .then((response) => {
                let result: ApiResponse<Record<string, never>> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<Record<string, never>> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data?.message?.toString() ?? "Произошла ошибка",
                };
                return result;
            });
    }
}
