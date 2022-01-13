import { AuthScope } from "../../Typings/Enums/authScope";
import React, { FunctionComponent, useEffect } from "react";
import { useAuthContext } from "../../Contexts/authContext";

interface AuthAreaRestrictionProps {
  acceptedScopes: Set<Exclude<AuthScope, AuthScope.unknown>>;
}

export const AuthAreaRestriction: FunctionComponent<AuthAreaRestrictionProps> = ({ acceptedScopes, children }) => {
  let [authProfileScope, setAuthProfileScope] = React.useState<AuthScope | null>(null);

  let auth = useAuthContext();

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

  if (!auth.authInfo) {
    return <></>;
  }

  if (!authProfileScope) {
    // TODO: LOADER HERE
    return <></>;
  }

  if (authProfileScope === AuthScope.unknown || !acceptedScopes.has(authProfileScope)) {
    return <></>;
  }

  return <>{children}</>;
};
