package com.example.OrganizeRecipeApi.dtos;

import com.example.OrganizeRecipeApi.entities.BaseEntity;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class FeedbackDTO extends BaseDTO {
    private String feedBackContent;
    private Integer ratingPoint = 0;
    private String ownerName;
    private String ownerAvt;

    private Long cookerId;
}
