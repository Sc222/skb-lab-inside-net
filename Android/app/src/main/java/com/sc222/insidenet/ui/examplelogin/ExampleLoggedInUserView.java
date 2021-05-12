package com.sc222.insidenet.ui.examplelogin;

/**
 * Class exposing authenticated user details to the UI.
 */
class ExampleLoggedInUserView {
    private String displayName;
    //... other data fields that may be accessible to the UI

    ExampleLoggedInUserView(String displayName) {
        this.displayName = displayName;
    }

    String getDisplayName() {
        return displayName;
    }
}