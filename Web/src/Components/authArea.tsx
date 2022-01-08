import { AuthScope } from "../Typings/Enums/authScope";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../Contexts/authContext";

interface AuthAreaProps {
  acceptedScopes: Set<Exclude<AuthScope, AuthScope.unknown>>;
}

//todo add props: ACCESSIBLE ONLY FOR USER ITSELF (check guids)
export const AuthArea: React.FunctionComponent<AuthAreaProps> = ({ acceptedScopes, children }) => {
  let [authProfileScope, setAuthProfileScope] = React.useState<AuthScope | null>(null);

  let auth = useAuth();
  let location = useLocation();

  // must be memoized callback
  //todo FIX REACT LEAK
  useEffect(() => {
    auth.getAuthScope((result) => {
      if (result.success) {
        setAuthProfileScope(result.success);
      } else {
        setAuthProfileScope(AuthScope.unknown);
      }
    });
  });
  //setAuthProfileScope()

  if (!auth.person) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authProfileScope) {
    return <>LOADING profile info...</>;
  }

  if (authProfileScope === AuthScope.unknown || !acceptedScopes.has(authProfileScope)) {
    console.log("WRONG SCOPE: " + authProfileScope); //!!!
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
