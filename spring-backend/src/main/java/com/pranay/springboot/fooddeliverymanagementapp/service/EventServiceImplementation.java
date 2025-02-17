package com.pranay.springboot.fooddeliverymanagementapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.fooddeliverymanagementapp.exception.RestaurantException;
import com.pranay.springboot.fooddeliverymanagementapp.model.Event;
import com.pranay.springboot.fooddeliverymanagementapp.model.Restaurant;
import com.pranay.springboot.fooddeliverymanagementapp.repository.EventRepository;

@Service
public class EventServiceImplementation implements EventService {

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private RestaurantService restaurantService;

	@Override
	public List<Event> retrieveAllEvents() {
		return eventRepository.findAll();
	}

	@Override
	public void deleteEvent(Long eventId) throws Exception {
		Event event = retrieveEventById(eventId);
		eventRepository.delete(event);
	}

	@Override
	public Event retrieveEventById(Long eventId) throws Exception {
		Event event = eventRepository.retrieveEventById(eventId);

		if (event == null) {
			throw new Exception("Event Does Not Exist.");
		}
		return event;
	}

	@Override
	public List<Event> retrieveRestaurantEvents(Long restaurantId) {
		return eventRepository.findEventsByRestaurantId(restaurantId);
	}

	@Override
	public Event createEvent(Event event, Long restaurantId) throws RestaurantException {
		Restaurant restaurant = restaurantService.retrieveRestaurantById(restaurantId);
		Event newEvent = new Event();

		newEvent.setName(event.getName());
		newEvent.setRestaurant(restaurant);
		newEvent.setImage(event.getImage());
		newEvent.setLocation(event.getLocation());
		newEvent.setEventStartDate(event.getEventStartDate());
		newEvent.setEventExpireDate(event.getEventExpireDate());

		return eventRepository.save(newEvent);
	}
}
