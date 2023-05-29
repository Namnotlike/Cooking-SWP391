package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Cooker;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CookerRepository extends JpaRepository<Cooker, Long> {

}
