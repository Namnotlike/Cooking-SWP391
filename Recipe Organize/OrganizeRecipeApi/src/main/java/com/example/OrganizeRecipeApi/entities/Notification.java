package com.example.OrganizeRecipeApi.entities;

import com.example.OrganizeRecipeApi.constant.NotificationStatus;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Data
@Entity
public class Notification extends BaseEntity{
    private String content;
    private String type;
    private String owner = ROLE.CUSTOMER;
    private String status = NotificationStatus.OPEN;
    @ManyToOne
    @JoinColumn(name = "account_by_id")
    private Account createBy;
    @ManyToOne
    @JoinColumn(name = "account_to_id")
    private Account createTo;
}
