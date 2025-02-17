package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Ingredient;
import com.pranay.springboot.fooddeliverymanagementapp.model.IngredientCategory;

public interface IngredientService {

	public List<Ingredient> retrieveRestaurantIngredients(Long restaurantId);

	public Ingredient updateIngredientAvailability(Long ingredientId) throws Exception;

	public IngredientCategory retrieveIngredientCategoryById(Long ingredientCategoryId) throws Exception;

	public Ingredient createIngredient(Long restaurantId, String ingredientName, Long ingredientCategoryId)
			throws Exception;

	public List<IngredientCategory> retrieveRestaurantIngredientCategories(Long restaurantId) throws Exception;

	public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws RestaurantException;
}
