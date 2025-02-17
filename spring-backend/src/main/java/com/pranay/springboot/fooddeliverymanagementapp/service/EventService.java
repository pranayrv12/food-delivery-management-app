package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Event;

public interface EventService {

	public List<Event> retrieveAllEvents();

	public void deleteEvent(Long eventId) throws Exception;

	public Event retrieveEventById(Long eventId) throws Exception;

	public List<Event> retrieveRestaurantEvents(Long restaurantId);

	public Event createEvent(Event event, Long restaurantId) throws RestaurantException;
}
