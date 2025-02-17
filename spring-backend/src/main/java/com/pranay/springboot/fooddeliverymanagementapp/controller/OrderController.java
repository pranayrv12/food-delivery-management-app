package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.CartException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.OrderException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Order;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateOrderRequest;
import com.pranay.springboot.fooddeliverymanagementapp.response.PaymentResponse;
import com.pranay.springboot.fooddeliverymanagementapp.service.OrderService;
import com.pranay.springboot.fooddeliverymanagementapp.service.UserService;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/api")
public class OrderController {

	@Autowired
	private UserService userService;

	@Autowired
	private OrderService orderService;

	@GetMapping("/owner/orders/restaurant/{restaurantId}")
	public ResponseEntity<List<Order>> retrieveRestaurantOrders(@PathVariable Long restaurantId,
			@RequestParam(required = false, name = "order_status") String orderStatus)
			throws OrderException, RestaurantException {

		List<Order> orders = orderService.retrieveRestaurantOrders(restaurantId, orderStatus);

		return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/owner/order/{orderId}/delete")
	public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) throws OrderException {
		orderService.deleteOrder(orderId);

		return new ResponseEntity<String>("Order Deleted Successfully.", HttpStatus.ACCEPTED);
	}

	@GetMapping("/orders/user")
	public ResponseEntity<List<Order>> retrieveUserOrders(@RequestHeader("Authorization") String jwt)
			throws UserException, OrderException {

		User user = userService.retrieveUserByJwt(jwt);
		List<Order> orders = orderService.retrieveUserOrders(user.getId());

		return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
	}

	@PostMapping("/order/create")
	public ResponseEntity<PaymentResponse> createOrder(@RequestBody CreateOrderRequest request,
			@RequestHeader("Authorization") String jwt)
			throws CartException, UserException, OrderException, StripeException, RestaurantException {

		User user = userService.retrieveUserByJwt(jwt);
		PaymentResponse newResponse = orderService.createOrder(request, user);

		return new ResponseEntity<PaymentResponse>(newResponse, HttpStatus.CREATED);
	}

	@PutMapping("/owner/order/{orderId}/update/{orderStatus}")
	public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @PathVariable String orderStatus)
			throws OrderException, RestaurantException {

		Order updatedOrder = orderService.updateOrderStatus(orderId, orderStatus);

		return new ResponseEntity<Order>(updatedOrder, HttpStatus.ACCEPTED);
	}
}
