import { DELETE_USER_NOTIFICATIONS } from './ActionType.js'
import { CREATE_ORDER_REQUEST, CREATE_ORDER_FAILURE } from './ActionType.js'
import { UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE } from './ActionType.js'
import { RETRIEVE_USER_ORDERS_REQUEST, RETRIEVE_USER_ORDERS_SUCCESS, RETRIEVE_USER_ORDERS_FAILURE } from './ActionType.js'
import { RETRIEVE_RESTAURANT_ORDERS_REQUEST, RETRIEVE_RESTAURANT_ORDERS_SUCCESS, RETRIEVE_RESTAURANT_ORDERS_FAILURE } from './ActionType.js'
import { RETRIEVE_USER_NOTIFICATIONS_REQUEST, RETRIEVE_USER_NOTIFICATIONS_SUCCESS, RETRIEVE_USER_NOTIFICATIONS_FAILURE } from './ActionType.js'

const initialState = {
    orders: [],
    error: null,
	loading: false,
	notifications: []
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
		case UPDATE_ORDER_STATUS_REQUEST:
		case RETRIEVE_USER_ORDERS_REQUEST:
		case RETRIEVE_RESTAURANT_ORDERS_REQUEST:
		case RETRIEVE_USER_NOTIFICATIONS_REQUEST:
			return { ...state, error: null, loading: true }

		case RETRIEVE_RESTAURANT_ORDERS_SUCCESS:
			return { ...state, loading: false, orders: action.payload }

		case DELETE_USER_NOTIFICATIONS:
			return { ...state, error: null, loading: false, notifications: [] }

		case RETRIEVE_USER_ORDERS_SUCCESS:
			return { ...state, error: null, loading: false, orders: action.payload }

		case RETRIEVE_USER_NOTIFICATIONS_SUCCESS:
			return { ...state, error: null, loading: false, notifications: action.payload }

		case UPDATE_ORDER_STATUS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: state.orders.map((order) => order.id === action.payload.id ? action.payload : order)
			}

		case CREATE_ORDER_FAILURE:
		case UPDATE_ORDER_STATUS_FAILURE:
		case RETRIEVE_USER_ORDERS_FAILURE:
		case RETRIEVE_RESTAURANT_ORDERS_FAILURE:
		case RETRIEVE_USER_NOTIFICATIONS_FAILURE:
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
}
