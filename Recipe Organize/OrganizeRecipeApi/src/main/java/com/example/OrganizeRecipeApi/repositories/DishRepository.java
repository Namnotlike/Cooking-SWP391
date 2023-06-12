package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Favorite;
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

    @Query(value = "SELECT d.* FROM dish d WHERE REPLACE(d.dish_name, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%') ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Dish> findByDishNameContainingIgnoreCase(@Param("keyword") String keyword, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d WHERE REPLACE(d.dish_name, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%')",nativeQuery = true)
    Integer countByDishNameContainingIgnoreCase(String keyword);

    @Query(value = "SELECT d.* FROM dish d WHERE d.cooker_id = :id ORDER BY d.create_at DESC",nativeQuery = true)
    List<Dish> findByCookerId(Long id);

    @Query(value = "SELECT d.* FROM dish d JOIN favorite f ON d.id = f.dish_id WHERE (:roleName = 'Cooker' AND f.cooker_id = :id) OR (:roleName <> 'Cooker' AND f.customer_id = :id) ORDER BY f.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Dish> findByFavorite(String roleName, Long id, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d JOIN favorite f ON d.id = f.dish_id WHERE (:roleName = 'Cooker' AND f.cooker_id = :id) OR (:roleName <> 'Cooker' AND f.customer_id = :id)", nativeQuery = true)
    int countByFavorite(String roleName, Long id);

    @Query(value = "SELECT d.* FROM favorite f LEFT JOIN cooker c ON f.cooker_id = c.id LEFT JOIN customer cm ON f.customer_id = cm.id LEFT JOIN account a ON c.account_id = a.id LEFT JOIN account ab ON cm.account_id = ab.id LEFT JOIN dish d ON f.dish_id = d.id WHERE a.id=:accountId",nativeQuery = true)
    List<Dish> findDishFavorited(Long accountId);

//    @Query(value = "SELECT d.* FROM dish d ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
//    List<Dish> findByFavorite(String username, int offset, int size);
}
