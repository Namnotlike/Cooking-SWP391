package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.CookerRank;
import com.example.OrganizeRecipeApi.constant.NotificationType;
import com.example.OrganizeRecipeApi.constant.ROLE;
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
    @Autowired
    private NotificationService notificationService;
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
        if(!account.getRole().getRoleName().equals(ROLE.COOKER) && !account.getRole().getRoleName().equals(ROLE.CUSTOMER) )
            return new ResponseHandle<>("02", "Creator must be customer or cooker");
        Dish dish = dishService.findById(dishId);
        if(dish==null)
            return new ResponseHandle<>("02","Not found Dish with id: "+dishId);
        Cooker cookerFounded = cookerService.findById(dish.getCooker().getId());
        Favorite founded = favoriteService.findByAccountIdAndDishId(accountId,dishId);
        String fullName = "";
        if(founded!=null){
            int count = favoriteService.countCookerFavorite(dish.getCooker().getId());
            if(count==50 || count==100 || count==200) {
                if (count == 200) {
                    cookerFounded.setRank(CookerRank.GOLD);
                } else if (count == 100) {
                    cookerFounded.setRank(CookerRank.SILVER);
                } else if (count == 50) {
                    cookerFounded.setRank(CookerRank.BRONZE);
                }
                Notification notification = new Notification();
                notification.setContent("Your chef account has just been downgraded to gold.["+cookerFounded.getRank()+"], please confirm.");
                notification.setType(NotificationType.DOWNGRADE_RANK);
                notification.setCreateTo(cookerFounded.getAccount());
                notification.setOwner(ROLE.COOKER);
                notificationService.insert(notification);

                cookerService.save(cookerFounded);
            }

            if(founded.getCustomize()!=null){
                Long customizeId = founded.getCustomize().getId();
                favoriteService.deleteById(founded.getId());
                customizeService.deleteById(customizeId);
            }else{
                favoriteService.deleteById(founded.getId());
            }

            if(role.equalsIgnoreCase("Cooker")){
                Cooker cooker = cookerService.findByUsername(account.getUsername());
                fullName = cooker.getFullName();
            }else{
                Customer customer = customerService.findByUsername(account.getUsername());
                fullName = customer.getFullName();
            }



            Notification notification = new Notification();
            notification.setContent(fullName + " just remove favorite your recipe ["+dish.getDishName()+"], please confirm.");
            notification.setType(NotificationType.REMOVE_LOVED);
            notification.setCreateBy(account);
            notification.setCreateTo(dish.getCooker().getAccount());
            notification.setOwner(ROLE.COOKER);
            notificationService.insert(notification);

        }else{
            Favorite favorite = new Favorite();
            favorite.setDish(dish);
            if(role.equalsIgnoreCase("Cooker")){
                Cooker cooker = cookerService.findByUsername(account.getUsername());
                fullName = cooker.getFullName();
                favorite.setCooker(cooker);
            }else{
                Customer customer = customerService.findByUsername(account.getUsername());
                fullName = customer.getFullName();
                favorite.setCustomer(customer);
            }

            int count = favoriteService.countCookerFavorite(dish.getCooker().getId());
            if(count==49 || count==99 || count==199) {
                if (count >= 199) {
                    cookerFounded.setRank(CookerRank.DIAMOND);
                } else if (count >= 99) {
                    cookerFounded.setRank(CookerRank.GOLD);
                } else if (count >= 49) {
                    cookerFounded.setRank(CookerRank.SILVER);
                } else {
                    cookerFounded.setRank(CookerRank.BRONZE);
                }
                Notification notification = new Notification();
                notification.setContent("Congratulations, your chef account has just been upgraded to ["+cookerFounded.getRank()+"], please confirm.");
                notification.setType(NotificationType.UPGRADE_RANK);
                notification.setCreateTo(cookerFounded.getAccount());
                notification.setOwner(ROLE.COOKER);
                notificationService.insert(notification);

                cookerService.save(cookerFounded);
            }

            Notification notification = new Notification();
            notification.setContent(fullName + " just add favorite your recipe ["+dish.getDishName()+"], please confirm.");
            notification.setType(NotificationType.ADD_LOVED);
            notification.setCreateBy(account);
            notification.setCreateTo(dish.getCooker().getAccount());
            notification.setOwner(ROLE.COOKER);
            notificationService.insert(notification);

            return new ResponseHandle<Favorite>(favoriteService.insert(favorite));
        }
        return new ResponseHandle<Favorite>(null);
    }
}
