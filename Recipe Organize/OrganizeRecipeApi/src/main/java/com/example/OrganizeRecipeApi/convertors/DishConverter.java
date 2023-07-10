package com.example.OrganizeRecipeApi.convertors;

import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.services.CategoryDetailService;
import com.example.OrganizeRecipeApi.services.CookerService;
import com.example.OrganizeRecipeApi.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DishConverter {
    @Autowired
    private TagService tagService;
    @Autowired
    private CategoryDetailService categoryDetailService;
    @Autowired
    private CookerService cookerService;
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
        dto.setStatus(entity.getStatus());
        dto.setCookTime(entity.getCookTime());
        dto.setServings(entity.getServings());
        dto.setCookerId(entity.getCooker().getId());
        dto.setUrl(entity.getUrl());
        dto.setCookerRank(entity.getCooker().getRank());
        dto.setMealTime(entity.getMealTime());
        dto.setNote(entity.getNote());
        dto.setCategoryDetail(entity.getCategoryDetail());
        dto.setCreateAt(entity.getCreateAt());
        dto.setUpdateAt(entity.getUpdateAt());
        return dto;
    }

    public Dish objectToEntity(List<Object[]> objects){
        if(objects==null || objects.isEmpty())
            return null;
        Object[] object = objects.get(0);
        Dish dish = new Dish();
        dish.setId(((BigDecimal) object[0]).longValue());
        dish.setDishName((String) object[1]);
        dish.setImageUrl((String) object[2]);
        dish.setUrl((String) object[3]);
        dish.setRatingPoint((Double) object[4]);
        dish.setCookerId(((BigDecimal) object[5]).longValue());
        dish.setCooker(cookerService.findById(((BigDecimal) object[5]).longValue()));
        if(object.length>6){
            dish.setTotalCalorie((Integer) object[6]);
        }
        return dish;
    }

    public List<Dish> objectToArrayEntity(List<Object[]> objects){
        List<Dish> listDish = new ArrayList<>();
        for(Object[] item: objects){
            Dish dish = new Dish();
            dish.setId(((BigDecimal) item[0]).longValue());
            dish.setDishName((String) item[1]);
            dish.setImageUrl((String) item[2]);
            dish.setUrl((String) item[3]);
            dish.setRatingPoint((Double) item[4]);
            dish.setCookerId(((BigDecimal) item[5]).longValue());
            dish.setCooker(cookerService.findById(((BigDecimal) item[5]).longValue()));
            if(item.length>6){
                dish.setCategoryDetail(categoryDetailService.findById(((BigDecimal) item[6]).longValue()));
            }
            listDish.add(dish);
        }
        return listDish;
    }
    public List<DishDTO> toArrayDTO(List<Dish> listEntity){
        List<DishDTO> listDTO = new ArrayList<>();
        for(Dish item: listEntity){
            listDTO.add(toDTO(item));
        }
        return listDTO;
    }
}
