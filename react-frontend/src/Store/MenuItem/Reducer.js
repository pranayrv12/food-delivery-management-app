import { CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, CREATE_MENU_ITEM_FAILURE } from './ActionType'
import { DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE } from './ActionType'
import { UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, UPDATE_MENU_ITEM_AVAILABILITY_FAILURE } from './ActionType'
import { RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE } from './ActionType'
import { SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_REQUEST, SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_SUCCESS, SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_FAILURE } from './ActionType'

const initialState = {
    search: [],
    error: null,
	menuItems: [],
	loading: false
}

export const menuItemReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_MENU_ITEM_REQUEST:
		case DELETE_MENU_ITEM_REQUEST:
		case UPDATE_MENU_ITEM_AVAILABILITY_REQUEST:
		case RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
		case SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_REQUEST:
			return { ...state, error: null, loading: true }

		case CREATE_MENU_ITEM_SUCCESS:
			return {
				...state,
				loading: false,
				menuItems: [...state.menuItems, action.payload]
			}

		case SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_SUCCESS:
			return { ...state, loading: false, search: action.payload }

		case RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
			return { ...state, loading: false, menuItems: action.payload }

		case UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS:
			return {
				...state,
				loading: false,
				menuItems: state.menuItems.map((menuItem) => menuItem.id === action.payload.id ? action.payload : menuItem)
			}

		case DELETE_MENU_ITEM_SUCCESS:
			return { ...state, loading: false, menuItems: state.menuItems.filter((menuItem) => menuItem.id !== action.payload) }

		case CREATE_MENU_ITEM_FAILURE:
		case DELETE_MENU_ITEM_FAILURE:
		case UPDATE_MENU_ITEM_AVAILABILITY_FAILURE:
        case RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
		case SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_FAILURE:
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
}
