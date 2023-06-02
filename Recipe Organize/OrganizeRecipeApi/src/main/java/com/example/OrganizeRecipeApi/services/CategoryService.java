package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.entities.Feedback;
import com.example.OrganizeRecipeApi.repositories.CategoryRepository;
import com.example.OrganizeRecipeApi.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category insert(Category category) {
        category.setId(0l);
        return categoryRepository.save(category);
    }
}
