package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Customize;
import com.example.OrganizeRecipeApi.entities.Role;
import com.example.OrganizeRecipeApi.repositories.CustomizeRepository;
import com.example.OrganizeRecipeApi.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomizeService {
    @Autowired
    private CustomizeRepository customizeRepository;

    public Customize insert(Customize customize){
        customize.setId(0l);
        return customizeRepository.save(customize);
    }

    public Customize save(Customize customize){
        return customizeRepository.save(customize);
    }

    public void deleteById(Long id){
        customizeRepository.deleteById(id);
    }

    public List<Customize> getByAccountId(Long accountId){
        return customizeRepository.findByAccountId(accountId);
    }
}
