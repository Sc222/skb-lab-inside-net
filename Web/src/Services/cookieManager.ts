import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import Cookies from "js-cookie";

export class CookieManager {
    public addAuthInfo(authContextPerson: AuthContextPerson & { expires: Date }): void {
        console.log("expires:", authContextPerson.expires);
        Cookies.set("token", authContextPerson.token, { path: "/", expires: authContextPerson.expires });
        Cookies.set("personId", authContextPerson.personId, { path: "/", expires: authContextPerson.expires });
        Cookies.set("SOMETHING", "AOAOOA", { path: "/" });
    }

    public clearPersonInfo(): void {
        console.log("CLEAR COOKIES");
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

    /**
     * Check if authInfo is expired
     * @returns `true` if authInfo is expired, `false` otherwise
     */
    public isAuthInfoExpired(): boolean {
        return this.getAuthInfo() === null;
    }
}
