package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Ingredient;
import com.pranay.springboot.fooddeliverymanagementapp.model.IngredientCategory;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.repository.IngredientCategoryRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.IngredientRepository;

@Service
public class IngredientServiceImplementation implements IngredientService {

	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private IngredientRepository ingredientRepository;

	@Autowired
	private IngredientCategoryRepository ingredientCategoryRepository;

	@Override
	public List<Ingredient> retrieveRestaurantIngredients(Long restaurantId) {
		return ingredientRepository.findByRestaurantId(restaurantId);
	}

	@Override
	public Ingredient updateIngredientAvailability(Long ingredientId) throws Exception {
		Ingredient updatedIngredient = ingredientRepository.retrieveIngredientById(ingredientId);

		if (updatedIngredient == null) {
			throw new Exception("Ingredient Does Not Exist.");
		}
		updatedIngredient.setAvailable(!updatedIngredient.isAvailable());

		return ingredientRepository.save(updatedIngredient);
	}

	@Override
	public IngredientCategory retrieveIngredientCategoryById(Long ingredientCategoryId) throws Exception {
		IngredientCategory ingredientCategory = ingredientCategoryRepository
				.retrieveIngredientCategoryById(ingredientCategoryId);

		if (ingredientCategory == null) {
			throw new Exception("Ingredient Category Does Not Exist.");
		}
		return ingredientCategory;
	}

	@Override
	public List<IngredientCategory> retrieveRestaurantIngredientCategories(Long restaurantId) throws Exception {
		return ingredientCategoryRepository.findByRestaurantId(restaurantId);
	}

	@Override
	public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws RestaurantException {
		IngredientCategory existingIngredientCategory = ingredientCategoryRepository
				.retrieveByRestaurantIdAndName(restaurantId, name);

		if (existingIngredientCategory != null) {
			return existingIngredientCategory;
		}
		Restaurant restaurant = restaurantService.retrieveRestaurantById(restaurantId);

		IngredientCategory newIngredientCategory = new IngredientCategory();

		newIngredientCategory.setName(name);
		newIngredientCategory.setRestaurant(restaurant);

		return ingredientCategoryRepository.save(newIngredientCategory);
	}

	@Override
	public Ingredient createIngredient(Long restaurantId, String ingredientName, Long ingredientCategoryId)
			throws Exception {

		IngredientCategory ingredientCategory = retrieveIngredientCategoryById(ingredientCategoryId);

		Ingredient existingIngredient = ingredientRepository.retrieveByRestaurantIdAndName(restaurantId, ingredientName,
				ingredientCategory.getName());

		if (existingIngredient != null) {
			return existingIngredient;
		}
		Restaurant restaurant = restaurantService.retrieveRestaurantById(restaurantId);

		Ingredient newIngredientItem = new Ingredient();

		newIngredientItem.setName(ingredientName);
		newIngredientItem.setRestaurant(restaurant);
		newIngredientItem.setCategory(ingredientCategory);

		Ingredient savedIngredient = ingredientRepository.save(newIngredientItem);
		ingredientCategory.getIngredients().add(savedIngredient);

		return savedIngredient;
	}
}
