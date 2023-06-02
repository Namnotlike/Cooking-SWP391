package com.example.OrganizeRecipeApi.controllers;

import java.util.ArrayList;
import java.util.List;

import com.example.OrganizeRecipeApi.convertors.DishConverter;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.CategoryDetail;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandlePagination;
import com.example.OrganizeRecipeApi.services.DishService;
import com.example.OrganizeRecipeApi.services.TagService;
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
            @RequestParam Long categoryDetailId,
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

        return new ResponseHandle<DishDTO>(dishConverter.toDTO(dishService.insert(dish)));
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
    @GetMapping("/getByCategoryId/{id}")
    public ResponseArrayHandlePagination<DishDTO> getByCategoryId(@PathVariable Long id,@RequestParam(required = false,defaultValue = "1") int page, @RequestParam(required = false,defaultValue = "5") int size){
        if(page<1){
            page=1;
        }
        List<Dish> listFounded = dishService.findByCategoryDetailId(id,page,size);
        ResponseArrayHandlePagination response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByCategoryDetailId(id));
        return response;
    }

    @CrossOrigin
    @PostMapping("/getByKeySearch/{size}")
    public ResponseArrayHandle<DishDTO> getByKeySearch(@RequestParam String keyword,@PathVariable int size){
        List<Dish> listFounded = dishService.findByDishNameContainingIgnoreCase(keyword,size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }
}
