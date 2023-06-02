package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Feedback extends BaseEntity{
    private String feedBackContent;
    private Integer ratingPoint = 0;

    @ManyToOne
    @JoinColumn(name = "dish_id")
    @JsonManagedReference
    private Dish dish;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonManagedReference
    private Customer customer;
}
