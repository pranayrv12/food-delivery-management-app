package com.pranay.springboot.fooddeliverymanagementapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String message;

	@ManyToOne
	private Restaurant restaurant;

	private boolean isRead = false;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "recipient_id")
	private User customer;
}
