package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Feedback;
import com.example.OrganizeRecipeApi.entities.MyDish;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MyDishRepository extends JpaRepository<MyDish, Long> {

}
