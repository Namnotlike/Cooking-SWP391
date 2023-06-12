package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = "SELECT n.* FROM notification n WHERE n.owner = :owner ORDER BY create_at DESC",nativeQuery = true)
    List<Notification> findByOwner(String owner);

    @Query(value = "SELECT n.* FROM notification n WHERE n.owner = :owner AND n.status = :status ORDER BY create_at DESC",nativeQuery = true)
    List<Notification> findByOwnerAndStatus(String owner, String status);
}
