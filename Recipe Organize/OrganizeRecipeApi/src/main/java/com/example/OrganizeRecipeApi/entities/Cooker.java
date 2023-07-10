package com.example.OrganizeRecipeApi.entities;

import java.util.List;

import com.example.OrganizeRecipeApi.constant.CookerRank;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Cooker extends Member{
    private boolean status = false;
    private String rank = CookerRank.BRONZE;
    @OneToMany(mappedBy = "cooker")
    @JsonManagedReference
    private List<Dish> dishs;

    @OneToMany(mappedBy = "cooker")
    @JsonBackReference
    private List<Favorite> favorites;


    public Cooker(Long id){
        setId(id);
    }
}
