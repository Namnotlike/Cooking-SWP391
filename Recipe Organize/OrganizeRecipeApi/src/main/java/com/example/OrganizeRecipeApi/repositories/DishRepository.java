package com.example.OrganizeRecipeApi.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.OrganizeRecipeApi.entities.Dish;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface DishRepository extends JpaRepository<Dish, Long> {
    @Query("SELECT d FROM Dish d ORDER BY d.viewed DESC")
    List<Dish> findTopDishesByViewed(Pageable pageable);

    @Query("SELECT d FROM Dish d ORDER BY d.createAt DESC")
    List<Dish> findTopDishesByNewed(Pageable pageable);

    @Query(value = "SELECT * FROM Dish d JOIN tag_dish td ON d.id = td.dish_id WHERE td.tag_id = :tagId", nativeQuery = true)
    List<Dish> findByTagId(@Param("tagId") Long tagId, Pageable pageable);

    @Query(value = "SELECT d.* FROM dish d JOIN category_detail cd ON d.category_detail_id = cd.id WHERE d.category_detail_id = :categoryDetailId ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Dish> findByCategoryDetailId(@Param("categoryDetailId") Long categoryDetailId, int offset, int size);

    @Query("SELECT COUNT(d) FROM Dish d WHERE d.categoryDetail.id = :categoryDetailId")
    Integer countByCategoryDetailId(@Param("categoryDetailId") Long categoryDetailId);

    @Query(value = "SELECT d FROM Dish d WHERE REPLACE(d.dishName, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%')")
    List<Dish> findByDishNameContainingIgnoreCase(@Param("keyword") String keyword, Pageable pageable);
}
