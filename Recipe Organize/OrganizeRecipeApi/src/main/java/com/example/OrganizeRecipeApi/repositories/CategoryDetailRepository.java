package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.entities.CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryDetailRepository extends JpaRepository<CategoryDetail, Long> {

}
