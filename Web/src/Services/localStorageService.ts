import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";

export class LocalStorageService {
    public addAuthInfo(authContextPerson: AuthContextPerson): void {
        localStorage.setItem("token", authContextPerson.token);
        localStorage.setItem("expires", authContextPerson.expires.toString());
        localStorage.setItem("personId", authContextPerson.personId);
    }

    public clearPersonInfo(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        localStorage.removeItem("personId");
    }

    public getAuthInfo(): AuthContextPerson | null {
        let token = localStorage.getItem("token");
        let expiresStr = localStorage.getItem("expires");
        let expires = Number(localStorage.getItem("expires"));
        let personId = localStorage.getItem("personId");

        //todo redirect to login if token expired

        // Person info is incorrect, return null (should trigger login in react)
        if (!token || !expiresStr || !Number.isFinite(expires) || !personId) {
            return null;
        }
        return {
            token,
            expires,
            personId,
        };
    }
}
