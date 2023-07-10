package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Account extends BaseEntity{
    private String email;
    private String username;
    private String password;
    private String status = "INACTIVE";

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonManagedReference
    private Role role;

    @OneToMany(mappedBy = "account")
    @JsonBackReference
    private List<Report> reports;

    public Account(String email, String username, String password, String status, Long roleId) {
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
