package com.example.OrganizeRecipeApi.configurations;

import com.example.OrganizeRecipeApi.constant.*;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.marterials.DishDataTest;
import com.example.OrganizeRecipeApi.repositories.*;
import com.example.OrganizeRecipeApi.services.*;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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
    private CookerService cookerService;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private TextUtil textUtil;
    @Autowired
    private DishDataTest dishDataTest;
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private DishService dishService;
    @Autowired
    private RatingRecipeService ratingRecipeService;
    public DataInitializationListener(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    @Autowired
    private ViewStatisticRepository viewStatisticRepository;
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
        insertFeedbacks();
        insertReports();
        insertViewStatistic();
    }

    private void insertViewStatistic() {
        if(viewStatisticRepository.findAll().size()==0){
            LocalDate currentDate = LocalDate.now();
            LocalDate startDate = LocalDate.of(2023, 1, 1);
            LocalDate date = startDate;
            List<ViewStatistic> viewStatisticList = new ArrayList<>();
            while (date.isBefore(currentDate) || date.isEqual(currentDate)) {
                ViewStatistic viewStatistic = new ViewStatistic();
                viewStatistic.setId(0l);
                viewStatistic.setDay(date.getDayOfMonth());
                viewStatistic.setMonth(date.getMonthValue());
                viewStatistic.setYear(date.getYear());
                viewStatistic.setViewed(randomNumberInt(100,500));
                viewStatisticList.add(viewStatistic);
                date = date.plusDays(1);
            }
            viewStatisticRepository.saveAll(viewStatisticList);
        }
    }

    private void insertReports() {
        String[] reasons = {"Incorrect recipes.","Incorrect cooking ingredients.","Copy other people's recipes.","Another"};
        String[] descriptions = {"Wrong recipe","Wrong inpredient","Copy in my recipe","Invalid servings"};
        if(reportRepository.findAll().size()==0){
            List<Report> reports = new ArrayList<>();
            for(int i =0 ;i<100;i++){
                Report report = new Report();
                report.setReason(reasons[randomNumberInt(0,reasons.length-1)]);
                report.setDescription(descriptions[randomNumberInt(0,descriptions.length-1)]);
                report.setAccount(new Account((long)randomNumberInt(1,30)));
                report.setDish(new Dish((long)randomNumberInt(1,100)));
                reports.add(report);
            }
            reportRepository.saveAll(reports);
        }
    }

    private void insertFeedbacks() {
        if(feedbackService.findAll().size()==0) {
            System.out.println("Starting insert feedbacks...");
            List<Feedback> feedbacks = new ArrayList<>();
            for(Dish item : dishRepository.findAll()){
                int totalRate = 0;
                for(int i = 0 ; i < 3 ; i++){
                    Feedback feedback = new Feedback();
                    feedback.setFeedBackContent("Lorem ipsum dolor sit amet, consectetur elit.");
                    feedback.setDish(new Dish(item.getId()));
                    if(randomNumberInt(1,2)%2==0){
                        feedback.setCustomer(new Customer((long) randomNumberInt(1,10)));
                    }else{
                        feedback.setCooker(new Cooker((long) randomNumberInt(1,10)));
                    }
                    feedbacks.add(feedback);
                }
            }
            feedbackRepository.saveAll(feedbacks);
            System.out.println("insert feedbacks completed.");
        }
    }

    private void insertFavorites() {
        String[] dishNames = {"Oliver","Jack","Harry","Jacob","Charlie","Thomas","George","Oscar","James","William"};
        if(favoriteService.findAll().size()==0) {
            System.out.println("Starting insert favorite...");
            for(Long i=1l;i<=10;i++){
                Favorite favorite = new Favorite();
                Cooker cooker = new Cooker(i);
                Dish dish = new Dish(i);
                favorite.setCooker(cooker);
                favorite.setDish(dish);
                favoriteService.insert(favorite);
            }
            List<Account> accounts = new ArrayList<>();
            List<Customer> customers = new ArrayList<>();
            List<Favorite> favorites = new ArrayList<>();
            for(int i = 0;i<1000;i++){
                Account account = new Account("customer" + i + "@gmail.com", "customer" + i, passwordEncoder.encode("123456"), "ACTIVE", 1l);
                accounts.add(account);

                Customer customer = new Customer();
                customer.setFullName(dishNames[randomNumberInt(0,9)]);
                customer.setGender("Male");
                customer.setDateOfBirth(new Date());
                customer.setImageUrl("human_"+randomNumberInt(0,9));
                customer.setPhone("012345678"+i);
                customer.setAccount(account);
                customer.setAddress("13, Pasture");
                customer.setState("California");
                customer.setCity("New York");
                customers.add(customer);

                Favorite favorite = new Favorite();
                Dish dish = new Dish((long) randomNumberInt(1,100));
                favorite.setCustomer(customer);
                favorite.setDish(dish);
                favorites.add(favorite);
            }
            accountRepository.saveAll(accounts);
            System.out.println("insert accounts completed.");

            customerRepository.saveAll(customers);
            System.out.println("insert customers completed.");

            favoriteRepository.saveAll(favorites);
            System.out.println("insert favorites completed.");

            List<Cooker> cookers = new ArrayList<>();
            for(Cooker cooker : cookerRepository.findAll()){
                int count = favoriteService.countCookerFavorite(cooker.getId());
                if(count>=200){
                    cooker.setRank(CookerRank.DIAMOND);
                }else if(count>=100){
                    cooker.setRank(CookerRank.GOLD);
                }else if(count>=50){
                    cooker.setRank(CookerRank.SILVER);
                }else{
                    cooker.setRank(CookerRank.BRONZE);
                }
                cookers.add(cooker);
            }
            cookerRepository.saveAll(cookers);
            System.out.println("insert cooker rank completed.");
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
            List<Customer> customers = new ArrayList<>();
            for(int i = 1 ; i <= 10 ; i++){
                Customer customer = new Customer();
                customer.setFullName(dishNames[i-1]);
                customer.setGender("Male");
                customer.setDateOfBirth(new Date());
                customer.setImageUrl("human_"+randomNumberInt(0,9));
                customer.setPhone("012345678"+i);
                customer.setAccount(new Account((long)0+i));
                customer.setAddress("13, Pasture");
                customer.setState("California");
                customer.setCity("New York");
                customers.add(customer);
            }
            customerRepository.saveAll(customers);
        }
    }

    private void insertEmployee() {
        if(employeeRepository.findAll().size()==0) {
            List<Employee> employees = new ArrayList<>();
            String[] dishNames = {"Oliver","Jack","Harry","Jacob","Charlie","Thomas","George","Oscar","James","William"};
            for(int i = 1 ; i <= 10 ; i++){
                Employee employee = new Employee();
                employee.setFullName(dishNames[i-1]);
                employee.setGender("Male");
                employee.setDateOfBirth(new Date());
                employee.setImageUrl("avt_human");
                employee.setPhone("012345678"+i);
                employee.setAccount(new Account((long)20+i));
                employees.add(employee);
            }
            employeeRepository.saveAll(employees);
        }
    }

    private void insertCookers() {
        if(cookerRepository.findAll().size()==0) {
            List<Cooker> cookers = new ArrayList<>();
            List<Notification> notifications = new ArrayList<>();
            String[] dishNames = {"Oliver","Jack","Harry","Jacob","Charlie","Thomas","George","Oscar","James","William"};
            for(int i = 1 ; i <= 10 ; i++){
                Cooker cooker = new Cooker();
                cooker.setFullName(dishNames[i-1]);
                cooker.setGender("Male");
                cooker.setStatus(true);
                cooker.setDateOfBirth(new Date());
                cooker.setImageUrl("human_"+randomNumberInt(0,9));
                cooker.setPhone("012345678"+i);
                cooker.setAccount(new Account((long)10+i));
                cooker.setAddress("13, Pasture");
                cooker.setState("California");
                cooker.setCity("New York");
                cookers.add(cooker);

                Notification notification = new Notification();
                notification.setContent(cooker.getFullName() + " just created a Cooker Account, please confirm.");
                notification.setType(NotificationType.COOKER_WAIT_ACCEPT);
                notification.setCreateBy(new Account((long)10+i));
                notification.setOwner(ROLE.EMPLOYEE);
                notifications.add(notification);
            }
            cookerRepository.saveAll(cookers);
            notificationRepository.saveAll(notifications);
        }
    }

    private void insertDishs() {
        if(dishRepository.findAll().size()==0) {
            System.out.println("Starting insert dish...");
            List<Dish> dishes = new ArrayList<>();
            String[] dishNames = {"Pancake","Sour cream","Steak","Ham","Shrimp","Bread","Tuna steak","Bacon","Porridge","Nuggets","Rainbow Macaron","Australian Ribeye","Avocado Salad","Potato Chips","Donuts","Ice Cream","Chicken Tenders","Soft Drink/Soda","Pizza","Ore Cookies","French Fries","Hot dogs","Hamburgers","Yorkshire Pudding","Fish and Chips","English Pancakes","Shepherd’s Pie","Black Pudding","Trifle","Toad in the Hole","Steak and Kidney Pie","Scotch Egg","Lancashire Hot Pot"};
            for(int i = 1 ; i <= 100 ; i++){
                Dish dish = new Dish();
                dish.setDishName(dishNames[randomNumberInt(0,dishNames.length-1)]);
                dish.setDescription("Fish tacos are a favorite quick and easy weeknight meal. Choose cod, tilapia, or halibut, quickly pan-sear in a skillet, and serve with a simply cabbage slaw. 20 minutes start to finish!");
                dish.setProcess(dishDataTest.getProcess());
                dish.setIngredient(dishDataTest.getIngredient());
                dish.setImageUrl("default_image_"+randomNumberInt(1,30));
                dish.setStatus(DishStatus.ACTIVE);
                dish.setViewed(randomNumberInt(100,2000));
                dish.setRatingPoint((double)randomNumberInt(1,5));
                dish.setNote("TRY THIS! Instead of drizzling the taco sauce over top, my husband likes to smear it on the tortilla before assembling the tacos. He says that way he gets more sauce in each bite. Give it a try and see what you think!");
                dish.setTotalCalorie(randomNumberInt(50,300));
                dish.setCookerId((long)randomNumberInt(1,10));
                dish.setUrl(textUtil.convertTitleUrl(dish.getDishName()));
                CategoryDetail categoryDetail = new CategoryDetail();
                categoryDetail.setId((long)randomNumberInt(1,4));
                dish.setCategoryDetail(categoryDetail);
                dish.setPrepTime(randomNumberInt(10,30));
                dish.setMealTime(randomString(new String[]{MealTime.BREAKFAST,MealTime.LUNCH,MealTime.DINNER,MealTime.ALL}));
                dish.setCookTime(randomNumberInt(15,60));
                dish.setServings(randomNumberInt(1,7));
                List<Long> listTagId = new ArrayList<>();
                listTagId.add((long)randomNumberInt(1, 10));
                dish.setTagId(listTagId);
                //dishRepository.save(dish);
                dishes.add(dish);
            }
            dishRepository.saveAll(dishes);
            System.out.println("insert dish completed.");
//            for(Cooker cooker : cookerRepository.findAll()){
//                int cookerViewed = cookerService.sumViewed(cooker.getId());
//                if(cookerViewed>=7000){
//                    cooker.setRank(CookerRank.DIAMOND);
//                    cookerService.save(cooker);
//                }else if(cookerViewed>=5000 ){
//                    cooker.setRank(CookerRank.GOLD);
//                    cookerService.save(cooker);
//                }else if(cookerViewed>=3000 ){
//                    cooker.setRank(CookerRank.SILVER);
//                    cookerService.save(cooker);
//                }
//            }
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
//            for(int i = 1 ; i <= 1000 ; i++){
//                Account account;
//                account = new Account("customer" + i + "@gmail.com", "customer" + i, passwordEncoder.encode("123456"), "ACTIVE", 1l);
//                accountRepository.save(account);
//            }
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
    public String randomString(String[] listString){
        if (listString == null || listString.length == 0) {
            return null; // Xử lý trường hợp mảng rỗng
        }

        Random random = new Random();
        int randomIndex = random.nextInt(listString.length); // Chỉ số ngẫu nhiên từ 0 đến (listString.length - 1)
        return listString[randomIndex];
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
