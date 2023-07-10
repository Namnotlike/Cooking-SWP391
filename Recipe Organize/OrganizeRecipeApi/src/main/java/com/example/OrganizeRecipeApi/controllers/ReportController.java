package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.NotificationType;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandlePagination;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/report")
public class ReportController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private DishService dishService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<Report> createReport(
            @RequestParam Long dishId,
            @RequestParam String username,
            @RequestParam String description,
            @RequestParam String reason
    ) {
        Account account = accountService.findByUsername(username);
        if(account == null)
            return new ResponseHandle<>("02","Not found account with username: "+username);
        Dish dish = dishService.findById(dishId);
        if(dish == null)
            return new ResponseHandle<>("02","Not found Dish with id: "+dishId);
        String fullName = "";
        Customer customer = customerService.findByUsername(username);
        if(customer!=null){
            fullName = customer.getFullName();
        }else{
            fullName = cookerService.findByUsername(username).getFullName();
        }
        Report report = new Report();
        report.setDish(new Dish(dishId));
        report.setDescription(description.trim());
        report.setReason(reason.trim());
        report.setAccount(account);


        Notification notification = new Notification();
        notification.setContent(fullName + " just created a report, please confirm.");
        notification.setType(NotificationType.CREATE_REPORT);
        notification.setCreateBy(account);
        notification.setOwner(ROLE.EMPLOYEE);
        notificationService.insert(notification);

        Notification notification2 = new Notification();
        notification2.setContent("Your "+dish.getDishName() + " has been reported by "+fullName+".");
        notification2.setType(NotificationType.CREATE_REPORT);
        notification2.setCreateBy(account);
        notification2.setCreateTo(dish.getCooker().getAccount());
        notification2.setOwner(ROLE.COOKER);
        notificationService.insert(notification2);

        return new ResponseHandle<Report>(reportService.insert(report));
    }

    @CrossOrigin
    @GetMapping("/getAllPaging")
    public ResponseArrayHandlePagination<Report> getAllPaging(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size
    ){
        if(page<1)
            page=1;
        if(size<1)
            size=1;
        List<Report> reportList = reportService.findAllPaging(page,size);
        ResponseArrayHandlePagination<Report> res = new ResponseArrayHandlePagination<>(reportList);
        res.setTotalItem(reportService.countAllPaging());
        return res;
    }
}
