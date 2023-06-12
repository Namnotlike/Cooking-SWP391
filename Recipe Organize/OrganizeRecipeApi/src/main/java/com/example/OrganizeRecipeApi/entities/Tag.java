package com.example.OrganizeRecipeApi.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

@Data
@Entity
public class Tag extends BaseEntity{
    private String tagName;
    private Integer viewed = 0;
    private String url;
//    @ManyToMany(mappedBy = "tags")
//    @JsonBackReference
//    private Set<Dish> dishes = new HashSet<>();
}
