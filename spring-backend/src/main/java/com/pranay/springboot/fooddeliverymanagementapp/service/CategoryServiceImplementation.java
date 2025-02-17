package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Category;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.repository.CategoryRepository;

@Service
public class CategoryServiceImplementation implements CategoryService {

	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category retrieveCategoryById(Long categoryId) throws RestaurantException {
		Category category = categoryRepository.retrieveCategoryById(categoryId);

		if (category == null) {
			throw new RestaurantException("Category Does Not Exist.");
		}
		return category;
	}

	@Override
	public Category createCategory(String name, Long userId) throws RestaurantException {
		Restaurant restaurant = restaurantService.retrieveRestaurantByUserId(userId);
		Category newCategory = new Category();

		newCategory.setName(name);
		newCategory.setRestaurant(restaurant);

		return categoryRepository.save(newCategory);
	}

	@Override
	public List<Category> retrieveRestaurantCategories(Long restaurantId) throws RestaurantException {
		return categoryRepository.findByRestaurantId(restaurantId);
	}
}
