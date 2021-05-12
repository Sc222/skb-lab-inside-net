package com.sc222.insidenet.exampledata.examplemodel;

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
public class ExampleLoggedInUser {

    private String userId;
    private String displayName;

    public ExampleLoggedInUser(String userId, String displayName) {
        this.userId = userId;
        this.displayName = displayName;
    }

    public String getUserId() {
        return userId;
    }

    public String getDisplayName() {
        return displayName;
    }
}