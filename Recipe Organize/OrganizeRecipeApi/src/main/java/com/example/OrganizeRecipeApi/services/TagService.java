package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Tag;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public List<Tag> findTopTagsByViewed(int size){
        Pageable pageable = PageRequest.of(0,size);
        return tagRepository.findTopTagsByViewed(pageable);
    }

    public Tag insert(Tag tag) {
        tag.setId(0l);
        return tagRepository.save(tag);
    }

    public List<Tag> findAll() {
        return tagRepository.findAll();
    }
}
