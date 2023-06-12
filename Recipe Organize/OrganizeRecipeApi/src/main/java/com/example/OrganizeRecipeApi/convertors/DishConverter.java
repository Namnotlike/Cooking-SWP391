package com.example.OrganizeRecipeApi.convertors;

import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DishConverter {
    @Autowired
    private TagService tagService;

    public DishDTO toDTO(Dish entity){
        DishDTO dto = new DishDTO();
        dto.setId(entity.getId());
        dto.setDishName(entity.getDishName());
        dto.setDescription(entity.getDescription());
        dto.setProcess(entity.getProcess());
        dto.setIngredient(entity.getIngredient());
        dto.setViewed(entity.getViewed());
        dto.setImageUrl(entity.getImageUrl());
        dto.setTotalCalorie(entity.getTotalCalorie());
        dto.setRatingPoint(entity.getRatingPoint());
        dto.setCookerName(entity.getCooker().getFullName());
        dto.setTags(entity.getTags());
        dto.setFeedbacks(entity.getFeedbacks());
        dto.setPrepTime(entity.getPrepTime());
        dto.setCookTime(entity.getCookTime());
        dto.setServings(entity.getServings());
        dto.setUrl(entity.getUrl());
        dto.setNote(entity.getNote());
        dto.setCategoryDetail(entity.getCategoryDetail());
        dto.setCreateAt(entity.getCreateAt());
        dto.setUpdateAt(entity.getUpdateAt());
        return dto;
    }

    public List<DishDTO> toArrayDTO(List<Dish> listEntity){
        List<DishDTO> listDTO = new ArrayList<>();
        for(Dish item: listEntity){
            listDTO.add(toDTO(item));
        }
        return listDTO;
    }
}
