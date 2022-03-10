import { PersonModel } from "./Models/personModel";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { ApiResponse } from "./apiResponse";
import { MockPersons } from "./TestingMocks/mockPersons";
import { MockUtils } from "./TestingMocks/mockUtils";
import { ContactsSearchParam } from "../Typings/Enums/contactsSearchParam";

type AuthenticateResponse = { person: PersonModel; token: string; expires: number };

export class PersonsApi {
    public static async Authenticate(
        authData: Pick<PersonModel, "email" | "password">,
        useTestingMocks = false
    ): Promise<ApiResponse<AuthenticateResponse>> {
        if (useTestingMocks) {
            let allPersons = Array.from(MockPersons.values());
            let result: ApiResponse<AuthenticateResponse> = {
                data: null,
                status: 400,
                error: "Неверная почта или пароль",
            };
            let person = allPersons.find(
                (value) => value.email === authData.email && value.password === authData.password
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
            .post<AuthenticateResponse>("/person/authenticate", authData, { headers: Api.PostRequestHeaders(null) })
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
                    error: reason.response?.data.message.toString() ?? "Произошла ошибка",
                };
                return result;
            });
    }

    public static async GetPersonById(
        personId: string,
        token: string,
        useTestingMocks = false
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
        console.log("DEMO: ", Api.AuthorizationHeaders(token));
        return axiosInstance
            .get<PersonModel>(`/person/${personId}`, { headers: Api.AuthorizationHeaders(token) })
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
                    error: reason.response?.data.message.toString() ?? "Произошла ошибка",
                };
                return result;
            });
    }

    public static async GetAll(token: string, useTestingMocks = false): Promise<ApiResponse<PersonModel[]>> {
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
            .get<PersonModel[]>(`/person/all`, { headers: Api.AuthorizationHeaders(token) })
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
                    error: reason.response?.data.message.toString() ?? "Произошла ошибка",
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
        useTestingMocks = false
    ): Promise<ApiResponse<PersonModel[]>> {
        if (useTestingMocks) {
            let allPersons = Array.from(MockPersons.values());
            let departments: Set<string> = new Set(searchParams.getAll(ContactsSearchParam.departments));
            let filteredPersons = allPersons.filter((p) => {
                let text: string = searchParams.get(ContactsSearchParam.name) ?? p.fullName;
                let hasDepartment = departments.size > 0 ? departments.has(p.department.name) : true;
                return hasDepartment && p.fullName.toLowerCase().includes(text.toLowerCase());
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
            .get<PersonModel[]>(`/person/find?${searchParams.toString()}`, { headers: Api.AuthorizationHeaders(token) })
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
                    error: reason.response?.data.message.toString() ?? "Произошла ошибка",
                };
                return result;
            });
    }
}
