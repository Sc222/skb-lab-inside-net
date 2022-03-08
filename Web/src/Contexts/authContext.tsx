import React, { FunctionComponent } from "react";
import { AuthContextPerson } from "../Typings/Interfaces/authContextPerson";
import { AuthenticationService } from "../Services/authenticationService";
import { PersonModel } from "../Api/Models/personModel";
import { LocalStorageService } from "../Services/localStorageService";
import { Result, ResultBuilder } from "../Utils/result";
import { AuthScope } from "../Typings/Enums/authScope";
import { PersonsApi } from "../Api/personsApi";
import { Api } from "../Api/api";
import { ContactsApi } from "../Api/contactsApi";
import { SlackChannelModel } from "../Api/Models/slackChannelModel";
import { SlackAccessesApi } from "../Api/slackAccessesApi";
import { SlackAccessRequestModelExtended } from "../Api/Models/slackAccessRequestModelExtended";

//FIXME should person-related methods be here?
interface AuthContextType {
  authInfo: AuthContextPerson | null;
  signIn: (
    authData: Pick<PersonModel, "email" | "password">,
    callback: (result: Result<AuthContextPerson>) => void
  ) => Promise<void>;
  signOut: (callback: () => void) => Promise<void>;
  getAuthScope: (callback: (result: Result<AuthScope>) => void) => Promise<void>;
  getPersonContacts: (
    searchParams: null | URLSearchParams,
    callback: (result: Result<PersonModel[]>) => void
  ) => Promise<void>;
  removeFromPersonContacts: (
    contactId: string,
    callback: (result: Result<undefined | string>) => void
  ) => Promise<void>;
  addToPersonContacts: (contactId: string, callback: (result: Result<undefined | string>) => void) => Promise<void>;
  getPersonInfo: (callback: (result: Result<PersonModel>) => void) => Promise<void>;
  getPersonSlackChannelsInfo: (callback: (result: Result<SlackChannelModel[]>) => void) => Promise<void>;
  getPersonSlackAccessRequestsChannels: (
    callback: (result: Result<SlackAccessRequestModelExtended[]>) => void
  ) => Promise<void>;
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
  getPersonContacts: async () => {
    /*do nothing*/
  },
  removeFromPersonContacts: async () => {
    /*do nothing*/
  },
  addToPersonContacts: async () => {
    /*do nothing*/
  },
  getPersonInfo: async () => {
    /*do nothing*/
  },
  getPersonSlackChannelsInfo: async () => {
    /*do nothing*/
  },
  getPersonSlackAccessRequestsChannels: async () => {
    /*do nothin*/
  },
});

export const AuthContextProvider: FunctionComponent = ({ children }) => {
  const localStorageService = new LocalStorageService();
  const authenticationService = new AuthenticationService();

  const [authInfo, setAuthInfo] = React.useState<AuthContextPerson | null>(localStorageService.getAuthInfo());

  //FIXME SECURITY!!! for safety purposes try gettingUserId from token!!! (because userId in local storage may be WRONG)

  const signIn = async (
    authData: Pick<PersonModel, "email" | "password">,
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

  const signOut = async (callback: () => void): Promise<void> => {
    await authenticationService.signOut();
    setAuthInfo(null);
    localStorageService.clearPersonInfo();
    callback();
  };

  const getAuthScope = async (callback: (result: Result<AuthScope>) => void): Promise<void> => {
    let result = ResultBuilder.Error<AuthScope>("Вход не выполнен");
    if (authInfo) {
      result = await authenticationService.getAuthScope(authInfo.personId, authInfo.token);
    }
    callback(result);
  };

  const getPersonContacts = async (
    searchParams: null | URLSearchParams,
    callback: (result: Result<PersonModel[]>) => void
  ): Promise<void> => {
    let result = ResultBuilder.Error<PersonModel[]>("Не удалось получить информацию о контактах пользователя");
    if (authInfo) {
      let response = await ContactsApi.GetPersonContacts(searchParams, authInfo.personId, authInfo.token);
      if (!Api.IsRequestSuccess(response) || !response.data) {
        result = ResultBuilder.Error(response.error);
      } else {
        result = ResultBuilder.Success(response.data);
      }
    }
    callback(result);
  };

  const removeFromPersonContacts = async (
    contactId: string,
    callback: (result: Result<string | undefined>) => void
  ): Promise<void> => {
    let result = ResultBuilder.Error<string | undefined>("Не удалось удалить контакт");
    if (authInfo) {
      let response = await ContactsApi.RemoveFromContacts(authInfo.personId, contactId, authInfo.token);
      if (!Api.IsRequestSuccess(response) || !response.data) {
        result = ResultBuilder.Error(response.error);
      } else {
        result = ResultBuilder.Success(response.data);
      }
    }
    callback(result);
  };

  const addToPersonContacts = async (
    contactId: string,
    callback: (result: Result<string | undefined>) => void
  ): Promise<void> => {
    let result = ResultBuilder.Error<string | undefined>("Не удалось добавить контакт");
    if (authInfo) {
      let response = await ContactsApi.AddToContacts(authInfo.personId, contactId, authInfo.token);
      if (!Api.IsRequestSuccess(response) || !response.data) {
        result = ResultBuilder.Error(response.error);
      } else {
        result = ResultBuilder.Success(response.data);
      }
    }
    callback(result);
  };

  const getPersonInfo = async (callback: (result: Result<PersonModel>) => void): Promise<void> => {
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

  const getPersonSlackChannelsInfo = async (callback: (result: Result<SlackChannelModel[]>) => void): Promise<void> => {
    let result = ResultBuilder.Error<SlackChannelModel[]>(
      "Не удалось получить информацию об Slack каналах пользователя"
    );
    if (authInfo) {
      let response = await SlackAccessesApi.GetSlackChannels(authInfo.personId, authInfo.token);
      if (!Api.IsRequestSuccess(response) || !response.data) {
        result = ResultBuilder.Error(response.error);
      } else {
        result = ResultBuilder.Success(response.data);
      }
    }
    callback(result);
  };

  const getPersonSlackAccessRequestsChannels = async (
    callback: (result: Result<SlackAccessRequestModelExtended[]>) => void
  ): Promise<void> => {
    let result = ResultBuilder.Error<SlackAccessRequestModelExtended[]>(
      "Не удалось получить информацию о запросах на доступ к Slack каналам"
    );
    if (authInfo) {
      let response = await SlackAccessesApi.GetPersonAccessRequests(authInfo.personId, authInfo.token);
      if (!Api.IsRequestSuccess(response) || !response.data) {
        result = ResultBuilder.Error(response.error);
      } else {
        result = ResultBuilder.Success(response.data);
      }
    }
    callback(result);
  };

  let value = {
    authInfo,
    signIn,
    signOut,
    getAuthScope,
    getPersonContacts,
    removeFromPersonContacts,
    addToPersonContacts,
    getPersonInfo,
    getPersonSlackChannelsInfo,
    getPersonSlackAccessRequestsChannels,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextType {
  return React.useContext(AuthContext);
}
