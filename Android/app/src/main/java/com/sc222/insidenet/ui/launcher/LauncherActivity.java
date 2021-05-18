package com.sc222.insidenet.ui.launcher;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.sc222.insidenet.databinding.ActivityLauncherBinding;

public class LauncherActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityLauncherBinding binding = ActivityLauncherBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
    }
}