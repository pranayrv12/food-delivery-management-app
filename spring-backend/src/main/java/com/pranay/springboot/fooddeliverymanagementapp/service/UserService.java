package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;

public interface UserService {

	public List<User> retrieveAllUsers();

	public User retrieveUserByJwt(String jwt) throws UserException;

	public User retrieveUserByEmail(String email) throws UserException;

	public User retrieveUpdatedUserProfile(String jwt) throws UserException;

	public void deleteUserAddress(String jwt, Long addressId) throws UserException;
}
