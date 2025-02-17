package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.MenuItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Category;
import com.pranay.springboot.fooddeliverymanagementapp.model.MenuItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.repository.MenuItemRepository;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateMenuItemRequest;

@Service
public class MenuItemServiceImplementation implements MenuItemService {

	@Autowired
	private MenuItemRepository menuItemRepository;

	@Override
	public void deleteMenuItem(Long menuItemId) throws MenuItemException {
		MenuItem menuItem = retrieveMenuItemById(menuItemId);
		menuItem.setDeleted(true);

		menuItemRepository.save(menuItem);
	}

	@Override
	public List<MenuItem> searchMenuItemsByNameOrCategory(String query) {
		List<MenuItem> menuItems = new ArrayList<>();

		if (query != "") {
			menuItems = menuItemRepository.searchMenuItemsByNameOrCategory(query);
		}
		return menuItems;
	}

	@Override
	public MenuItem retrieveMenuItemById(Long menuItemId) throws MenuItemException {
		MenuItem menuItem = menuItemRepository.retrieveMenuItemById(menuItemId);

		if (menuItem == null) {
			throw new MenuItemException("Menu Item Does Not Exist.");
		}
		return menuItem;
	}

	private List<MenuItem> filterByCategory(List<MenuItem> menuItems, String category) {
		return menuItems.stream().filter(menuItem -> {
			if (menuItem.getCategory() != null) {
				return menuItem.getCategory().getName().equals(category);
			}
			return false;
		}).collect(Collectors.toList());
	}

	@Override
	public MenuItem updateMenuItemAvailability(Long menuItemId) throws MenuItemException {
		MenuItem updatedMenuItem = retrieveMenuItemById(menuItemId);

		updatedMenuItem.setAvailable(!updatedMenuItem.isAvailable());
		menuItemRepository.save(updatedMenuItem);

		return updatedMenuItem;
	}

	private List<MenuItem> filterByVegetarian(List<MenuItem> menuItems, boolean isVegetarian) {
		return menuItems.stream().filter(menuItem -> menuItem.isVegetarian() == isVegetarian)
				.collect(Collectors.toList());
	}

	@Override
	public MenuItem createMenuItem(CreateMenuItemRequest request, Category category, Restaurant restaurant)
			throws MenuItemException, RestaurantException {

		MenuItem newMenuItem = new MenuItem();

		newMenuItem.setCategory(category);
		newMenuItem.setRestaurant(restaurant);
		newMenuItem.setName(request.getName());
		newMenuItem.setImages(request.getImages());
		newMenuItem.setPrice((long) request.getPrice());
		newMenuItem.setVegetarian(request.isVegetarian());
		newMenuItem.setDescription(request.getDescription());
		newMenuItem.setIngredients(request.getIngredients());

		newMenuItem = menuItemRepository.save(newMenuItem);
		restaurant.getMenuItems().add(newMenuItem);

		return newMenuItem;
	}

	@Override
	public List<MenuItem> retrieveMenuItemsByRestaurantId(Long restaurantId, boolean isVegetarian,
			boolean isNonVegetarian, String category) throws MenuItemException {

		List<MenuItem> menuItems = menuItemRepository.findByRestaurantIdAndIsDeletedFalse(restaurantId);

		if (category != null && !category.equals("")) {
			menuItems = filterByCategory(menuItems, category);
		}
		if (isVegetarian) {
			menuItems = filterByVegetarian(menuItems, isVegetarian);
		}
		if (isNonVegetarian) {
			menuItems = filterByNonVegetarian(menuItems, isNonVegetarian);
		}
		return menuItems;
	}

	private List<MenuItem> filterByNonVegetarian(List<MenuItem> menuItems, boolean isNonVegetarian) {
		return menuItems.stream().filter(menuItem -> menuItem.isVegetarian() == false).collect(Collectors.toList());
	}
}
