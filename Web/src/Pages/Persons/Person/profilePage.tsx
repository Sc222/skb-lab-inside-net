import React, { FunctionComponent, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../../Contexts/authContext";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { usePersonContext } from "../../../Contexts/personContext";
import { ProfileToolbar } from "../../../Components/Profile/profileToolbar";
import { ProfileContactItem } from "../../../Components/Profile/profileContactItem";
import { MailOutlined, Person, PhoneOutlined } from "@mui/icons-material";
import { SlackOutlined } from "../../../Components/Icons/slackOutlined";
import { TelegramOutlined } from "../../../Components/Icons/telegramOutlined";
import { SiteRoute } from "../../../Typings/Enums/siteRoute";
import { PersonModel } from "../../../Api/Models/personModel";
import { SlackChannelModel } from "../../../Api/Models/slackChannelModel";
import { MyChannelListItem } from "../../../Components/SlackChannels/myChannelListItem";
import { PersonalCalendar } from "../../../Components/Calendar/PersonalCalendar/personalCalendar";
import { PersonPageContainer } from "../../../Components/Common/personPageContainer";

//TODO: split profilePage by CARDS
//TODO: optimize rerenders
//TODO: fix authProfile blinking before person loaded (OR CREATE 2 DIFFERENT COMPONENTS for auth \ another)

interface ProfilePageProps {}

export const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const auth = useAuthContext();
  const personContext = usePersonContext(); // context for person if it's not authenticated person profile
  const [isPersonInContacts, setIsPersonInContacts] = React.useState<boolean | null>(null); //fixme remove from state
  const [authPersonContacts, setAuthPersonContacts] = React.useState<PersonModel[] | null>(null);
  const [authPersonSlackChannels, setAuthPersonSlackChannels] = React.useState<SlackChannelModel[] | null>(null);

  const profilePerson = personContext.person;
  const authInfo = auth.authInfo;

  // it can be authPersonPage or anotherPersonPage
  // null -> data not ready
  const isAuthPersonProfilePage = ((): boolean | null => {
    if (!authInfo || !profilePerson) {
      return null;
    }
    return authInfo.personId === profilePerson.id;
  })();

  console.log("is auth page + isPersonLoading: " + isAuthPersonProfilePage + personContext.isLoading);

  //todo optimize this string for large contacts count
  // null -> data not ready

  // get slack-channels, request only if profilePage is authPersonPage
  useEffect(() => {
    const getAuthPersonSlackChannels = async () => {
      await auth.getPersonSlackChannelsInfo((result) => {
        if (result.success) {
          setAuthPersonSlackChannels(result.success.filter((c) => c.isInChannel));
        } else {
          setAuthPersonSlackChannels(null);
        }
      });
    };
    if (auth.authInfo?.personId === profilePerson?.id) {
      getAuthPersonSlackChannels();
    }
  }, [auth, profilePerson]);

  //console.log("departments: ", searchParams.getAll(ContactsSearchParam.department));

  // get logged in person contacts
  useEffect(() => {
    const getAuthPersonContacts = async () => {
      await auth.getPersonContacts(null, (result) => {
        if (result.success) {
          //FIXME seems like a place for possible bugs
          if (profilePerson) {
            setAuthPersonContacts(result.success);
            setIsPersonInContacts(result.success.findIndex((p) => p.id === profilePerson.id) > -1);
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
        auth.addToPersonContacts(profilePerson.id!, () => {
          /*todo process errors here*/
        });
      } else {
        auth.removeFromPersonContacts(profilePerson.id!, () => {
          /*todo process errors here*/
        });
      }
      setIsPersonInContacts(isInContacts);
    } else {
      //todo process error
    }
  };

  return (
    <PersonPageContainer>
      <Container maxWidth="md">
        {/*fixme TMP workaround of profile page blinking*/}
        {!personContext.isLoading && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProfileToolbar
                person={profilePerson}
                isLoading={personContext.isLoading}
                authPersonId={authInfo ? authInfo.personId : null}
                isAuthPersonProfilePage={isAuthPersonProfilePage}
                isPersonInContacts={isPersonInContacts}
                onIsInContactsChange={toggleIsPersonInContacts}
              />
            </Grid>
            {!personContext.isLoading && profilePerson && (
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
                          link={`mailto:${profilePerson.email}`}
                          text={profilePerson.email}
                        />
                        <ProfileContactItem
                          icon={<PhoneOutlined />}
                          link={`tel:${profilePerson.phoneNumber}`}
                          text={profilePerson.phoneNumber ?? "Не указан"}
                        />
                        <ProfileContactItem
                          icon={<TelegramOutlined />}
                          link={profilePerson.telegram ? `https://t.me/${profilePerson.telegram}` : undefined}
                          text={profilePerson.telegram ?? "Не указан"}
                        />
                        <ProfileContactItem
                          icon={<SlackOutlined />}
                          link={
                            profilePerson.slack
                              ? `https://companydomain.slack.com/team/${profilePerson.slack}`
                              : undefined
                          }
                          text={profilePerson.slack ?? "Не указан"}
                        />
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/*auth person layout*/}
                {isAuthPersonProfilePage && authInfo && (
                  <>
                    <Grid item xs={12} sm={4}>
                      <Card sx={{ height: "100%" }}>
                        <CardHeader
                          title={
                            <Stack direction="row" alignItems="baseline" justifyContent="start" spacing={1}>
                              <Link
                                component={RouterLink}
                                to={`${SiteRoute.persons}/${authInfo.personId}/${SiteRoute.contacts}`}
                                sx={{ cursor: "pointer", color: "inherit" }}
                                underline="hover"
                              >
                                Контакты
                              </Link>
                              <Typography variant="body2">{authPersonContacts?.length ?? ""}</Typography>
                            </Stack>
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Grid container spacing={1}>
                            {authPersonContacts &&
                              authPersonContacts
                                .filter((p, index) => index < 6)
                                .map((p) => (
                                  <Grid
                                    item
                                    xs={4}
                                    alignContent="center"
                                    alignItems="center"
                                    justifyContent="start"
                                    sx={{ display: "flex", flexDirection: "column" }}
                                  >
                                    <Avatar
                                      src={p.avatarUrl}
                                      sx={(theme) => ({
                                        height: 54,
                                        width: 54,
                                        fontSize: "40px",
                                        mb: 1,
                                        border: `solid 1px ${theme.palette.primary.main}`,
                                        background: theme.palette.background.paper,
                                      })}
                                    >
                                      <Person color="primary" fontSize="inherit" />
                                    </Avatar>
                                    {/*FIXME SEPARATE VARIABLE FOR NAME*/}
                                    <Link
                                      component={RouterLink}
                                      to={`${SiteRoute.persons}/${p.id}/${SiteRoute.profile}`}
                                      sx={{ cursor: "pointer", color: "inherit" }}
                                      underline="hover"
                                    >
                                      <Typography variant="body1" textAlign="center">
                                        {p.fullName.split(" ")[1] ?? p.fullName}
                                      </Typography>
                                    </Link>
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
                            <Stack direction="row" alignItems="baseline" justifyContent="start" spacing={1}>
                              <Link
                                component={RouterLink}
                                to={`${SiteRoute.persons}/${authInfo.personId}/${SiteRoute.slackChannels}`}
                                sx={{ cursor: "pointer", color: "inherit" }}
                                underline="hover"
                              >
                                Slack каналы
                              </Link>
                              <Typography variant="body2">{authPersonSlackChannels?.length ?? ""}</Typography>
                            </Stack>
                          }
                        />
                        <Divider />
                        <CardContent sx={{ py: "0 !important", minHeight: 100 }}>
                          <List>
                            {authPersonSlackChannels &&
                              authPersonSlackChannels
                                .filter((c, i) => i < 3)
                                .map((channel) => (
                                  <div key={channel.channelId}>
                                    <MyChannelListItem channel={channel} dense />
                                  </div>
                                ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}
                {/* TODO: IS SLACK CHANNELS LIST PUBLIC?*/}

                {/*common persons layout*/}
                {!personContext.isLoading && profilePerson && (
                  <>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader
                          title={
                            isAuthPersonProfilePage && authInfo ? (
                              <Link
                                component={RouterLink}
                                to={`${SiteRoute.persons}/${authInfo.personId}/${SiteRoute.calendar}`}
                                sx={{ cursor: "pointer", color: "inherit" }}
                                underline="hover"
                              >
                                Календарь
                              </Link>
                            ) : (
                              "Календарь"
                            )
                          }
                        />
                        <Divider />
                        <CardContent>
                          {auth.authInfo && profilePerson && (
                            <PersonalCalendar token={auth.authInfo.token} person={profilePerson} isPreview />
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        )}
      </Container>
    </PersonPageContainer>
  );
};
