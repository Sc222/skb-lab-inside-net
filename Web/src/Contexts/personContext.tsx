import * as React from "react";
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

export const PersonContextProvider: React.FunctionComponent<PersonContextProps> = ({ personId, children }) => {
  let auth = useAuthContext();

  let [person, setPerson] = React.useState<PersonModel | null>(null);
  let [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const getPersonById = async (personId: string | null) => {
      if (!personId || !auth.person?.token) {
        setPerson(null);
        setIsLoading(false);
        return;
      }
      let response = await PersonsApi.GetPersonById(personId, auth.person?.token, true);
      let person = !Api.IsRequestSuccess(response) || !response.data ? null : response.data;
      setPerson(person);
      setIsLoading(false);
    };
    getPersonById(personId);
  }, [personId, auth.person?.token]);

  let value = { person, isLoading };
  return <PersonContext.Provider value={value}>{children}</PersonContext.Provider>;
};

export function usePersonContext(): PersonContextType {
  return React.useContext(PersonContext);
}
