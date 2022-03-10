import { DepartmentModel } from "./Models/departmentModel";
import { MockDepartments } from "./TestingMocks/mockDepartments";
import { ApiResponse } from "./apiResponse";
import { MockUtils } from "./TestingMocks/mockUtils";
import axios, { AxiosError } from "axios";
import { Api } from "./api";

export class DepartmentsApi {
    public static async GetById(
        departmentId: string,
        token: string,
        useTestingMocks = false
    ): Promise<ApiResponse<DepartmentModel>> {
        if (useTestingMocks) {
            let department = MockDepartments.find((d) => d.id === departmentId);
            let result: ApiResponse<DepartmentModel> = {
                data: null,
                status: 404,
                error: "Отдел не найден",
            };
            if (department) {
                result = {
                    data: department,
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
            .get<DepartmentModel>(`/departments/${departmentId}`, { headers: Api.AuthorizationHeaders(token) })
            .then((response) => {
                let result: ApiResponse<DepartmentModel> = {
                    data: response.data,
                    status: response.status,
                    error: null,
                };
                return result;
            })
            .catch((reason: AxiosError) => {
                let result: ApiResponse<DepartmentModel> = {
                    data: null,
                    status: reason.response?.status ?? -1,
                    error: reason.response?.data,
                };
                return result;
            });
    }

    public static async GetAll(token: string, useTestingMocks = false): Promise<ApiResponse<DepartmentModel[]>> {
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
            .get<DepartmentModel[]>(`/departments/all`, { headers: Api.AuthorizationHeaders(token) })
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
