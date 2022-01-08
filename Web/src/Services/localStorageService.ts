import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";

export class LocalStorageService {
    public addPersonInfo(authContextPerson: AuthContextPerson): void {
        localStorage.setItem("token", authContextPerson.token);
        localStorage.setItem("expires", authContextPerson.expires);
        localStorage.setItem("personId", authContextPerson.personId);
    }

    public clearPersonInfo(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        localStorage.removeItem("personId");
    }

    public getPersonInfo(): AuthContextPerson | null {
        let token = localStorage.getItem("token");
        let expires = localStorage.getItem("expires");
        let personId = localStorage.getItem("personId");

        // Person info is incorrect, return null (should trigger login in react)
        if (!token || !expires || !personId) {
            return null;
        }
        return {
            token,
            expires,
            personId,
        };
    }
}
