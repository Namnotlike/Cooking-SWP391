package com.example.OrganizeRecipeApi.configurations;

import com.example.OrganizeRecipeApi.constant.NOTI_TYPE;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.marterials.DishDataTest;
import com.example.OrganizeRecipeApi.repositories.*;
import com.example.OrganizeRecipeApi.services.CategoryDetailService;
import com.example.OrganizeRecipeApi.services.CategoryService;
import com.example.OrganizeRecipeApi.services.FavoriteService;
import com.example.OrganizeRecipeApi.services.NotificationService;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class DataInitializationListener implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryDetailService categoryDetailService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private DishRepository dishRepository;
    @Autowired
    private CookerRepository cookerRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private TextUtil textUtil;
    @Autowired
    private DishDataTest dishDataTest;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public DataInitializationListener(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        insertCategories();
        insertCategoryDetails();
        insertRoles();
        insertAccounts();
        insertCookers();
        insertCustomers();
        insertEmployee();
        insertTags();
        insertDishs();
        insertFavorites();
    }

    private void insertFavorites() {
        if(favoriteService.findAll().size()==0) {
            for(Long i=1l;i<=10;i++){
                Favorite favorite = new Favorite();
                Cooker cooker = new Cooker();
                cooker.setId(i);
                Dish dish = new Dish();
                dish.setId(i);
                favorite.setCooker(cooker);
                favorite.setDish(dish);
                favoriteService.insert(favorite);
            }
        }
    }

    private void insertCategoryDetails() {
        String[] catName = {"Appetizers & Snacks","Bread Recipes", "Cake Recipes","Candy and Fudge"};
        if(categoryDetailService.findAll().size()==0) {
            for(int i=0;i<4;i++){
                CategoryDetail categoryDetail = new CategoryDetail(catName[i],1l,textUtil.convertTitleUrl(catName[i]));
                categoryDetailService.insert(categoryDetail);
            }
        }
    }

    private void insertCategories() {
        String[] catName = {"Dish Type","Meal Type", "Diet and Health","World Cruisine","Seasonal"};
        if(categoryService.findAll().size()==0) {
            for(int i=0;i<5;i++){
                categoryService.insert(new Category(catName[i]));
            }
        }
    }

    private void insertTags() {
        if(tagRepository.findAll().size()==0) {
            String[] tagNames = {"Fitness","Sea","Healthy","Fast","Vegetarian","Hot pot","Barbecue","Less grease","Breakfast","Seaweed"};
            for(int i = 1 ; i <= 10 ; i++){
                Tag tag = new Tag();
                tag.setTagName(tagNames[i-1]);
                tag.setViewed(randomNumberInt(100,2000));
                tag.setUrl(textUtil.convertTitleUrl(tag.getTagName()));
                tagRepository.save(tag);
            }
        }
    }
    private void insertCustomers() {
        if(customerRepository.findAll().size()==0) {
            String[] dishNames = {"Oliver","Jack","Harry","Jacob","Charlie","Thomas","George","Oscar","James","William"};
            for(int i = 1 ; i <= 10 ; i++){
                Customer customer = new Customer();
                customer.setFullName(dishNames[i-1]);
                customer.setGender("Male");
                customer.setDateOfBirth(new Date());
                customer.setImageUrl("avt_human");
                customer.setPhone("012345678"+i);
                customer.setAccount(new Account((long)0+i));
                customer.setAddress("13, Pasture");
                customer.setState("California");
                customer.setCity("New York");
                customerRepository.save(customer);
            }
        }
    }

    private void insertEmployee() {
        if(employeeRepository.findAll().size()==0) {
            String[] dishNames = {"Oliver","Jack","Harry","Jacob","Charlie","Thomas","George","Oscar","James","William"};
            for(int i = 1 ; i <= 10 ; i++){
                Employee employee = new Employee();
                employee.setFullName(dishNames[i-1]);
                employee.setGender("Male");
                employee.setDateOfBirth(new Date());
                employee.setImageUrl("avt_human");
                employee.setPhone("012345678"+i);
                employee.setAccount(new Account((long)20+i));
                employeeRepository.save(employee);
            }
        }
    }

    private void insertCookers() {
        if(cookerRepository.findAll().size()==0) {
            String[] dishNames = {"Oliver","Jack","Harry","Jacob","Charlie","Thomas","George","Oscar","James","William"};
            for(int i = 1 ; i <= 10 ; i++){
                Cooker cooker = new Cooker();
                cooker.setFullName(dishNames[i-1]);
                cooker.setGender("Male");
                cooker.setDateOfBirth(new Date());
                cooker.setImageUrl("avt_human");
                cooker.setPhone("012345678"+i);
                cooker.setAccount(new Account((long)10+i));
                cooker.setAddress("13, Pasture");
                cooker.setState("California");
                cooker.setCity("New York");
                cookerRepository.save(cooker);

                Notification notification = new Notification();
                notification.setContent(cooker.getFullName() + " just created a Cooker Account, please confirm.");
                notification.setType(NOTI_TYPE.COOKER_WAIT_ACCEPT);
                notification.setCreateBy(new Account((long)10+i));
                notification.setOwner(ROLE.EMPLOYEE);
                notificationService.insert(notification);
            }
        }
    }

    private void insertDishs() {
        if(dishRepository.findAll().size()==0) {
            String[] dishNames = {"Potato Chips","Donuts","Ice Cream","Chicken Tenders","Soft Drink/Soda","Pizza","Ore Cookies","French Fries","Hot dogs","Hamburgers","Yorkshire Pudding","Fish and Chips","English Pancakes","Shepherd’s Pie","Black Pudding","Trifle","Toad in the Hole","Steak and Kidney Pie","Scotch Egg","Lancashire Hot Pot"};

            for(int i = 1 ; i <= 20 ; i++){
                Dish dish = new Dish();
                dish.setDishName(dishNames[i-1]);
                dish.setDescription("Fish tacos are a favorite quick and easy weeknight meal. Choose cod, tilapia, or halibut, quickly pan-sear in a skillet, and serve with a simply cabbage slaw. 20 minutes start to finish!");
                dish.setProcess(dishDataTest.getProcess());
                dish.setIngredient(dishDataTest.getIngredient());
                dish.setImageUrl("default_image_"+randomNumberInt(1,9));
                dish.setViewed(randomNumberInt(100,2000));
                dish.setRatingPoint(5.0);
                dish.setNote("TRY THIS! Instead of drizzling the taco sauce over top, my husband likes to smear it on the tortilla before assembling the tacos. He says that way he gets more sauce in each bite. Give it a try and see what you think!");
                dish.setTotalCalorie(randomNumberInt(50,200));
                dish.setCookerId((long)(i+1)/2);
                dish.setUrl(textUtil.convertTitleUrl(dishNames[i-1]));
                CategoryDetail categoryDetail = new CategoryDetail();
                categoryDetail.setId((i-1)/5+1l);
                dish.setCategoryDetail(categoryDetail);
                dish.setPrepTime(randomNumberInt(10,30));
                dish.setCookTime(randomNumberInt(15,60));
                dish.setServings(randomNumberInt(1,7));
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
                    account = new Account("account" + i + "@gmail.com", "account" + i, passwordEncoder.encode("123456"), "ACTIVE", 1l);
                }else if(i<=20){
                    account = new Account("account" + i + "@gmail.com", "account" + i, passwordEncoder.encode("123456"), "ACTIVE", 2l);
                }else{
                    account = new Account("account" + i + "@gmail.com", "account" + i, passwordEncoder.encode("123456"), "ACTIVE", 3l);
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
