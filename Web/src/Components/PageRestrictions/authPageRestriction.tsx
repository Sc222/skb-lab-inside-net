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
  }, [auth]);

  // FIXME: cached localStorage session check in context does not work here
  // console.log("hm: ", localStorageService.getAuthInfo());

  if (!auth.authInfo) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // FIXME:  from: location does not always work actually
    // !!! replace is `false` to detect this redirection in android web app
    return <Navigate to={SiteRoute.login} state={{ from: location }} replace={false} />;
  }

  if (!authProfileScope) {
    // TODO: LOADER HERE
    return <></>;
  }

  if (!acceptedScopes.has(authProfileScope)) {
    return <Navigate to={`${SiteRoute.persons}/${auth.authInfo.personId}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
