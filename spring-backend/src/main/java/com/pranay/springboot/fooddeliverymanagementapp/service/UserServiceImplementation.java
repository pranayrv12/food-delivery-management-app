package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.datatransfer.RestaurantDataTransfer;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Address;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.repository.RestaurantRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.UserRepository;
import com.pranay.springboot.fooddeliverymanagementapp.security.JwtProvider;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Override
	public List<User> retrieveAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User retrieveUserByJwt(String jwt) throws UserException {
		String email = jwtProvider.retrieveEmailFromJwtToken(jwt);
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new UserException("User Does Not Exist.");
		}
		return user;
	}

	@Override
	public User retrieveUserByEmail(String username) throws UserException {
		User user = userRepository.findByEmail(username);

		if (user == null) {
			throw new UserException("User Does Not Exist.");
		}
		return user;
	}

	@Override
	public void deleteUserAddress(String jwt, Long addressId) throws UserException {
		User user = retrieveUserByJwt(jwt);

		Address toBeDeleted = user.getAddresses().stream()
				.filter(address -> !address.isDeleted() && address.getId().equals(addressId)).findFirst()
				.orElseThrow(() -> new UserException("User's Address Does Not Exist."));

		toBeDeleted.setDeleted(true);
		userRepository.save(user);
	}

	public User retrieveUpdatedUserProfile(String jwt) throws UserException {
		User user = retrieveUserByJwt(jwt);
		user.setPassword(null);

		List<RestaurantDataTransfer> updatedFavorites = new ArrayList<>();

		for (RestaurantDataTransfer favorite : user.getFavorites()) {
			Restaurant restaurant = restaurantRepository.retrieveRestaurantById(favorite.getId());

			if (restaurant != null) {
				RestaurantDataTransfer restaurantDataTransfer = new RestaurantDataTransfer();

				restaurantDataTransfer.setId(restaurant.getId());
				restaurantDataTransfer.setOpen(restaurant.isOpen());
				restaurantDataTransfer.setName(restaurant.getName());
				restaurantDataTransfer.setImages(restaurant.getImages());
				restaurantDataTransfer.setCity(restaurant.getAddress().getCity());
				restaurantDataTransfer.setDescription(restaurant.getDescription());

				updatedFavorites.add(restaurantDataTransfer);
			}
		}
		List<Address> updatedAddresses = user.getAddresses().stream().filter(address -> !address.isDeleted())
				.collect(Collectors.toList());

		user.setAddresses(updatedAddresses);
		user.setFavorites(updatedFavorites);

		return user;
	}
}
