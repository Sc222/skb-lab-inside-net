import { ApiResponse } from "./apiResponse";

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
            default:
                return "https://localhost:8080";
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
