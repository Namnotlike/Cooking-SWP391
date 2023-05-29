package com.example.OrganizeRecipeApi.configurations;

import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.repositories.*;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializationListener implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private CookerRepository cookerRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private TextUtil textUtil;
    public DataInitializationListener(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        insertRoles();
        insertAccounts();
        insertCookers();
        insertTags();
        insertDishs();
    }

    private void insertTags() {
        if(tagRepository.findAll().size()==0) {
            for(int i = 1 ; i <= 10 ; i++){
                Tag tag = new Tag();
                tag.setTagName("tag name "+i);
                tag.setViewed(randomNumberInt(100,2000));
                tag.setUrl(textUtil.convertTitleUrl(tag.getTagName()));
                tagRepository.save(tag);
            }
        }
    }

    private void insertCookers() {
        if(cookerRepository.findAll().size()==0) {
            for(int i = 1 ; i <= 10 ; i++){
                Cooker cooker = new Cooker();
                cooker.setFullName("cooker name "+i);
                cooker.setGender("Male");
                cooker.setDateOfBirth(new Date());
                cooker.setImageUrl("abc.png");
                cooker.setPhone("012345678"+i);
                cooker.setAccount(new Account((long)10+i));
                cookerRepository.save(cooker);
            }
        }
    }

    private void insertDishs() {
        if(dishRepository.findAll().size()==0) {
            for(int i = 1 ; i <= 20 ; i++){
                Dish dish = new Dish();
                dish.setDishName("dishName "+i);
                dish.setDescription("Fish tacos are a favorite quick and easy weeknight meal...."+i);
                dish.setProcess("process "+i);
                dish.setIngredient("ingredient "+i);
                dish.setImageUrl("default_image_1");
                dish.setViewed(randomNumberInt(100,2000));
                dish.setRatingPoint(5.0);
                dish.setNote("TRY THIS! Instead of drizzling the taco sauce over top, my husband likes to smear it on the tortilla before assembling the tacos. He says that way he gets more sauce in each bite. Give it a try and see what you think!");
                dish.setTotalCalorie(randomNumberInt(50,200));
                dish.setCookerId((long)(i+1)/2);
                List<Long> listTagId = new ArrayList<>();
                listTagId.add((long)(i+1)/2);
                dish.setTagId(listTagId);
                dishRepository.save(dish);
            }
        }
    }

    private void insertAccounts() {
        if(accountRepository.findAll().size()==0) {
            for(int i = 1 ; i <= 30 ; i++){
                Account account;
                if(i<=10) {
                    account = new Account("account" + i + "@gmail.com", "account" + i, "123456", true, 1l);
                }else if(i<=20){
                    account = new Account("account" + i + "@gmail.com", "account" + i, "123456", true, 2l);
                }else{
                    account = new Account("account" + i + "@gmail.com", "account" + i, "123456", true, 3l);
                }
                accountRepository.save(account);
            }
        }
    }

    private void insertRoles() {
        if(roleRepository.findAll().size()==0) {
            Role role1 = new Role("Customer");
            Role role2 = new Role("Cooker");
            Role role3 = new Role("Employee");
            Role role4 = new Role("Admin");

            roleRepository.save(role1);
            roleRepository.save(role2);
            roleRepository.save(role3);
            roleRepository.save(role4);
        }
    }
    public Long randomNumberLong(int min, int max){
        Long result = Long.parseLong(Math.floor(Math.random() * (max - min + 1) + min)+"");
        return result;
    }
    public int randomNumberInt(int min, int max){
        int result = (int)Math.floor(Math.random() * (max - min + 1) + min);
        return result;
    }
}
