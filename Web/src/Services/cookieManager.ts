import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import Cookies from "js-cookie";

export class CookieManager {
    public addAuthInfo(authContextPerson: AuthContextPerson & { expires: number }): void {
        Cookies.set("token", authContextPerson.token, { path: "/", expires: authContextPerson.expires });
        Cookies.set("personId", authContextPerson.personId, { path: "/", expires: authContextPerson.expires });
    }

    public clearPersonInfo(): void {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("expires", { path: "/" });
        Cookies.remove("personId", { path: "/" });
    }

    public getAuthInfo(): Omit<AuthContextPerson, "expires"> | null {
        let token = Cookies.get("token");
        let personId = Cookies.get("personId");

        //todo redirect to login if token expired

        // Person info is incorrect, return null (should trigger login in react)
        if (!token || !personId) {
            return null;
        }
        return { token, personId };
    }
}
