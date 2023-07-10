package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Favorite;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.OrganizeRecipeApi.entities.Dish;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface DishRepository extends JpaRepository<Dish, Long> {
    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id, d.category_detail_id FROM dish d ORDER BY d.viewed DESC", nativeQuery = true)
    List<Object[]> findTopDishesByViewed(Pageable pageable);

    @Query("SELECT d FROM Dish d ORDER BY d.createAt DESC")
    List<Dish> findTopDishesByNewed(Pageable pageable);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d JOIN tag_dish td ON d.id = td.dish_id WHERE td.tag_id = :tagId AND d.status = 'ACTIVE' ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Object[]> findByTagId(@Param("tagId") Long tagId, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d JOIN tag_dish td ON d.id = td.dish_id WHERE td.tag_id = :tagId AND d.status = 'ACTIVE'", nativeQuery = true)
    Integer countByTagId(Long tagId);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d JOIN category_detail cd ON d.category_detail_id = cd.id WHERE d.category_detail_id = :categoryDetailId AND d.status = 'ACTIVE' ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Object[]> findByCategoryDetailId(@Param("categoryDetailId") Long categoryDetailId, int offset, int size);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d WHERE d.cooker_id = :id ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Object[]> findByCookerIdPaging(Long id, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d WHERE d.cooker_id = :id",nativeQuery = true)
    Integer countByCookerId(Long id);

    @Query("SELECT COUNT(d) FROM Dish d WHERE d.categoryDetail.id = :categoryDetailId AND d.status = 'ACTIVE'")
    Integer countByCategoryDetailId(@Param("categoryDetailId") Long categoryDetailId);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d WHERE REPLACE(d.dish_name, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%') AND d.status = 'ACTIVE' ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Object[]> findByDishNameContainingIgnoreCase(@Param("keyword") String keyword, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d WHERE REPLACE(d.dish_name, ' ', '') LIKE CONCAT('%', LOWER(REPLACE(:keyword, ' ', '')), '%') AND d.status = 'ACTIVE'",nativeQuery = true)
    Integer countByDishNameContainingIgnoreCase(String keyword);

    @Query(value = "SELECT d.* FROM dish d WHERE d.cooker_id = :id ORDER BY d.create_at DESC",nativeQuery = true)
    List<Dish> findByCookerId(Long id);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d JOIN favorite f ON d.id = f.dish_id WHERE ((:roleName = 'Cooker' AND f.cooker_id = :id) OR (:roleName <> 'Cooker' AND f.customer_id = :id)) AND d.status = 'ACTIVE' ORDER BY f.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Object[]> findByFavorite(String roleName, Long id, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d JOIN favorite f ON d.id = f.dish_id WHERE ((:roleName = 'Cooker' AND f.cooker_id = :id) OR (:roleName <> 'Cooker' AND f.customer_id = :id)) AND d.status = 'ACTIVE'", nativeQuery = true)
    int countByFavorite(String roleName, Long id);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM favorite f LEFT JOIN cooker c ON f.cooker_id = c.id LEFT JOIN customer cm ON f.customer_id = cm.id LEFT JOIN account a ON c.account_id = a.id LEFT JOIN account ab ON cm.account_id = ab.id LEFT JOIN dish d ON f.dish_id = d.id WHERE a.id=:accountId AND d.status = 'ACTIVE'",nativeQuery = true)
    List<Object[]> findDishFavorited(Long accountId);

    @Query(value = "SELECT TOP 1 d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id, d.total_calorie FROM dish d WHERE (d.meal_time = :mealTime OR d.meal_time = 'ALL') AND d.total_calorie <= :maxCalories AND d.id NOT IN :idExist AND d.status = 'ACTIVE' ORDER BY NEWID()", nativeQuery = true)
    List<Object[]> findRandomByMealTimeNotExist(String mealTime,int maxCalories, List<Integer> idExist);

    @Query(value = "SELECT TOP 1 d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id, d.total_calorie FROM dish d WHERE (d.meal_time = :mealTime OR d.meal_time = 'ALL') AND d.total_calorie <= :maxCalories AND d.status = 'ACTIVE' ORDER BY NEWID()", nativeQuery = true)
    List<Object[]> findRandomByMealTime(String mealTime,int maxCalories);

    @Query(value = "SELECT d.* FROM dish d ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Dish> findAllPaging(int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish", nativeQuery = true)
    int countAllPaging();

    @Query(value = "SELECT d.* FROM dish d WHERE d.status = :status ORDER BY d.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Dish> findByStatusPaging(String status, int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM dish d WHERE d.status = :status", nativeQuery = true)
    int countByStatusPaging(String status);

    @Query(value = "SELECT TOP 1 d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id, d.total_calorie FROM dish d WHERE d.meal_time = :mealTime AND d.total_calorie <= :maxCalories AND d.status = 'ACTIVE' ORDER BY NEWID()", nativeQuery = true)
    List<Object[]> findRandomByMealTimeNotAll(String mealTime, int maxCalories);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d JOIN category_detail cd ON d.category_detail_id = cd.id WHERE d.category_detail_id = :categoryDetailId AND d.status = 'ACTIVE' ORDER BY d.viewed DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Object[]> findTopViewByCategory(long categoryDetailId, int offset, int size);

    @Query(value = "SELECT d.id, d.dish_name, d.image_url, d.url, d.rating_point, d.cooker_id FROM dish d JOIN category_detail cd ON d.category_detail_id = cd.id WHERE d.category_detail_id = :categoryDetailId AND d.status = 'ACTIVE' ORDER BY d.rating_point DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Object[]> findTopRatingByCategory(long categoryDetailId, int offset, int size);
}
