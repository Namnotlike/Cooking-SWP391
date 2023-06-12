package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Employee;
import com.example.OrganizeRecipeApi.repositories.CategoryRepository;
import com.example.OrganizeRecipeApi.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee findByUsername(String username) {
        List<Employee> list = employeeRepository.findByUsername(username);
        if(list!=null && !list.isEmpty()){
            return list.get(0);
        }
        return null;
    }
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee insert(Employee employee) {
        employee.setId(0l);
        return employeeRepository.save(employee);
    }

    public Employee findById(Long id) {
        Optional<Employee> opt = employeeRepository.findById(id);
        if(opt.isPresent())
            return opt.get();
        return null;
    }

    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }
}
