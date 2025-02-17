package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

	@Query("SELECT m FROM MenuItem m WHERE m.id = :menuItemId")
	public MenuItem retrieveMenuItemById(@Param("menuItemId") Long menuItemId);

	public List<MenuItem> findByRestaurantIdAndIsDeletedFalse(Long restaurantId);

	@Query("SELECT m FROM MenuItem m WHERE m.isDeleted = false AND "
			+ "(m.name LIKE %:query% OR m.category.name LIKE %:query%) AND " + "m.restaurant IS NOT NULL")
	public List<MenuItem> searchMenuItemsByNameOrCategory(@Param("query") String query);
}
