package com.sc222.insidenet.ui.mainSections.fragments.holidays;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class HolidaysViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public HolidaysViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Здесь будет график отпусков");
    }

    public LiveData<String> getText() {
        return mText;
    }
}