package com.sc222.insidenet.ui.auth.fragments.login;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import com.google.android.material.progressindicator.LinearProgressIndicator;
import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.FragmentLoginBinding;

public class LoginFragment extends Fragment {

    private LoginViewModel loginViewModel;
    private FragmentLoginBinding binding;
    private NavController navController;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        binding = FragmentLoginBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        loginViewModel = new ViewModelProvider(this, new LoginViewModelFactory())
                .get(LoginViewModel.class);
        navController = Navigation.findNavController(view);

        final EditText usernameEditText = binding.loginEditText;
        final EditText passwordEditText = binding.passwordEditText;
        final Button signInButton = binding.signInButton;
        final Button signUpButton = binding.signUpButton;
        final LinearProgressIndicator loadingIndicator = binding.loadingIndicator;

        loginViewModel.getLoginFormState().observe(getViewLifecycleOwner(), loginFormState -> {
            if (loginFormState == null) {
                return;
            }
            signInButton.setEnabled(loginFormState.isDataValid());
            if (loginFormState.getUsernameError() != null) {
                usernameEditText.setError(getString(loginFormState.getUsernameError()));
            }
            if (loginFormState.getPasswordError() != null) {
                passwordEditText.setError(getString(loginFormState.getPasswordError()));
            }
        });

        loginViewModel.getLoginResult().observe(getViewLifecycleOwner(), loginResult -> {
            if (loginResult == null) {
                return;
            }
            loadingIndicator.setVisibility(View.GONE);
            if (loginResult.getError() != null) {
                showLoginFailed(loginResult.getError());
            }
            if (loginResult.getSuccess() != null) {
                showLoginSucceed(loginResult.getSuccess());
            }
        });

        // todo check fields before login
        // TextWatcher afterTextChangedListener = new TextWatcher() {
        //     @Override
        //     public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        //         // ignore
        //     }

        //     @Override
        //     public void onTextChanged(CharSequence s, int start, int before, int count) {
        //         // ignore
        //     }

        //     @Override
        //     public void afterTextChanged(Editable s) {
        //         loginViewModel.loginDataChanged(usernameEditText.getText().toString(),
        //                 passwordEditText.getText().toString());
        //     }
        // };
        // usernameEditText.addTextChangedListener(afterTextChangedListener);
        // passwordEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.setOnEditorActionListener((v, actionId, event) -> {
            if (actionId == EditorInfo.IME_ACTION_DONE) {
                loginViewModel.login(usernameEditText.getText().toString(),
                        passwordEditText.getText().toString());
            }
            return false;
        });

        signInButton.setOnClickListener(v -> {
            loadingIndicator.setVisibility(View.VISIBLE);
            loginViewModel.login(usernameEditText.getText().toString(),
                    passwordEditText.getText().toString());
        });

        signUpButton.setOnClickListener(v -> {
            //todo navigate to register
            // TODO: clear fields before launching register
            navController.navigate(R.id.action_loginFragment_to_registerFragment);
        });
    }

    private void showLoginSucceed(LoggedInUserView model) {
        navController.navigate(R.id.action_loginFragment_to_profileActivity);
        //String welcome = getString(R.string.welcome) + model.getDisplayName();
        //// TODO : initiate successful logged in experience
        //if (getContext() != null && getContext().getApplicationContext() != null) {
        //    Toast.makeText(getContext().getApplicationContext(), welcome, Toast.LENGTH_LONG).show();
        //}
    }

    private void showLoginFailed(@StringRes Integer errorString) {
        if (getContext() != null && getContext().getApplicationContext() != null) {
            Toast.makeText(
                    getContext().getApplicationContext(),
                    errorString,
                    Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}