package com.pranay.springboot.fooddeliverymanagementapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.model.Order;
import com.pranay.springboot.fooddeliverymanagementapp.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImplementation implements PaymentService {

	@Value("${stripe.api.key}")
	private String stripeSecretKey;

	@Override
	public PaymentResponse generatePaymentLink(Order order) throws StripeException {
		Stripe.apiKey = stripeSecretKey;

		long amount = order.getTotalAmount() * 100;
		long charges = 500L + 2100L + (long) (amount * (18.0 / 100));
		String name = "Complete Your Payment For " + order.getRestaurant().getName();
		String description = "Your Order Summary : " + order.getItems().stream()
				.map(orderItem -> orderItem.getQuantity() + " x " + orderItem.getMenuItem().getName())
				.reduce("", (item1, item2) -> item1.isEmpty() ? item2 : item1 + ", " + item2) + ".";

		long totalAmount = amount + charges;

		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:3000/payment/success/" + order.getId())
				.setCancelUrl("http://localhost:3000/payment/fail")
				.addLineItem(
						SessionCreateParams.LineItem.builder().setQuantity(1L)
								.setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("INR")
										.setUnitAmount(totalAmount)
										.setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
												.setName(name).setDescription(description).build())
										.build())
								.build())
				.build();

		Session session = Session.create(params);

		PaymentResponse paymentResponse = new PaymentResponse();
		paymentResponse.setPayment_url(session.getUrl());

		return paymentResponse;
	}
}
