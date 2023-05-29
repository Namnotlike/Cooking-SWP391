package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<Account, Long> {

}
