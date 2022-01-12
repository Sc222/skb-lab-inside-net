import React, { FunctionComponent, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../../Contexts/authContext";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  List,
  Typography,
} from "@mui/material";
import { usePersonContext } from "../../../Contexts/personContext";
import { ProfileToolbar } from "../../../Components/Profile/profileToolbar";
import { ProfileContactItem } from "../../../Components/Profile/profileContactItem";
import { MailOutlined, PhoneOutlined } from "@mui/icons-material";
import { SlackOutlined } from "../../../Components/Icons/slackOutlined";
import { TelegramOutlined } from "../../../Components/Icons/telegramOutlined";
import { SiteRoute } from "../../../Typings/Enums/siteRoute";
import { PersonModel } from "../../../Api/Models/personModel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface ProfilePageProps {}

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const auth = useAuthContext();
  const personContext = usePersonContext(); // context for person if it's not authenticated person profile
  const [isPersonInContacts, setIsPersonInContacts] = React.useState<boolean | null>(null); //fixme remove from state
  const [authPersonContacts, setAuthPersonContacts] = React.useState<PersonModel[] | null>(null);

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
      await auth.getPersonContacts(null, (result) => {
        if (result.success) {
          //FIXME seems like a place for possible bugs
          if (profilePerson) {
            setAuthPersonContacts(result.success);
            setIsPersonInContacts(result.success.findIndex((p) => p.Id === profilePerson.Id) > -1);
          }
        } else {
          // todo process errors somehow
          setAuthPersonContacts(null);
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
                          link={
                            profilePerson.Slack
                              ? `https://companydomain.slack.com/team/${profilePerson.Slack}`
                              : undefined
                          }
                          text={profilePerson.Slack ?? "Не указан"}
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
                  </>
                )}
                {/*auth person layout*/}
                {isAuthPersonProfilePage && authInfo && (
                  <>
                    <Grid item xs={12} sm={4}>
                      <Card>
                        <CardHeader
                          title={
                            <Link
                              component={RouterLink}
                              to={`${SiteRoute.persons}/${authInfo.personId}/${SiteRoute.contacts}`}
                              sx={{ cursor: "pointer", color: "inherit" }}
                              underline="hover"
                            >
                              Контакты
                            </Link>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Grid container spacing={1}>
                            {/*URL TO CONTACTS PROFILE*/}
                            {authPersonContacts &&
                              authPersonContacts
                                .filter((c, index) => index < 3)
                                .map((c) => (
                                  <Grid
                                    item
                                    xs={4}
                                    alignContent="center"
                                    alignItems="center"
                                    justifyContent="start"
                                    sx={{ display: "flex", flexDirection: "column" }}
                                  >
                                    <Avatar
                                      src={c.AvatarUrl}
                                      sx={{
                                        height: 54,
                                        width: 54,
                                        fontSize: "48px",
                                        mb: 1,
                                      }}
                                    >
                                      <AccountCircleOutlinedIcon color="primary" fontSize="inherit" />
                                    </Avatar>
                                    {/*FIXME SEPARATE VARIABLE FOR NAME*/}
                                    <Typography variant="body1" textAlign="center">
                                      {c.FullName.split(" ")[1] ?? c.FullName}
                                    </Typography>
                                  </Grid>
                                ))}
                          </Grid>
                          {/*<Typography>Avatar+имя Первых 6-ти контактов</Typography>*/}
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={8} alignItems="stretch">
                      <Card sx={{ height: "100%" }}>
                        <CardHeader
                          title={
                            <Link
                              component={RouterLink}
                              to={`${SiteRoute.persons}/${authInfo.personId}/${SiteRoute.manageAccess}`}
                              sx={{ cursor: "pointer", color: "inherit" }}
                              underline="hover"
                            >
                              Права доступа
                            </Link>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Typography>ListItem первых 3-4 прав доступа</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card sx={{ height: "100%" }}>
                        <CardHeader
                          title={
                            <Link
                              component={RouterLink}
                              to={`${SiteRoute.persons}/${authInfo.personId}/${SiteRoute.calendar}`}
                              sx={{ cursor: "pointer", color: "inherit" }}
                              underline="hover"
                            >
                              Календарь
                            </Link>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Typography>Здесь будет календарь</Typography>
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
