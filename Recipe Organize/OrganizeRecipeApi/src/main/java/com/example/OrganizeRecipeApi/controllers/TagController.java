package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.convertors.DishConverter;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Tag;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.DishService;
import com.example.OrganizeRecipeApi.services.TagService;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tag")
public class TagController {
    @Autowired
    private TagService tagService;
    @Autowired
    private DishConverter dishConverter;
    @Autowired
    private ImageIOUtils imageIOUtils;
    @Autowired
    private TextUtil textUtil;

    @GetMapping("/getAll")
    private ResponseArrayHandle<Tag> getAll(){
        return new ResponseArrayHandle<Tag>(tagService.findAll());
    }

    @PostMapping("/create")
    public ResponseHandle<Tag> create(@RequestParam String tagName){
        Tag tag = new Tag();
        tag.setTagName(tagName.trim());
        tag.setUrl(textUtil.convertTitleUrl(tag.getTagName()));
        return new ResponseHandle<Tag>(tagService.insert(tag));
    }

    @GetMapping("/getTopViewed")
    public ResponseArrayHandle<Tag> getTopViewed(@RequestParam(required = false,defaultValue = "5") int size){
        List<Tag> listFounded = tagService.findTopTagsByViewed(size);
        return new ResponseArrayHandle<Tag>(listFounded);
    }

}
