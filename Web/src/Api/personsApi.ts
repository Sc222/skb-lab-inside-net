import { PersonModel } from "./Models/personModel";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { ApiResponse } from "./apiResponse";

type AuthenticateResponse = { person: PersonModel; token: string; expires: string };

export class PersonsApi {
    public static async Authenticate(
        authData: Pick<PersonModel, "Login" | "Password">
    ): Promise<ApiResponse<AuthenticateResponse>> {
        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<{ person: PersonModel; token: string; expires: string }>(
                "/person/authenticate",
                authData,
                Api.PostRequestHeaders(null)
            )
            .then((response) => {
                let result: ApiResponse<AuthenticateResponse> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<AuthenticateResponse> = {
                    data: null,
                    status: reason.response!.status,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async GetPersonById(personId: string, token: string): Promise<ApiResponse<PersonModel>> {
        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<PersonModel>(`/person/${personId}`, Api.AuthorizationHeaders(token))
            .then((response) => {
                let result: ApiResponse<PersonModel> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<PersonModel> = {
                    data: null,
                    status: reason.response!.status,
                    error: reason.response?.data,
                };
                return result;
            });
    }
}
