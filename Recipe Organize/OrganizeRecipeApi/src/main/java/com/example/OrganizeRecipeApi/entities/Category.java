package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Category extends BaseEntity{
    private String name;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    List<CategoryDetail>  categoryDetails;

    public Category(String name) {
        this.name = name;
    }
}
