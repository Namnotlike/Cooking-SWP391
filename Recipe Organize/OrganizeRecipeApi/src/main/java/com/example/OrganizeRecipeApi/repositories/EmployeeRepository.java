package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
