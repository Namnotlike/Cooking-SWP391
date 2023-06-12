package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value = "SELECT e.* FROM employee e JOIN account a ON e.account_id = a.id WHERE a.username = :username",nativeQuery = true)
    List<Employee> findByUsername(@Param("username") String username);
}
