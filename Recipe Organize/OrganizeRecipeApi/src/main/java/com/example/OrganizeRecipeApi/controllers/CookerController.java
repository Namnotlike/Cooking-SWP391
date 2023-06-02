package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.services.CookerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cooker")
public class CookerController {
    @Autowired
    private CookerService cookerService;

    @CrossOrigin
    @PostMapping("/getByKeySearch/{size}")
    public ResponseArrayHandle<Cooker> getByKeySearch(@RequestParam String keyword, @PathVariable int size){
        List<Cooker> listFounded = cookerService.findByCookerName(keyword,size);
        return new ResponseArrayHandle<Cooker>(listFounded);
    }
}
