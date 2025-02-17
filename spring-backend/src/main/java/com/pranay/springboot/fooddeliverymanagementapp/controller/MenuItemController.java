package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.MenuItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.MenuItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateMenuItemRequest;
import com.pranay.springboot.fooddeliverymanagementapp.service.MenuItemService;
import com.pranay.springboot.fooddeliverymanagementapp.service.RestaurantService;

@RestController
@RequestMapping("/api")
public class MenuItemController {

	@Autowired
	private MenuItemService menuItemService;

	@Autowired
	private RestaurantService restaurantService;

	@DeleteMapping("/owner/menu-item/{menuItemId}/delete")
	public ResponseEntity<String> deleteMenuItem(@PathVariable Long menuItemId,
			@RequestHeader("Authorization") String jwt) throws UserException, MenuItemException {

		menuItemService.deleteMenuItem(menuItemId);

		return new ResponseEntity<String>("Menu Item Deleted Successfully.", HttpStatus.ACCEPTED);
	}

	@GetMapping("/menu-items/search")
	public ResponseEntity<List<MenuItem>> searchMenuItemsByNameOrCategory(@RequestParam String name) {
		List<MenuItem> menuItems = menuItemService.searchMenuItemsByNameOrCategory(name);

		return new ResponseEntity<List<MenuItem>>(menuItems, HttpStatus.ACCEPTED);
	}

	@GetMapping("/menu-items/restaurant/{restaurantId}")
	public ResponseEntity<List<MenuItem>> retrieveMenuItemsByRestaurantId(@PathVariable Long restaurantId,
			@RequestParam boolean vegetarian, @RequestParam boolean nonvegetarian,
			@RequestParam(required = false) String category) throws MenuItemException {

		List<MenuItem> menuItems = menuItemService.retrieveMenuItemsByRestaurantId(restaurantId, vegetarian,
				nonvegetarian, category);

		return new ResponseEntity<List<MenuItem>>(menuItems, HttpStatus.ACCEPTED);
	}

	@PostMapping("/owner/menu-item/create")
	public ResponseEntity<MenuItem> createMenuItem(@RequestBody CreateMenuItemRequest request,
			@RequestHeader("Authorization") String jwt) throws UserException, MenuItemException, RestaurantException {

		Restaurant restaurant = restaurantService.retrieveRestaurantById(request.getRestaurantId());
		MenuItem newMenuItem = menuItemService.createMenuItem(request, request.getCategory(), restaurant);

		return new ResponseEntity<MenuItem>(newMenuItem, HttpStatus.CREATED);
	}

	@PutMapping("/owner/menu-item/{menuItemId}/update")
	public ResponseEntity<MenuItem> updateMenuItemAvailability(@PathVariable Long menuItemId) throws MenuItemException {
		MenuItem updatedMenuItem = menuItemService.updateMenuItemAvailability(menuItemId);

		return new ResponseEntity<MenuItem>(updatedMenuItem, HttpStatus.ACCEPTED);
	}
}
