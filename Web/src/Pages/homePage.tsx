// todo: beautiful landing from template  OR: redirect to login \ redirect to person profile
import React, { FunctionComponent } from "react";
import { useAuthContext } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";

interface HomePageProps {}

export const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <div>
      <AuthStatus />
      HOME PAGE
    </div>
  );
};

//todo debug view, remove later
const AuthStatus: FunctionComponent = () => {
  let authContext = useAuthContext();

  let navigate = useNavigate();

  if (!authContext.authInfo) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      {authContext.authInfo.personId}
      <br />
      <button
        onClick={() => {
          authContext.signOut(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
};
