package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Employee;
import com.example.OrganizeRecipeApi.entities.Employee;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.AccountService;
import com.example.OrganizeRecipeApi.services.EmployeeService;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private ImageIOUtils imageIOUtils;

    @CrossOrigin
    @GetMapping("/getByUsername/{username}")
    public ResponseHandle<Employee> getByUsername(@PathVariable String username){
        Employee founded = employeeService.findByUsername(username.trim());
        if(founded==null)
            return new ResponseHandle<>("02","Not found Employee with username: "+username);
        founded.getAccount().setPassword(null);
        return new ResponseHandle<Employee>(founded);
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    public ResponseHandle<Employee> editEmployee(
            @PathVariable Long id,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam(required = false) MultipartFile[] fileAvt
    ){
        Employee employee = employeeService.findById(id);
        if(employee==null)
            return new ResponseHandle<>("02","Not found employee with id: "+id);
        employee.setFullName(fullName.trim());
        if(!email.trim().equalsIgnoreCase(employee.getAccount().getEmail())) {
            if(accountService.findByEmail(email.trim())!=null){
                return new ResponseHandle<>("02","Email already exists: "+email);
            }
            employee.getAccount().setEmail(email.trim());
        }
        employee.setPhone(phone.trim());
        employee.setAddress(address.trim());
        employee.setCity(city.trim());
        employee.setState(state.trim());
        if(fileAvt!=null){
            imageIOUtils.deleteImage(employee.getImageUrl());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0],avtName);
            employee.setImageUrl(avtName);
        }
        return new ResponseHandle<Employee>(employeeService.save(employee));
    }
}
