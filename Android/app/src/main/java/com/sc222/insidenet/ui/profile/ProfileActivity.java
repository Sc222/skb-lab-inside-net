package com.sc222.insidenet.ui.profile;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityProfileBinding;

import java.util.Objects;

public class ProfileActivity extends AppCompatActivity {

    private ActivityProfileBinding binding;
    private NavController navController;

    @Override
    public void onBackPressed() {
        if (Objects.requireNonNull(navController.getCurrentDestination()).getId() == R.id.homeFragment)
            this.finishAffinity();
        else
            super.onBackPressed();
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityProfileBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        setSupportActionBar(binding.toolbar);

        navController = Navigation.findNavController(this, R.id.nav_host_profile);

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.homeFragment, R.id.dashboardFragment, R.id.notificationsFragment)
                .build();

        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController);
    }
}