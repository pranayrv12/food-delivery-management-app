package com.pranay.springboot.fooddeliverymanagementapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pranay.springboot.fooddeliverymanagementapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);
}
