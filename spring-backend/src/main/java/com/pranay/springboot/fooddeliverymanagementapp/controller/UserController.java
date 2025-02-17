package com.pranay.springboot.fooddeliverymanagementapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@DeleteMapping("/user/address/{addressId}/delete")
	public ResponseEntity<String> deleteUserAddress(@RequestHeader("Authorization") String jwt,
			@PathVariable Long addressId) throws UserException {

		userService.deleteUserAddress(jwt, addressId);

		return new ResponseEntity<String>("Address Deleted Successfully.", HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/profile")
	public ResponseEntity<User> retrieveUpdatedUserProfile(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUpdatedUserProfile(jwt);

		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}
}
