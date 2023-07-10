package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CookerRepository extends JpaRepository<Cooker, Long> {
    @Query(value = "SELECT c.* FROM cooker c JOIN account a ON c.account_id = a.id WHERE a.status = :status ORDER BY create_at DESC",nativeQuery = true)
    List<Cooker> findByAccountStatus(String status);

    @Query(value = "SELECT c.* FROM cooker c JOIN account a ON c.account_id = a.id WHERE a.status = :accountStatus AND c.status = :status  ORDER BY create_at DESC",nativeQuery = true)
    List<Cooker> findByStatus(String accountStatus, boolean status);

    @Query(value = "SELECT c.* FROM cooker c JOIN account a ON c.account_id = a.id WHERE a.username = :username",nativeQuery = true)
    List<Cooker> findByUsername(@Param("username") String username);

    @Query(value = "SELECT c.id, c.full_name, c.image_url, c.rank, COALESCE(d.dish_count, 0) AS dish_count FROM cooker c LEFT JOIN (SELECT cooker_id, COUNT(id) AS dish_count FROM dish GROUP BY cooker_id) d ON c.id = d.cooker_id  WHERE REPLACE(c.full_name, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%') ORDER BY c.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Object[]> findByCookerName(String keyword, int offset, int size);

    @Query(value = "SELECT c.id, c.full_name, c.image_url, c.rank, COALESCE(d.dish_count, 0) AS dish_count " +
            "FROM cooker c " +
            "LEFT JOIN (SELECT cooker_id, COUNT(id) AS dish_count " +
            "FROM dish " +
            "GROUP BY cooker_id) d " +
            "ON c.id = d.cooker_id " +
            "ORDER BY dish_count DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Object[]> findByDishCountDesc(int offset, int size);

    @Query(value = "select SUM(viewed) from dish d where d.cooker_id = :cookerId",nativeQuery = true)
    Integer sumViewed(Long cookerId);
}
