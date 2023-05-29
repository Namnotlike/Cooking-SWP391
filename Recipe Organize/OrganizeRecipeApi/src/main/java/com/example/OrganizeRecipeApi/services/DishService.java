package com.example.OrganizeRecipeApi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.repositories.DishRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DishService {
    @Autowired
    private DishRepository dishRepository;

    public Dish insert(Dish dish){
        dish.setId(0l);
        return dishRepository.save(dish);
    }

    public List<Dish> findTopDishesByViewed(int size){
        Pageable pageable = PageRequest.of(0,size);
        return dishRepository.findTopDishesByViewed(pageable);
    }

    public List<Dish> findTopDishesByNewed(int size){
        Pageable pageable = PageRequest.of(0,size);
        return dishRepository.findTopDishesByNewed(pageable);
    }

    public Dish findById(Long id) {
        Optional<Dish> opt = dishRepository.findById(id);
        if(!opt.isPresent())
            return null;
        return opt.get();
    }
}
