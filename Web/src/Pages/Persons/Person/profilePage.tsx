import React, { FunctionComponent, useEffect } from "react";
import { useAuthContext } from "../../../Contexts/authContext";
import { Box, Card, CardContent, Container } from "@mui/material";
import { usePersonContext } from "../../../Contexts/personContext";
import { ProfileToolbar } from "../../../Components/Profile/profileToolbar";
import { PersonModel } from "../../../Api/Models/personModel";

interface ProfilePageProps {}

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const auth = useAuthContext();
  const personContext = usePersonContext(); // context for person if it's not authenticated person profile
  const [authPersonContacts, setAuthPersonContacts] = React.useState<PersonModel[] | null>(null);
  const [isPersonInContacts, setIsPersonInContacts] = React.useState<boolean | null>(null);

  const profilePerson = personContext.person;
  const authInfo = auth.authInfo;

  // it can be authPersonPage or anotherPersonPage
  // null -> data not ready
  const isAuthPersonProfilePage = (): boolean | null => {
    if (!authInfo || !profilePerson) {
      return null;
    }
    return authInfo.personId === profilePerson.Id;
  };

  //todo optimize this string for large contacts count
  // null -> data not ready

  //console.log("departments: ", searchParams.getAll(ContactsSearchParam.department));

  // get logged in person contacts
  useEffect(() => {
    const getAuthScope = async () => {
      await auth.getPersonContacts((result) => {
        if (result.success) {
          setAuthPersonContacts(result.success);

          //FIXME seems like a place for possible bugs
          if (profilePerson) {
            setIsPersonInContacts(result.success.findIndex((p) => p.Id === profilePerson.Id) > -1);
          }
        } else {
          // todo process errors somehow
          setAuthPersonContacts(null);
        }
      });
    };
    getAuthScope();
  }, [auth.authInfo, profilePerson]);

  const toggleIsPersonInContacts = (isInContacts: boolean) => {
    if (profilePerson) {
      if (isInContacts) {
        auth.addToPersonContacts(profilePerson.Id!, () => {
          /*todo process errors here*/
        });
      } else {
        auth.removeFromPersonContacts(profilePerson.Id!, () => {
          /*todo process errors here*/
        });
      }
      setIsPersonInContacts(isInContacts);
    } else {
      //todo process error
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
          <ProfileToolbar
            person={personContext.person}
            authPersonId={authInfo ? authInfo.personId : null}
            isAuthPersonProfilePage={isAuthPersonProfilePage()}
            isPersonInContacts={isPersonInContacts}
            onIsInContactsChange={toggleIsPersonInContacts}
          />
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent sx={{ py: "0 !important" }}>
                {/*                {contacts ? (
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
                  <Typography>Загрузка... TODO LOADING INDICATOR</Typography>
                )}*/}
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};
