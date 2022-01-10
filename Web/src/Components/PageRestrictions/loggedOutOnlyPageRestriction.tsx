import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/authContext";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface LoggedOutOnlyPageRestriction {}

// Area only for logged-out user, logged-in users will be redirected to their profile
export const LoggedOutOnlyPageRestriction: FunctionComponent<LoggedOutOnlyPageRestriction> = ({ children }) => {
  let auth = useAuthContext();

  if (auth.person) {
    return <Navigate to={`${SiteRoute.persons}/${auth.person.personId}/${SiteRoute.profile}`} replace />;
  }
  return <>{children}</>;
};
