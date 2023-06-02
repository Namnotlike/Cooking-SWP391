package com.example.OrganizeRecipeApi.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@NoArgsConstructor
@Entity
public class Role extends BaseEntity{
    private String roleName;
    private boolean status = true;

    public Role(String roleName){
        this.roleName=roleName;
    }
    public Role(Long id){
        this.setId(id);
    }
}
