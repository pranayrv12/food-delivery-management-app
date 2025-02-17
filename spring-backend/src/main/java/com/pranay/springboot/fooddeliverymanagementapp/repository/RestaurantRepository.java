package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	public Restaurant findByOwnerId(Long userId);

	@Query("SELECT r FROM Restaurant r WHERE r.id = :restaurantId")
	public Restaurant retrieveRestaurantById(@Param("restaurantId") Long restaurantId);

	@Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
	public List<Restaurant> searchRestaurantsByNameOrCuisineType(String query);
}
