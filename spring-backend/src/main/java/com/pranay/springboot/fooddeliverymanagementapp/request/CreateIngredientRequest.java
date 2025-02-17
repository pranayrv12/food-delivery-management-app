package com.pranay.springboot.fooddeliverymanagementapp.request;

import lombok.Data;

@Data
public class CreateIngredientRequest {

	private String name;

	private Long restaurantId;

	private Long ingredientCategoryId;
}
