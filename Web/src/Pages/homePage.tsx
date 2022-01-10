// todo: beautiful landing from template  OR: redirect to login \ redirect to person profile
import React, { FunctionComponent } from "react";
import { useAuthContext } from "../Contexts/authContext";
import { Navigate } from "react-router-dom";
import { SiteRoute } from "../Typings/Enums/siteRoute";

interface HomePageProps {}

export const HomePage: FunctionComponent<HomePageProps> = () => {
  // temporary redirect while landing page is not ready
  let auth = useAuthContext();
  let redirectUrl: string = SiteRoute.login;
  if (auth.authInfo) {
    redirectUrl = `${SiteRoute.persons}/${auth.authInfo.personId}/${SiteRoute.profile}`;
  }
  return <Navigate to={redirectUrl} />;

  /* return (
      {/!*TODO: HOME PAGE HERE !!!*!/}
  );*/
};
