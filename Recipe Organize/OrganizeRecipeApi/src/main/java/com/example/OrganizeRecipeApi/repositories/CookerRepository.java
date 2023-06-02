package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Cooker;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CookerRepository extends JpaRepository<Cooker, Long> {
    @Query(value = "SELECT d FROM Cooker d WHERE REPLACE(d.fullName, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%')")
    List<Cooker> findByCookerName(String keyword, Pageable pageable);
}
