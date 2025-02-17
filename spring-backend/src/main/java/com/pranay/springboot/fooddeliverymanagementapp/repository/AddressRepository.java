package com.pranay.springboot.fooddeliverymanagementapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pranay.springboot.fooddeliverymanagementapp.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
