package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

	public List<Ingredient> findByRestaurantId(Long restaurantId);

	@Query("SELECT i FROM Ingredient i WHERE i.id = :ingredientId")
	public Ingredient retrieveIngredientById(@Param("ingredientId") Long ingredientId);

	@Query("SELECT i FROM Ingredient i " + "WHERE i.restaurant.id = :restaurantId " + "AND lower(i.name) = lower(:name)"
			+ "AND i.category.name = :categoryName")
	public Ingredient retrieveByRestaurantIdAndName(@Param("restaurantId") Long restaurantId,
			@Param("name") String name, @Param("categoryName") String categoryName);
}
