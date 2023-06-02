package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.entities.CategoryDetail;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.services.CategoryDetailService;
import com.example.OrganizeRecipeApi.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/category-detail")
public class CategoryDetailController {
    @Autowired
    private CategoryDetailService categoryDetailService;
    @GetMapping("/getAll")
    public ResponseArrayHandle<CategoryDetail> getAllCategory(){
        return  new ResponseArrayHandle<CategoryDetail>(categoryDetailService.findAll());
    }
}
