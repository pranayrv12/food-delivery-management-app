package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Cart;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.repository.CartRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.UserRepository;
import com.pranay.springboot.fooddeliverymanagementapp.request.SignInRequest;
import com.pranay.springboot.fooddeliverymanagementapp.response.AuthResponse;
import com.pranay.springboot.fooddeliverymanagementapp.security.JwtProvider;
import com.pranay.springboot.fooddeliverymanagementapp.service.CustomUserDetailsServiceImplementation;
import com.pranay.springboot.fooddeliverymanagementapp.type.UserRole;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomUserDetailsServiceImplementation userDetailsService;

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid Username!");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Username, or Password!");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signInUser(@RequestBody SignInRequest request) {
		String username = request.getEmail();
		String password = request.getPassword();

		try {
			Authentication authentication = authenticate(username, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtProvider.generateToken(authentication);

			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage("Signed In Successfully!");
			authResponse.setJwt(token);

			Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

			String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

			authResponse.setRole(UserRole.valueOf(roleName));

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage("You Are Not Authorized!");

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> signUpUser(@Valid @RequestBody User user) throws UserException {
		String name = user.getName();
		String email = user.getEmail();

		UserRole role = user.getRole();
		String password = user.getPassword();

		AuthResponse authResponse = new AuthResponse();

		try {
			if (userRepository.findByEmail(email) != null) {
				authResponse.setMessage("Another account is already associated with this Email ID!");
				return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.BAD_REQUEST);
			}
			User newUser = new User();

			newUser.setName(name);
			newUser.setRole(role);
			newUser.setEmail(email);
			newUser.setPassword(passwordEncoder.encode(password));

			User savedUser = userRepository.save(newUser);

			Cart cart = new Cart();
			cart.setCustomer(savedUser);

			cartRepository.save(cart);

			List<GrantedAuthority> listOfAuthorities = new ArrayList<>();

			listOfAuthorities.add(new SimpleGrantedAuthority(role.toString()));

			Authentication authentication = new UsernamePasswordAuthenticationToken(email, password, listOfAuthorities);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtProvider.generateToken(authentication);

			authResponse.setJwt(token);
			authResponse.setRole(savedUser.getRole());
			authResponse.setMessage("Signed Up Successfully!");

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			authResponse.setMessage("Exception Encountered!");

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
