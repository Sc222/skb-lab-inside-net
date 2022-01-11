import React, { FunctionComponent, useEffect } from "react";
import { Box, Card, CardContent, Container, Divider, List, SelectChangeEvent, Typography } from "@mui/material";
import { SearchContactCard } from "../../Components/Search/searchContactCard";
import { SearchContactsToolbar } from "../../Components/Search/searchContactsToolbar";
import { SearchContact } from "../../Typings/Types/searchContact";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ContactsSearchParam } from "../../Typings/Enums/contactsSearchParam";
import { useAuthContext } from "../../Contexts/authContext";
import { PersonsApi } from "../../Api/personsApi";
import { Api } from "../../Api/api";
import { DepartmentModel } from "../../Api/Models/departmentModel";
import { DepartmentsApi } from "../../Api/departmentsApi";

interface SearchPageProps {
  searchOnEveryInput: boolean;
}

//TODO think about possibility to search NOT ONLY CONTACTS

export const SearchPage: FunctionComponent<SearchPageProps> = ({ searchOnEveryInput }) => {
  const auth = useAuthContext();
  const [contacts, setContacts] = React.useState<SearchContact[] | null>(null);
  const [departments, setDepartments] = React.useState<DepartmentModel[] | null>(null); // all departments list
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = React.useState<string>(searchParams.get(ContactsSearchParam.name) ?? "");
  const [selectedDepartments, setSelectedDepartments] = React.useState<string[]>([]);

  //FIXME initially selected departments are empty, make better validation
  useEffect(() => {
    const clearDepartmentsSearchParamsOnMount = () => {
      setSearchParams(createSearchParams({ [ContactsSearchParam.name]: searchText }));
    };
    clearDepartmentsSearchParamsOnMount();
  }, []); // it is intended

  useEffect(() => {
    const getDepartments = async () => {
      if (!auth.authInfo?.token) {
        setDepartments(null);
        return;
      }
      let response = await DepartmentsApi.GetAll(auth.authInfo.token, true);
      let departments = !Api.IsRequestSuccess(response) || !response.data ? null : response.data;
      setDepartments(departments);
    };
    getDepartments();
  }, [auth.authInfo?.token]);

  //console.log("departments: ", searchParams.getAll(ContactsSearchParam.department));

  useEffect(() => {
    const getContacts = async (searchParams: URLSearchParams) => {
      if (!auth.authInfo?.token) {
        setContacts(null);
        return;
      }
      let response = await PersonsApi.Find(searchParams, auth.authInfo.token, true);
      let persons = !Api.IsRequestSuccess(response) || !response.data ? null : response.data;

      // Exclude yourself from the list
      setContacts(persons ? persons.filter((p) => p.Id !== auth.authInfo?.personId) : null);
    };
    getContacts(searchParams);
  }, [searchParams, auth.authInfo]);

  //FIXME use departmentModel, not string

  const updateSearchParams = (text: string, departments: string[]) => {
    setSearchParams(
      createSearchParams({
        [ContactsSearchParam.name]: text,
        [ContactsSearchParam.department]: departments,
      })
    );
  };

  //fixme use DepartmentsModel, "string" value never goes here if keyboard input is disable
  const onDepartmentsChange = (event: SelectChangeEvent<typeof selectedDepartments>) => {
    let value = event.target.value;
    let newDepartments = typeof value === "string" ? value.split(",") : value;
    setSelectedDepartments(newDepartments);
    updateSearchParams(searchText, newDepartments);
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    if (searchOnEveryInput) {
      updateSearchParams(event.target.value, selectedDepartments);
    }
  };

  const onTextKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateSearchParams(searchText, selectedDepartments);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <SearchContactsToolbar
            resultCount={contacts?.length}
            searchText={searchText}
            departments={departments}
            selectedDepartments={selectedDepartments}
            onTextChange={onTextChange}
            onTextKeyDown={onTextKeyDown}
            onSelectedDepartmentsChange={onDepartmentsChange}
          />

          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent sx={{ py: "0 !important" }}>
                {contacts ? (
                  <List>
                    {contacts.map((contact, index) => (
                      <div key={contact.Id}>
                        <SearchContactCard contact={contact} />
                        {index !== contacts.length - 1 && <Divider variant="middle" />}
                      </div>
                    ))}
                    {contacts.length === 0 && (
                      <Typography sx={{ py: 2 }} textAlign="center" variant="body2">
                        Ничего не найдено
                      </Typography>
                    )}
                  </List>
                ) : (
                  <Typography>Загрузка... {/*TODO LOADING INDICATOR*/}</Typography>
                )}
                {/* <Grid container spacing={3}>
              {contacts ? (
                contacts.map((contact) => (
                  <Grid item key={contact.Id} xs={12}>
                    <SearchContactCard contact={contact} />
                  </Grid>
                ))
              ) : (
                <Typography>Загрузка... TODO LOADING INDICATOR</Typography>
              )}
            </Grid>*/}
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};
