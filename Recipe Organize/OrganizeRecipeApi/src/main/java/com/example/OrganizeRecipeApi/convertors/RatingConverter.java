package com.example.OrganizeRecipeApi.convertors;

import com.example.OrganizeRecipeApi.dtos.RatingDTO;
import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.RatingRecipe;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class RatingConverter {
    public RatingDTO objectToDTO(Object[] item){
        RatingDTO ratingRecipe = new RatingDTO();
        ratingRecipe.setId(((BigDecimal) item[0]).longValue());
        ratingRecipe.setRatingPoint((Integer) item[1]);
        ratingRecipe.setAccountId(((BigDecimal) item[2]).longValue());
        ratingRecipe.setDishId(((BigDecimal) item[3]).longValue());
        ratingRecipe.setCreateAt((Date)item[4]);
        ratingRecipe.setUpdateAt((Date)item[5]);
        return ratingRecipe;
    }
    public List<RatingDTO> objectToArrayDTO(List<Object[]> items){
        List<RatingDTO> list = new ArrayList<>();
        for(Object[] item : items) {
            RatingDTO ratingRecipe = new RatingDTO();
            ratingRecipe.setId(((BigDecimal) item[0]).longValue());
            ratingRecipe.setRatingPoint((Integer) item[1]);
            ratingRecipe.setAccountId(((BigDecimal) item[2]).longValue());
            ratingRecipe.setDishId(((BigDecimal) item[3]).longValue());
            ratingRecipe.setCreateAt((Date) item[4]);
            ratingRecipe.setUpdateAt((Date) item[5]);
            list.add(ratingRecipe);
        }
        return list;
    }

    public RatingRecipe toEntity(RatingDTO dto){
        RatingRecipe entity = new RatingRecipe();
        if(dto.getId()!=null) {
            entity.setId(dto.getId());
        }
        entity.setRatingPoint(dto.getRatingPoint());
        entity.setAccount(new Account(dto.getAccountId()));
        entity.setDish(new Dish(dto.getDishId()));
        entity.setCreateAt(dto.getCreateAt());
        entity.setUpdateAt(dto.getUpdateAt());
        return entity;
    }

    public RatingDTO toDTO(RatingRecipe entity){
        RatingDTO ratingDTO = new RatingDTO();
        ratingDTO.setId(entity.getId());
        ratingDTO.setRatingPoint(entity.getRatingPoint());
        ratingDTO.setDishId(entity.getDish().getId());
        ratingDTO.setAccountId(entity.getAccount().getId());
        ratingDTO.setCreateAt(entity.getCreateAt());
        ratingDTO.setUpdateAt(entity.getUpdateAt());
        return ratingDTO;
    }
}
