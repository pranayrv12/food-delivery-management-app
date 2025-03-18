import { CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, CLEAR_CART_FAILURE } from './ActionType'
import { UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE } from './ActionType'
import { ADD_MENU_ITEM_TO_CART_REQUEST, ADD_MENU_ITEM_TO_CART_SUCCESS, ADD_MENU_ITEM_TO_CART_FAILURE } from './ActionType'
import { RETRIEVE_CART_BY_USER_ID_REQUEST, RETRIEVE_CART_BY_USER_ID_SUCCESS, RETRIEVE_CART_BY_USER_ID_FAILURE } from './ActionType'
import { DELETE_CART_ITEM_FROM_CART_REQUEST, DELETE_CART_ITEM_FROM_CART_SUCCESS, DELETE_CART_ITEM_FROM_CART_FAILURE } from './ActionType'

const initialState = {
	cart: null,
    error: null,
	cartItems: [],
	loading: false
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_CART_REQUEST:
		case UPDATE_CART_ITEM_REQUEST:
		case ADD_MENU_ITEM_TO_CART_REQUEST:
		case RETRIEVE_CART_BY_USER_ID_REQUEST:
		case DELETE_CART_ITEM_FROM_CART_REQUEST:
			return { ...state, error: null, loading: true }

		case ADD_MENU_ITEM_TO_CART_SUCCESS:
			return { ...state, loading: false, cartItems: [action.payload, ...state.cartItems] }

		case CLEAR_CART_SUCCESS:
		case RETRIEVE_CART_BY_USER_ID_SUCCESS:
			return { ...state, loading: false, cart: action.payload, cartItems: action.payload.items }

		case UPDATE_CART_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				cartItems: state.cartItems.map((item) => item.id === action.payload.id ? action.payload : item)
			}

		case DELETE_CART_ITEM_FROM_CART_SUCCESS:
			return { ...state, loading: false, cartItems: state.cartItems.filter((item) => item.id !== action.payload) }

		case CLEAR_CART_FAILURE:
		case UPDATE_CART_ITEM_FAILURE:
		case ADD_MENU_ITEM_TO_CART_FAILURE:
		case RETRIEVE_CART_BY_USER_ID_FAILURE:
		case DELETE_CART_ITEM_FROM_CART_FAILURE:
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
}
