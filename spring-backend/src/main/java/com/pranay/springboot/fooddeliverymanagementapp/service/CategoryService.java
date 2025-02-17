package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Category;

public interface CategoryService {

	public Category retrieveCategoryById(Long categoryId) throws RestaurantException;

	public Category createCategory(String name, Long userId) throws RestaurantException;

	public List<Category> retrieveRestaurantCategories(Long restaurantId) throws RestaurantException;
}
