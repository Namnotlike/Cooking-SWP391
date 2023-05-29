package com.example.OrganizeRecipeApi.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
