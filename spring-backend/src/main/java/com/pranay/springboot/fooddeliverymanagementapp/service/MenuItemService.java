package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.exception.MenuItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Category;
import com.pranay.springboot.fooddeliverymanagementapp.model.MenuItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateMenuItemRequest;

public interface MenuItemService {

	public List<MenuItem> searchMenuItemsByNameOrCategory(String query);

	public void deleteMenuItem(Long menuItemId) throws MenuItemException;

	public MenuItem retrieveMenuItemById(Long menuItemId) throws MenuItemException;

	public MenuItem updateMenuItemAvailability(Long menuItemId) throws MenuItemException;

	public List<MenuItem> retrieveMenuItemsByRestaurantId(Long restaurantId, boolean isVegetarian,
			boolean isNonVegetarian, String category) throws MenuItemException;

	public MenuItem createMenuItem(CreateMenuItemRequest request, Category category, Restaurant restaurant)
			throws MenuItemException, RestaurantException;
}
