package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pranay.springboot.fooddeliverymanagementapp.model.Notification;
import com.pranay.springboot.fooddeliverymanagementapp.model.Order;
import com.pranay.springboot.fooddeliverymanagementapp.repository.NotificationRepository;

@Service
public class NotificationServiceImplementation implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	@Transactional
	public void deleteUserNotifications(Long userId) {
		notificationRepository.deleteByCustomerId(userId);
	}

	@Override
	public List<Notification> retrieveUserNotifications(Long userId) {
		return notificationRepository.findByCustomerId(userId);
	}

	@Override
	public void createOrderStatusNotification(Order order) {
		Notification newNotification = new Notification();

		String orderStatus;
		newNotification.setCustomer(order.getCustomer());
		newNotification.setCreatedAt(LocalDateTime.now());

		if (order.getOrderStatus().equals("PENDING")) {
			orderStatus = "Pending";
		} else if (order.getOrderStatus().equals("DELIVERED")) {
			orderStatus = "Delivered";
		} else {
			orderStatus = "Out For Delivery";
		}
		String items = order.getItems().stream().map(orderItem -> orderItem.getMenuItem().getName())
				.collect(Collectors.joining(", "));

		newNotification.setMessage("Your " + items + " From " + order.getRestaurant().getName() + " with Order ID "
				+ order.getId() + " is " + orderStatus + ".");

		notificationRepository.save(newNotification);
	}
}
