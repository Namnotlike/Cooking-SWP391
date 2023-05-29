package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Employee;
import com.example.OrganizeRecipeApi.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

}
