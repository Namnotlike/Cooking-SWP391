package com.example.OrganizeRecipeApi.entities;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Customer extends Member {
    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Favorite> favorites;

}
