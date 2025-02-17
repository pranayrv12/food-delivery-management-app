package com.pranay.springboot.fooddeliverymanagementapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private User owner;

	private String name;

	private String city;

	private boolean isOpen;

	private String description;

	private String cuisineType;

	private String openingHours;

	@ElementCollection
	@Column(length = 1000)
	private List<String> images;

	@OneToOne
	@JoinColumn(name = "address_id")
	private Address address;

	@Embedded
	private ContactInformation contactInformation;

	@JsonIgnore
	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
	private List<MenuItem> menuItems = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();
}
