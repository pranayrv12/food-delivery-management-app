package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Notification;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.service.NotificationService;
import com.pranay.springboot.fooddeliverymanagementapp.service.UserService;

@RestController
@RequestMapping("/api")
public class NotificationController {

	@Autowired
	private UserService userService;

	@Autowired
	private NotificationService notificationService;

	@DeleteMapping("notifications/delete")
	public ResponseEntity<String> deleteUserNotifications(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		notificationService.deleteUserNotifications(user.getId());

		return new ResponseEntity<String>("Notifications Deleted Successfully.", HttpStatus.ACCEPTED);
	}

	@GetMapping("/notifications")
	public ResponseEntity<List<Notification>> retrieveUserNotifications(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		List<Notification> notifications = notificationService.retrieveUserNotifications(user.getId());

		return new ResponseEntity<List<Notification>>(notifications, HttpStatus.ACCEPTED);
	}
}
