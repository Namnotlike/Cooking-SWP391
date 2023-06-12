package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Notification;
import com.example.OrganizeRecipeApi.repositories.CookerRepository;
import com.example.OrganizeRecipeApi.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public Notification insert(Notification notification){
        notification.setId(0l);
        return notificationRepository.save(notification);
    }

    public List<Notification> findByOwner(String owner) {
        return notificationRepository.findByOwner(owner);
    }

    public List<Notification> findByOwnerAndStatus(String owner, String status) {
        return notificationRepository.findByOwnerAndStatus(owner,status);
    }

    public Notification findById(Long id) {
        Optional<Notification> opt = notificationRepository.findById(id);
        if(opt.isPresent())
            return opt.get();
        return null;
    }

    public Notification save(Notification founded) {
        return notificationRepository.save(founded);
    }
}
