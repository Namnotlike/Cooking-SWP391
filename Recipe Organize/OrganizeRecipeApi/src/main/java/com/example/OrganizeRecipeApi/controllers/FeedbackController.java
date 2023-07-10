package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.convertors.FeedbackConverter;
import com.example.OrganizeRecipeApi.dtos.FeedbackDTO;
import com.example.OrganizeRecipeApi.dtos.RatingDTO;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private FeedbackConverter feedbackConverter;
    @Autowired
    private DishService dishService;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private RatingRecipeService ratingRecipeService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<FeedbackDTO> createFeedback(
            @RequestParam String feedBackContent,
            @RequestParam Long dishId,
            @RequestParam String username,
            @RequestParam String role,
            @RequestParam Integer ratingPoint
    ){
        try {
            Dish dish = dishService.findById(dishId);
            if (dish == null)
                return new ResponseHandle<>("02", "Not found Dish with id: " + dishId);
            Cooker cooker = null;
            Customer customer = null;
            Long accountId = null;
            if (role.equalsIgnoreCase(ROLE.COOKER)) {
                cooker = cookerService.findByUsername(username.trim());
                accountId = cooker.getAccount().getId();
            } else if (role.equalsIgnoreCase(ROLE.CUSTOMER)) {
                customer = customerService.findByUsername(username.trim());
                accountId = customer.getAccount().getId();
            } else {
                return new ResponseHandle<>("02", "user invalid role: " + role);
            }
            if (customer == null && cooker == null)
                return new ResponseHandle<>("02", "Not found Account with username: " + username.trim());
            Feedback feedback = new Feedback();
            feedback.setDish(new Dish(dishId));
            //feedback.setRatingPoint(ratingPoint);
            RatingDTO ratingRecipe = ratingRecipeService.findByDishAndAccountId(dishId, accountId);
            if (ratingRecipe != null) {
                feedback.setRatingRecipe(new RatingRecipe(ratingRecipe.getId()));
            }
            if (cooker != null) {
                feedback.setCooker(new Cooker(cooker.getId()));
            } else if (customer != null) {
                feedback.setCustomer(new Customer(customer.getId()));
            }
            feedback.setFeedBackContent(feedBackContent.trim());

            FeedbackDTO feedbackDTO = feedbackConverter.toDTO(feedbackService.insert(feedback));

            return new ResponseHandle<FeedbackDTO>(feedbackDTO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @CrossOrigin
    @GetMapping("/getByDishId/{dishId}")
    public ResponseArrayHandle<FeedbackDTO> getByDishId(@PathVariable Long dishId){
        Dish dish = dishService.findById(dishId);
        if(dish == null)
            return new ResponseArrayHandle<>("02","Not found dish with id: "+dishId);
        return new ResponseArrayHandle<FeedbackDTO>(feedbackConverter.toArrayDTO(feedbackService.findByDishId(dishId)));
    }
}
