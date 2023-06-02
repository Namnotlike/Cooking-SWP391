package com.example.OrganizeRecipeApi.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Cooker extends User{

    @OneToMany(mappedBy = "cooker")
    @JsonBackReference
    private List<Dish> dishs;

}
