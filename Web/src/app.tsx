import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthPageRestriction } from "./Components/PageRestrictions/authPageRestriction";
import { AuthContextProvider } from "./Contexts/authContext";
import { SiteRoute } from "./Typings/Enums/siteRoute";
import { SearchPage } from "./Pages/Persons/searchPage";
import { LoginPage } from "./Pages/loginPage";
import { RegisterPage } from "./Pages/registerPage";
import { AuthScopesSets } from "./Utils/authScopeSets";
import { PersonsPage } from "./Pages/personsPage";
import { SpecificPersonPage } from "./Pages/Persons/specificPersonPage";
import { ProfilePage } from "./Pages/Persons/Person/profilePage";
import { SettingsPage } from "./Pages/Persons/Person/settingsPage";
import { SlackChannelsPage } from "./Pages/Persons/Person/slackChannelsPage";
import { NotFoundDefaultRedirection } from "./Components/notFoundDefaultRedirection";
import { LoggedOutOnlyPageRestriction } from "./Components/PageRestrictions/loggedOutOnlyPageRestriction";
import { PersonalPageRestriction } from "./Components/PageRestrictions/personalPageRestriction";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./appTheme";
import { HomePage } from "./Pages/homePage";
import { CalendarPage } from "./Pages/Persons/Person/calendarPage";
import { ContactsPage } from "./Pages/Persons/Person/contactsPage";

interface AppProps {}

interface AppState {}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  //todo: 2 MAIN COMPONENTS
  // authPage (redirects if not logged in \ scope is wrong)
  // authArea (just hides it area) (+ add bool prop "privatePersonArea")
  // loggedOutArea ()

  //todo: better auth management, rely on request every time, not on cached profileId and scope !!!

  public render(): JSX.Element {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <AuthContextProvider>
          <Routes>
            {/* LOGGED IN USER SHOULD BE REDIRECTED FROM HOME, LOGIN AND REGISTER*/}
            <Route path={SiteRoute.home} element={<HomePage />} />
            <Route
              path={SiteRoute.login}
              element={
                <LoggedOutOnlyPageRestriction>
                  <LoginPage />
                </LoggedOutOnlyPageRestriction>
              }
            />
            <Route
              path={SiteRoute.register}
              element={
                <LoggedOutOnlyPageRestriction>
                  <RegisterPage />
                </LoggedOutOnlyPageRestriction>
              }
            />
            <Route
              path={SiteRoute.persons}
              element={
                <AuthPageRestriction acceptedScopes={AuthScopesSets.All}>
                  <PersonsPage /> {/*THERE SHOULD BE TOOLBAR + SIDE MENU*/}
                </AuthPageRestriction>
              }
            >
              <Route path={SiteRoute.search} element={<SearchPage searchOnEveryInput />} />
              <Route path={SiteRoute.personId} element={<SpecificPersonPage />}>
                <Route path={SiteRoute.profile} element={<ProfilePage />} />
                {/*TODO inside profile  show CALENDAR info for all users*/}
                {/*TODO: calendar has 3 event types: studying, time-off, командировка*/}
                <Route
                  path={SiteRoute.calendar}
                  element={
                    <PersonalPageRestriction>
                      <CalendarPage />
                    </PersonalPageRestriction>
                  }
                />
                <Route
                  path={SiteRoute.contacts}
                  element={
                    <PersonalPageRestriction>
                      <ContactsPage searchOnEveryInput />
                    </PersonalPageRestriction>
                  }
                />
                <Route
                  path={SiteRoute.slackChannels}
                  element={
                    <PersonalPageRestriction>
                      <SlackChannelsPage />
                    </PersonalPageRestriction>
                  }
                />
                <Route
                  path={SiteRoute.settings}
                  element={
                    <PersonalPageRestriction>
                      <SettingsPage />
                    </PersonalPageRestriction>
                  }
                />
                <Route path={"*"} element={<NotFoundDefaultRedirection />} />
                {/* New profile routes can be added here*/}
              </Route>
              <Route path={"*"} element={<NotFoundDefaultRedirection />} />
            </Route>
            <Route path={"*"} element={<NotFoundDefaultRedirection />} />
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    );
  }
}
