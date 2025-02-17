package com.pranay.springboot.fooddeliverymanagementapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.fooddeliverymanagementapp.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

	public List<Event> findEventsByRestaurantId(Long restaurantId);

	@Query("SELECT e FROM Event e WHERE e.id = :eventId")
	public Event retrieveEventById(@Param("eventId") Long eventId);
}
