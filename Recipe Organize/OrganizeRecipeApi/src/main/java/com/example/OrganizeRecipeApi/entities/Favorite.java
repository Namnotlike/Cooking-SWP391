package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Favorite extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "dish_id")
    @JsonManagedReference
    private Dish dish;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonManagedReference
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "cooker_id")
    @JsonManagedReference
    private Cooker cooker;

    @OneToOne
    @JoinColumn(name = "customize_id")
    private Customize customize;
}
