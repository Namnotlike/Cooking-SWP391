package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query(value = "SELECT * FROM Account WHERE username = :username",nativeQuery = true)
    public List<Account> findByUsername(String username);

    @Query(value = "SELECT * FROM Account WHERE email = :email",nativeQuery = true)
    public List<Account> findByEmail(String email);
}
