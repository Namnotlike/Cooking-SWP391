package com.example.OrganizeRecipeApi.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MyDish extends BaseEntity{
    private String process;
    private String ingredient;

    @OneToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;
}
