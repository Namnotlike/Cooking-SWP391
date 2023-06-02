package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Report extends BaseEntity{
    private String description;
    private Integer reportLevel;

    @ManyToOne
    @JoinColumn(name = "dish_id")
    @JsonManagedReference
    private Dish dish;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonManagedReference
    private Customer customer;
}
