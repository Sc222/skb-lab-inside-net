// todo: beautiful landing from template  OR: redirect to login \ redirect to person profile
import React from "react";
import { useAuthContext } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";

interface HomePageProps {}

export const HomePage: React.FunctionComponent<HomePageProps> = () => {
  return (
    <div>
      <AuthStatus />
      HOME PAGE
    </div>
  );
};

//todo debug view, remove later
const AuthStatus: React.FunctionComponent = () => {
  let authContext = useAuthContext();

  let navigate = useNavigate();

  if (!authContext.person) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      {authContext.person.personId}
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
