package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pranay.springboot.fooddeliverymanagementapp.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	public void deleteByCustomerId(Long userId);

	public List<Notification> findByCustomerId(Long userId);

	public List<Notification> findByRestaurantId(Long restaurantId);
}
