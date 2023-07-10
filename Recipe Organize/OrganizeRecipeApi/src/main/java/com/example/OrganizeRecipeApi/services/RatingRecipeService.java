package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.convertors.RatingConverter;
import com.example.OrganizeRecipeApi.dtos.RatingDTO;
import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.RatingRecipe;
import com.example.OrganizeRecipeApi.repositories.RatingRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RatingRecipeService {
    @Autowired
    private RatingRecipeRepository ratingRecipeRepository;
    @Autowired
    private RatingConverter ratingConverter;
    public RatingDTO findByDishAndAccountId(Long dishId, Long accountId){
        List<Object[]> listObjects = ratingRecipeRepository.findByDishAndAccountId(dishId,accountId);
        if(listObjects==null || listObjects.isEmpty())
            return null;
        return ratingConverter.objectToDTO(listObjects.get(0));
    }

    public RatingRecipe insert(RatingRecipe ratingRecipe){
        ratingRecipe.setId(0l);
        return ratingRecipeRepository.save(ratingRecipe);
    }

    public RatingRecipe save(RatingRecipe ratingRecipe){
        return ratingRecipeRepository.save(ratingRecipe);
    }

    public List<RatingDTO> findByDishId(Long dishId) {
        List<Object[]> listObjects = ratingRecipeRepository.findByDishId(dishId);
        return ratingConverter.objectToArrayDTO(listObjects);
    }

//    public RatingDTO findById(Long id) {
//        List<Object[]> listObjects = ratingRecipeRepository.findObjectById(id);
//        if(listObjects==null || listObjects.isEmpty())
//            return null;
//        return ratingConverter.objectToDTO(listObjects.get(0));
//    }

    public RatingDTO findByFeedbackId(Long id) {
        List<Object[]> listObjects = ratingRecipeRepository.findByFeedbackId(id);
        if(listObjects==null || listObjects.isEmpty())
            return null;
        return ratingConverter.objectToDTO(listObjects.get(0));
    }
}
