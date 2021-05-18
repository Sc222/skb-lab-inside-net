package com.sc222.insidenet.ui.auth;

import android.os.Bundle;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavArgument;
import androidx.navigation.NavController;
import androidx.navigation.NavDestination;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityAuthBinding;

import java.util.Objects;

public class AuthActivity extends AppCompatActivity implements NavController.OnDestinationChangedListener {

    private ActivityAuthBinding binding;
    private NavController navController;
    private AppBarConfiguration appBarConfiguration;

    @Override
    public void onBackPressed() {
        if (Objects.requireNonNull(navController.getCurrentDestination()).getId() == R.id.loginFragment)
            this.finishAffinity();
        else
            super.onBackPressed();
    }

    // toolbar back button
    @Override
    public boolean onSupportNavigateUp() {
        return NavigationUI.navigateUp(navController, appBarConfiguration) || super.onSupportNavigateUp();
    }

    @Override
    public void onDestinationChanged(@NonNull NavController controller, @NonNull NavDestination destination, @Nullable Bundle arguments) {
        binding.toolbarTitle.setText(destination.getLabel());
        NavArgument subtitleArg = destination.getArguments().get(getString(R.string.nav_arg_toolbar_subtitle));
        String subtitle = "";
        if (subtitleArg != null && subtitleArg.isDefaultValuePresent() && subtitleArg.getDefaultValue() != null) {
            subtitle = getString((int) subtitleArg.getDefaultValue());
        }
        binding.toolbarSubtitle.setVisibility(subtitle.equals("") ? View.GONE : View.VISIBLE);
        binding.toolbarSubtitle.setText(subtitle);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAuthBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        setSupportActionBar(binding.toolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayShowTitleEnabled(false);
        navController = Navigation.findNavController(this, R.id.nav_host_auth);
        navController.addOnDestinationChangedListener(this);
        appBarConfiguration = new AppBarConfiguration.Builder(navController.getGraph()).build();
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
    }
}