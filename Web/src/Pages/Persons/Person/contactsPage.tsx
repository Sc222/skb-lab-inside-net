import React, { FunctionComponent, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  List,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAuthContext } from "src/Contexts/authContext";
import { SearchContact } from "../../../Typings/Types/searchContact";
import { DepartmentModel } from "../../../Api/Models/departmentModel";
import { ContactsSearchParam } from "../../../Typings/Enums/contactsSearchParam";
import { createSearchParams, Link as RouterLink, useSearchParams } from "react-router-dom";
import { DepartmentsApi } from "../../../Api/departmentsApi";
import { PersonsApi } from "../../../Api/personsApi";
import { Api } from "../../../Api/api";
import { SearchContactsToolbar } from "../../../Components/Search/searchContactsToolbar";
import { SearchContactCard } from "../../../Components/Search/searchContactCard";
import { MyContactsToolbar } from "../../../Components/Contacts/myContactsToolbar";
import { MyContactCard } from "../../../Components/Contacts/myContactCard";
import { MyContact } from "../../../Typings/Types/myContact";
import { SiteRoute } from "../../../Typings/Enums/siteRoute";

interface ContactPageProps {
  searchOnEveryInput: boolean;
}

//TODO think about possibility to search NOT ONLY CONTACTS

//FIXME: DRY !!!
export const ContactsPage: FunctionComponent<ContactPageProps> = ({ searchOnEveryInput }) => {
  const auth = useAuthContext();
  const [authPersonContacts, setAuthPersonContacts] = React.useState<MyContact[] | null>(null);
  const [departments, setDepartments] = React.useState<DepartmentModel[] | null>(null); // all departments list
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = React.useState<string>(searchParams.get(ContactsSearchParam.name) ?? "");
  const [selectedDepartments, setSelectedDepartments] = React.useState<string[]>([]);

  const authPersonContactsIds = new Set<string>(authPersonContacts?.map((c) => c.Id!));

  useEffect(() => {
    const getAuthPersonContacts = async (searchParams: URLSearchParams) => {
      await auth.getPersonContacts(searchParams, (result) => {
        if (result.success) {
          console.log("result: ", result.success);
          setAuthPersonContacts(result.success);
        } else {
          // todo process errors somehow
          setAuthPersonContacts(null);
        }
      });
    };
    getAuthPersonContacts(searchParams);
  }, [searchParams, auth]);

  //FIXME initially selected departments are empty, make better validation
  useEffect(() => {
    const clearDepartmentsSearchParamsOnMount = () => {
      setSearchParams(createSearchParams({ [ContactsSearchParam.name]: searchText.trim() }));
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

  //Todo rethink this, maybe it will work bad for large lists
  const onContactDelete = (contactId: string) => {
    auth.removeFromPersonContacts(contactId, () => {
      /*process errors here*/
    });

    //fixme optimize using dict or hashset
    const newAuthPersonContacts = authPersonContacts ? authPersonContacts.filter((c) => c.Id !== contactId) : [];
    setAuthPersonContacts(newAuthPersonContacts); //FIXME: positive rendering, is it ok?
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <MyContactsToolbar
          resultCount={authPersonContacts?.length}
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
              {authPersonContacts ? (
                <List>
                  {authPersonContacts.map((contact, index) => (
                    <div key={contact.Id}>
                      <MyContactCard contact={contact} onDelete={onContactDelete} />
                      {index !== authPersonContacts.length - 1 && <Divider variant="middle" />}
                    </div>
                  ))}

                  {/* nothing found*/}
                  {authPersonContacts.length === 0 && (
                    <Box sx={{ py: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
                      <Typography textAlign="center" variant="h6">
                        Ничего не найдено
                      </Typography>
                      <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: 1 }} textAlign="center" variant="body2" component="span">
                          Вы можете воспользоваться
                        </Typography>
                        <Link
                          component={RouterLink}
                          to={`${SiteRoute.persons}/${SiteRoute.search}?${searchParams.toString()}`}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          глобальным поиском
                        </Link>
                      </Box>
                    </Box>
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
  );
};
