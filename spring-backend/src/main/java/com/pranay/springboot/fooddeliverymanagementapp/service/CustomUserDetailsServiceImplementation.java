package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.repository.UserRepository;
import com.pranay.springboot.fooddeliverymanagementapp.type.UserRole;

@Service
public class CustomUserDetailsServiceImplementation implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);

		if (user == null) {
			throw new UsernameNotFoundException("User Does Not Exist.");
		}
		UserRole role = user.getRole();

		if (role == null) {
			role = UserRole.ROLE_CUSTOMER;
		}
		List<GrantedAuthority> listOfAuthorities = new ArrayList<>();

		listOfAuthorities.add(new SimpleGrantedAuthority(role.toString()));

		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				listOfAuthorities);
	}
}
