package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.model.Notification;
import com.pranay.springboot.fooddeliverymanagementapp.model.Order;

public interface NotificationService {

	public void deleteUserNotifications(Long userId);

	public void createOrderStatusNotification(Order order);

	public List<Notification> retrieveUserNotifications(Long userId);
}
