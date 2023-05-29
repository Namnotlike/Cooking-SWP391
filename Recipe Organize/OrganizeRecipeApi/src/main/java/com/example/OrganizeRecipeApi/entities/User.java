package com.example.OrganizeRecipeApi.entities;

import java.util.Date;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@MappedSuperclass
public class User extends BaseEntity{
    private String fullName;
    private String gender;
    private Date dateOfBirth;
    private String phone;
    private String imageUrl;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
