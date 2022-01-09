import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/authContext";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { NotFoundDefaultRedirection } from "../notFoundDefaultRedirection";
import { usePersonContext } from "../../Contexts/personContext";

interface PersonalPageRestrictionProps {}

// private person section (like edit profile, for example), if id's don't match redirect to /profile
// MUST BE INSIDE personContext
export const PersonalPageRestriction: React.FunctionComponent<PersonalPageRestrictionProps> = ({ children }) => {
  let auth = useAuthContext();
  let personContext = usePersonContext();

  if (personContext.isLoading) {
    return <>Loading...</>;
  }

  let personId = personContext.person?.Id;

  if (!personId) {
    return <NotFoundDefaultRedirection />;
  }

  // Navigate to main person section
  if (auth.person?.personId !== personId) {
    return <Navigate to={`${SiteRoute.persons}/${personId}/${SiteRoute.profile}`} replace />;
  }

  return <>{children}</>;
};
