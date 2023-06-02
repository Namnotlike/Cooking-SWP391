package com.example.OrganizeRecipeApi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.repositories.DishRepository;

import java.util.ArrayList;
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

    public List<Dish> findByTagId(Long tagId, int size){
        Pageable pageable = PageRequest.of(0,size);
        return dishRepository.findByTagId(tagId,pageable);
    }
    public List<Dish> findByDishNameContainingIgnoreCase(String keyword, int size){
        Pageable pageable = PageRequest.of(0,size);
        return dishRepository.findByDishNameContainingIgnoreCase(keyword,pageable);
    }
    public List<Dish> findByCategoryDetailId(Long catDetailId,int page, int size){
        int offset = (page - 1) * size;
        List<Dish> founded = dishRepository.findByCategoryDetailId(catDetailId, offset, size);
        return founded;
    }
    public int countByCategoryDetailId(Long catDetailId){
        return dishRepository.countByCategoryDetailId(catDetailId);
    }
}
