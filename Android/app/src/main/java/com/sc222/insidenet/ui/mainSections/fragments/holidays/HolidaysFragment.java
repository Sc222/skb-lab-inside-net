package com.sc222.insidenet.ui.mainSections.fragments.holidays;

import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.archit.calendardaterangepicker.customviews.CalendarListener;
import com.archit.calendardaterangepicker.customviews.DateRangeCalendarView;
import com.sc222.insidenet.databinding.FragmentHolidaysBinding;

import java.util.Calendar;


public class HolidaysFragment extends Fragment {


    private HolidaysViewModel holidaysViewModel;
    private FragmentHolidaysBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentHolidaysBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        holidaysViewModel = new ViewModelProvider(this).get(HolidaysViewModel.class);


        //TODO MOVE THIS TO VIEWMODEL AND ADD SERVER REQUESTS
        DateRangeCalendarView holidaysCalendar = binding.holidaysCalendar;

        final Calendar startMonth = Calendar.getInstance();
        startMonth.set(2021, Calendar.MAY, 20);
        final Calendar endMonth = (Calendar) startMonth.clone();
        endMonth.add(Calendar.MONTH, 10);
        holidaysCalendar.setVisibleMonthRange(startMonth, endMonth);

        final Calendar startDateSelectable = (Calendar) startMonth.clone();
        startDateSelectable.add(Calendar.DATE, 20);
        final Calendar endDateSelectable = (Calendar) endMonth.clone();
        endDateSelectable.add(Calendar.DATE, -20);
        holidaysCalendar.setSelectableDateRange(startDateSelectable, endDateSelectable);

        //final Calendar startSelectedDate = (Calendar) startDateSelectable.clone();
        //startSelectedDate.add(Calendar.DATE, 10);
        //final Calendar endSelectedDate = (Calendar) endDateSelectable.clone();
        //endSelectedDate.add(Calendar.DATE, -10);
        //holidaysCalendar.setSelectedDateRange(startSelectedDate, endSelectedDate);

        final Calendar current = (Calendar) startMonth.clone();
        current.add(Calendar.MONTH, 1);
        holidaysCalendar.setCurrentMonth(current);

        binding.updateHolidaysButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new Handler().postDelayed(() -> {
                    Toast.makeText(getContext(), "Данные успешно обновлены!", Toast.LENGTH_SHORT).show();
                    binding.updateHolidaysButton.setEnabled(false);
                },300);
            }
        });

        holidaysCalendar.setCalendarListener(calendarListener);
    }

    private final CalendarListener calendarListener = new CalendarListener() {
        @Override
        public void onFirstDateSelected(@NonNull final Calendar startDate) {
        }

        @Override
        public void onDateRangeSelected(@NonNull final Calendar startDate, @NonNull final Calendar endDate) {
            binding.updateHolidaysButton.setEnabled(true);
            //todo save selected dateRange in viewmodel
        }
    };


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}