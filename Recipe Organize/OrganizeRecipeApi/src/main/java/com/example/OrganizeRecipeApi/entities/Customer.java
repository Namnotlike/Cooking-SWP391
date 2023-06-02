package com.example.OrganizeRecipeApi.entities;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class Customer extends User {
    private Double weight = 0.0;
    private Double weightExpect= 0.0;
    private Double height= 0.0;
    private String city;
    private String state;
    private String address;

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
