package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.repositories.CookerRepository;
import com.example.OrganizeRecipeApi.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CookerService {
    @Autowired
    private CookerRepository cookerRepository;

    public List<Cooker> findByCookerName(String keyword,int size){
        Pageable pageable = PageRequest.of(0,size);
        return cookerRepository.findByCookerName(keyword,pageable);
    }

    public Cooker insert(Cooker cooker){
        cooker.setId(0l);
        Cooker inserted =  cookerRepository.save(cooker);
        return inserted;
    }
}
