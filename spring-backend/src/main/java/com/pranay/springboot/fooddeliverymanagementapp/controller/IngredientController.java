package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.model.Ingredient;
import com.pranay.springboot.fooddeliverymanagementapp.model.IngredientCategory;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateIngredientCategoryRequest;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateIngredientRequest;
import com.pranay.springboot.fooddeliverymanagementapp.service.IngredientService;

@RestController
@RequestMapping("/api")
public class IngredientController {

	@Autowired
	private IngredientService ingredientService;

	@GetMapping("/owner/ingredients/restaurant/{restaurantId}")
	public ResponseEntity<List<Ingredient>> retrieveRestaurantIngredients(@PathVariable Long restaurantId)
			throws Exception {

		List<Ingredient> ingredients = ingredientService.retrieveRestaurantIngredients(restaurantId);

		return new ResponseEntity<List<Ingredient>>(ingredients, HttpStatus.ACCEPTED);
	}

	@PostMapping("/owner/ingredient/category/create")
	public ResponseEntity<IngredientCategory> createIngredientCategory(
			@RequestBody CreateIngredientCategoryRequest request) throws Exception {

		IngredientCategory newIngredientCategory = ingredientService.createIngredientCategory(request.getName(),
				request.getRestaurantId());

		return new ResponseEntity<IngredientCategory>(newIngredientCategory, HttpStatus.CREATED);
	}

	@GetMapping("/owner/ingredient/categories/restaurant/{restaurantId}")
	public ResponseEntity<List<IngredientCategory>> retrieveRestaurantIngredientCategories(
			@PathVariable Long restaurantId) throws Exception {

		List<IngredientCategory> categories = ingredientService.retrieveRestaurantIngredientCategories(restaurantId);

		return new ResponseEntity<List<IngredientCategory>>(categories, HttpStatus.ACCEPTED);
	}

	@PutMapping("/owner/ingredient/{ingredientId}/update")
	public ResponseEntity<Ingredient> updateIngredientAvailability(@PathVariable Long ingredientId) throws Exception {
		Ingredient updatedIngredient = ingredientService.updateIngredientAvailability(ingredientId);

		return new ResponseEntity<Ingredient>(updatedIngredient, HttpStatus.ACCEPTED);
	}

	@PostMapping("/owner/ingredient/create")
	public ResponseEntity<Ingredient> createIngredient(@RequestBody CreateIngredientRequest request) throws Exception {
		Ingredient newIngredient = ingredientService.createIngredient(request.getRestaurantId(), request.getName(),
				request.getIngredientCategoryId());

		return new ResponseEntity<Ingredient>(newIngredient, HttpStatus.CREATED);
	}
}
