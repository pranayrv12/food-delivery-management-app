package com.pranay.springboot.fooddeliverymanagementapp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long price;

	private String name;

	@ManyToOne
	private Category category;

	private String description;

	private boolean isAvailable;

	@ElementCollection
	@Column(length = 1000)
	private List<String> images;

	private boolean isVegetarian;

	@ManyToOne
	private Restaurant restaurant;

	private boolean isDeleted = false;

	@ManyToMany
	private List<Ingredient> ingredients = new ArrayList<>();
}
