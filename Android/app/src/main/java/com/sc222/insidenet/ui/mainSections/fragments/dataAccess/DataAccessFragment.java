package com.sc222.insidenet.ui.mainSections.fragments.dataAccess;

import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.sc222.insidenet.databinding.FragmentDataAccessBinding;


public class DataAccessFragment extends Fragment {

    private DataAccessViewModel dataAccessViewModel;
    private FragmentDataAccessBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentDataAccessBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        dataAccessViewModel = new ViewModelProvider(this).get(DataAccessViewModel.class);

        //todo move to viewmodel and add server requests
        binding.requestDataAccessButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new Handler().postDelayed(() -> {
                    binding.tmpWaitChip.setVisibility(View.VISIBLE);
                    binding.tmpRequestChip.setChecked(false);
                    binding.tmpRequestChip.setVisibility(View.GONE);
                },300);
            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}