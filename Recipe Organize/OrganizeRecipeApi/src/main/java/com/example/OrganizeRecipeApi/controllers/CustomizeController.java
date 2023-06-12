package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.entities.CategoryDetail;
import com.example.OrganizeRecipeApi.entities.Customize;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Favorite;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.CustomizeService;
import com.example.OrganizeRecipeApi.services.DishService;
import com.example.OrganizeRecipeApi.services.FavoriteService;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/customize")
public class CustomizeController {
    @Autowired
    private TextUtil textUtil;
    @Autowired
    private CustomizeService customizeService;
    @Autowired
    private DishService dishService;
    @Autowired
    private FavoriteService favoriteService;
    @CrossOrigin
    @PostMapping("/save")
    public ResponseArrayHandle<Favorite> createOrUpdate(
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String process,
            @RequestParam(required = false) String ingredient,
            @RequestParam int prepTime,
            @RequestParam int cookTime,
            @RequestParam int servings,
            @RequestParam Long accountId,
            @RequestParam(required = false) Long idSelected,
            @RequestParam(required = false) String note
    ){
        Dish dish = dishService.findById(idSelected);
        if (dish == null)
            return new ResponseArrayHandle<>("02", "Not found Dish with id: " + idSelected);
        Favorite favorite = favoriteService.findByAccountIdAndDishId(accountId, idSelected);
        if (favorite == null)
            return new ResponseArrayHandle<>("02", "Not found Favorite with dishId: " + idSelected);
        Customize customize = null;
        if(favorite.getCustomize()!=null)
            customize = favorite.getCustomize();
        else customize = new Customize();
        if (process == null || process.isEmpty())
            process = dish.getProcess();
        if (ingredient == null || ingredient.isEmpty())
            ingredient = dish.getIngredient();
        customize.setProcess(process.trim());
        customize.setIngredient(ingredient.trim());
        customize.setPrepTime(prepTime);
        customize.setCookTime(cookTime);
        customize.setUrl(dish.getUrl());
        customize.setImageUrl(dish.getImageUrl());
        customize.setServings(servings);
        customize.setDish(dish);
        if (description != null)
            customize.setDescription(description);
        if (note != null)
            customize.setNote(note);
        customize = customizeService.save(customize);
        favorite.setCustomize(customize);
        Favorite saved = favoriteService.save(favorite);
        return new ResponseArrayHandle<Favorite>(favoriteService.findByAccountId(accountId));
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseArrayHandle<Favorite> delete(
            @RequestParam Long accountId,
            @RequestParam(required = false) Long idSelected
    ) {
        Dish dish = dishService.findById(idSelected);
        if (dish == null)
            return new ResponseArrayHandle<>("02", "Not found Dish with id: " + idSelected);
        Favorite favorite = favoriteService.findByAccountIdAndDishId(accountId, idSelected);
        if (favorite == null)
            return new ResponseArrayHandle<>("02", "Not found Favorite with dishId: " + idSelected);
        if (favorite.getCustomize()==null)
            return new ResponseArrayHandle<>("02","Recipe has been Origin");
        Long customizeId = favorite.getCustomize().getId();
        favorite.setCustomize(null);
        favoriteService.save(favorite);
        customizeService.deleteById(customizeId);
        return new ResponseArrayHandle<Favorite>(favoriteService.findByAccountId(accountId));
    }

}
