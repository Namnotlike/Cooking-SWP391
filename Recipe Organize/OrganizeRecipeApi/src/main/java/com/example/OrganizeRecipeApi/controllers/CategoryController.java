package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/getAll")
    public ResponseArrayHandle<Category> getAllCategory(){
        return  new ResponseArrayHandle<Category>(categoryService.findAll());
    }
}
