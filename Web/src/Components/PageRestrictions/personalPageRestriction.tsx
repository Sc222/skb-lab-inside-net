import React, { FunctionComponent } from "react";
import { Navigate, useMatch } from "react-router-dom";
import { useAuthContext } from "../../Contexts/authContext";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { NotFoundDefaultRedirection } from "../notFoundDefaultRedirection";
import { usePersonContext } from "../../Contexts/personContext";

interface PersonalPageRestrictionProps {}

// private person section (like edit profile, for example), if id's don't match redirect to /profile
// MUST BE INSIDE personContext
export const PersonalPageRestriction: FunctionComponent<PersonalPageRestrictionProps> = ({ children }) => {
  let auth = useAuthContext();
  let personContext = usePersonContext(); //fixme seems strange

  const isPageAccessible = useMatch(`${SiteRoute.persons}/${auth.authInfo?.personId}/*`);

  if (!auth.authInfo || personContext.isLoading) {
    return <></>;
  }

  let personId = personContext.person?.id;

  if (!personId) {
    return <NotFoundDefaultRedirection />;
  }

  // Navigate to main person section
  if (!isPageAccessible) {
    return <Navigate to={`${SiteRoute.persons}/${personId}/${SiteRoute.profile}`} replace />;
  }

  return <>{children}</>;
};
