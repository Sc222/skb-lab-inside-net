import React, { FunctionComponent, useEffect } from "react";
import { useAuthContext } from "../../../Contexts/authContext";
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, List, Typography } from "@mui/material";
import { usePersonContext } from "../../../Contexts/personContext";
import { ProfileToolbar } from "../../../Components/Profile/profileToolbar";
import { ProfileContactItem } from "../../../Components/Profile/profileContactItem";
import { MailOutlined, PhoneOutlined } from "@mui/icons-material";
import { SlackOutlined } from "../../../Components/Icons/slackOutlined";
import { TelegramOutlined } from "../../../Components/Icons/telegramOutlined";

interface ProfilePageProps {}

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const auth = useAuthContext();
  const personContext = usePersonContext(); // context for person if it's not authenticated person profile
  const [isPersonInContacts, setIsPersonInContacts] = React.useState<boolean | null>(null);

  const profilePerson = personContext.person;
  const authInfo = auth.authInfo;

  // it can be authPersonPage or anotherPersonPage
  // null -> data not ready
  const isAuthPersonProfilePage = ((): boolean | null => {
    if (!authInfo || !profilePerson) {
      return null;
    }
    return authInfo.personId === profilePerson.Id;
  })();

  //todo optimize this string for large contacts count
  // null -> data not ready

  //console.log("departments: ", searchParams.getAll(ContactsSearchParam.department));

  // get logged in person contacts
  useEffect(() => {
    const getAuthPersonContacts = async () => {
      await auth.getPersonContacts((result) => {
        if (result.success) {
          //FIXME seems like a place for possible bugs
          if (profilePerson) {
            setIsPersonInContacts(result.success.findIndex((p) => p.Id === profilePerson.Id) > -1);
          }
        } else {
          // todo process errors somehow
          setIsPersonInContacts(null);
        }
      });
    };
    getAuthPersonContacts();
  }, [auth, profilePerson]);

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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProfileToolbar
                person={profilePerson}
                authPersonId={authInfo ? authInfo.personId : null}
                isAuthPersonProfilePage={isAuthPersonProfilePage}
                isPersonInContacts={isPersonInContacts}
                onIsInContactsChange={toggleIsPersonInContacts}
              />
            </Grid>
            {profilePerson && (
              <>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="Контактная информация" />
                    <Divider />
                    <CardContent sx={{ py: "0 !important" }}>
                      {/*TODO CORRECT LINKS*/}
                      <List dense>
                        <ProfileContactItem
                          icon={<MailOutlined />}
                          link={`mailto:${profilePerson.Email}`}
                          text={profilePerson.Email}
                        />
                        <ProfileContactItem
                          icon={<PhoneOutlined />}
                          link={`tel:${profilePerson.PhoneNumber}`}
                          text={profilePerson.PhoneNumber ?? "Не указан"}
                        />
                        <ProfileContactItem
                          icon={<TelegramOutlined />}
                          link={profilePerson.Telegram ? `https://t.me/${profilePerson.Telegram}` : undefined}
                          text={profilePerson.Telegram ?? "Не указан"}
                        />
                        <ProfileContactItem
                          icon={<SlackOutlined />}
                          link={profilePerson.Slack}
                          text={profilePerson.Slack ? "Ссылка на профиль" : "Не указан"}
                        />
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* TODO: IS SLACK CHANNELS LIST PUBLIC?*/}

                {/*not auth person layout*/}
                {!isAuthPersonProfilePage && (
                  <>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader title="Календарь" />
                        <Divider />
                        <CardContent>
                          <Typography>Здесь будет календарь</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader title="Slack каналы" />
                        <Divider />
                        <CardContent>
                          <Typography>Нужны ли каналы?</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
