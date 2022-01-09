import { AuthScope } from "../../Typings/Enums/authScope";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../Contexts/authContext";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

interface AuthPageRestriction {
  acceptedScopes: Set<Exclude<AuthScope, AuthScope.unknown>>;
}

export const AuthPageRestriction: React.FunctionComponent<AuthPageRestriction> = ({ acceptedScopes, children }) => {
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
  });

  if (!auth.person) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={SiteRoute.login} state={{ from: location }} replace />;
  }

  if (!authProfileScope) {
    // TODO: LOADER HERE
    return <>Loading...</>;
  }

  if (authProfileScope === AuthScope.unknown || !acceptedScopes.has(authProfileScope)) {
    return <Navigate to={`${SiteRoute.persons}/${auth.person.personId}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
