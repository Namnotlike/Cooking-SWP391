package com.example.OrganizeRecipeApi.dtos;

import lombok.Data;

@Data
public class CookerDTO extends BaseDTO{
    private String fullName;
    private String imageUrl;
    private int dishCount;
    private String rank;
}
