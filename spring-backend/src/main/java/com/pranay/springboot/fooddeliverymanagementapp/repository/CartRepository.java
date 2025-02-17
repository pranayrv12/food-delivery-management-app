package com.pranay.springboot.fooddeliverymanagementapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	public Cart findByCustomerId(Long userId);

	@Query("SELECT c FROM Cart c WHERE c.id = :cartId")
	public Cart retrieveCartById(@Param("cartId") Long cartId);
}
