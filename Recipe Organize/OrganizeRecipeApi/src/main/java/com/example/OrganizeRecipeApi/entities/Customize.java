package com.example.OrganizeRecipeApi.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Data
@Entity
public class Customize extends BaseEntity{
    @Column(columnDefinition = "nvarchar(max)")
    private String description;
    @Column(columnDefinition = "nvarchar(max)")
    private String process;
    @Column(columnDefinition = "nvarchar(max)")
    private String ingredient;

    private String url;
    private String imageUrl;
    private Integer prepTime = 0;
    private Integer cookTime = 0;
    private Integer servings = 1;
    @Column(columnDefinition = "nvarchar(max)")
    private String note;
    @OneToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;

}
