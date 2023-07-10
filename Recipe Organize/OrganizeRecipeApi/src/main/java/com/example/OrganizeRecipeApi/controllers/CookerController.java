package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.AccountStatus;
import com.example.OrganizeRecipeApi.constant.NotificationType;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.dtos.CookerDTO;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.*;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.AccountService;
import com.example.OrganizeRecipeApi.services.CookerService;
import com.example.OrganizeRecipeApi.services.FavoriteService;
import com.example.OrganizeRecipeApi.services.NotificationService;
import com.example.OrganizeRecipeApi.utils.ImageIOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cooker")
public class CookerController {
    @Autowired
    private CookerService cookerService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private ImageIOUtils imageIOUtils;

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private FavoriteService favoriteService;
    @CrossOrigin
    @GetMapping("/getByUsername/{username}")
    public ResponseHandle<Cooker> getByUsername(@PathVariable String username){
        Cooker founded = cookerService.findByUsername(username.trim());
        if(founded==null)
            return new ResponseHandle<>("02","Not found Cooker with username: "+username);
        founded.getAccount().setPassword(null);
        return new ResponseHandle<Cooker>(founded);
    }

    @CrossOrigin
    @GetMapping("/getCountLoved/{cookerId}")
    public ResponseHandle<Integer> getCountLoved(@PathVariable Long cookerId){
        return new ResponseHandle<>(favoriteService.countCookerFavorite(cookerId));
    }

    @CrossOrigin
    @GetMapping("/getById/{id}")
    public ResponseHandle<Cooker> getById(@PathVariable Long id){
        Cooker founded = cookerService.findById(id);
        if(founded==null)
            return new ResponseHandle<>("02","Not found Cooker with id: "+id);
        founded.getAccount().setPassword(null);
        return new ResponseHandle<Cooker>(founded);
    }

    @CrossOrigin
    @GetMapping("/getByAccountStatus/{status}")
    public ResponseArrayHandle<Cooker> getByAccountStatus(@PathVariable String status){
        return new ResponseArrayHandle<Cooker>(cookerService.findByAccountStatus(status));
    }

    @CrossOrigin
    @GetMapping("/acceptCooker/{username}/{cookerId}")
    public ResponseHandle<Cooker> acceptCooker(@PathVariable String username, @PathVariable Long cookerId){
        Cooker founded = cookerService.findById(cookerId);
        if(founded==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+cookerId);
        Account accountEmp = accountService.findByUsername(username);
        if(accountEmp==null)
            return new ResponseHandle<>("02","Not found account with username: "+username);
        founded.setStatus(true);

        Notification notification = new Notification();
        notification.setContent("Admin" + " just allow you become a cooker, please confirm.");
        notification.setType(NotificationType.ACTIVE_COOKER);
        notification.setCreateBy(accountEmp);
        notification.setCreateTo(founded.getAccount());
        notification.setOwner(ROLE.COOKER);
        notificationService.insert(notification);

        return new ResponseHandle<Cooker>(cookerService.save(founded));
    }

    @CrossOrigin
    @GetMapping("/editAccountStatus/{username}/{cookerId}/{status}")
    public ResponseHandle<Cooker> activeOrBanCooker(@PathVariable String username,@PathVariable Long cookerId,@PathVariable String status){
        Cooker founded = cookerService.findById(cookerId);
        if(founded==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+cookerId);
        if(!status.equals(AccountStatus.BANNED) && !status.equals(AccountStatus.ACTIVE))
            return new ResponseHandle<>("02","Status invalid: "+status);
        Account accountEmp = accountService.findByUsername(username);
        if(accountEmp==null)
            return new ResponseHandle<>("02","Not found employee with username:" + username);
        founded.getAccount().setStatus(status);

        Notification notification = new Notification();
        notification.setContent("Admin" + " just change your status account to "+status+", please confirm.");
        notification.setType(NotificationType.CHANGE_ACCOUNT_STATUS);
        notification.setCreateBy(accountEmp);
        notification.setCreateTo(founded.getAccount());
        notification.setOwner(ROLE.COOKER);
        notificationService.insert(notification);

        return new ResponseHandle<Cooker>(cookerService.save(founded));
    }

    @CrossOrigin
    @GetMapping("/getByStatus/{accountStatus}/{status}")
    public ResponseArrayHandle<Cooker> getByStatus(@PathVariable String accountStatus, @PathVariable boolean status){
        return new ResponseArrayHandle<Cooker>(cookerService.findByStatus(accountStatus,status));
    }


    @CrossOrigin
    @PostMapping("/getByKeySearch")
    public ResponseArrayHandle<CookerDTO> getByKeySearch(@RequestParam String keyword,@RequestParam(required = false,defaultValue = "1") int page,@RequestParam(required = false,defaultValue = "12") int size){
        try {
            if (page < 1)
                page = 1;
            if (size < 1)
                size = 1;
            List<CookerDTO> listFounded = cookerService.findByCookerName(keyword, page, size);
            return new ResponseArrayHandle<CookerDTO>(listFounded);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @CrossOrigin
    @PostMapping("/getByDishCountDesc")
    public ResponseArrayHandle<CookerDTO> getByDishCountDesc(@RequestParam(required = false,defaultValue = "1") int page, @RequestParam(required = false,defaultValue = "12") int size){
        try {
            if (page < 1)
                page = 1;
            if (size < 1)
                size = 1;
            List<CookerDTO> listFounded = cookerService.findByDishCountDesc(page, size);
            return new ResponseArrayHandle<CookerDTO>(listFounded);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    public ResponseHandle<Cooker> editCooker(
            @PathVariable Long id,
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam(required = false) MultipartFile[] fileAvt
    ){
        Cooker cooker = cookerService.findById(id);
        if(cooker==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+id);
        cooker.setFullName(fullName.trim());
        if(!email.trim().equalsIgnoreCase(cooker.getAccount().getEmail())) {
            if(accountService.findByEmail(email.trim())!=null){
                return new ResponseHandle<>("02","Email already exists: "+email);
            }
            cooker.getAccount().setEmail(email.trim());
        }
        cooker.setPhone(phone.trim());
        cooker.setAddress(address.trim());
        cooker.setCity(city.trim());
        cooker.setState(state.trim());
        if(fileAvt!=null){
            imageIOUtils.deleteImage(cooker.getImageUrl());
            String avtName = imageIOUtils.getUuidFileName();
            imageIOUtils.writeImage(fileAvt[0],avtName);
            cooker.setImageUrl(avtName);
        }
        return new ResponseHandle<Cooker>(cookerService.save(cooker));
    }
}
