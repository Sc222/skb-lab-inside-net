import { AuthScope } from "../Typings/Enums/authScope";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../Contexts/authContext";
import { SiteRoute } from "../Typings/Enums/siteRoute";

//rename to AuthPage
interface AuthAreaProps {
  acceptedScopes: Set<Exclude<AuthScope, AuthScope.unknown>>;
}

//add separate AuthPage that helps redirecting and protecting pages AND PersonPrivateArea that shows data only if person id matches requested id (identify by guid and server token check request)

//todo add props: ACCESSIBLE ONLY FOR USER ITSELF (check guids)
export const AuthArea: React.FunctionComponent<AuthAreaProps> = ({ acceptedScopes, children }) => {
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
    return <>LOADING profile info...</>;
  }

  if (authProfileScope === AuthScope.unknown || !acceptedScopes.has(authProfileScope)) {
    console.log("WRONG SCOPE: " + authProfileScope); //!!!
    return <Navigate to={`${SiteRoute.persons}/${auth.person.personId}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
