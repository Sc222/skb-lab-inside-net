import React, { FunctionComponent, useEffect } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { SearchContactCard } from "../../Components/Search/searchContactCard";
import { SearchContactsToolbar } from "../../Components/Search/searchContactsToolbar";
import { SearchContact } from "../../Typings/Types/searchContact";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ContactsSearchParam } from "../../Typings/Enums/contactsSearchParam";
import { useAuthContext } from "../../Contexts/authContext";
import { PersonsApi } from "../../Api/personsApi";
import { Api } from "../../Api/api";

interface SearchPageProps {}

//TODO think about possibility to search NOT ONLY CONTACTS

export const SearchPage: FunctionComponent<SearchPageProps> = () => {
  const auth = useAuthContext();
  const [contacts, setContacts] = React.useState<SearchContact[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = React.useState<string>(searchParams.get(ContactsSearchParam.name) ?? "");

  useEffect(() => {
    const getContacts = async (searchParams: URLSearchParams) => {
      if (!auth.authInfo?.token) {
        setContacts(null);
        return;
      }
      let response = await PersonsApi.Find(searchParams, auth.authInfo.token, true);
      let persons = !Api.IsRequestSuccess(response) || !response.data ? null : response.data;
      console.log("FETCHED");
      setContacts(persons);
    };
    getContacts(searchParams);
  }, [searchParams, auth.authInfo?.token]);

  // text + department, list of departments is fetched !!!

  //FILTER MUST USE SEARCH PARAMS INSIDE
  const filteredContactsCount: number | undefined = contacts?.filter((c) => c).length;

  //TODO:  fetch contacts from server + add WORKING filters !!!
  /*useEffect(() => {
    setContacts(Array.from(MockPersons.values()));
  });*/

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changed text: " + event.target.value);
    setSearchText(event.target.value);
  };

  const onTextKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //todo do not forget about DEPARTMENT FILTERS
      setSearchParams(createSearchParams({ [ContactsSearchParam.name]: searchText }));
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
        <Container maxWidth="lg">
          <SearchContactsToolbar
            resultCount={filteredContactsCount}
            searchText={searchText}
            onTextChange={onTextChange}
            onTextKeyDown={onTextKeyDown}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {contacts ? (
                contacts.map((contact) => (
                  <Grid item key={contact.Id} xs={12}>
                    <SearchContactCard contact={contact} />
                  </Grid>
                ))
              ) : (
                <Typography>Загрузка... {/*TODO LOADING INDICATOR*/}</Typography>
              )}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};
