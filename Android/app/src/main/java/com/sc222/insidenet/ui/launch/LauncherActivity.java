package com.sc222.insidenet.ui.launch;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.os.Bundle;

import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityLauncherBinding;

public class LauncherActivity extends AppCompatActivity {

    private ActivityLauncherBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //todo setup toolbar for login + register

        binding = ActivityLauncherBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        //TODO: USE NAVIGATION AND DATABINDING FROM THIS STARTUP ACTIVITY

        //TODO: start LoginActivity or ProfileActivity depending on user login status (stored in accountManager)
        //Intent intent = new Intent(this, LoginActivity.class);
        //startActivity(intent);
        //overridePendingTransition(0, 0);
        //NavController navController = Navigation.findNavController(binding.getRoot());
        NavController navController = Navigation.findNavController(this, R.id.nav_host_launcher);

        // todo conditional navigation example: https://developer.android.com/guide/navigation/navigation-conditional

        //if not logged in
        navController.navigate(R.id.loginFragment);

        //if logged in
        //navController.navigate(R.id.profileActivity);
    }
}