package com.pranay.springboot.fooddeliverymanagementapp.datatransfer;

import java.util.List;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class RestaurantDataTransfer {

	private Long id;

	private String name;

	private String city;

	private boolean open;

	private String description;

	private List<String> images;
}
