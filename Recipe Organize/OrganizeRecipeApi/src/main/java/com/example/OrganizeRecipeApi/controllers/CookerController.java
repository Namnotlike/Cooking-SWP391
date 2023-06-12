package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.ACCOUNT_STATUS;
import com.example.OrganizeRecipeApi.dtos.DishDTO;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.AccountService;
import com.example.OrganizeRecipeApi.services.CookerService;
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
    @GetMapping("/getByAccountStatus/{status}")
    public ResponseArrayHandle<Cooker> getByAccountStatus(@PathVariable String status){
        return new ResponseArrayHandle<Cooker>(cookerService.findByAccountStatus(status));
    }

    @CrossOrigin
    @GetMapping("/acceptCooker/{cookerId}")
    public ResponseHandle<Cooker> acceptCooker(@PathVariable Long cookerId){
        Cooker founded = cookerService.findById(cookerId);
        if(founded==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+cookerId);
        founded.setStatus(true);
        return new ResponseHandle<Cooker>(cookerService.save(founded));
    }

    @CrossOrigin
    @GetMapping("/editAccountStatus/{cookerId}/{status}")
    public ResponseHandle<Cooker> banCooker(@PathVariable Long cookerId,@PathVariable String status){
        Cooker founded = cookerService.findById(cookerId);
        if(founded==null)
            return new ResponseHandle<>("02","Not found cooker with id: "+cookerId);
        if(!status.equals(ACCOUNT_STATUS.BANNED) && !status.equals(ACCOUNT_STATUS.ACTIVE))
            return new ResponseHandle<>("02","Status invalid: "+status);
        founded.getAccount().setStatus(status);
        return new ResponseHandle<Cooker>(cookerService.save(founded));
    }

    @CrossOrigin
    @GetMapping("/getByStatus/{accountStatus}/{status}")
    public ResponseArrayHandle<Cooker> getByStatus(@PathVariable String accountStatus, @PathVariable boolean status){
        return new ResponseArrayHandle<Cooker>(cookerService.findByStatus(accountStatus,status));
    }


    @CrossOrigin
    @PostMapping("/getByKeySearch")
    public ResponseArrayHandle<Cooker> getByKeySearch(@RequestParam String keyword,@RequestParam(required = false,defaultValue = "1") int page,@RequestParam(required = false,defaultValue = "5") int size){
        List<Cooker> listFounded = cookerService.findByCookerName(keyword,page,size);
        return new ResponseArrayHandle<Cooker>(listFounded);
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
