package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Employee;
import com.example.OrganizeRecipeApi.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

//    @Query(value = "SELECT f.* FROM favorite f WHERE dish_id = :dishId AND ((:roleName = 'Cooker' AND f.cooker_id = :userId) OR (:roleName <> 'Cooker' AND f.customer_id = :userId))",nativeQuery = true)
    @Query(value = "SELECT f.* FROM favorite f LEFT JOIN cooker c ON f.cooker_id = c.id LEFT JOIN customer cm ON f.customer_id = cm.id LEFT JOIN account a ON c.account_id = a.id LEFT JOIN account ab ON cm.account_id = ab.id WHERE (a.id=:accountId OR ab.id=:accountId) AND f.dish_id=:dishId",nativeQuery = true)
    List<Favorite> findByDishIdAndAccountId(Long accountId, Long dishId);

    @Query(value = "SELECT f.* FROM favorite f LEFT JOIN cooker c ON f.cooker_id = c.id LEFT JOIN customer cm ON f.customer_id = cm.id LEFT JOIN account a ON c.account_id = a.id LEFT JOIN account ab ON cm.account_id = ab.id WHERE a.id=:accountId OR ab.id=:accountId",nativeQuery = true)
    List<Favorite> findByAccountId(Long accountId);

    @Query(value = "SELECT f.* FROM favorite f WHERE f.dish_id = :dishId",nativeQuery = true)
    List<Favorite> findByDishId(Long dishId);
}
