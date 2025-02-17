package com.pranay.springboot.fooddeliverymanagementapp.response;

import com.pranay.springboot.fooddeliverymanagementapp.type.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

	private String jwt;

	private UserRole role;

	private String message;
}
