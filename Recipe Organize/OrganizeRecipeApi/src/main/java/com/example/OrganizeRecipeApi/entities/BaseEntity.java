package com.example.OrganizeRecipeApi.entities;

import java.util.Date;

import javax.persistence.*;
import lombok.Data;

@Data
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Date createAt = new Date();

    private Date updateAt = new Date();
}
