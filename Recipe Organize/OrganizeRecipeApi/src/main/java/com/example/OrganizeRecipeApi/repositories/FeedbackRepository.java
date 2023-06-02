package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Favorite;
import com.example.OrganizeRecipeApi.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
