package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Report;
import com.example.OrganizeRecipeApi.entities.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("SELECT d FROM Tag d ORDER BY d.viewed DESC")
    List<Tag> findTopTagsByViewed(Pageable pageable);

    @Query(value ="SELECT t.* FROM tag t JOIN tag_dish td ON t.id = td.tag_id WHERE td.dish_id = :dishId" ,nativeQuery = true)
    List<Tag> findByDishId(Long dishId);
}
