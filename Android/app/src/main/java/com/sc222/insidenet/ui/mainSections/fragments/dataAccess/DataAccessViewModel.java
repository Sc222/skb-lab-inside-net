package com.sc222.insidenet.ui.mainSections.fragments.dataAccess;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class DataAccessViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public DataAccessViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Здесь будет список прав доступа");
    }

    public LiveData<String> getText() {
        return mText;
    }
}