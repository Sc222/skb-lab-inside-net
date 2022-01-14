package com.sc222.insidenet.ui.mainSections.fragments.contacts;

import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.FragmentContactsBinding;


public class ContactsFragment extends Fragment {

    private ContactsViewModel contactsViewModel;
    private FragmentContactsBinding binding;
    private boolean[] tmpAreContactsAdded = {false,false,false};
    private BottomSheetBehavior sheetBehavior;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentContactsBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        contactsViewModel = new ViewModelProvider(this).get(ContactsViewModel.class);
        sheetBehavior = BottomSheetBehavior.from(binding.getRoot().findViewById(R.id.bottomsheet_root));
        sheetBehavior.setHideable(true); // sheet can be manually hidden in artists fragment
        sheetBehavior.setPeekHeight(0,false);
        binding.bottomSheetContact.setOnClickListener(v -> {
            sheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
            binding.getRoot().findViewById(R.id.deleteContact).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    new Handler().postDelayed(() -> {
                        sheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
                        binding.contactsContainer.removeView(binding.bottomSheetContact);
                    },300);
                }
            });
        });
    }

    //TODO refactor, move to viewmodel and add server requests
    private void tmpAddContact(AppCompatImageView imageView, int index) {
        new Handler().postDelayed(() -> {
            tmpAreContactsAdded[index]=!tmpAreContactsAdded[index];
            imageView.setImageResource(tmpAreContactsAdded[index]
                    ?R.drawable.ic_added_24dp
                    :R.drawable.ic_add_24dp);
        },300);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}