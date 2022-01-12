import { PersonModel } from "./Models/personModel";
import axios, { AxiosError } from "axios";
import { Api } from "./api";
import { ApiResponse } from "./apiResponse";
import { MockPersons } from "./TestingMocks/mockPersons";
import { MockUtils } from "./TestingMocks/mockUtils";
import { MockContacts } from "./TestingMocks/mockContacts";
import { ContactsSearchParam } from "../Typings/Enums/contactsSearchParam";

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

    /**
     * Get persons contacts with filtering
     * @param searchParams currently available search params: 'name' and 'department'
     * @param personId id of person
     * @param token auth token
     * @param useTestingMocks use mock-data or not
     */
    public static async GetPersonContacts(
        searchParams: URLSearchParams | null,
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
                if (searchParams) {
                    let departments: Set<string> = new Set(searchParams.getAll(ContactsSearchParam.department));
                    contacts = contacts.filter((p) => {
                        let text: string = searchParams.get(ContactsSearchParam.name) ?? p.FullName;
                        let hasDepartment = departments.size > 0 ? departments.has(p.Department.Name) : true;
                        return hasDepartment && p.FullName.toLowerCase().includes(text.toLowerCase());
                    });
                }
                result.data = contacts;
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(result);
                }, MockUtils.SmallRequestDelay);
            });
        }

        const axiosInstance = axios.create({ baseURL: Api.BaseUrl });
        const requestUrl = searchParams ? `/contacts/${personId}?${searchParams.toString()}` : `/contacts/${personId}`;
        return axiosInstance
            .get<PersonModel[]>(requestUrl, Api.AuthorizationHeaders(token))
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
