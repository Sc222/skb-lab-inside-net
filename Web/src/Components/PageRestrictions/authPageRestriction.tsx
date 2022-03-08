import { AuthScope } from "../../Typings/Enums/authScope";
import React, { FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../Contexts/authContext";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface AuthPageRestriction {
  acceptedScopes: Set<AuthScope>;
}

export const AuthPageRestriction: FunctionComponent<AuthPageRestriction> = ({ acceptedScopes, children }) => {
  let [authProfileScope, setAuthProfileScope] = React.useState<AuthScope | null>(null);

  let auth = useAuthContext();
  let location = useLocation();

  // must be memoized callback
  //todo FIX REACT LEAK
  //todo use useCallback + useEffect
  useEffect(() => {
    const getAuthScope = async () => {
      await auth.getAuthScope((result) => {
        if (result.success) {
          setAuthProfileScope(result.success);
        } else {
          setAuthProfileScope(AuthScope.unknown);
        }
      });
    };
    getAuthScope();
  },[]);

  if (!auth.authInfo) {
    console.log("redirect to LOGIN")
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={SiteRoute.login} state={{ from: location }} replace />;
  }

  if (!authProfileScope) {
    console.log("redirect to LOADER HERE")
    // TODO: LOADER HERE
    return <></>;
  }

  if (!acceptedScopes.has(authProfileScope)) {
    console.log("redirect to `${SiteRoute.persons}/${auth.authInfo.personId}`")
    return <Navigate to={`${SiteRoute.persons}/${auth.authInfo.personId}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
