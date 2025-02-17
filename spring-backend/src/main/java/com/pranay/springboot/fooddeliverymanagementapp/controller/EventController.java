package com.pranay.springboot.fooddeliverymanagementapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Event;
import com.pranay.springboot.fooddeliverymanagementapp.response.ApiResponse;
import com.pranay.springboot.fooddeliverymanagementapp.service.EventService;

@RestController
@RequestMapping("/api")
public class EventController {

	@Autowired
	public EventService eventService;

	@GetMapping("/events")
	public ResponseEntity<List<Event>> retrieveAllEvents() throws RestaurantException {
		List<Event> events = eventService.retrieveAllEvents();

		return new ResponseEntity<List<Event>>(events, HttpStatus.ACCEPTED);
	}

	@GetMapping("/owner/events/restaurant/{restaurantId}")
	public ResponseEntity<List<Event>> retrieveRestaurantEvents(@PathVariable Long restaurantId)
			throws RestaurantException {

		List<Event> events = eventService.retrieveRestaurantEvents(restaurantId);

		return new ResponseEntity<List<Event>>(events, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/owner/event/{eventId}/delete")
	public ResponseEntity<ApiResponse> deleteEvent(@PathVariable Long eventId) throws Exception {
		eventService.deleteEvent(eventId);
		ApiResponse response = new ApiResponse("Event Deleted!", true);

		return new ResponseEntity<ApiResponse>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/owner/event/restaurant/{restaurantId}/create")
	public ResponseEntity<Event> createEvent(@RequestBody Event event, @PathVariable Long restaurantId)
			throws RestaurantException {

		Event newEvent = eventService.createEvent(event, restaurantId);

		return new ResponseEntity<Event>(newEvent, HttpStatus.CREATED);
	}
}
