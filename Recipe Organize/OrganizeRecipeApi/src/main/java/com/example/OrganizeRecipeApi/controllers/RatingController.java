package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.NotificationType;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.convertors.RatingConverter;
import com.example.OrganizeRecipeApi.dtos.RatingDTO;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rating")
public class RatingController {
    @Autowired
    private DishService dishService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private RatingRecipeService ratingRecipeService;
    @Autowired
    private RatingConverter ratingConverter;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private FeedbackService feedbackService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<RatingDTO> createRatingRecipe(
            @RequestParam Long dishId,
            @RequestParam Long accountId,
            @RequestParam Integer ratingPoint
    ){
        try {
            Dish dish = dishService.findById(dishId);
            if (dish == null)
                return new ResponseHandle<>("02", "Not found Dish with id: " + dishId);
            Account account = accountService.findById(accountId);
            if (account == null)
                return new ResponseHandle<>("02", "Not found Account with id: " + accountId);
            if(!account.getRole().getRoleName().equals(ROLE.COOKER) && !account.getRole().getRoleName().equals(ROLE.CUSTOMER) )
                return new ResponseHandle<>("02", "Creator must be customer or cooker");
            if (ratingPoint < 1 || ratingPoint > 5)
                return new ResponseHandle<>("02", "Rating point invalid: " + ratingPoint);
            RatingDTO ratingRecipe = ratingRecipeService.findByDishAndAccountId(dishId, accountId);

            String fullName="";
            if(account.getRole().getRoleName().equals(ROLE.COOKER)){
                Cooker cooker = cookerService.findByUsername(account.getUsername());
                if(cooker!=null){
                    fullName = cooker.getFullName();
                }
            }else{
                Customer customer =  customerService.findByUsername(account.getUsername());
                if(customer!=null){
                    fullName = customer.getFullName();
                }
            }

            ResponseHandle<RatingDTO> res = null;

            if (ratingRecipe != null) {
                ratingRecipe.setRatingPoint(ratingPoint);

                Notification notification = new Notification();
                notification.setContent(fullName + " just change your recipe rating to "+ratingPoint+" starts, please confirm.");
                notification.setType(NotificationType.CHANGE_RATING);
                notification.setCreateBy(account);
                notification.setCreateTo(dish.getCooker().getAccount());
                notification.setOwner(ROLE.COOKER);
                notificationService.insert(notification);

                res = new ResponseHandle<RatingDTO>(ratingConverter.toDTO(ratingRecipeService.save(ratingConverter.toEntity(ratingRecipe))));
            } else {
                RatingRecipe ratingRecipeEntity = new RatingRecipe();
                ratingRecipeEntity.setId(0l);
                ratingRecipeEntity.setRatingPoint(ratingPoint);
                ratingRecipeEntity.setDish(dish);
                ratingRecipeEntity.setAccount(account);

                Notification notification = new Notification();
                notification.setContent(fullName+ " just rate your recipe to "+ratingPoint+" starts, please confirm.");
                notification.setType(NotificationType.CREATE_RATING);
                notification.setCreateBy(account);
                notification.setCreateTo(dish.getCooker().getAccount());
                notification.setOwner(ROLE.COOKER);
                notificationService.insert(notification);

                res = new  ResponseHandle<RatingDTO>(ratingConverter.toDTO(ratingRecipeService.save(ratingRecipeEntity)));
            }

            //AVERAGE FEEDBACK
            List<RatingDTO> listRating = ratingRecipeService.findByDishId(dishId);
            int size = listRating.size();
            int totalRate = 0;
            for (int i = 0; i < size; i++) {
                totalRate += listRating.get(i).getRatingPoint();
            }
            int avtRate = (totalRate) / (size);
            dish.setRatingPoint((double) avtRate);
            dishService.save(dish);

            for(Feedback item : feedbackService.findByDishId(dishId)){
                if(item.getRatingRecipe()==null) {
                    Account account1 = null;
                    if (item.getCustomer() != null) {
                        account1 = item.getCustomer().getAccount();
                    } else {
                        account1 = item.getCooker().getAccount();
                    }
                    if (accountId == account1.getId()) {
                        item.setRatingRecipe(new RatingRecipe(res.getData().getId()));
                        feedbackService.save(item);
                    }
                }
            }

            return res;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @CrossOrigin
    @GetMapping("/getByDishAndAccountId/{dishId}/{accountId}")
    public  ResponseHandle<RatingDTO> getByDishAndAccountId(
                @PathVariable Long dishId,
                @PathVariable Long accountId
            )
    {
        try {
            RatingDTO ratingRecipe = ratingRecipeService.findByDishAndAccountId(dishId, accountId);
            if (ratingRecipe == null) {
                return new ResponseHandle<>("02", "Not found rating");
            }
            return new ResponseHandle<RatingDTO>(ratingRecipe);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

}
