package com.example.OrganizeRecipeApi.dtos;

import lombok.Data;

@Data
public class RatingDTO extends BaseDTO {
    private Long dishId;
    private Long accountId;
    private Integer ratingPoint = 0;
}
