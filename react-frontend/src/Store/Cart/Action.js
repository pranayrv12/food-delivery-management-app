import { API } from '../../Components/API/APIClient'
import { CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, CLEAR_CART_FAILURE } from './ActionType'
import { UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE } from './ActionType'
import { ADD_MENU_ITEM_TO_CART_REQUEST, ADD_MENU_ITEM_TO_CART_SUCCESS, ADD_MENU_ITEM_TO_CART_FAILURE } from './ActionType'
import { RETRIEVE_CART_BY_USER_ID_REQUEST, RETRIEVE_CART_BY_USER_ID_SUCCESS, RETRIEVE_CART_BY_USER_ID_FAILURE } from './ActionType'
import { DELETE_CART_ITEM_FROM_CART_REQUEST, DELETE_CART_ITEM_FROM_CART_SUCCESS, DELETE_CART_ITEM_FROM_CART_FAILURE } from './ActionType'

export const clearCart = () => async (dispatch) => {
	dispatch({ type: CLEAR_CART_REQUEST })

	try {
		const response = await API.put(`/api/cart/clear`)
		dispatch({ type: CLEAR_CART_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: CLEAR_CART_FAILURE, payload: error.message })
	}
}

export const updateCartItemQuantity = (cartItemData) => async (dispatch) => {
	dispatch({ type: UPDATE_CART_ITEM_REQUEST })

	try {
		const response = await API.put(`/api/cart-item/update`, cartItemData)
		dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message })
	}
}

export const addMenuItemToCart = (menuItemData) => async (dispatch) => {
	dispatch({ type: ADD_MENU_ITEM_TO_CART_REQUEST })

	try {
		const response = await API.put(`/api/cart/add`, menuItemData)
		dispatch({ type: ADD_MENU_ITEM_TO_CART_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: ADD_MENU_ITEM_TO_CART_FAILURE, payload: error.message })
	}
}

export const retrieveCartByUserId = () => async (dispatch) => {
	dispatch({ type: RETRIEVE_CART_BY_USER_ID_REQUEST })

	try {
		const response = await API.get(`/api/cart`)
		dispatch({ type: RETRIEVE_CART_BY_USER_ID_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_CART_BY_USER_ID_FAILURE, payload: error.message })
	}
}

export const deleteCartItemFromCart = (cartItemId) => async (dispatch) => {
	dispatch({ type: DELETE_CART_ITEM_FROM_CART_REQUEST })

	try {
		await API.delete(`/api/cart-item/${cartItemId}/delete`)
		dispatch({ type: DELETE_CART_ITEM_FROM_CART_SUCCESS, payload: cartItemId })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: DELETE_CART_ITEM_FROM_CART_FAILURE, payload: error.message })
	}
}
