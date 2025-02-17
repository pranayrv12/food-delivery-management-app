package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.IngredientCategory;

public interface IngredientCategoryRepository extends JpaRepository<IngredientCategory, Long> {

	public List<IngredientCategory> findByRestaurantId(Long restaurantId);

	@Query("SELECT i FROM IngredientCategory i " + "WHERE i.restaurant.id = :restaurantId "
			+ "AND lower(i.name) = lower(:name)")
	public IngredientCategory retrieveByRestaurantIdAndName(@Param("restaurantId") Long restaurantId,
			@Param("name") String name);

	@Query("SELECT i FROM IngredientCategory i WHERE i.id = :ingredientCategoryId")
	public IngredientCategory retrieveIngredientCategoryById(@Param("ingredientCategoryId") Long ingredientCategoryId);
}
