package com.pranay.springboot.fooddeliverymanagementapp.request;

import lombok.Data;

@Data
public class CreateIngredientCategoryRequest {

	private String name;

	private Long restaurantId;
}
