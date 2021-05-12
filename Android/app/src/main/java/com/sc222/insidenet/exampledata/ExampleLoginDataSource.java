package com.sc222.insidenet.exampledata;

import com.sc222.insidenet.exampledata.examplemodel.ExampleLoggedInUser;

import java.io.IOException;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class ExampleLoginDataSource {

    public ExampleResult<ExampleLoggedInUser> login(String username, String password) {

        try {
            // TODO: handle loggedInUser authentication
            ExampleLoggedInUser fakeUser =
                    new ExampleLoggedInUser(
                            java.util.UUID.randomUUID().toString(),
                            "Jane Doe");
            return new ExampleResult.Success<>(fakeUser);
        } catch (Exception e) {
            return new ExampleResult.Error(new IOException("Error logging in", e));
        }
    }

    public void logout() {
        // TODO: revoke authentication
    }
}