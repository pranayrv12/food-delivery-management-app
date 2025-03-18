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

const initialState = {
    events: [],
    error: null,
	categories: [],
    loading: false,
	restaurants: [],
    restaurant: null,
	restaurantsEvents: [],
	usersRestaurant: null,
}

export const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_EVENT_REQUEST:
		case DELETE_EVENT_REQUEST:
        case CREATE_CATEGORY_REQUEST:
		case CREATE_RESTAURANT_REQUEST:
		case RETRIEVE_ALL_EVENTS_REQUEST:
		case RETRIEVE_ALL_RESTAURANTS_REQUEST:
		case UPDATE_RESTAURANT_STATUS_REQUEST:
		case RETRIEVE_RESTAURANT_BY_ID_REQUEST:
		case RETRIEVE_RESTAURANT_EVENTS_REQUEST:
		case RETRIEVE_RESTAURANT_BY_USER_ID_REQUEST:
		case RETRIEVE_RESTAURANT_CATEGORIES_REQUEST:
			return { ...state, error: null, loading: true }

		case RETRIEVE_ALL_EVENTS_SUCCESS:
			return { ...state, loading: false, events: action.payload }

		case RETRIEVE_RESTAURANT_BY_ID_SUCCESS:
			return { ...state, loading: false, restaurant: action.payload }

		case RETRIEVE_RESTAURANT_CATEGORIES_SUCCESS:
			return { ...state, loading: false, categories: action.payload }

		case RETRIEVE_ALL_RESTAURANTS_SUCCESS:
			return { ...state, loading: false, restaurants: action.payload }

		case CREATE_EVENT_SUCCESS:
		    return {
				...state,
				loading: false,
				events: [...state.events, action.payload],
				restaurantsEvents: [...state.restaurantsEvents, action.payload] 
			}

		case CREATE_RESTAURANT_SUCCESS:
			return { ...state, loading: false, usersRestaurant: action.payload }

        case UPDATE_RESTAURANT_STATUS_SUCCESS:
		case RETRIEVE_RESTAURANT_BY_USER_ID_SUCCESS:
			return { ...state, loading: false, usersRestaurant: action.payload }

		case RETRIEVE_RESTAURANT_EVENTS_SUCCESS:
			return { ...state, loading: false, restaurantsEvents: action.payload }

		case CREATE_CATEGORY_SUCCESS:
			return { ...state, loading: false, categories: [...state.categories, action.payload] }

		case DELETE_EVENT_SUCCESS:
			return { 
				...state,
				loading: false,
				events: state.events.filter((item) => item.id !== action.payload),
				restaurantsEvents: state.restaurantsEvents.filter((item) => item.id !== action.payload)
			}

		case CREATE_EVENT_FAILURE:
		case DELETE_EVENT_FAILURE:
		case CREATE_CATEGORY_FAILURE:
        case CREATE_RESTAURANT_FAILURE:
		case RETRIEVE_ALL_EVENTS_FAILURE:
		case RETRIEVE_ALL_RESTAURANTS_FAILURE:
		case UPDATE_RESTAURANT_STATUS_FAILURE:
		case RETRIEVE_RESTAURANT_BY_ID_FAILURE:
		case RETRIEVE_RESTAURANT_EVENTS_FAILURE:
		case RETRIEVE_RESTAURANT_BY_USER_ID_FAILURE:
		case RETRIEVE_RESTAURANT_CATEGORIES_FAILURE:
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
}
