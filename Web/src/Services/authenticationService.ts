import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import { PersonsApi } from "../Api/personsApi";
import { PersonModel } from "../Api/Models/personModel";
import { Api } from "../Api/api";
import { Result, ResultBuilder } from "../Utils/result";
import { AuthScope } from "../Typings/Enums/authScope";

export class AuthenticationService {
    public async signIn(authData: Pick<PersonModel, "Login" | "Password">): Promise<Result<AuthContextPerson>> {
        let response = await PersonsApi.Authenticate(authData);
        if (!Api.IsRequestSuccess(response) || !response.data) {
            return ResultBuilder.Error(response.error);
        }
        let authContextPerson = {
            token: response.data.token,
            expires: response.data.expires,
            personId: response.data.person.Id!,
        };
        return ResultBuilder.Success(authContextPerson);
    }

    public async signOut(): Promise<void> {
        // todo - send server request if needed
    }

    public async getAuthScope(personId: string, token: string): Promise<Result<AuthScope>> {
        let response = await PersonsApi.GetPersonById(personId, token);
        if (!Api.IsRequestSuccess(response) || !response.data) {
            return ResultBuilder.Error(response.error);
        }

        let isKnownScope = Object.values(AuthScope).includes(response.data.Position.Name as AuthScope);
        let finalAuthScope = isKnownScope ? (response.data.Position.Name as AuthScope) : AuthScope.unknown;
        return ResultBuilder.Success(finalAuthScope);
    }
}
