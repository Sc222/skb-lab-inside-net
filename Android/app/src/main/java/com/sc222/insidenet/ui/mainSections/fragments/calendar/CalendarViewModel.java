package com.sc222.insidenet.ui.mainSections.fragments.calendar;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class CalendarViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public CalendarViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("Здесь будет график отпусков");
    }

    public LiveData<String> getText() {
        return mText;
    }
}