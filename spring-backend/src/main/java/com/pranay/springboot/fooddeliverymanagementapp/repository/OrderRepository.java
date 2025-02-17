package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query("SELECT o FROM Order o WHERE o.id = :orderId")
	public Order retrieveOrderById(@Param("orderId") Long orderId);

	@Query("SELECT o FROM Order o WHERE o.customer.id = :userId")
	public List<Order> retrieveUserOrders(@Param("userId") Long userId);

	@Query("SELECT o FROM Order o WHERE o.restaurant.id = :restaurantId")
	public List<Order> retrieveRestaurantOrders(@Param("restaurantId") Long restaurantId);
}
