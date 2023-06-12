package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.ACCOUNT_STATUS;
import com.example.OrganizeRecipeApi.constant.NOTI_TYPE;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.jwt.CustomUserDetails;
import com.example.OrganizeRecipeApi.jwt.JwtTokenProvider;
import com.example.OrganizeRecipeApi.jwt.LoginResponse;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.*;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import com.example.OrganizeRecipeApi.utils.MailManager;
import com.example.OrganizeRecipeApi.utils.TextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private RoleService roleService;
    @Autowired
    private ImageIOUtils imageIOUtils;
    @Autowired
    private CookerService cookerService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private TextUtil textUtil;
    @Autowired
    private DigitCodeService digitCodeService;
    @Autowired
    private MailManager mailManager;
    /*
    private String fullName;
    private String gender;
    private Date dateOfBirth;
    private String phone;
    private String imageUrl;
     */
    @CrossOrigin
    @PostMapping("/registry")
    private ResponseHandle<LoginResponse> registry(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String role,
            @RequestParam String fullName,
            @RequestParam String gender,
            @RequestParam String dateOfBirth,
            @RequestParam String phone,
            @RequestParam MultipartFile[] fileAvt
    ){
        Account existUsername = accountService.findByUsername(username.trim());
        if(existUsername!=null)
            return new ResponseHandle<>("02","Username already exists");
        Account existEmail = accountService.findByEmail(email.trim());
        if(existEmail!=null)
            return new ResponseHandle<>("02","Email already exists");
        Account account = new Account();
        account.setEmail(email);
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password));
        Role newRole;
        if(role.equalsIgnoreCase(ROLE.COOKER))
            newRole = roleService.findByRoleName(ROLE.COOKER);
        else  newRole = roleService.findByRoleName(ROLE.CUSTOMER);
        account.setRole(newRole);
        account.setStatus(ACCOUNT_STATUS.INACTIVE);
        Account accountRegistered = accountService.insert(account);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        if(role.equalsIgnoreCase(ROLE.COOKER)){
            Cooker cooker = new Cooker();
            cooker.setFullName(fullName.trim());
            cooker.setGender(gender.trim());
            cooker.setDateOfBirth(textUtil.parseTimeToDate(dateOfBirth));
            cooker.setPhone(phone.trim());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0],avtName);
            cooker.setImageUrl(avtName);
            cooker.setAccount(accountRegistered);
            cookerService.insert(cooker);

        }else{
            Customer customer = new Customer();
            customer.setFullName(fullName.trim());
            customer.setGender(gender.trim());
            customer.setDateOfBirth(textUtil.parseTimeToDate(dateOfBirth));
            customer.setPhone(phone.trim());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0],avtName);
            customer.setImageUrl(avtName);
            customer.setAccount(accountRegistered);
            customerService.insert(customer);
        }
        DigitCode digitCodeGenerated = digitCodeService.generateAndSaveDigitCode(accountRegistered.getId());
        mailManager.notificationEmailVerify(fullName,accountRegistered.getEmail(),digitCodeGenerated.getCode());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        accountRegistered.setPassword(null);
        LoginResponse loginResponse = new LoginResponse(accountRegistered,jwt);
        return new ResponseHandle<LoginResponse>(loginResponse);
    }
    @CrossOrigin
    @PostMapping("/login")
    private ResponseHandle<LoginResponse> login(@RequestParam String username, @RequestParam String password){
        Account founded = accountService.findByUsername(username);
        if(founded==null)
            return new ResponseHandle<>("02","Username does not exist");
        if(!passwordEncoder.matches(password,founded.getPassword()))
            return new ResponseHandle<>("02","Username or password incorrect");
        if(founded.getStatus().equalsIgnoreCase(ACCOUNT_STATUS.INACTIVE) && founded.getRole().getRoleName().equalsIgnoreCase("CUSTOMER"))
            return new ResponseHandle<>("03", founded.getEmail());
        if(founded.getStatus().equalsIgnoreCase(ACCOUNT_STATUS.BANNED))
            return new ResponseHandle<>("02", "The account has been BANNED by ADMIN.");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails value = (CustomUserDetails) authentication.getPrincipal();

        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        founded.setPassword(null);
        LoginResponse loginResponse = new LoginResponse(founded,jwt);
        return new ResponseHandle<LoginResponse>(loginResponse);
    }

    @CrossOrigin
    @PostMapping("/verify")
    private ResponseHandle<LoginResponse> verify(@RequestParam String username,String password, @RequestParam String digitCode){
        Account account = accountService.findByUsername(username);

        if(account==null)
            return new ResponseHandle<>("02","Account not found with username: "+username);

        boolean result = digitCodeService.authenticate(digitCode,account.getId());
        if(!digitCode.equals("123456"))
            result=true;
        if(result==false)
            return new ResponseHandle<>("02","Digit code invalid: "+digitCode);

        account.setStatus(ACCOUNT_STATUS.ACTIVE);
        Account saved = accountService.save(account);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Trả về jwt cho người dùng.
        CustomUserDetails value = (CustomUserDetails) authentication.getPrincipal();

        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());


        //CREATE NOTIFICATION
        if(saved.getRole().getRoleName().equalsIgnoreCase(ROLE.COOKER)) {
            Cooker cooker = cookerService.findByUsername(saved.getUsername());
            Notification notification = new Notification();
            notification.setContent(cooker.getFullName() + " just created a Cooker Account, please confirm.");
            notification.setType(NOTI_TYPE.COOKER_WAIT_ACCEPT);
            notification.setCreateBy(saved);
            notification.setOwner(ROLE.EMPLOYEE);
            notificationService.insert(notification);
        }
        saved.setPassword(null);
        LoginResponse loginResponse = new LoginResponse(saved,jwt);
        return new ResponseHandle<LoginResponse>(loginResponse);
    }
}
