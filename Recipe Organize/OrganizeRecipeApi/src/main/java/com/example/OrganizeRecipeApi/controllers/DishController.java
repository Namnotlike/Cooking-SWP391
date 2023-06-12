package com.example.OrganizeRecipeApi.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.OrganizeRecipeApi.constant.NOTI_TYPE;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.convertors.DishConverter;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandlePagination;
import com.example.OrganizeRecipeApi.services.*;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/dish")
public class DishController {
    @Autowired
    private DishService dishService;
    @Autowired
    private DishConverter dishConverter;
    @Autowired
    private ImageIOUtils imageIOUtils;
    @Autowired
    private AccountService accountService;
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private CustomizeService customizeService;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private TextUtil textUtil;
    @Autowired
    private NotificationService notificationService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<Dish> create(
            @RequestParam String dishName,
            @RequestParam(required = false) String description,
            @RequestParam String process,
            @RequestParam String ingredient,
            @RequestParam(required = false) MultipartFile[] fileAvt,
            @RequestParam int totalCalorie,
            @RequestParam long cookerId,
            @RequestParam int prepTime,
            @RequestParam int cookTime,
            @RequestParam int servings,
            @RequestParam Long categoryDetailId,
            @RequestParam(required = false) Long idSelected,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) String listTagString
    ){
        Cooker cooker = cookerService.findById(cookerId);
        if(cooker==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+cookerId);

        Dish dish = new Dish();
        dish.setDishName(dishName.trim());
        dish.setProcess(process.trim());
        dish.setIngredient(ingredient.trim());
        if(fileAvt!=null) {
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0], avtName);
            dish.setImageUrl(avtName);
        }else if(idSelected!=null){
            Dish currentDish = dishService.findById(idSelected);
            if(currentDish==null)
                return new ResponseHandle<>("02","Not found Dish with selected Id: "+idSelected);
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.copyImage(currentDish.getImageUrl(), avtName);
            dish.setImageUrl(avtName);
        }else{
            return new ResponseHandle<>("02","Avatar can not be empty");
        }
        dish.setTotalCalorie(totalCalorie);
        dish.setCookerId(cookerId);
        dish.setPrepTime(prepTime);
        dish.setCookTime(cookTime);
        dish.setUrl(textUtil.convertTitleUrl(dishName.trim()));
        dish.setServings(servings);
        CategoryDetail categoryDetail = new CategoryDetail();
        categoryDetail.setId(categoryDetailId);
        dish.setCategoryDetail(categoryDetail);

        if(description!=null)
            dish.setDescription(description);
        if(note!=null)
            dish.setNote(note);
        if(listTagString!=null && !listTagString.isEmpty()) {
            List<Long> listTagId = new ArrayList<>();
            for(String tagId : listTagString.split(";")){
                listTagId.add(Long.parseLong(tagId));
            }
            dish.setTagId(listTagId);
        }
        Dish inserted = dishService.insert(dish);
        //CREATE NOTIFICATION
        Notification notification = new Notification();
        notification.setContent(cooker.getFullName()+" just posted a new recipe.");
        notification.setType(NOTI_TYPE.COOKER_UP_NEW_RECIPE);
        notification.setCreateBy(cooker.getAccount());
        notification.setOwner(ROLE.ADMIN);
        notificationService.insert(notification);
        return new ResponseHandle<Dish>(inserted);
    }
    @CrossOrigin
    @PutMapping("/edit/{id}")
    public ResponseHandle<Dish> editDish(
            @PathVariable Long id,
            @RequestParam String dishName,
            @RequestParam(required = false) String description,
            @RequestParam String process,
            @RequestParam String ingredient,
            @RequestParam(required = false) MultipartFile[] fileAvt,
            @RequestParam int totalCalorie,
            @RequestParam long cookerId,
            @RequestParam int prepTime,
            @RequestParam int cookTime,
            @RequestParam int servings,
            @RequestParam Long categoryDetailId,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) String listTagString
    ){
        Dish dish = dishService.findById(id);
        if(dish==null)
            return new ResponseHandle<>("02","Not found Dish with id: "+id);
        dish.setDishName(dishName.trim());
        dish.setProcess(process.trim());
        dish.setIngredient(ingredient.trim());
        if(fileAvt!=null) {
            imageIOUtils.deleteImage(dish.getImageUrl());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0], avtName);
            dish.setImageUrl(avtName);
        }
        dish.setTotalCalorie(totalCalorie);
        dish.setCookerId(cookerId);
        dish.setPrepTime(prepTime);
        dish.setCookTime(cookTime);
        dish.setUrl(textUtil.convertTitleUrl(dishName.trim()));
        dish.setServings(servings);
        CategoryDetail categoryDetail = new CategoryDetail();
        categoryDetail.setId(categoryDetailId);
        dish.setCategoryDetail(categoryDetail);
        dish.setDescription(description);
        dish.setNote(note);
        dish.getTags().clear();
        if(listTagString!=null && !listTagString.isEmpty()) {
            List<Long> listTagId = new ArrayList<>();
            for(String tagId : listTagString.split(";")){
                listTagId.add(Long.parseLong(tagId));
            }
            dish.setTagId(listTagId);
        }

        return new ResponseHandle<Dish>(dishService.save(dish));
    }

    @CrossOrigin
    @DeleteMapping("/deleteById/{id}")
    public ResponseHandle<Long> deleteById(@PathVariable Long id){
        Dish founded = dishService.findById(id);
        if (founded == null)
            return new ResponseHandle<>("02", "Not found Dish with id: " + id);
        for (Favorite item : favoriteService.findByDishId(id)) {
            if(item.getCustomize()!=null){
                Long customizeId = item.getCustomize().getId();
                favoriteService.deleteById(item.getId());
                customizeService.deleteById(customizeId);
            }else{
                favoriteService.deleteById(item.getId());
            }
        }
        dishService.deleteById(id);

        return new ResponseHandle<Long>(id);
    }

    @CrossOrigin
    @GetMapping("/getById/{id}")
    public ResponseHandle<DishDTO> getById(@PathVariable Long id){
        Dish founded = dishService.findById(id);
        return new ResponseHandle<DishDTO>(dishConverter.toDTO(founded));
    }

    @CrossOrigin
    @GetMapping("/getTopViewed")
    public ResponseArrayHandle<DishDTO> getTopViewed(@RequestParam(required = false,defaultValue = "5") int size){
        List<Dish> listFounded = dishService.findTopDishesByViewed(size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }

    @CrossOrigin
    @GetMapping("/getByFavorite/{role}/{id}")
    public ResponseArrayHandlePagination<DishDTO> getByFavorite(
            @PathVariable String role,
            @PathVariable Long id,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size
    ){
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findByFavorite(role,id,page,size);
        ResponseArrayHandlePagination<DishDTO> response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByFavorite(role,id));
        return response;
    }


    @CrossOrigin
    @GetMapping("/getTopNewed")
    public ResponseArrayHandle<DishDTO> getTopNewed(@RequestParam(required = false,defaultValue = "5") int size){
        List<Dish> listFounded = dishService.findTopDishesByNewed(size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }

    @CrossOrigin
    @GetMapping("/getByTagId/{id}")
    public ResponseArrayHandle<DishDTO> getByTagId(@PathVariable Long id,@RequestParam(required = false,defaultValue = "5") int size){
        List<Dish> listFounded = dishService.findByTagId(id,size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }

    @CrossOrigin
    @GetMapping("/getByCookerId/{id}")
    public ResponseArrayHandle<Dish> getByCookerId(@PathVariable Long id){
        List<Dish> listFounded = dishService.findByCookerId(id);
        for(Dish item : listFounded)
            System.out.println(item.toString());
        ResponseArrayHandle<Dish> res = new ResponseArrayHandle<Dish>(listFounded);
        return res;
    }
    /*
     List<DishDTO> dtos = dishConverter.toArrayDTO(listFounded);
        for(DishDTO item : dtos)
            System.out.println(item.toString()); List<DishDTO> dtos = dishConverter.toArrayDTO(listFounded);
        for(DishDTO item : dtos)
            System.out.println(item.toString());
     */

    @CrossOrigin
    @GetMapping("/getByCategoryId/{id}")
    public ResponseArrayHandlePagination<DishDTO> getByCategoryId(@PathVariable Long id,@RequestParam(required = false,defaultValue = "1") int page, @RequestParam(required = false,defaultValue = "5") int size){
        if(page<1)
            page=1;
        if(size<1)
            size=1;
        List<Dish> listFounded = dishService.findByCategoryDetailId(id,page,size);
        ResponseArrayHandlePagination response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByCategoryDetailId(id));
        return response;
    }

    @CrossOrigin
    @PostMapping("/getByKeySearch")
    public ResponseArrayHandlePagination<DishDTO> getByKeySearch(@RequestParam String keyword,@RequestParam(required = false,defaultValue = "1") int page,@RequestParam(required = false,defaultValue = "5") int size){
        if(page<1)
            page=1;
        if(size<1)
            size=18;
        List<Dish> listFounded = dishService.findByDishNameContainingIgnoreCase(keyword,page,size);
        ResponseArrayHandlePagination<DishDTO> response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByDishNameContainingIgnoreCase(keyword.trim()));
        return response;
    }
}
