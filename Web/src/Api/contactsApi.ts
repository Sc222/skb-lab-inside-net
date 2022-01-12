import { PersonModel } from "./Models/personModel";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { ApiResponse } from "./apiResponse";
import { MockPersons } from "./TestingMocks/mockPersons";
import { MockUtils } from "./TestingMocks/mockUtils";
import { MockContacts } from "./TestingMocks/mockContacts";

export class ContactsApi {
    public static async RemoveFromContacts(
        personId: string,
        contactId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<string | undefined>> {
        if (useTestingMocks) {
            let personContactsIndex = MockContacts.findIndex((c) => c.PersonId === personId);

            let result: ApiResponse<string | undefined> = {
                data: undefined,
                status: 500,
                error: "Не удалось удалить контакт",
            };

            if (personContactsIndex !== -1) {
                let personContacts = MockContacts[personContactsIndex];
                personContacts.ContactsIds.delete(contactId);
                result = {
                    data: undefined,
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
            .delete<string | undefined>(`/contacts/${personId}/remove/${contactId}`, Api.AuthorizationHeaders(token))
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

    public static async AddToContacts(
        personId: string,
        contactId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<string | undefined>> {
        if (useTestingMocks) {
            let personContactsIndex = MockContacts.findIndex((c) => c.PersonId === personId);

            let result: ApiResponse<string | undefined> = {
                data: undefined,
                status: 500,
                error: "Не удалось добавить контакт",
            };
            if (personContactsIndex !== -1) {
                let personContacts = MockContacts[personContactsIndex];
                personContacts.ContactsIds.add(contactId);
                result = {
                    data: undefined,
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
            .put<string | undefined>(`/contacts/${personId}/add/${contactId}`, Api.AuthorizationHeaders(token))
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

    public static async GetPersonContacts(
        personId: string,
        token: string,
        useTestingMocks = true
    ): Promise<ApiResponse<PersonModel[]>> {
        if (useTestingMocks) {
            let contactsIds = MockContacts.find((c) => c.PersonId === personId);

            let result: ApiResponse<PersonModel[]> = {
                data: [],
                status: 200,
                error: null,
            };

            if (contactsIds) {
                let ids = contactsIds.ContactsIds;
                let allPersons = Array.from(MockPersons.values());
                let contacts = allPersons.filter((p) => ids.has(p.Id!));
                result.data = contacts;
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        let axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        return axiosInstance
            .get<PersonModel[]>(`/contacts/${personId}`, Api.AuthorizationHeaders(token))
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
