package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, Long> {

}
