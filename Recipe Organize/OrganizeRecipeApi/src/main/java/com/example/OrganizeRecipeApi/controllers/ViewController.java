package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.entities.ViewStatistic;
import com.example.OrganizeRecipeApi.models.MonthView;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.ViewStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/viewed")
public class ViewController {
    @Autowired
    private ViewStatisticService viewStatisticService;

    @CrossOrigin
    @GetMapping("/getByYear/{year}")
    public ResponseArrayHandle<MonthView> getByYear(@PathVariable int year){
        try {
            String[] months = {"Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"};
            List<MonthView> monthViewList = new ArrayList<>();
            LocalDate localDate = LocalDate.now();
            for (int i = 0; i < 12; i++) {
                if(year>localDate.getYear() || (year == localDate.getYear() && (i+1) > localDate.getMonthValue())){
                    //NOTHING
                }else {
                    monthViewList.add(new MonthView(viewStatisticService.sumByMonth(i + 1), months[i]));
                }
            }
            return new ResponseArrayHandle<>(monthViewList);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @CrossOrigin
    @GetMapping("/getByDay")
    public ResponseArrayHandle<MonthView> getByDay(){
        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = currentDate.minusDays(7);
        LocalDate date = startDate;
        List<MonthView> monthViewList = new ArrayList<>();
        while (date.isBefore(currentDate) || date.isEqual(currentDate)) {
            monthViewList.add(new MonthView(viewStatisticService.sumByDay(date.getMonthValue(),date.getDayOfMonth()), date.getDayOfMonth()+""));
            date = date.plusDays(1);
        }
        return new ResponseArrayHandle<MonthView>(monthViewList);
    }

}
