package com.pranay.springboot.fooddeliverymanagementapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.CartException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.CartItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.MenuItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Cart;
import com.pranay.springboot.fooddeliverymanagementapp.model.CartItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.request.AddMenuItemRequest;
import com.pranay.springboot.fooddeliverymanagementapp.request.UpdateCartItemRequest;
import com.pranay.springboot.fooddeliverymanagementapp.service.CartService;
import com.pranay.springboot.fooddeliverymanagementapp.service.UserService;

@RestController
@RequestMapping("/api")
public class CartController {

	@Autowired
	private CartService cartService;

	@Autowired
	private UserService userService;

	@PutMapping("/cart/clear")
	public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String jwt)
			throws CartException, UserException {

		User user = userService.retrieveUserByJwt(jwt);
		Cart updatedCart = cartService.clearCart(user.getId());

		return new ResponseEntity<Cart>(updatedCart, HttpStatus.ACCEPTED);
	}

	@PutMapping("/cart/add")
	public ResponseEntity<CartItem> addMenuItemToCart(@RequestBody AddMenuItemRequest request,
			@RequestHeader("Authorization") String jwt)
			throws CartException, UserException, CartItemException, MenuItemException {

		CartItem updatedCartItem = cartService.addMenuItemToCart(request, jwt);

		return new ResponseEntity<CartItem>(updatedCartItem, HttpStatus.ACCEPTED);
	}

	@GetMapping("/cart/totalBill")
	public ResponseEntity<Double> calculateTotalBill(@RequestHeader("Authorization") String jwt)
			throws CartException, UserException {

		User user = userService.retrieveUserByJwt(jwt);
		Cart cart = cartService.retrieveCartByUserId(user.getId());
		double totalBill = cartService.calculateTotalBill(cart);

		return new ResponseEntity<Double>(totalBill, HttpStatus.ACCEPTED);
	}

	@GetMapping("/cart")
	public ResponseEntity<Cart> retrieveCartByUserId(@RequestHeader("Authorization") String jwt)
			throws CartException, UserException {

		User user = userService.retrieveUserByJwt(jwt);
		Cart cart = cartService.retrieveCartByUserId(user.getId());

		return new ResponseEntity<Cart>(cart, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/cart-item/{cartItemId}/delete")
	public ResponseEntity<Cart> deleteMenuItemFromCart(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt) throws CartException, UserException, CartItemException {

		Cart updatedCart = cartService.deleteMenuItemFromCart(cartItemId, jwt);

		return new ResponseEntity<Cart>(updatedCart, HttpStatus.ACCEPTED);
	}

	@PutMapping("/cart-item/update")
	public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartItemRequest request,
			@RequestHeader("Authorization") String jwt) throws CartItemException {

		CartItem updatedCartItem = cartService.updateCartItemQuantity(request.getCartItemId(), request.getQuantity());

		return new ResponseEntity<CartItem>(updatedCartItem, HttpStatus.ACCEPTED);
	}
}
