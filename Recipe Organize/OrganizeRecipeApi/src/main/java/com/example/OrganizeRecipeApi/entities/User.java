package com.example.OrganizeRecipeApi.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import lombok.Data;

@Data
@MappedSuperclass
public class User extends BaseEntity{
    @Column(columnDefinition = "nvarchar(max)")
    private String fullName;
    private String gender;
    private Date dateOfBirth;
    private String phone;
    private String imageUrl;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;


}
