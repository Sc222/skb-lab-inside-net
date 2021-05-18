package com.sc222.insidenet.ui.launcher.fragments.launcher;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.FragmentLauncherBinding;

import org.jetbrains.annotations.NotNull;

public class LauncherFragment extends Fragment {

    private FragmentLauncherBinding binding;
    private LauncherViewModel launcherViewModel;

    @Override
    public View onCreateView(@NotNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        binding = FragmentLauncherBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        launcherViewModel = new ViewModelProvider(this).get(LauncherViewModel.class);

        //TODO: USE NAVIGATION AND DATABINDING FROM THIS STARTUP ACTIVITY
        //TODO: start LoginActivity or ProfileActivity depending on user login status (stored in accountManager)
        NavController navController = Navigation.findNavController(view);

        // todo conditional navigation example: https://developer.android.com/guide/navigation/navigation-conditional

        //if not logged in
        navController.navigate(R.id.action_launcherFragment_to_authActivity);

        //if logged in
        //navController.navigate(R.id.action_launcherFragment_to_profileActivity);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}