package com.pranay.springboot.fooddeliverymanagementapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pranay.springboot.fooddeliverymanagementapp.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
