import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { PersonModel } from "../Api/Models/personModel";
import { PersonsApi } from "../Api/personsApi";
import { Api } from "../Api/api";
import { useAuthContext } from "./authContext";

interface PersonContextType {
  person: PersonModel | null;
  isLoading: boolean;
}

const PersonContext = React.createContext<PersonContextType>({
  person: null,
  isLoading: true,
});

interface PersonContextProps {
  personId: string | null;
}

export const PersonContextProvider: FunctionComponent<PersonContextProps> = ({ personId, children }) => {
  let auth = useAuthContext();

  let [person, setPerson] = React.useState<PersonModel | null>(null);
  let [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const getPersonById = async (personId: string | null) => {
      if (!personId || !auth.authInfo?.token) {
        setPerson(null);
        setIsLoading(false);
        return;
      }
      let response = await PersonsApi.GetPersonById(personId, auth.authInfo?.token);
      let person = !Api.IsRequestSuccess(response) || !response.data ? null : response.data;
      setPerson(person);
      setIsLoading(false);
    };
    setIsLoading(true); // person is changed, so it is loading
    getPersonById(personId);
  }, [personId, auth.authInfo?.token]);

  let value = { person, isLoading };
  return <PersonContext.Provider value={value}>{children}</PersonContext.Provider>;
};

export function usePersonContext(): PersonContextType {
  return React.useContext(PersonContext);
}
