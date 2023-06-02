package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Tag;
import com.example.OrganizeRecipeApi.repositories.AccountRepository;
import com.example.OrganizeRecipeApi.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account findById(Long id){
        Optional<Account> opt = accountRepository.findById(id);
        if(opt.isPresent())
            return opt.get();
        return null;
    }

    public Account findByUsername(String username){
        List<Account> founded = accountRepository.findByUsername(username);
        if(founded!=null && !founded.isEmpty()){
            return founded.get(0);
        }
        return null;
    }

    public Account findByEmail(String email){
        List<Account> accountList = accountRepository.findByEmail(email);
        if(accountList!=null && !accountList.isEmpty()){
            return accountList.get(0);
        }
        return null;
    }

    public Account insert(Account account){
        account.setId(0l);
        Account inserted =  accountRepository.save(account);
        return inserted;
    }

    public Account save(Account account){
        Account saved =  accountRepository.save(account);
        return saved;
    }


}
