package com.example.OrganizeRecipeApi.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class BaseDTO {
    private Long id;
    private Date createAt = new Date();
    private Date updateAt = new Date();
}
