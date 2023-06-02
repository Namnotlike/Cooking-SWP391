package com.example.OrganizeRecipeApi.jwt.impl;



import com.example.OrganizeRecipeApi.entities.Account;

import com.example.OrganizeRecipeApi.jwt.CustomUserDetails;
import com.example.OrganizeRecipeApi.repositories.AccountRepository;
import com.example.OrganizeRecipeApi.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // Kiểm tra xem user có tồn tại trong database không?
        Account account = accountService.findByUsername(username);
        if (account==null) {
            throw new UsernameNotFoundException(username);
        }

        return new CustomUserDetails(account);
    }

    public UserDetails loadUserById(Long id) {
        Account account = null;
        account = accountService.findById(id);
        if(account!=null){
            return new CustomUserDetails(account);
        }
        return null;
    }
}