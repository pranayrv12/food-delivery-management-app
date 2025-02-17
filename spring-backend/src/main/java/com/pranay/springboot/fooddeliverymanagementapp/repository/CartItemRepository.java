package com.pranay.springboot.fooddeliverymanagementapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	@Query("SELECT c FROM CartItem c WHERE c.id = :cartItemId")
	public CartItem retrieveCartItemById(@Param("cartItemId") Long cartItemId);
}
