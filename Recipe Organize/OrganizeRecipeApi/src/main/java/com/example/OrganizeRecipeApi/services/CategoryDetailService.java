package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Category;
import com.example.OrganizeRecipeApi.entities.CategoryDetail;
import com.example.OrganizeRecipeApi.repositories.CategoryDetailRepository;
import com.example.OrganizeRecipeApi.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryDetailService {
    @Autowired
    private CategoryDetailRepository categoryDetailRepository;

    public List<CategoryDetail> findAll() {
        return categoryDetailRepository.findAll();
    }

    public CategoryDetail insert(CategoryDetail categoryDetail) {
        categoryDetail.setId(0l);
        return categoryDetailRepository.save(categoryDetail);
    }
}
