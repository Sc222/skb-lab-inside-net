package com.sc222.insidenet.ui.mainSections.fragments.profile;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ProfileViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public ProfileViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Здесь будет профиль");
    }

    public LiveData<String> getText() {
        return mText;
    }
}