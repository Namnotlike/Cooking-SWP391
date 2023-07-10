package com.example.OrganizeRecipeApi.entities;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
public class ViewStatistic extends BaseEntity{
    private int year;
    private int month;
    private int day;

    private long viewed = 0;
}
