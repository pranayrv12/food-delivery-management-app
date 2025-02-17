package com.pranay.springboot.fooddeliverymanagementapp.request;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.model.Category;
import com.pranay.springboot.fooddeliverymanagementapp.model.Ingredient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMenuItemRequest {

	private Long price;

	private String name;

	private Category category;

	private Long restaurantId;

	private String description;

	private boolean vegetarian;

	private List<String> images;

	private List<Ingredient> ingredients;
}
