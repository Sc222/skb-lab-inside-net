package com.sc222.insidenet.ui.mainSections.fragments.slack;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class SlackViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public SlackViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Здесь будет список прав доступа");
    }

    public LiveData<String> getText() {
        return mText;
    }
}