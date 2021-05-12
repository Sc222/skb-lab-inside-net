package com.sc222.insidenet.ui.examplelogin;

import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;
import androidx.annotation.NonNull;

import com.sc222.insidenet.exampledata.ExampleLoginDataSource;
import com.sc222.insidenet.exampledata.ExampleLoginRepository;

/**
 * ViewModel provider factory to instantiate LoginViewModel.
 * Required given LoginViewModel has a non-empty constructor
 */
public class ExampleLoginViewModelFactory implements ViewModelProvider.Factory {

    @NonNull
    @Override
    @SuppressWarnings("unchecked")
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(ExampleLoginViewModel.class)) {
            return (T) new ExampleLoginViewModel(ExampleLoginRepository.getInstance(new ExampleLoginDataSource()));
        } else {
            throw new IllegalArgumentException("Unknown ViewModel class");
        }
    }
}