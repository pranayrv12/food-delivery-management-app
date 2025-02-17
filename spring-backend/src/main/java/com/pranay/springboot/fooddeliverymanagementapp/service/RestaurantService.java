package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.datatransfer.RestaurantDataTransfer;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateRestaurantRequest;

public interface RestaurantService {

	public List<Restaurant> retrieveAllRestaurant();

	public void deleteRestaurant(Long restaurantId) throws RestaurantException;

	public List<Restaurant> searchRestaurantsByNameOrCuisineType(String query);

	public Restaurant createRestaurant(CreateRestaurantRequest request, User user);

	public Restaurant retrieveRestaurantByUserId(Long userId) throws RestaurantException;

	public Restaurant updateRestaurantStatus(Long restaurantId) throws RestaurantException;

	public Restaurant retrieveRestaurantById(Long restaurantId) throws RestaurantException;

	public Restaurant updateRestaurantDetails(Long restaurantId, CreateRestaurantRequest request)
			throws RestaurantException;

	public RestaurantDataTransfer addRestaurantToFavorites(Long restaurantId, User user) throws RestaurantException;
}
