package com.pranay.springboot.fooddeliverymanagementapp.request;

import com.pranay.springboot.fooddeliverymanagementapp.model.Address;

import lombok.Data;

@Data
public class CreateOrderRequest {

	private Long restaurantId;

	private Address deliveryAddress;
}
