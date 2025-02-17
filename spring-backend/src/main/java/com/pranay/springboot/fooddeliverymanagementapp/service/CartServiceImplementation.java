package com.pranay.springboot.fooddeliverymanagementapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.CartException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.CartItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.MenuItemException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Cart;
import com.pranay.springboot.fooddeliverymanagementapp.model.CartItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.MenuItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.repository.CartItemRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.CartRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.MenuItemRepository;
import com.pranay.springboot.fooddeliverymanagementapp.request.AddMenuItemRequest;

@Service
public class CartServiceImplementation implements CartService {

	@Autowired
	private UserService userService;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private MenuItemRepository menuItemRepository;

	@Override
	public Cart retrieveCartById(Long cartId) throws CartException {
		Cart cart = cartRepository.retrieveCartById(cartId);

		if (cart == null) {
			throw new CartException("Cart Does Not Exist.");
		}
		return cart;
	}

	@Override
	public Cart clearCart(Long userId) throws CartException, UserException {
		Cart cart = retrieveCartByUserId(userId);
		cart.getItems().clear();

		return cartRepository.save(cart);
	}

	@Override
	public Cart deleteMenuItemFromCart(Long cartItemId, String jwt)
			throws CartException, UserException, CartItemException {

		User user = userService.retrieveUserByJwt(jwt);
		Cart updatedCart = retrieveCartByUserId(user.getId());

		CartItem toBeDeleted = cartItemRepository.retrieveCartItemById(cartItemId);

		if (toBeDeleted == null) {
			throw new CartItemException("Cart Item Does Not Exist.");
		}
		updatedCart.getItems().remove(toBeDeleted);

		return cartRepository.save(updatedCart);
	}

	@Override
	public Cart retrieveCartByUserId(Long userId) throws CartException, UserException {
		Cart cart = cartRepository.findByCustomerId(userId);

		if (cart == null) {
			throw new CartException("Cart Does Not Exist.");
		}
		return cart;
	}

	@Override
	public CartItem addMenuItemToCart(AddMenuItemRequest request, String jwt)
			throws CartException, UserException, CartItemException, MenuItemException {

		User user = userService.retrieveUserByJwt(jwt);
		MenuItem menuItem = menuItemRepository.retrieveMenuItemById(request.getMenuItemId());

		if (menuItem == null) {
			throw new MenuItemException("Menu Item Does Not Exist.");
		}
		Cart cart = retrieveCartByUserId(user.getId());

		for (CartItem cartItem : cart.getItems()) {
			if (cartItem.getMenuItem().equals(menuItem)) {
				int updatedQuantity = cartItem.getQuantity() + request.getQuantity();

				return updateCartItemQuantity(cartItem.getId(), updatedQuantity);
			}
		}
		CartItem newCartItem = new CartItem();

		newCartItem.setCart(cart);
		newCartItem.setMenuItem(menuItem);
		newCartItem.setQuantity(request.getQuantity());
		newCartItem.setIngredients(request.getIngredients());
		newCartItem.setTotalAmount(request.getQuantity() * menuItem.getPrice());

		CartItem updatedCartItem = cartItemRepository.save(newCartItem);
		cart.getItems().add(updatedCartItem);
		cartRepository.save(cart);

		return updatedCartItem;
	}

	@Override
	public Long calculateTotalBill(Cart cart) throws UserException {
		Long totalBill = 0L;

		for (CartItem cartItem : cart.getItems()) {
			totalBill = totalBill + (cartItem.getQuantity() * cartItem.getMenuItem().getPrice());
		}
		return totalBill;
	}

	@Override
	public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws CartItemException {
		CartItem updatedCartItem = cartItemRepository.retrieveCartItemById(cartItemId);

		if (updatedCartItem == null) {
			throw new CartItemException("Cart Item Does Not Exist.");
		}
		updatedCartItem.setQuantity(quantity);
		updatedCartItem.setTotalAmount((quantity * updatedCartItem.getMenuItem().getPrice()));

		return cartItemRepository.save(updatedCartItem);
	}
}
