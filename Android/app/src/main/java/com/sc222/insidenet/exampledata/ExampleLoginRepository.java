package com.sc222.insidenet.exampledata;

import com.sc222.insidenet.exampledata.examplemodel.ExampleLoggedInUser;

/**
 * Class that requests authentication and user information from the remote data source and
 * maintains an in-memory cache of login status and user credentials information.
 */
public class ExampleLoginRepository {

    private static volatile ExampleLoginRepository instance;

    private ExampleLoginDataSource dataSource;

    // If user credentials will be cached in local storage, it is recommended it be encrypted
    // @see https://developer.android.com/training/articles/keystore
    private ExampleLoggedInUser user = null;

    // private constructor : singleton access
    private ExampleLoginRepository(ExampleLoginDataSource dataSource) {
        this.dataSource = dataSource;
    }

    public static ExampleLoginRepository getInstance(ExampleLoginDataSource dataSource) {
        if (instance == null) {
            instance = new ExampleLoginRepository(dataSource);
        }
        return instance;
    }

    public boolean isLoggedIn() {
        return user != null;
    }

    public void logout() {
        user = null;
        dataSource.logout();
    }

    private void setLoggedInUser(ExampleLoggedInUser user) {
        this.user = user;
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
    }

    public ExampleResult<ExampleLoggedInUser> login(String username, String password) {
        // handle login
        ExampleResult<ExampleLoggedInUser> result = dataSource.login(username, password);
        if (result instanceof ExampleResult.Success) {
            setLoggedInUser(((ExampleResult.Success<ExampleLoggedInUser>) result).getData());
        }
        return result;
    }
}