package com.sc222.insidenet.ui.examplelogin;

import androidx.annotation.Nullable;

/**
 * Authentication result : success (user details) or error message.
 */
class ExampleLoginResult {
    @Nullable
    private ExampleLoggedInUserView success;
    @Nullable
    private Integer error;

    ExampleLoginResult(@Nullable Integer error) {
        this.error = error;
    }

    ExampleLoginResult(@Nullable ExampleLoggedInUserView success) {
        this.success = success;
    }

    @Nullable
    ExampleLoggedInUserView getSuccess() {
        return success;
    }

    @Nullable
    Integer getError() {
        return error;
    }
}