package com.sc222.insidenet.ui.launch;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.sc222.insidenet.R;

public class LauncherActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);

        //TODO: USE NAVIGATION AND DATABINDING FROM THIS STARTUP ACTIVITY

        //TODO: start LoginActivity or ProfileActivity depending on user login status (stored in accountManager)
        //Intent intent = new Intent(this, LoginActivity.class);
        //startActivity(intent);
        //overridePendingTransition(0, 0);
    }
}