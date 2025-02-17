package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.CartException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.OrderException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.exception.UserException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Address;
import com.pranay.springboot.fooddeliverymanagementapp.model.Cart;
import com.pranay.springboot.fooddeliverymanagementapp.model.CartItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.Order;
import com.pranay.springboot.fooddeliverymanagementapp.model.OrderItem;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.model.User;
import com.pranay.springboot.fooddeliverymanagementapp.repository.AddressRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.OrderItemRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.OrderRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.RestaurantRepository;
import com.pranay.springboot.fooddeliverymanagementapp.repository.UserRepository;
import com.pranay.springboot.fooddeliverymanagementapp.request.CreateOrderRequest;
import com.pranay.springboot.fooddeliverymanagementapp.response.PaymentResponse;
import com.stripe.exception.StripeException;

@Service
public class OrderServiceImplementation implements OrderService {

	@Autowired
	private CartService cartService;

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order = retrieveOrderById(orderId);

		if (order == null) {
			throw new OrderException("Order Does Not Exist.");
		}
		orderRepository.deleteById(orderId);
	}

	public Order retrieveOrderById(Long orderId) throws OrderException {
		Order order = orderRepository.retrieveOrderById(orderId);

		if (order == null) {
			throw new OrderException("Order Does Not Exist.");
		}
		return order;
	}

	@Override
	public List<Order> retrieveUserOrders(Long userId) throws OrderException {
		List<Order> orders = orderRepository.retrieveUserOrders(userId);

		return orders;
	}

	@Override
	public Order updateOrderStatus(Long orderId, String orderStatus) throws OrderException {
		Order updatedOrder = retrieveOrderById(orderId);

		if (orderStatus.equals("PENDING") || orderStatus.equals("DELIVERED")
				|| orderStatus.equals("OUT_FOR_DELIVERY")) {

			updatedOrder.setOrderStatus(orderStatus);
			notificationService.createOrderStatusNotification(updatedOrder);

			return orderRepository.save(updatedOrder);
		} else {
			throw new OrderException("Order Does Not Exist.");
		}
	}

	@Override
	public List<Order> retrieveRestaurantOrders(Long restaurantId, String orderStatus)
			throws OrderException, RestaurantException {

		List<Order> orders = orderRepository.retrieveRestaurantOrders(restaurantId);

		if (orderStatus != null) {
			orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus))
					.collect(Collectors.toList());
		}
		return orders;
	}

	@Override
	public PaymentResponse createOrder(CreateOrderRequest request, User user)
			throws CartException, UserException, StripeException, RestaurantException {

		Address address = request.getDeliveryAddress();

		Address newAddress = addressRepository.save(address);

		if (!user.getAddresses().contains(newAddress)) {
			user.getAddresses().add(newAddress);
		}
		userRepository.save(user);

		Restaurant restaurant = restaurantRepository.retrieveRestaurantById(request.getRestaurantId());

		if (restaurant == null) {
			throw new RestaurantException("Restaurant Does Not Exist.");
		}
		Order newOrder = new Order();

		newOrder.setCustomer(user);
		newOrder.setRestaurant(restaurant);
		newOrder.setOrderStatus("PENDING");
		newOrder.setDeliveryAddress(newAddress);
		newOrder.setCreatedAt(LocalDateTime.now());

		Cart cart = cartService.retrieveCartByUserId(user.getId());

		List<OrderItem> orderItems = new ArrayList<>();

		for (CartItem cartItem : cart.getItems()) {
			OrderItem newOrderItem = new OrderItem();

			newOrderItem.setMenuItem(cartItem.getMenuItem());
			newOrderItem.setQuantity(cartItem.getQuantity());
			newOrderItem.setIngredients(cartItem.getIngredients());
			newOrderItem.setTotalAmount(cartItem.getMenuItem().getPrice() * cartItem.getQuantity());

			OrderItem savedOrderItem = orderItemRepository.save(newOrderItem);
			orderItems.add(savedOrderItem);
		}
		Long totalBill = cartService.calculateTotalBill(cart);

		newOrder.setItems(orderItems);
		newOrder.setRestaurant(restaurant);
		newOrder.setTotalAmount(totalBill);

		Order savedOrder = orderRepository.save(newOrder);

		restaurant.getOrders().add(savedOrder);
		restaurantRepository.save(restaurant);

		PaymentResponse response = paymentService.generatePaymentLink(savedOrder);

		return response;
	}
}
