package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.repositories.AccountRepository;
import com.example.OrganizeRecipeApi.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;


    public Customer insert(Customer customer){
        customer.setId(0l);
        Customer inserted =  customerRepository.save(customer);
        return inserted;
    }

    public Customer findByUsername(String username){
        List<Customer> list = customerRepository.findByUsername(username);
        if(list!=null && !list.isEmpty()){
            return list.get(0);
        }
        return null;
    }

    public Customer findById(Long id) {
        Optional<Customer> opt = customerRepository.findById(id);
        if(opt.isPresent())
            return opt.get();
        return null;
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> findByAccountStatus(String status) {
        return customerRepository.findByAccountStatus(status);
    }
}
