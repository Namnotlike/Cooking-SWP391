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
    private int weight = 0;
    private Double weightExpect= 0.0;
    private int height= 0;
    @Column(columnDefinition = "nvarchar(max)")
    private String city;
    @Column(columnDefinition = "nvarchar(max)")
    private String state;
    @Column(columnDefinition = "nvarchar(max)")
    private String address;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private List<Feedback> feedbacks;




}
