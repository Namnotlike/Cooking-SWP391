package com.example.OrganizeRecipeApi.convertors;

import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.dtos.FeedbackDTO;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Feedback;
import com.example.OrganizeRecipeApi.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FeedbackConverter {

    public FeedbackDTO toDTO(Feedback entity){
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(entity.getId());
        dto.setRatingPoint(entity.getRatingPoint());
        dto.setFeedBackContent(entity.getFeedBackContent());
        if(entity.getCooker()!=null){
            dto.setOwnerAvt(entity.getCooker().getImageUrl());
            dto.setOwnerName(entity.getCooker().getFullName());
        }else{
            dto.setOwnerAvt(entity.getCustomer().getImageUrl());
            dto.setOwnerName(entity.getCustomer().getFullName());
        }
        dto.setCreateAt(entity.getCreateAt());
        dto.setUpdateAt(entity.getUpdateAt());
        return dto;
    }

    public List<FeedbackDTO> toArrayDTO(List<Feedback> listEntity){
        List<FeedbackDTO> listDTO = new ArrayList<>();
        for(Feedback item: listEntity){
            listDTO.add(toDTO(item));
        }
        return listDTO;
    }
}
