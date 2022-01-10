import React, { FunctionComponent } from "react";
import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import { AuthenticationService } from "../Services/authenticationService";
import { PersonModel } from "../Api/Models/personModel";
import { LocalStorageService } from "../Services/localStorageService";
import { Result, ResultBuilder } from "../Utils/result";
import { AuthScope } from "../Typings/Enums/authScope";
import { PersonsApi } from "../Api/personsApi";
import { Api } from "../Api/api";

interface AuthContextType {
  authInfo: AuthContextPerson | null;
  signIn: (
    authData: Pick<PersonModel, "Email" | "Password">,
    callback: (result: Result<AuthContextPerson>) => void
  ) => Promise<void>;
  signOut: (callback: () => void) => Promise<void>;
  getAuthScope: (callback: (result: Result<AuthScope>) => void) => Promise<void>;
  getPersonInfo: (callback: (result: Result<PersonModel>) => void) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  authInfo: null,
  signIn: async () => {
    /*do nothing*/
  },
  signOut: async () => {
    /*do nothing*/
  },
  getAuthScope: async () => {
    /*do nothing*/
  },
  getPersonInfo: async () => {
    /*do nothing*/
  },
});

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  let localStorageService = new LocalStorageService();
  let authenticationService = new AuthenticationService();

  let [authInfo, setAuthInfo] = React.useState<AuthContextPerson | null>(localStorageService.getAuthInfo());

  //FIXME SECURITY!!! for safety purposes try gettingUserId from token!!! (because userId in local storage may be WRONG)

  let signIn = async (
    authData: Pick<PersonModel, "Email" | "Password">,
    callback: (result: Result<AuthContextPerson>) => void
  ): Promise<void> => {
    let result = await authenticationService.signIn(authData);
    if (result.success) {
      let fetchedPerson = result.success;
      setAuthInfo(fetchedPerson);
      localStorageService.addAuthInfo(fetchedPerson);
    }
    callback(result);
  };

  let signOut = async (callback: () => void): Promise<void> => {
    await authenticationService.signOut();
    setAuthInfo(null);
    localStorageService.clearPersonInfo();
    callback();
  };

  let getAuthScope = async (callback: (result: Result<AuthScope>) => void): Promise<void> => {
    let result = ResultBuilder.Error<AuthScope>("Вход не выполнен");
    if (authInfo) {
      result = await authenticationService.getAuthScope(authInfo.personId, authInfo.token);
    }
    callback(result);
  };

  let getPersonInfo = async (callback: (result: Result<PersonModel>) => void): Promise<void> => {
    let result = ResultBuilder.Error<PersonModel>("Не удалось получить информацию об авторизированном пользователе");
    if (authInfo) {
      let response = await PersonsApi.GetPersonById(authInfo.personId, authInfo.token);
      if (!Api.IsRequestSuccess(response) || !response.data) {
        result = ResultBuilder.Error(response.error);
      } else {
        result = ResultBuilder.Success(response.data);
      }
    }
    callback(result);
  };

  let value = { authInfo, signIn, signOut, getAuthScope, getPersonInfo };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextType {
  return React.useContext(AuthContext);
}
