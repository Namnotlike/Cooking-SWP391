package com.example.OrganizeRecipeApi.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.OrganizeRecipeApi.convertors.DishConverter;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.services.DishService;
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
    private TextUtil textUtil;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<DishDTO> create(
            @RequestParam String dishName,
            @RequestParam(required = false) String description,
            @RequestParam String process,
            @RequestParam String ingredient,
            @RequestParam MultipartFile[] fileAvt,
            @RequestParam int totalCalorie,
            @RequestParam long cookerId,
            @RequestParam int prepTime,
            @RequestParam int cookTime,
            @RequestParam int servings,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) String listTagString
    ){
        Dish dish = new Dish();
        dish.setDishName(dishName.trim());
        dish.setProcess(process.trim());
        dish.setIngredient(ingredient.trim());
        String avtName = imageIOUtils.getUuidFileName();
        imageIOUtils.writeImage(fileAvt[0],avtName);
        dish.setImageUrl(avtName);
        dish.setTotalCalorie(totalCalorie);
        dish.setCookerId(cookerId);
        dish.setPrepTime(prepTime);
        dish.setCookTime(cookTime);
        dish.setServings(servings);
        if(description!=null)
            dish.setDescription(description);
        if(note!=null)
            dish.setNote(note);
        if(listTagString!=null) {
            List<Long> listTagId = new ArrayList<>();
            for(String tagId : listTagString.split(";")){
                listTagId.add(Long.parseLong(tagId));
            }
            dish.setTagId(listTagId);
        }

        return new ResponseHandle<DishDTO>(dishConverter.toDTO(dishService.insert(dish)));
    }

    @CrossOrigin
    @GetMapping("/getById/{id}")
    public ResponseHandle<DishDTO> getById(@PathVariable Long id){
        Dish founded = dishService.findById(id);
        return new ResponseHandle<DishDTO>(dishConverter.toDTO(founded));
    }

    @CrossOrigin
    @GetMapping("/getTopViewed/{size}")
    public ResponseArrayHandle<DishDTO> getTopViewed(@PathVariable int size){
        List<Dish> listFounded = dishService.findTopDishesByViewed(size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }

    @CrossOrigin
    @GetMapping("/getTopNewed/{size}")
    public ResponseArrayHandle<DishDTO> getTopNewed(@PathVariable int size){
        List<Dish> listFounded = dishService.findTopDishesByNewed(size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }
}
