package com.example.OrganizeRecipeApi.entities;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Customer extends User {
    private Double weight;
    private Double weightExpect;
    private Double height;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Report> reports;
}
