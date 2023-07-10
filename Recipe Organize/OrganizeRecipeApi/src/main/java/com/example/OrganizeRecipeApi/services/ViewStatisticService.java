package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.ViewStatistic;
import com.example.OrganizeRecipeApi.repositories.ViewStatisticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViewStatisticService {

    @Autowired
    private ViewStatisticRepository viewStatisticRepository;

    public ViewStatistic insert(ViewStatistic viewStatistic){
        viewStatistic.setId(0l);
        return viewStatisticRepository.save(viewStatistic);
    }
    public ViewStatistic save(ViewStatistic viewStatistic){
        return viewStatisticRepository.save(viewStatistic);
    }
    public ViewStatistic findByYearMonthDay(int year, int month, int day){
        return viewStatisticRepository.findByYearMonthDay(year, month, day);
    }

    public int sumByMonth(int month){
        Integer sum = viewStatisticRepository.sumByMonth(month);
        int sumResult = sum != null ? sum : 0; // Xử lý giá trị null
        return sumResult;
    }
    public int sumByDay(int month, int day){
        Integer sum =  viewStatisticRepository.sumByDay(month,day);
        int sumResult = sum != null ? sum : 0; // Xử lý giá trị null
        return sumResult;
    }
}
