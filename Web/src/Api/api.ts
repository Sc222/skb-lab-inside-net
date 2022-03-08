import { ApiResponse } from "./apiResponse";

//TODO: create generic axios response wrapper for all requests errors processing

export class Api {
    public static get BaseUrl(): string {
        switch (process.env.NODE_ENV) {
            case "production": {
                let productionApiRoot = process.env.PRODUCTION_API_ROOT;
                if (!productionApiRoot) {
                    throw new Error("Please specify api root for production using 'PRODUCTION_API_ROOT' env variable");
                }
                return productionApiRoot;
            }
            default: {
                let devApiRoot = process.env.DEV_API_ROOT;
                if (!devApiRoot) {
                    throw new Error("Please specify api root for development using 'DEV_API_ROOT' env variable");
                }
                return devApiRoot;
            }
        }
    }

    public static IsRequestSuccess<T>(response: ApiResponse<T>): boolean {
        return response.status == 200 && response.error == null;
    }

    public static AuthorizationHeaders(token: string): Record<string, string> {
        return { Authorization: `Bearer ${token}` };
    }

    public static PostRequestHeaders(token: string | null): Record<string, string> {
        let headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        if (token) {
            headers = { ...headers, ...this.AuthorizationHeaders(token) };
        }
        return headers;
    }
}
