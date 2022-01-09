import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";

interface LoginPageProps {}

export const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuthContext();

  let from = (location.state as any)?.from?.pathname || "/";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    await auth.signIn({ Login: username, Password: "123" }, (result) => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        // TODO show login error to user
      }
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <form onSubmit={onSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
