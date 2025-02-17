package com.pranay.springboot.fooddeliverymanagementapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.model.OrderItem;
import com.pranay.springboot.fooddeliverymanagementapp.repository.OrderItemRepository;

@Service
public class OrderItemServiceImplementation implements OrderItemService {

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		OrderItem newOrderItem = new OrderItem();
		newOrderItem.setQuantity(orderItem.getQuantity());

		return orderItemRepository.save(newOrderItem);
	}
}
