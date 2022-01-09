import React, { Component } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthArea } from "./Components/authArea";
import { AuthContextProvider, useAuthContext } from "./Contexts/authContext";
import { SiteRoute } from "./Typings/Enums/siteRoute";
import { SearchPage } from "./Pages/Persons/searchPage";
import { LoginPage } from "./Pages/loginPage";
import { RegisterPage } from "./Pages/registerPage";
import { AuthScopesSets } from "./Utils/authScopeSets";
import { PersonsPage } from "./Pages/personsPage";
import { SpecificPersonPage } from "./Pages/Persons/specificPersonPage";
import { ProfilePage } from "./Pages/Persons/Person/profilePage";
import { EditProfilePage } from "./Pages/Persons/Person/editProfilePage";
import { ManageSlackAccessPage } from "./Pages/Persons/Person/manageSlackAccessPage";
import { NotFoundDefaultRedirection } from "./Components/notFoundDefaultRedirection";
import { LoggedOutPersonArea } from "./Components/loggedOutPersonArea";
import { PrivatePersonSection } from "./Components/privatePersonSection";

//todo debug view, remove later
const AuthStatus: React.FunctionComponent = () => {
  let authContext = useAuthContext();

  let navigate = useNavigate();

  if (!authContext.person) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      DEBUG VIEW: {authContext.person.personId}!
      <button
        onClick={() => {
          authContext.signOut(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
};

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
      <AuthContextProvider>
        <AuthStatus />
        <Routes>
          {/* LOGGED IN USER SHOULD BE REDIRECTED FROM HOME, LOGIN AND REGISTER*/}
          <Route path={SiteRoute.home} element={<div>root "landing" page, redirect if logged in (like in gh)</div>} />
          <Route
            path={SiteRoute.login}
            element={
              <LoggedOutPersonArea>
                <LoginPage />
              </LoggedOutPersonArea>
            }
          />
          <Route
            path={SiteRoute.register}
            element={
              <LoggedOutPersonArea>
                <RegisterPage />
              </LoggedOutPersonArea>
            }
          />
          <Route
            path={SiteRoute.persons}
            element={
              <AuthArea acceptedScopes={AuthScopesSets.All}>
                <PersonsPage /> {/*THERE SHOULD BE TOOLBAR + SIDE MENU*/}
              </AuthArea>
            }
          >
            <Route path={SiteRoute.search} element={<SearchPage />} />
            <Route path={SiteRoute.personId} element={<SpecificPersonPage />}>
              <Route path={SiteRoute.profile} element={<ProfilePage />} />
              {/*TODO inside profile  show CALENDAR info for all users*/}
              {/*TODO: calendar has 3 event types: studying, time-off, командировка*/}
              {/*!!! TODO !!! make privatePersonArea here*/}
              <Route
                path={SiteRoute.editProfile}
                element={
                  <PrivatePersonSection>
                    <EditProfilePage />
                  </PrivatePersonSection>
                }
              />
              <Route
                path={SiteRoute.manageSlackAccess}
                element={
                  <PrivatePersonSection>
                    <ManageSlackAccessPage />
                  </PrivatePersonSection>
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
    );
  }
}
