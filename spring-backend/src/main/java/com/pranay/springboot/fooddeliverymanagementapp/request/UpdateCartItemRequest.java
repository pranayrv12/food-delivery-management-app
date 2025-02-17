package com.pranay.springboot.fooddeliverymanagementapp.request;

import lombok.Data;

@Data
public class UpdateCartItemRequest {

	private int quantity;

	private Long cartItemId;
}
