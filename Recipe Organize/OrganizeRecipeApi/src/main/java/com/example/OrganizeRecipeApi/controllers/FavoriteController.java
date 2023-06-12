package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.convertors.DishConverter;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.*;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorite")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private DishService dishService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomizeService customizeService;

    @CrossOrigin
    @GetMapping("/getById/{id}")
    public ResponseHandle<Favorite> getById(@PathVariable Long id){
        return new ResponseHandle<Favorite>(favoriteService.findById(id));
    }

    @CrossOrigin
    @GetMapping("/getByAccountId/{id}")
    public ResponseArrayHandle<Favorite> getByAccountId(@PathVariable Long id){
        return new ResponseArrayHandle<Favorite>(favoriteService.findByAccountId(id));
    }

    @CrossOrigin
    @GetMapping("/getByAccountAndDishId/{accountId}/{dishId}")
    public ResponseHandle<Favorite> getByAccountAndDishId(
            @PathVariable Long accountId,
            @PathVariable Long dishId
    ){
        return new ResponseHandle<Favorite>(favoriteService.findByAccountIdAndDishId(accountId,dishId));
    }

    @CrossOrigin
    @PostMapping("/checkLoved")
    public ResponseHandle<Boolean> checkLoved(
            @RequestParam Long accountId,
            @RequestParam Long dishId
    ){
        Boolean result = favoriteService.isLoved(accountId,dishId);
        return new ResponseHandle<Boolean>(result);
    }

    @CrossOrigin
    @PostMapping("/changeFavorite")
    public ResponseHandle<Favorite> changeFavorite(
            @RequestParam String role,
            @RequestParam Long accountId,
            @RequestParam Long dishId
    ){
        Account account = accountService.findById(accountId);
        if(account==null)
            return new ResponseHandle<>("02","Not found Account with id: "+account);
        Dish dish = dishService.findById(dishId);
        if(dish==null)
            return new ResponseHandle<>("02","Not found Dish with id: "+dishId);
        Favorite founded = favoriteService.findByAccountIdAndDishId(accountId,dishId);
        if(founded!=null){
            if(founded.getCustomize()!=null){
                Long customizeId = founded.getCustomize().getId();
                favoriteService.deleteById(founded.getId());
                customizeService.deleteById(customizeId);
            }else{
                favoriteService.deleteById(founded.getId());
            }
        }else{
            Favorite favorite = new Favorite();
            favorite.setDish(dish);
            if(role.equalsIgnoreCase("Cooker")){
                Cooker cooker = cookerService.findByUsername(account.getUsername());
                favorite.setCooker(cooker);
            }else{
                Customer customer = customerService.findByUsername(account.getUsername());
                favorite.setCustomer(customer);
            }
            return new ResponseHandle<Favorite>(favoriteService.insert(favorite));
        }
        return new ResponseHandle<Favorite>(null);
    }
}
