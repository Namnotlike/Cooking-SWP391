package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Long> {

}
