import { PersonModel } from "./Models/personModel";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { ApiResponse } from "./apiResponse";
import { MockPersons } from "./TestingMocks/mockPersons";
import { MockUtils } from "./TestingMocks/mockUtils";
import { SiteRouteQParam } from "../Typings/Enums/siteRouteQParam";

type AuthenticateResponse = { person: PersonModel; token: string; expires: number };

export class PersonsApi {
    public static async Authenticate(
        authData: Pick<PersonModel, "Email" | "Password">,
        useTestingMocks = true
    ): Promise<ApiResponse<AuthenticateResponse>> {
        if (useTestingMocks) {
            let allPersons = Array.from(MockPersons.values());
            let result: ApiResponse<AuthenticateResponse> = {
                data: null,
                status: 400,
                error: "Неверная почта или пароль",
            };
            let person = allPersons.find(
                (value) => value.Email === authData.Email && value.Password === authData.Password
            );
            if (person) {
                result = {
                    data: {
                        person: person,
                        token: "42139536c8a26bca0e49bd1f5069af2400d84b681723b06dac894f4a862fc9871961803886cd5188be493",
                        expires: MockUtils.GenerateTokenExpirationDate(10 * 60),
                    },
                    status: 200,
                    error: null,
                };
            }
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .post<AuthenticateResponse>("/person/authenticate", authData, Api.PostRequestHeaders(null))
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
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async GetPersonById(
        personId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<PersonModel>> {
        if (useTestingMocks) {
            let person = MockPersons.get(personId);
            let result: ApiResponse<PersonModel> = {
                data: null,
                status: 404,
                error: "Профиль не найден",
            };
            if (person) {
                result = {
                    data: person,
                    status: 200,
                    error: null,
                };
            }
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

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
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async GetAll(token: string, useTestingMocks = true): Promise<ApiResponse<PersonModel[]>> {
        if (useTestingMocks) {
            let result = {
                data: Array.from(MockPersons.values()),
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
            .get<PersonModel[]>(`/person/all`, Api.AuthorizationHeaders(token))
            .then((response) => {
                let result: ApiResponse<PersonModel[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<PersonModel[]> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    /**
     * Find persons by some query
     * @param searchParams currently available search params: 'name' and 'department'
     * @param token auth token
     * @param useTestingMocks use mock-data or not
     */
    public static async Find(
        searchParams: URLSearchParams,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<PersonModel[]>> {
        if (useTestingMocks) {
            let allPersons = Array.from(MockPersons.values());
            let filteredPersons = allPersons.filter((p) => {
                let text: string = searchParams.get(SiteRouteQParam.name) ?? p.FullName;
                let department: string = searchParams.get(SiteRouteQParam.department) ?? p.Department.Name;
                return p.FullName.toLowerCase().includes(text.toLowerCase()) && p.Department.Name === department;
            });

            let result = {
                data: filteredPersons,
                status: 200,
                error: null,
            };

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.LargeRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<PersonModel[]>(`/person/find?${searchParams.toString()}`, Api.AuthorizationHeaders(token))
            .then((response) => {
                let result: ApiResponse<PersonModel[]> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<PersonModel[]> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }
}
