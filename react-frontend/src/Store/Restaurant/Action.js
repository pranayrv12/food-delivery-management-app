import { API } from '../../Components/API/APIClient'
import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE } from './ActionType'
import { DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE } from './ActionType'
import { CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE } from './ActionType'
import { CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, CREATE_RESTAURANT_FAILURE } from './ActionType'
import { RETRIEVE_ALL_EVENTS_REQUEST, RETRIEVE_ALL_EVENTS_SUCCESS, RETRIEVE_ALL_EVENTS_FAILURE } from './ActionType'
import { RETRIEVE_ALL_RESTAURANTS_REQUEST, RETRIEVE_ALL_RESTAURANTS_SUCCESS, RETRIEVE_ALL_RESTAURANTS_FAILURE } from './ActionType'
import { UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_STATUS_FAILURE } from './ActionType'
import { RETRIEVE_RESTAURANT_BY_ID_REQUEST, RETRIEVE_RESTAURANT_BY_ID_SUCCESS, RETRIEVE_RESTAURANT_BY_ID_FAILURE } from './ActionType'
import { RETRIEVE_RESTAURANT_EVENTS_REQUEST, RETRIEVE_RESTAURANT_EVENTS_SUCCESS, RETRIEVE_RESTAURANT_EVENTS_FAILURE } from './ActionType'
import { RETRIEVE_RESTAURANT_BY_USER_ID_REQUEST, RETRIEVE_RESTAURANT_BY_USER_ID_SUCCESS, RETRIEVE_RESTAURANT_BY_USER_ID_FAILURE } from './ActionType'
import { RETRIEVE_RESTAURANT_CATEGORIES_REQUEST, RETRIEVE_RESTAURANT_CATEGORIES_SUCCESS, RETRIEVE_RESTAURANT_CATEGORIES_FAILURE } from './ActionType'

export const deleteEvent = (eventId) => async (dispatch) => {
	dispatch({ type: DELETE_EVENT_REQUEST })

	try {
		await API.delete(`api/owner/event/${eventId}/delete`)
		dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: DELETE_EVENT_FAILURE, payload: error.message })
	}
}

export const retrieveAllEvents = () => async (dispatch) => {
	dispatch({ type: RETRIEVE_ALL_EVENTS_REQUEST })

	try {
		const response = await API.get(`api/events`)
		dispatch({ type: RETRIEVE_ALL_EVENTS_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_ALL_EVENTS_FAILURE, payload: error.message })
	}
}

export const createCategory = (categoryData) => async (dispatch) => {
	dispatch({ type: CREATE_CATEGORY_REQUEST })

	try {
		const response = await API.post(`api/owner/category/create`, categoryData)
		dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message })
	}
}

export const retrieveAllRestaurants = () => async(dispatch) => {
	dispatch({ type: RETRIEVE_ALL_RESTAURANTS_REQUEST })

	try {
		const response = await API.get('/api/restaurants')
		dispatch({ type: RETRIEVE_ALL_RESTAURANTS_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_ALL_RESTAURANTS_FAILURE, payload: error.message })
	}
}

export const retrieveRestaurantById = (restaurantId) => async (dispatch) => {
	dispatch({ type: RETRIEVE_RESTAURANT_BY_ID_REQUEST })

	try {
		const response = await API.get(`api/restaurant/${restaurantId}`)
		dispatch({ type: RETRIEVE_RESTAURANT_BY_ID_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: RETRIEVE_RESTAURANT_BY_ID_FAILURE, payload: error.message })
	}
}

export const updateRestaurantStatus = (restaurantId) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST })

	try {
		const response = await API.put(`api/owner/restaurant/${restaurantId}/status`)
		dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error.message })
	}
}

export const retrieveRestaurantEvents = (restaurantId) => async (dispatch) => {
	dispatch({ type: RETRIEVE_RESTAURANT_EVENTS_REQUEST })

	try {
		const response = await API.get(`/api/owner/events/restaurant/${restaurantId}`)
		dispatch({ type: RETRIEVE_RESTAURANT_EVENTS_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_RESTAURANT_EVENTS_FAILURE, payload: error.message })
	}
}

export const createRestaurant = (restaurantData) => async (dispatch) => {
	dispatch({ type: CREATE_RESTAURANT_REQUEST })

	try {
		const response = await API.post(`/api/owner/restaurant/create`, restaurantData)
		dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.message })
	}
}

export const retrieveRestaurantByUserId = () => async (dispatch) => {
	dispatch({ type: RETRIEVE_RESTAURANT_BY_USER_ID_REQUEST })

	try {
		const response = await API.get(`/api/owner/restaurant`)
		dispatch({ type: RETRIEVE_RESTAURANT_BY_USER_ID_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: RETRIEVE_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message })
	}
}

export const retrieveRestaurantCategories = (restaurantId) => async (dispatch) => {
	dispatch({ type: RETRIEVE_RESTAURANT_CATEGORIES_REQUEST })

	try {
		const response = await API.get(`/api/categories/restaurant/${restaurantId}`)
		dispatch({ type: RETRIEVE_RESTAURANT_CATEGORIES_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_RESTAURANT_CATEGORIES_FAILURE, payload: error.message })
	}
}

export const createEvent = (eventData, restaurantId) => async (dispatch) => {
	dispatch({ type: CREATE_EVENT_REQUEST })

	try {
		const response = await API.post(`api/owner/event/restaurant/${restaurantId}/create`, eventData)
		dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: CREATE_EVENT_FAILURE, payload: error.message })
	}
}
