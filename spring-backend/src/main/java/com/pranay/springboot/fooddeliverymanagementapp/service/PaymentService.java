package com.pranay.springboot.fooddeliverymanagementapp.service;

import com.pranay.springboot.fooddeliverymanagementapp.model.Order;
import com.pranay.springboot.fooddeliverymanagementapp.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

	public PaymentResponse generatePaymentLink(Order order) throws StripeException;
}
