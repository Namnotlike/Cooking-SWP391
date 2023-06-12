package com.example.OrganizeRecipeApi.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Data
@Entity
public class Cooker extends Member{
    private boolean status = false;

    @OneToMany(mappedBy = "cooker")
    @JsonManagedReference
    private List<Dish> dishs;

    @OneToMany(mappedBy = "cooker")
    @JsonBackReference
    private List<Favorite> favorites;

}
