import * as React from "react";
import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import { AuthenticationService } from "../Services/authenticationService";
import { PersonModel } from "../Api/Models/personModel";
import { LocalStorageService } from "../Services/localStorageService";
import { Result, ResultBuilder } from "../Utils/result";
import { AuthScope } from "../Typings/Enums/authScope";

interface AuthContextType {
  person: AuthContextPerson | null;
  signIn: (
    authData: Pick<PersonModel, "Login" | "Password">,
    callback: (result: Result<AuthContextPerson>) => void
  ) => Promise<void>;
  signOut: (callback: () => void) => Promise<void>;
  getAuthScope: (callback: (result: Result<AuthScope>) => void) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  person: null,
  signIn: async () => {
    /*do nothing*/
  },
  signOut: async () => {
    /*do nothing*/
  },
  getAuthScope: async () => {
    /*do nothing*/
  },
});

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  let localStorageService = new LocalStorageService();
  let authenticationService = new AuthenticationService();

  let [person, setPerson] = React.useState<AuthContextPerson | null>(localStorageService.getPersonInfo());

  let signIn = async (
    authData: Pick<PersonModel, "Login" | "Password">,
    callback: (result: Result<AuthContextPerson>) => void
  ): Promise<void> => {
    let result = await authenticationService.signIn(authData);
    console.log("person: ", result);
    if (result.success) {
      let person = result.success;
      setPerson(person);
      localStorageService.addPersonInfo(person);
    }
    callback(result);
  };

  let signOut = async (callback: () => void): Promise<void> => {
    await authenticationService.signOut();
    setPerson(null);
    localStorageService.clearPersonInfo();
    callback();
  };

  let getAuthScope = async (callback: (result: Result<AuthScope>) => void): Promise<void> => {
    let result = ResultBuilder.Error<AuthScope>("person is not logged in");
    if (person) {
      result = await authenticationService.getAuthScope(person.personId, person.token);
    }
    callback(result);
  };

  let value = { person, signIn, signOut, getAuthScope };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  return React.useContext(AuthContext);
}
