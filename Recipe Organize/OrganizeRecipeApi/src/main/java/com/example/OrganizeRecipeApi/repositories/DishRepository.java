package com.example.OrganizeRecipeApi.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.OrganizeRecipeApi.entities.Dish;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface DishRepository extends JpaRepository<Dish, Long> {
    @Query("SELECT d FROM Dish d ORDER BY d.viewed DESC")
    List<Dish> findTopDishesByViewed(Pageable pageable);

    @Query("SELECT d FROM Dish d ORDER BY d.createAt DESC")
    List<Dish> findTopDishesByNewed(Pageable pageable);
}
