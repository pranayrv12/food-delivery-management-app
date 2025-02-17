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

import com.pranay.springboot.fooddeliverymanagementapp.datatransfer.RestaurantDataTransfer;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateRestaurantRequest;
import com.pranay.springboot.fooddeliverymanagementapp.response.ApiResponse;
import com.pranay.springboot.fooddeliverymanagementapp.service.RestaurantService;
import com.pranay.springboot.fooddeliverymanagementapp.service.UserService;

@RestController
@RequestMapping("/api")
public class RestaurantController {

	@Autowired
	private UserService userService;

	@Autowired
	private RestaurantService restaurantService;

	@GetMapping("/restaurants")
	public ResponseEntity<List<Restaurant>> retrieveAllRestaurants() {
		List<Restaurant> restaurants = restaurantService.retrieveAllRestaurant();

		return new ResponseEntity<List<Restaurant>>(restaurants, HttpStatus.ACCEPTED);
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<Restaurant> retrieveRestaurantById(@PathVariable Long restaurantId)
			throws RestaurantException {

		Restaurant restaurant = restaurantService.retrieveRestaurantById(restaurantId);

		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/owner/restaurant/{restaurantId}/delete")
	public ResponseEntity<ApiResponse> deleteRestaurant(@PathVariable Long restaurantId,
			@RequestHeader("Authorization") String jwt) throws UserException, RestaurantException {

		restaurantService.deleteRestaurant(restaurantId);
		ApiResponse response = new ApiResponse("Restaurant Deleted Successfully.", true);

		return new ResponseEntity<ApiResponse>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/owner/restaurant/create")
	public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequest request,
			@RequestHeader("Authorization") String jwt) throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		Restaurant newRestaurant = restaurantService.createRestaurant(request, user);

		return new ResponseEntity<Restaurant>(newRestaurant, HttpStatus.CREATED);
	}

	@PutMapping("/owner/restaurant/{restaurantId}/update")
	public ResponseEntity<Restaurant> updateRestaurantDetails(@PathVariable Long restaurantId,
			@RequestBody CreateRestaurantRequest request, @RequestHeader("Authorization") String jwt)
			throws UserException, RestaurantException {

		Restaurant updatedRestaurant = restaurantService.updateRestaurantDetails(restaurantId, request);

		return new ResponseEntity<Restaurant>(updatedRestaurant, HttpStatus.ACCEPTED);
	}

	@PutMapping("/owner/restaurant/{restaurantId}/status")
	public ResponseEntity<Restaurant> updateRestaurantStatus(@RequestHeader("Authorization") String jwt,
			@PathVariable Long restaurantId) throws UserException, RestaurantException {

		Restaurant updatedRestaurant = restaurantService.updateRestaurantStatus(restaurantId);

		return new ResponseEntity<Restaurant>(updatedRestaurant, HttpStatus.ACCEPTED);
	}

	@GetMapping("/owner/restaurant")
	public ResponseEntity<Restaurant> retrieveRestaurantByUserId(@RequestHeader("Authorization") String jwt)
			throws UserException, RestaurantException {

		User user = userService.retrieveUserByJwt(jwt);
		Restaurant restaurant = restaurantService.retrieveRestaurantByUserId(user.getId());

		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.ACCEPTED);
	}

	@GetMapping("/restaurant/search")
	public ResponseEntity<List<Restaurant>> searchRestaurantsByNameOrCuisineType(@RequestParam String query) {
		List<Restaurant> restaurants = restaurantService.searchRestaurantsByNameOrCuisineType(query);

		return new ResponseEntity<List<Restaurant>>(restaurants, HttpStatus.ACCEPTED);
	}

	@PutMapping("/restaurant/{restaurantId}/favorite")
	public ResponseEntity<RestaurantDataTransfer> addRestaurantToFavorites(@RequestHeader("Authorization") String jwt,
			@PathVariable Long restaurantId) throws UserException, RestaurantException {

		User user = userService.retrieveUserByJwt(jwt);
		RestaurantDataTransfer restaurantDataTransfer = restaurantService.addRestaurantToFavorites(restaurantId, user);

		return new ResponseEntity<RestaurantDataTransfer>(restaurantDataTransfer, HttpStatus.ACCEPTED);
	}
}
