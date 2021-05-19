package com.sc222.insidenet.ui.mainSections.fragments.contacts;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ContactsViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public ContactsViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Здесь будет список контактов");
    }

    public LiveData<String> getText() {
        return mText;
    }
}