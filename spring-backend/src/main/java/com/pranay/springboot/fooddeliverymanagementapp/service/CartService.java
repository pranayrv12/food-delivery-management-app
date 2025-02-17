package com.pranay.springboot.fooddeliverymanagementapp.service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.CartException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.CartItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.MenuItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Cart;
import com.pranay.springboot.fooddeliverymanagementapp.model.CartItem;
import com.pranay.springboot.fooddeliverymanagementapp.request.AddMenuItemRequest;

public interface CartService {

	public Cart retrieveCartById(Long cartId) throws CartException;

	public Long calculateTotalBill(Cart cart) throws UserException;

	public Cart deleteMenuItemFromCart(Long cartItemId, String jwt)
			throws CartException, UserException, CartItemException;

	public Cart clearCart(Long userId) throws CartException, UserException;

	public Cart retrieveCartByUserId(Long userId) throws CartException, UserException;

	public CartItem addMenuItemToCart(AddMenuItemRequest request, String jwt)
			throws CartException, UserException, CartItemException, MenuItemException;

	public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws CartItemException;
}
