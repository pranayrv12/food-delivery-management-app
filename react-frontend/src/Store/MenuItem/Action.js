import { API } from '../../Components/API/APIClient'
import { CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, CREATE_MENU_ITEM_FAILURE } from './ActionType'
import { DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE } from './ActionType'
import { UPDATE_MENU_ITEM_AVAILABILITY_REQUEST, UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, UPDATE_MENU_ITEM_AVAILABILITY_FAILURE } from './ActionType'
import { RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE } from './ActionType'
import { SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_REQUEST, SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_SUCCESS, SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_FAILURE } from './ActionType'

export const deleteMenuItem = (menuItemId) => async (dispatch) => {
	dispatch({ type: DELETE_MENU_ITEM_REQUEST })

	try {
		await API.delete(`/api/owner/menu-item/${menuItemId}/delete`)
		dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: menuItemId })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error.message })
	}
}

export const createMenuItem = (menuItemData) => async (dispatch) => {
	dispatch({ type: CREATE_MENU_ITEM_REQUEST })

	try {
		const response = await API.post('api/owner/menu-item/create', menuItemData)
		dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error.message })
	}
}

export const updateMenuItemAvailability = (menuItemId) => async (dispatch) => {
	dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST })

	try {
		const response = await API.put(`/api/owner/menu-item/${menuItemId}/update`)
		dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, payload: error.message })
	}
}

export const searchMenuItemsByNameOrCategory = (query) => async (dispatch) => {
	dispatch({ type: SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_REQUEST })

	try {
		const response = await API.get(`api/menu-items/search?name=${query}`)
		dispatch({ type: SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: SEARCH_MENU_ITEMS_BY_NAME_OR_CATEGORY_FAILURE, payload : error.message })
	}
}

export const retrieveMenuItemsByRestaurantId = (menuItemData) => async (dispatch) => {
	dispatch({ type: RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST })

	try {
		const response = await API.get(`/api/menu-items/restaurant/${menuItemData.restaurantId}?vegetarian=${menuItemData.vegetarian}&nonvegetarian=${menuItemData.nonvegetarian}
			&category=${menuItemData.category}`)
		dispatch({ type: RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error.message })
	}
}
