package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Account extends BaseEntity{
    private String email;
    private String username;
    private String password;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonManagedReference
    private Role role;

    public Account(String email, String username, String password, boolean status, Long roleId) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.status = status;
        this.role = new Role(roleId);
    }
    public Account (Long accountId){
        setId(accountId);
    }
}