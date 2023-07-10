package com.example.OrganizeRecipeApi.entities;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Customer extends Member {
    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Favorite> favorites;

    @ManyToMany
    @JoinTable(
            name = "mealPlanning",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id")
    )
    private List<Dish> mealPlanning = new ArrayList<>();

    public Customer(Long id) {
        this.setId(id);
    }
}
