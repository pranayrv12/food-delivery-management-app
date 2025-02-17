package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Category;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.service.CategoryService;
import com.pranay.springboot.fooddeliverymanagementapp.service.UserService;

@RestController
@RequestMapping("/api")
public class CategoryController {

	@Autowired
	public UserService userService;

	@Autowired
	public CategoryService categoryService;

	@PostMapping("/owner/category/create")
	public ResponseEntity<Category> createCategory(@RequestHeader("Authorization") String jwt,
			@RequestBody Category category) throws UserException, RestaurantException {

		User user = userService.retrieveUserByJwt(jwt);
		Category newCategory = categoryService.createCategory(category.getName(), user.getId());

		return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
	}

	@GetMapping("/categories/restaurant/{restaurantId}")
	public ResponseEntity<List<Category>> retrieveRestaurantCategories(@PathVariable Long restaurantId,
			@RequestHeader("Authorization") String jwt) throws UserException, RestaurantException {

		List<Category> categories = categoryService.retrieveRestaurantCategories(restaurantId);

		return new ResponseEntity<List<Category>>(categories, HttpStatus.ACCEPTED);
	}
}
