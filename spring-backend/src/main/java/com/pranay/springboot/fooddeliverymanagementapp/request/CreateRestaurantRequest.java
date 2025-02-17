package com.pranay.springboot.fooddeliverymanagementapp.request;

import java.time.LocalDateTime;
import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.model.Address;
import com.pranay.springboot.fooddeliverymanagementapp.model.ContactInformation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRestaurantRequest {

	private String name;

	private Address address;

	private String description;

	private String cuisineType;

	private String openingHours;

	private List<String> images;

	private LocalDateTime registrationDate;

	private ContactInformation contactInformation;
}
