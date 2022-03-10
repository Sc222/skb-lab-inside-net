import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import { PersonsApi } from "../Api/personsApi";
import { PersonModel } from "../Api/Models/personModel";
import { Api } from "../Api/api";
import { Result, ResultBuilder } from "../Utils/result";
import { AuthScope } from "../Typings/Enums/authScope";

export class AuthenticationService {
    public async signIn(
        authData: Pick<PersonModel, "email" | "password">
    ): Promise<Result<AuthContextPerson & { expires: number }>> {
        let response = await PersonsApi.Authenticate(authData);
        if (!Api.IsRequestSuccess(response) || !response.data) {
            return ResultBuilder.Error(response.error); //TODO: keep in mind that this message is shown to user
        }
        let authContextPerson = {
            token: response.data.token,
            expires: response.data.expires,
            personId: response.data.person.id!,
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

        let isKnownScope = Object.values(AuthScope).includes(response.data.authScope as AuthScope);
        let finalAuthScope = isKnownScope ? (response.data.authScope as AuthScope) : AuthScope.unknown;
        return ResultBuilder.Success(finalAuthScope);
    }
}
