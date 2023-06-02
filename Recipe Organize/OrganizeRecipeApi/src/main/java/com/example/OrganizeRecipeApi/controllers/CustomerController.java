package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.entities.Role;
import com.example.OrganizeRecipeApi.jwt.CustomUserDetails;
import com.example.OrganizeRecipeApi.jwt.JwtTokenProvider;
import com.example.OrganizeRecipeApi.jwt.LoginResponse;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.AccountService;
import com.example.OrganizeRecipeApi.services.CookerService;
import com.example.OrganizeRecipeApi.services.CustomerService;
import com.example.OrganizeRecipeApi.services.RoleService;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private ImageIOUtils imageIOUtils;
    @CrossOrigin
    @GetMapping("/getByUsername/{username}")
    public ResponseHandle<Customer> getByUsername(@PathVariable String username){
        Customer founded = customerService.findByUsername(username.trim());
        founded.getAccount().setPassword(null);
        return new ResponseHandle<Customer>(founded);
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    public ResponseHandle<Customer> editCustomer(
            @PathVariable Long id,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam(required = false) MultipartFile[] fileAvt
    ){
        Customer customer = customerService.findById(id);
        if(customer==null)
            return new ResponseHandle<>("02","Not found customer with id: "+id);
        customer.setFullName(fullName.trim());
        if(!email.trim().equalsIgnoreCase(customer.getAccount().getEmail())) {
            if(accountService.findByEmail(email.trim())!=null){
                return new ResponseHandle<>("02","Email already exists: "+email);
            }
            customer.getAccount().setEmail(email.trim());
        }
        customer.setPhone(phone.trim());
        customer.setAddress(address.trim());
        customer.setCity(city.trim());
        customer.setState(state.trim());
        if(fileAvt!=null){
            imageIOUtils.deleteImage(customer.getImageUrl());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0],avtName);
            customer.setImageUrl(avtName);
        }
        return new ResponseHandle<Customer>(customerService.save(customer));
    }

}
