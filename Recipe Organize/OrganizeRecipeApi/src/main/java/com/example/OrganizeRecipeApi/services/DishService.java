package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.convertors.DishConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.repositories.DishRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DishService {
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private DishConverter dishConverter;
    public Dish insert(Dish dish){
        dish.setId(0l);
        return dishRepository.save(dish);
    }

    public List<Dish> findTopDishesByViewed(int size){
        Pageable pageable = PageRequest.of(0,size);
        return dishConverter.objectToArrayEntity(dishRepository.findTopDishesByViewed(pageable));
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


    public List<Dish> findByTagId(Long tagId, int page, int size){
        int offset = (page - 1) * size;
        return dishConverter.objectToArrayEntity(dishRepository.findByTagId(tagId,offset,size));
    }

    public int countByTagId(Long tagId) {
        return dishRepository.countByTagId(tagId);
    }


    public List<Dish> findByDishNameContainingIgnoreCase(String keyword,int page, int size){
        int offset = (page - 1) * size;
        return dishConverter.objectToArrayEntity(dishRepository.findByDishNameContainingIgnoreCase(keyword, offset, size));
    }
    public List<Dish> findByCategoryDetailId(Long catDetailId,int page, int size){
        int offset = (page - 1) * size;
        List<Object[]> founded = dishRepository.findByCategoryDetailId(catDetailId, offset, size);
        return dishConverter.objectToArrayEntity(founded);
    }
    public int countByCookerId(Long id){
        return dishRepository.countByCookerId(id);
    }
    public List<Dish> findByCookerIdPaging(Long cookerId,int page, int size){
        int offset = (page - 1) * size;
        return dishConverter.objectToArrayEntity(dishRepository.findByCookerIdPaging(cookerId, offset, size));
    }
    public int countByCategoryDetailId(Long catDetailId){
        return dishRepository.countByCategoryDetailId(catDetailId);
    }
    public int countByDishNameContainingIgnoreCase(String keyword){
        return dishRepository.countByDishNameContainingIgnoreCase(keyword);
    }

    public List<Dish> findByCookerId(Long id) {
        return dishRepository.findByCookerId(id);
    }

    public void deleteById(Long id) {
        dishRepository.deleteById(id);
    }

    public Dish save(Dish dish) {
        return dishRepository.save(dish);
    }

    public List<Dish> findDishFavorited(Long accountId) {
        return dishConverter.objectToArrayEntity(dishRepository.findDishFavorited(accountId));
    }
    public List<Dish> findByFavorite(String role, Long id, int page, int size) {
        int offset = (page - 1) * size;
        String roleName = "customer_id";
        if(role.equalsIgnoreCase("Cooker")){
            roleName = "Cooker";
        }else{
            roleName = "Customer";
        }
        return dishConverter.objectToArrayEntity(dishRepository.findByFavorite(roleName,id, offset, size));
    }
    public int countByFavorite(String role, Long id){
        String roleName = "customer_id";
        if(role.equalsIgnoreCase("Cooker")){
            roleName = "Cooker";
        }else{
            roleName = "Customer";
        }
        return dishRepository.countByFavorite(roleName, id);
    }


    public Dish findRandomByMealTimeNotExist(String mealTime,int maxCalories, List<Integer> idExist) {
        return dishConverter.objectToEntity(dishRepository.findRandomByMealTimeNotExist(mealTime,maxCalories,idExist));
    }

    public Dish findRandomByMealTime(String mealTime,int maxCalories) {
        return dishConverter.objectToEntity(dishRepository.findRandomByMealTime(mealTime,maxCalories));
    }

    public List<Dish> findAllPaging(int page, int size) {
        int offset = (page - 1) * size;
        return dishRepository.findAllPaging(offset, size);
    }

    public int countAllPaging() {
        return dishRepository.countAllPaging();
    }

    public List<Dish> findByStatusPaging(String status, int page, int size) {
        int offset = (page - 1) * size;
        return dishRepository.findByStatusPaging(status, offset, size);
    }

    public int countByStatusPaging(String status) {
        return dishRepository.countByStatusPaging(status);
    }

    public Dish findRandomByMealTimeNotAll(String mealTime, int maxCalories) {
        return dishConverter.objectToEntity(dishRepository.findRandomByMealTimeNotAll(mealTime,maxCalories));
    }

    public List<Dish> findTopViewByCategory(long categoryId ,int page, int size) {
        int offset = (page - 1) * size;
        List<Object[]> dataList = dishRepository.findTopViewByCategory(categoryId, offset, size);
        return dishConverter.objectToArrayEntity(dataList);
    }

    public List<Dish> findTopRatingByCategory(Long categoryId, int page, int size) {
        int offset = (page - 1) * size;
        List<Object[]> dataList = dishRepository.findTopRatingByCategory(categoryId, offset, size);
        return dishConverter.objectToArrayEntity(dataList);
    }
}
