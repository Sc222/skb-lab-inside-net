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

import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.FragmentContactsBinding;


public class ContactsFragment extends Fragment {

    private ContactsViewModel contactsViewModel;
    private FragmentContactsBinding binding;
    private boolean[] tmpAreContactsAdded = {false,false,false};

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentContactsBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        contactsViewModel = new ViewModelProvider(this).get(ContactsViewModel.class);
        binding.icAdd1.setOnClickListener(view1 -> tmpAddContact(binding.icAdd1,0));
        binding.icAdd2.setOnClickListener(view12 -> tmpAddContact(binding.icAdd2,1));
        binding.icAdd3.setOnClickListener(view13 -> tmpAddContact(binding.icAdd3,2));
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