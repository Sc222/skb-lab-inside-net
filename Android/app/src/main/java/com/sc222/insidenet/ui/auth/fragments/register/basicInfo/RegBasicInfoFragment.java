package com.sc222.insidenet.ui.auth.fragments.register.basicInfo;

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
import com.sc222.insidenet.databinding.FragmentRegBasicInfoBinding;
import com.sc222.insidenet.ui.auth.fragments.register.RegisterViewModel;

public class RegBasicInfoFragment extends Fragment {

    //TODO: !!! VIEWMODEL SHARED BETWEEN NAVIGATION GRAPH
    private RegisterViewModel registerViewModel;
    private FragmentRegBasicInfoBinding binding;
    private NavController navController;


    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        binding = FragmentRegBasicInfoBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        registerViewModel = new ViewModelProvider(this).get(RegisterViewModel.class);
        navController = Navigation.findNavController(view);

        // TODO: validate fields and then navigate to next registration page
        binding.nextPageButton.setOnClickListener(v -> navController.navigate(R.id.action_regBasicInfoFragment_to_regContactInfoFragment));
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}