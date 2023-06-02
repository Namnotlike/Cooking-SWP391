package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Role;
import com.example.OrganizeRecipeApi.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role findByRoleName(String roleName){
        List<Role> founded = roleRepository.findByRoleName(roleName);
        if(founded!=null && !founded.isEmpty()){
            return founded.get(0);
        }
        return null;
    }
}
