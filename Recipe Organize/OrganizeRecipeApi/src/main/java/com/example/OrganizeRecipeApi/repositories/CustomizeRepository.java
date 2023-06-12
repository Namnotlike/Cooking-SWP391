package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Customize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CustomizeRepository extends JpaRepository<Customize, Long> {

    @Query(value = "SELECT c.* FROM customize c",nativeQuery = true)
    List<Customize> findByAccountId(Long accountId);
}
