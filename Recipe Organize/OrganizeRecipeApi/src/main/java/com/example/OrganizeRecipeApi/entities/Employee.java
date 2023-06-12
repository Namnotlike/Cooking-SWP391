package com.example.OrganizeRecipeApi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Employee extends User{
    @Column(columnDefinition = "nvarchar(max)")
    private String city;
    @Column(columnDefinition = "nvarchar(max)")
    private String state;
    @Column(columnDefinition = "nvarchar(max)")
    private String address;
}
