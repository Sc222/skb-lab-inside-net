package com.sc222.insidenet.ui.login;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import com.sc222.insidenet.databinding.ActivityLoginBinding;
import com.sc222.insidenet.ui.proflie.ProfileActivity;
import com.sc222.insidenet.ui.register.RegisterActivity;

public class LoginActivity extends AppCompatActivity {

    private ActivityLoginBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        //TODO: create LoginViewModel, process input fields, make server requests

        binding.signInButton.setOnClickListener(v -> {
            Intent intent = new Intent(this, ProfileActivity.class);
            startActivity(intent);
        });

        binding.signUpButton.setOnClickListener(v -> {
            Intent intent = new Intent(this, RegisterActivity.class);
            startActivity(intent);
        });
    }
}