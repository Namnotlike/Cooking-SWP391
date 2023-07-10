package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.constant.NotificationStatus;
import com.example.OrganizeRecipeApi.entities.Notification;
import com.example.OrganizeRecipeApi.payload.ResponseArrayHandle;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @CrossOrigin
    @GetMapping("/getByOwner/{owner}")
    public ResponseArrayHandle<Notification> getByOwner(@PathVariable String owner){
        List<Notification> list = new ArrayList<>();
        try {
            list = notificationService.findByOwner(owner);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseArrayHandle<>(list);
    }

    @CrossOrigin
    @GetMapping("/getByOwner/{owner}/status/{status}")
    public ResponseArrayHandle<Notification> getByOwner(@PathVariable String owner,@PathVariable String status){
        List<Notification>  list = notificationService.findByOwnerAndStatus(owner,status);
        return new ResponseArrayHandle<>(list);
    }

    @CrossOrigin
    @GetMapping("/getByUsername/{username}")
    public ResponseArrayHandle<Notification> getByUsername(@PathVariable String username){
        List<Notification>  list = notificationService.findByUsername(username);
        return new ResponseArrayHandle<>(list);
    }

    @CrossOrigin
    @PutMapping("/changeStatus/{id}/{status}")
    public ResponseHandle<Notification> changeStatus(@PathVariable Long id, @PathVariable String status){
        Notification founded = notificationService.findById(id);
        if(founded==null)
            return new ResponseHandle<>("02","Not found notification with id: "+id);
        if(!status.equals(NotificationStatus.OPEN) && !status.equals(NotificationStatus.PROCESS) && !status.equals(NotificationStatus.RESOLVE))
            return new ResponseHandle<>("02","Status invalid");
        founded.setStatus(status);
        return new ResponseHandle<>(notificationService.save(founded));
    }
}
