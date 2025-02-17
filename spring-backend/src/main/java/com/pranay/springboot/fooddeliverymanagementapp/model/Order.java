package com.pranay.springboot.fooddeliverymanagementapp.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	private User customer;

	private Long totalAmount;

	private String orderStatus;

	@OneToMany
	private List<OrderItem> items;

	@ManyToOne
	@JsonIgnore
	private Restaurant restaurant;

	@ManyToOne
	private Address deliveryAddress;

	@Column(nullable = false)
	private LocalDateTime createdAt;
}
