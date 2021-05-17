package com.sc222.insidenet.ui.proflie;

import android.os.Bundle;
import android.util.Log;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityProfileBinding;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

public class ProfileActivity extends AppCompatActivity {

    private ActivityProfileBinding binding;

    //TODO OVERRIDE ON BACK PRESSED TO CLOSE ACTIVITY (and not retiurn to launcher fragment)

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityProfileBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // TODO USE CODE FROM SMARTRING OR LOBSTERS

        Log.e("A","PROFILE ACTIVITY");

        BottomNavigationView navView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        // AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
        //         R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
        //         .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_profile);
        // NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(binding.navView, navController);
    }

}