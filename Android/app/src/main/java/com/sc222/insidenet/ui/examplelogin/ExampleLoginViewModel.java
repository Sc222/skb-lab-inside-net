package com.sc222.insidenet.ui.examplelogin;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import android.util.Patterns;

import com.sc222.insidenet.exampledata.ExampleLoginRepository;
import com.sc222.insidenet.exampledata.ExampleResult;
import com.sc222.insidenet.exampledata.examplemodel.ExampleLoggedInUser;
import com.sc222.insidenet.R;

public class ExampleLoginViewModel extends ViewModel {

    private MutableLiveData<ExampleLoginFormState> loginFormState = new MutableLiveData<>();
    private MutableLiveData<ExampleLoginResult> loginResult = new MutableLiveData<>();
    private ExampleLoginRepository loginRepository;

    ExampleLoginViewModel(ExampleLoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    LiveData<ExampleLoginFormState> getLoginFormState() {
        return loginFormState;
    }

    LiveData<ExampleLoginResult> getLoginResult() {
        return loginResult;
    }

    public void login(String username, String password) {
        // can be launched in a separate asynchronous job
        ExampleResult<ExampleLoggedInUser> result = loginRepository.login(username, password);

        if (result instanceof ExampleResult.Success) {
            ExampleLoggedInUser data = ((ExampleResult.Success<ExampleLoggedInUser>) result).getData();
            loginResult.setValue(new ExampleLoginResult(new ExampleLoggedInUserView(data.getDisplayName())));
        } else {
            loginResult.setValue(new ExampleLoginResult(R.string.login_failed));
        }
    }

    public void loginDataChanged(String username, String password) {
        if (!isUserNameValid(username)) {
            loginFormState.setValue(new ExampleLoginFormState(R.string.invalid_username, null));
        } else if (!isPasswordValid(password)) {
            loginFormState.setValue(new ExampleLoginFormState(null, R.string.invalid_password));
        } else {
            loginFormState.setValue(new ExampleLoginFormState(true));
        }
    }

    // A placeholder username validation check
    private boolean isUserNameValid(String username) {
        if (username == null) {
            return false;
        }
        if (username.contains("@")) {
            return Patterns.EMAIL_ADDRESS.matcher(username).matches();
        } else {
            return !username.trim().isEmpty();
        }
    }

    // A placeholder password validation check
    private boolean isPasswordValid(String password) {
        return password != null && password.trim().length() > 5;
    }
}