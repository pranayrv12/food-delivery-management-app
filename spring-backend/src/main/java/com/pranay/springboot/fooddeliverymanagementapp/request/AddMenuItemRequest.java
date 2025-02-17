package com.pranay.springboot.fooddeliverymanagementapp.request;

import java.util.List;

import lombok.Data;

@Data
public class AddMenuItemRequest {

	private int quantity;

	private Long menuItemId;

	private List<String> ingredients;
}
