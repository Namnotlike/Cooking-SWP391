package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@MappedSuperclass
public class Member extends User{
    private Double weight = 0.0;
    private Double weightExpect= 0.0;
    private Double height= 0.0;
    @Column(columnDefinition = "nvarchar(max)")
    private String city;
    @Column(columnDefinition = "nvarchar(max)")
    private String state;
    @Column(columnDefinition = "nvarchar(max)")
    private String address;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Report> reports;


}
