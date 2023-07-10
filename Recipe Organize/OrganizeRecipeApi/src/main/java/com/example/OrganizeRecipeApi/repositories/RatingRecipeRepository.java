package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.dtos.RatingDTO;
import com.example.OrganizeRecipeApi.entities.Employee;
import com.example.OrganizeRecipeApi.entities.RatingRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RatingRecipeRepository extends JpaRepository<RatingRecipe, Long> {
    @Query(value = "SELECT r.id, r.rating_point, r.account_id, r.dish_id, r.create_at, r.update_at FROM rating_recipe r WHERE r.dish_id = :dishId AND r.account_id = :accountId",nativeQuery = true)
    List<Object[]> findByDishAndAccountId(Long dishId, Long accountId);

    @Query(value = "SELECT r.id, r.rating_point, r.account_id, r.dish_id, r.create_at, r.update_at FROM rating_recipe r WHERE r.dish_id = :dishId",nativeQuery = true)
    List<Object[]> findByDishId(Long dishId);

    @Query(value = "SELECT r.id, r.rating_point, r.account_id, r.dish_id, r.create_at, r.update_at FROM rating_recipe r WHERE r.id = :id",nativeQuery = true)
    List<Object[]> findObjectById(Long id);

    @Query(value = "SELECT r.id, r.rating_point, r.account_id, r.dish_id, r.create_at, r.update_at FROM rating_recipe r JOIN feedback f ON r.id = f.rating_recipe_id WHERE f.id = :id",nativeQuery = true)
    List<Object[]> findByFeedbackId(Long id);
}
