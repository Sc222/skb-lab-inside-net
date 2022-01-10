import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";
import { SiteRoute } from "../Typings/Enums/siteRoute";

interface NotFoundDefaultRedirectionProps {}

export const NotFoundDefaultRedirection: FunctionComponent<NotFoundDefaultRedirectionProps> = () => {
  let auth = useAuthContext();

  let redirectionLink = auth.person
    ? `${SiteRoute.persons}/${auth.person.personId}/${SiteRoute.profile}`
    : SiteRoute.home;

  return <Navigate to={redirectionLink} replace />;
};
