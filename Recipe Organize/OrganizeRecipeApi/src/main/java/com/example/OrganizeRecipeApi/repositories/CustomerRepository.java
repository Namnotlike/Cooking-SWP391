package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT c.* FROM customer c JOIN account a ON c.account_id = a.id WHERE a.username = :username",nativeQuery = true)
    List<Customer> findByUsername(@Param("username") String username);

    @Query(value = "SELECT c.* FROM customer c JOIN account a ON c.account_id = a.id WHERE a.status = :status ORDER BY create_at DESC",nativeQuery = true)
    List<Customer> findByAccountStatus(String status);
}
