package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.exception.CartException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.OrderException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Order;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateOrderRequest;
import com.pranay.springboot.fooddeliverymanagementapp.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface OrderService {

	public void deleteOrder(Long orderId) throws OrderException;

	public List<Order> retrieveUserOrders(Long userId) throws OrderException;

	public List<Order> retrieveRestaurantOrders(Long restaurantId, String orderStatus)
			throws OrderException, RestaurantException;

	public PaymentResponse createOrder(CreateOrderRequest request, User user)
			throws CartException, UserException, StripeException, RestaurantException;

	public Order updateOrderStatus(Long orderId, String orderStatus) throws OrderException;
}
