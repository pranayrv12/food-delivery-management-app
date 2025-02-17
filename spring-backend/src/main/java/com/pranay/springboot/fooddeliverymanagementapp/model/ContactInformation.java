package com.pranay.springboot.fooddeliverymanagementapp.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ContactInformation {

	private String x;

	private String email;

	private String mobile;

	private String instagram;
}
