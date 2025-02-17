package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.datatransfer.RestaurantDataTransfer;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Address;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.repository.AddressRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.RestaurantRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.UserRepository;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateRestaurantRequest;

@Service
public class RestaurantServiceImplementation implements RestaurantService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Override
	public List<Restaurant> retrieveAllRestaurant() {
		return restaurantRepository.findAll();
	}

	@Override
	public List<Restaurant> searchRestaurantsByNameOrCuisineType(String query) {
		return restaurantRepository.searchRestaurantsByNameOrCuisineType(query);
	}

	@Override
	public void deleteRestaurant(Long restaurantId) throws RestaurantException {
		Restaurant restaurant = retrieveRestaurantById(restaurantId);

		if (restaurant == null) {
			throw new RestaurantException("Restaurant Does Not Exist.");
		}
		restaurantRepository.delete(restaurant);
	}

	@Override
	public Restaurant createRestaurant(CreateRestaurantRequest request, User user) {
		Address newAddress = new Address();

		newAddress.setCity(request.getAddress().getCity());
		newAddress.setName(request.getAddress().getName());
		newAddress.setState(request.getAddress().getState());
		newAddress.setCountry(request.getAddress().getCountry());
		newAddress.setPinCode(request.getAddress().getPinCode());
		newAddress.setStreetAddress(request.getAddress().getStreetAddress());

		Address savedAddress = addressRepository.save(newAddress);

		Restaurant newRestaurant = new Restaurant();

		newRestaurant.setOwner(user);
		newRestaurant.setAddress(savedAddress);
		newRestaurant.setName(request.getName());
		newRestaurant.setImages(request.getImages());
		newRestaurant.setCity(request.getAddress().getCity());
		newRestaurant.setCuisineType(request.getCuisineType());
		newRestaurant.setDescription(request.getDescription());
		newRestaurant.setOpeningHours(request.getOpeningHours());
		newRestaurant.setContactInformation(request.getContactInformation());

		return restaurantRepository.save(newRestaurant);
	}

	@Override
	public Restaurant retrieveRestaurantByUserId(Long userId) throws RestaurantException {
		Restaurant restaurant = restaurantRepository.findByOwnerId(userId);

		return restaurant;
	}

	@Override
	public Restaurant updateRestaurantStatus(Long restaurantId) throws RestaurantException {
		Restaurant updatedRestaurant = retrieveRestaurantById(restaurantId);

		updatedRestaurant.setOpen(!updatedRestaurant.isOpen());

		return restaurantRepository.save(updatedRestaurant);
	}

	@Override
	public Restaurant retrieveRestaurantById(Long restaurantId) throws RestaurantException {
		Restaurant restaurant = restaurantRepository.retrieveRestaurantById(restaurantId);

		if (restaurant == null) {
			throw new RestaurantException("Restaurant Does Not Exist.");
		}
		return restaurant;
	}

	@Override
	public Restaurant updateRestaurantDetails(Long restaurantId, CreateRestaurantRequest request)
			throws RestaurantException {

		Restaurant updatedRestaurant = retrieveRestaurantById(restaurantId);

		if (updatedRestaurant.getCuisineType() != null) {
			updatedRestaurant.setCuisineType(request.getCuisineType());
		}
		if (updatedRestaurant.getDescription() != null) {
			updatedRestaurant.setDescription(request.getDescription());
		}
		return restaurantRepository.save(updatedRestaurant);
	}

	@Override
	public RestaurantDataTransfer addRestaurantToFavorites(Long restaurantId, User user) throws RestaurantException {
		Restaurant restaurant = retrieveRestaurantById(restaurantId);

		RestaurantDataTransfer restaurantDataTransfer = new RestaurantDataTransfer();

		restaurantDataTransfer.setId(restaurant.getId());
		restaurantDataTransfer.setOpen(restaurant.isOpen());
		restaurantDataTransfer.setName(restaurant.getName());
		restaurantDataTransfer.setImages(restaurant.getImages());
		restaurantDataTransfer.setCity(restaurant.getAddress().getCity());
		restaurantDataTransfer.setDescription(restaurant.getDescription());
		boolean isFavorite = false;

		List<RestaurantDataTransfer> favorites = user.getFavorites();

		for (RestaurantDataTransfer favorite : favorites) {
			if (favorite.getId().equals(restaurantId)) {
				isFavorite = true;
				break;
			}
		}
		if (!isFavorite) {
			favorites.add(restaurantDataTransfer);
		} else {
			favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
		}
		userRepository.save(user);

		return restaurantDataTransfer;
	}
}
