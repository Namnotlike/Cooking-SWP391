package com.example.OrganizeRecipeApi.utils;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class DatetimeUtils {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    public int getCurrentYear(){
        String currentDateString = sdf.format(new Date());
        return Integer.parseInt(currentDateString.substring(0,4));
    }
    public int getCurrentMonth(){
        String currentDateString = sdf.format(new Date());
        return Integer.parseInt(currentDateString.substring(4,6));
    }
    public int getCurrentDay(){
        String currentDateString = sdf.format(new Date());
        return Integer.parseInt(currentDateString.substring(6,8));
    }
}
