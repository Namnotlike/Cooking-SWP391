package com.example.OrganizeRecipeApi.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.OrganizeRecipeApi.constant.*;
import com.example.OrganizeRecipeApi.convertors.DishConverter;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandlePagination;
import com.example.OrganizeRecipeApi.services.*;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/dish")
public class DishController {
    @Autowired
    private DishService dishService;
    @Autowired
    private DishConverter dishConverter;
    @Autowired
    private ImageIOUtils imageIOUtils;
    @Autowired
    private AccountService accountService;
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private CustomizeService customizeService;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private TextUtil textUtil;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private CategoryDetailService categoryDetailService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ViewStatisticService viewStatisticService;
    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<Dish> create(
            @RequestParam String dishName,
            @RequestParam(required = false) String description,
            @RequestParam String process,
            @RequestParam String ingredient,
            @RequestParam(required = false) MultipartFile[] fileAvt,
            @RequestParam int totalCalorie,
            @RequestParam long cookerId,
            @RequestParam int prepTime,
            @RequestParam int cookTime,
            @RequestParam int servings,
            @RequestParam Long categoryDetailId,
            @RequestParam(required = false) Long idSelected,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) String listTagString
    ){
        Cooker cooker = cookerService.findById(cookerId);
        if(cooker==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+cookerId);

        Dish dish = new Dish();
        dish.setDishName(dishName.trim());
        dish.setProcess(process.trim());
        dish.setIngredient(ingredient.trim());
        if(fileAvt!=null) {
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0], avtName);
            dish.setImageUrl(avtName);
        }else if(idSelected!=null){
            Dish currentDish = dishService.findById(idSelected);
            if(currentDish==null)
                return new ResponseHandle<>("02","Not found Dish with selected Id: "+idSelected);
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.copyImage(currentDish.getImageUrl(), avtName);
            dish.setImageUrl(avtName);
        }else{
            return new ResponseHandle<>("02","Avatar can not be empty");
        }
        dish.setTotalCalorie(totalCalorie);
        dish.setCookerId(cookerId);
        dish.setPrepTime(prepTime);
        dish.setCookTime(cookTime);
        dish.setUrl(textUtil.convertTitleUrl(dishName.trim()));
        dish.setServings(servings);
        CategoryDetail categoryDetail = new CategoryDetail();
        categoryDetail.setId(categoryDetailId);
        dish.setCategoryDetail(categoryDetail);

        if(description!=null)
            dish.setDescription(description);
        if(note!=null)
            dish.setNote(note);
        if(listTagString!=null && !listTagString.isEmpty()) {
            List<Long> listTagId = new ArrayList<>();
            for(String tagId : listTagString.split(";")){
                listTagId.add(Long.parseLong(tagId));
            }
            dish.setTagId(listTagId);
        }
        Dish inserted = dishService.insert(dish);
        //CREATE NOTIFICATION
        Notification notification = new Notification();
        notification.setContent(cooker.getFullName()+" just posted a new recipe.");
        notification.setType(NotificationType.COOKER_UP_NEW_RECIPE);
        notification.setCreateBy(cooker.getAccount());
        notification.setOwner(ROLE.ADMIN);
        notificationService.insert(notification);
        return new ResponseHandle<Dish>(inserted);
    }
    @CrossOrigin
    @PutMapping("/edit/{id}")
    public ResponseHandle<Dish> editDish(
            @PathVariable Long id,
            @RequestParam String dishName,
            @RequestParam(required = false) String description,
            @RequestParam String process,
            @RequestParam String ingredient,
            @RequestParam(required = false) MultipartFile[] fileAvt,
            @RequestParam int totalCalorie,
            @RequestParam long cookerId,
            @RequestParam int prepTime,
            @RequestParam int cookTime,
            @RequestParam int servings,
            @RequestParam Long categoryDetailId,
            @RequestParam(required = false) String note,
            @RequestParam(required = false) String listTagString
    ){
        Dish dish = dishService.findById(id);
        if(dish==null)
            return new ResponseHandle<>("02","Not found Dish with id: "+id);
        dish.setDishName(dishName.trim());
        dish.setProcess(process.trim());
        dish.setIngredient(ingredient.trim());
        if(fileAvt!=null) {
            imageIOUtils.deleteImage(dish.getImageUrl());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0], avtName);
            dish.setImageUrl(avtName);
        }
        dish.setTotalCalorie(totalCalorie);
        dish.setCookerId(cookerId);
        dish.setPrepTime(prepTime);
        dish.setCookTime(cookTime);
        dish.setUrl(textUtil.convertTitleUrl(dishName.trim()));
        dish.setServings(servings);
        CategoryDetail categoryDetail = new CategoryDetail();
        categoryDetail.setId(categoryDetailId);
        dish.setCategoryDetail(categoryDetail);
        dish.setDescription(description);
        dish.setNote(note);
        dish.getTags().clear();
        if(listTagString!=null && !listTagString.isEmpty()) {
            List<Long> listTagId = new ArrayList<>();
            for(String tagId : listTagString.split(";")){
                listTagId.add(Long.parseLong(tagId));
            }
            dish.setTagId(listTagId);
        }

        return new ResponseHandle<Dish>(dishService.save(dish));
    }

    @CrossOrigin
    @DeleteMapping("/deleteById/{id}")
    public ResponseHandle<Long> deleteById(@PathVariable Long id){
        Dish founded = dishService.findById(id);
        if (founded == null)
            return new ResponseHandle<>("02", "Not found Dish with id: " + id);
        for (Favorite item : favoriteService.findByDishId(id)) {
            if(item.getCustomize()!=null){
                Long customizeId = item.getCustomize().getId();
                favoriteService.deleteById(item.getId());
                customizeService.deleteById(customizeId);
            }else{
                favoriteService.deleteById(item.getId());
            }
        }
        dishService.deleteById(id);

        return new ResponseHandle<Long>(id);
    }

    @CrossOrigin
    @GetMapping("/getById/{id}")
    public ResponseHandle<DishDTO> getById(@PathVariable Long id){
        Dish founded = dishService.findById(id);
        return new ResponseHandle<DishDTO>(dishConverter.toDTO(founded));
    }

    @CrossOrigin
    @GetMapping("/updateViewed/{dishId}")
    public ResponseHandle<DishDTO> updateViewed(@PathVariable Long dishId){
        Dish founded = dishService.findById(dishId);
        if(founded==null)
            return new ResponseHandle<>("02","Not found dish with id: "+dishId);
        founded.setViewed(founded.getViewed()+1);

        LocalDate localDate = LocalDate.now();
        int year = localDate.getYear();
        int month = localDate.getMonthValue();
        int day = localDate.getDayOfMonth();

        ViewStatistic viewStatistic = viewStatisticService.findByYearMonthDay(year, month, day);
        if(viewStatistic==null)
            return new ResponseHandle<>("02","Not found viewStatistic");
        viewStatistic.setViewed(viewStatistic.getViewed()+1);
        viewStatisticService.save(viewStatistic);

        return new ResponseHandle<DishDTO>(dishConverter.toDTO(dishService.save(founded)));
    }


    @CrossOrigin
    @GetMapping("/getTopViewed")
    public ResponseArrayHandle<DishDTO> getTopViewed(@RequestParam(required = false,defaultValue = "3") int size){
        List<Dish> listFounded = dishService.findTopDishesByViewed(size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }

    @CrossOrigin
    @GetMapping("/getByTagPaging/{tagId}")
    public ResponseArrayHandlePagination<DishDTO> getByTagPaging(
            @PathVariable Long tagId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size
    ){
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findByTagId(tagId,page,size);
        ResponseArrayHandlePagination<DishDTO> res = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        res.setTotalItem(dishService.countByTagId(tagId));
        return res;
    }

    @CrossOrigin
    @PostMapping("/getDishRandByMealTime/{calories}/{mealTime}")
    public ResponseHandle<DishDTO> getDishRandByMealTime(
            @PathVariable int calories,
            @PathVariable String mealTime,
            @RequestParam(required = false) List<Integer> idExist
    ) {
        if(idExist==null){
            idExist = new ArrayList<>();
            idExist.add(0);
        }
        Dish dish = dishService.findRandomByMealTimeNotExist(mealTime,calories,idExist);
        return new ResponseHandle<DishDTO>(dishConverter.toDTO(dish));
    }

    @CrossOrigin
    @PutMapping("/updateMealPlanning/{customerId}")
    public ResponseHandle<Customer> updateMealPlanning(
            @PathVariable Long customerId,
            @RequestParam(required = false) List<Integer> listDishId
    )
    {
        if(listDishId==null)
            listDishId = new ArrayList<>();
        Customer customer = customerService.findById(customerId);
        if(customer==null)
            return new ResponseHandle<>("02","Not found customer with id: "+customerId);
        customer.getMealPlanning().clear();
        for(int i : listDishId){
            Dish dish = new Dish((long)i);
            customer.getMealPlanning().add(dish);
        }
        return new ResponseHandle<Customer>(customerService.save(customer));
    }

    @CrossOrigin
    @GetMapping("/getDishFullMealsByCalories/{calories}")
    public ResponseArrayHandle<DishDTO> getDishByCalories(
            @PathVariable int calories
        ){
        try {
            int totalCalories = calories;
            boolean flagStop = false;
            List<Dish> listDish = new ArrayList<>();
            Dish dish = null;
            while (!flagStop) {
                boolean flagAdd = false;
                dish = null;
                dish = dishService.findRandomByMealTime(MealTime.BREAKFAST, totalCalories);
                if (dish != null && totalCalories - dish.getTotalCalorie() > 0) {
                    dish.setMealTime(MealTime.BREAKFAST);
                    listDish.add(dish);
                    totalCalories -= dish.getTotalCalorie();
                    flagAdd = true;
                }
                dish = null;
                dish = dishService.findRandomByMealTime(MealTime.LUNCH, totalCalories);
                if (dish != null && totalCalories - dish.getTotalCalorie() > 0) {
                    dish.setMealTime(MealTime.LUNCH);
                    listDish.add(dish);
                    totalCalories -= dish.getTotalCalorie();
                    flagAdd = true;
                }
                dish = null;
                dish = dishService.findRandomByMealTime(MealTime.DINNER, totalCalories);
                if (dish != null && totalCalories - dish.getTotalCalorie() > 0) {
                    dish.setMealTime(MealTime.DINNER);
                    listDish.add(dish);
                    totalCalories -= dish.getTotalCalorie();
                    flagAdd = true;
                }
                if (flagAdd == false) // Can not add more item
                    flagStop = true;
            }
            return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listDish));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseArrayHandle<DishDTO>("02","Error");
    }

    @CrossOrigin
    @GetMapping("/getDishByMealTime/{mealTime}/{calories}")
    public ResponseArrayHandle<DishDTO> getDishByMealTime(
            @PathVariable String mealTime,
            @PathVariable int calories
    ){
        try {
            List<Dish> listDish = new ArrayList<>();
            if (!mealTime.equals(MealTime.BREAKFAST) && !mealTime.equals(MealTime.LUNCH) && !mealTime.equals(MealTime.DINNER))
                return new ResponseArrayHandle<>("02", "Meal time invalid");
            int totalCalories = calories;
            boolean flagStop = false;

            Dish dish = null;
            while (!flagStop) {
                boolean flagAdd = false;
                dish = null;
                dish = dishService.findRandomByMealTimeNotAll(mealTime, totalCalories);
                if (dish != null && totalCalories - dish.getTotalCalorie() > 0) {
                    dish.setMealTime(mealTime);
                    listDish.add(dish);
                    totalCalories -= dish.getTotalCalorie();
                    flagAdd = true;
                }
                if (flagAdd == false) // Can not add more item
                    flagStop = true;
            }
            return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listDish));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @CrossOrigin
    @GetMapping("/getByFavorite/{role}/{id}")
    public ResponseArrayHandlePagination<DishDTO> getByFavorite(
            @PathVariable String role,
            @PathVariable Long id,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size
    ){
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findByFavorite(role,id,page,size);
        ResponseArrayHandlePagination<DishDTO> response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByFavorite(role,id));
        return response;
    }

    @CrossOrigin
    @GetMapping("/getByStatusPaging/{status}")
    public ResponseArrayHandlePagination<DishDTO> getByStatusPaging(
            @PathVariable String status,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size
    ){
        if(page<1) page=1;
        if(size<1) size=1;
        if(!status.equals(DishStatus.ACTIVE) && !status.equals(DishStatus.INACTIVE) && !status.equals(DishStatus.BANNED))
            return new ResponseArrayHandlePagination<>("02","Status invalid: "+status);
        List<Dish> listDish = dishService.findByStatusPaging(status, page, size);
        ResponseArrayHandlePagination<DishDTO> res = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listDish));
        res.setTotalItem(dishService.countByStatusPaging(status));
        return res;
    }


    @CrossOrigin
    @GetMapping("/updateStatus")
    public ResponseHandle<DishDTO> updateStatus(@RequestParam String username, @RequestParam Long dishId, @RequestParam String status){
        Dish founded = dishService.findById(dishId);
        if(founded==null)
            return new ResponseHandle<>("02","Not found Dish with id: "+dishId);
        if(!status.equals(DishStatus.ACTIVE) && !status.equals(DishStatus.INACTIVE) && !status.equals(DishStatus.BANNED))
            return new ResponseHandle<>("02","Status invalid: "+status);
        Account accountEmp = accountService.findByUsername(username);
        if(accountEmp==null)
            return new ResponseHandle<>("02","Not found Employee with username: "+username);

        founded.setStatus(status);

        Notification notification = new Notification();
        notification.setContent("Admin" + " just change status of "+founded.getDishName()+" to "+status+", please confirm.");
        notification.setType(NotificationType.UPDATE_DISH_STATUS);
        notification.setCreateBy(accountEmp);
        notification.setCreateTo(founded.getCooker().getAccount());
        notification.setOwner(ROLE.COOKER);

        notificationService.insert(notification);


        return new ResponseHandle<DishDTO>(dishConverter.toDTO(dishService.save(founded)));
    }

    @CrossOrigin
    @GetMapping("/getTopViewByCategory/{categoryId}")
    public ResponseArrayHandlePagination<DishDTO> getTopViewByCategory(
            @PathVariable Long categoryId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size
    ){
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findTopViewByCategory(categoryId, page, size);
        ResponseArrayHandlePagination<DishDTO> res = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        res.setTotalItem(dishService.countByCategoryDetailId(categoryId));
        return res;
    }
    @CrossOrigin
    @GetMapping("/getTopRatingByCategory/{categoryId}")
    public ResponseArrayHandlePagination<DishDTO> getTopRatingByCategory(
            @PathVariable Long categoryId,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size
    ){
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findTopRatingByCategory(categoryId, page, size);
        ResponseArrayHandlePagination<DishDTO> res = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        res.setTotalItem(dishService.countByCategoryDetailId(categoryId));
        return res;
    }


    @CrossOrigin
    @GetMapping("/getTopNewed")
    public ResponseArrayHandle<DishDTO> getTopNewed(@RequestParam(required = false,defaultValue = "5") int size){
        List<Dish> listFounded = dishService.findTopDishesByNewed(size);
        return new ResponseArrayHandle<DishDTO>(dishConverter.toArrayDTO(listFounded));
    }


    @CrossOrigin
    @GetMapping("/getByCookerId/{id}")
    public ResponseArrayHandle<Dish> getByCookerId(@PathVariable Long id){
        List<Dish> listFounded = dishService.findByCookerId(id);
        ResponseArrayHandle<Dish> res = new ResponseArrayHandle<Dish>(listFounded);
        return res;
    }

    @CrossOrigin
    @GetMapping("/getAllPaging")
    public ResponseArrayHandlePagination<DishDTO> getAllPaging(
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size) {
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findAllPaging(page,size);
        ResponseArrayHandlePagination<DishDTO> res = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        res.setTotalItem(dishService.countAllPaging());
        return res;
    }

    @CrossOrigin
    @GetMapping("/getByCookerIdPaging/{id}")
    public ResponseArrayHandlePagination<DishDTO> getByCookerIdPaging(
            @PathVariable Long id,
            @RequestParam(required = false,defaultValue = "1") int page,
            @RequestParam(required = false,defaultValue = "5") int size) {
        if(cookerService.findById(id)==null)
            return new ResponseArrayHandlePagination<>("02","Not found cooker with id: "+id);
        if(page<1) page=1;
        if(size<1) size=1;
        List<Dish> listFounded = dishService.findByCookerIdPaging(id,page,size);
        ResponseArrayHandlePagination<DishDTO> res = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        res.setTotalItem(dishService.countByCookerId(id));
        return res;
    }

    @CrossOrigin
    @GetMapping("/getByCategoryId/{id}")
    public ResponseArrayHandlePagination<DishDTO> getByCategoryId(@PathVariable Long id,@RequestParam(required = false,defaultValue = "1") int page, @RequestParam(required = false,defaultValue = "5") int size){
        if(page<1)
            page=1;
        if(size<1)
            size=1;
        if(categoryDetailService.findById(id)==null)
            return new ResponseArrayHandlePagination<>("02","Not found category with id: "+id);
        List<Dish> listFounded = dishService.findByCategoryDetailId(id,page,size);
        ResponseArrayHandlePagination response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByCategoryDetailId(id));
        return response;
    }

    @CrossOrigin
    @PostMapping("/getByKeySearch")
    public ResponseArrayHandlePagination<DishDTO> getByKeySearch(@RequestParam String keyword,@RequestParam(required = false,defaultValue = "1") int page,@RequestParam(required = false,defaultValue = "5") int size){
        if(page<1)
            page=1;
        if(size<1)
            size=18;
        List<Dish> listFounded = dishService.findByDishNameContainingIgnoreCase(keyword,page,size);
        ResponseArrayHandlePagination<DishDTO> response = new ResponseArrayHandlePagination<DishDTO>(dishConverter.toArrayDTO(listFounded));
        response.setTotalItem(dishService.countByDishNameContainingIgnoreCase(keyword.trim()));
        return response;
    }
}
