package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Favorite;
import com.example.OrganizeRecipeApi.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query(value = "SELECT f.* FROM feedback f where f.dish_id = :id ORDER BY create_at DESC",nativeQuery = true)
    List<Feedback> findByDishId(Long id);
}
