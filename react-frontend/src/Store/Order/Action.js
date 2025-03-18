import { API } from '../../Components/API/APIClient.js'
import { DELETE_USER_NOTIFICATIONS } from './ActionType.js'
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from './ActionType.js'
import { UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE } from './ActionType.js'
import { RETRIEVE_USER_ORDERS_REQUEST, RETRIEVE_USER_ORDERS_SUCCESS, RETRIEVE_USER_ORDERS_FAILURE } from './ActionType.js'
import { RETRIEVE_RESTAURANT_ORDERS_REQUEST, RETRIEVE_RESTAURANT_ORDERS_SUCCESS, RETRIEVE_RESTAURANT_ORDERS_FAILURE } from './ActionType.js'
import { RETRIEVE_USER_NOTIFICATIONS_REQUEST, RETRIEVE_USER_NOTIFICATIONS_SUCCESS, RETRIEVE_USER_NOTIFICATIONS_FAILURE } from './ActionType.js'

export const deleteUserNotifications = () => async (dispatch) => {
	try {
		await API.delete('/api/notifications/delete')
		dispatch({ type: DELETE_USER_NOTIFICATIONS, payload: [] })
	} catch (error) {
		console.log('Error', error)
	}
}

export const createOrder = (orderData) => async (dispatch) => {
	dispatch({ type: CREATE_ORDER_REQUEST })

	try {
		const { data } = await API.post('/api/order/create', orderData)

		if (data.payment_url) {
			window.location.href = data.payment_url
		}
		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message })
	}
}

export const retrieveUserOrders = () => async (dispatch) => {
	dispatch({ type: RETRIEVE_USER_ORDERS_REQUEST })

	try {
		const response = await API.get(`/api/orders/user`)
		dispatch({ type: RETRIEVE_USER_ORDERS_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_USER_ORDERS_FAILURE, payload: error.message })
	}
}

export const retrieveUserNotifications = () => async (dispatch) => {
	dispatch({ type: RETRIEVE_USER_NOTIFICATIONS_REQUEST })

	try {
		const response = await API.get('/api/notifications')
		dispatch({ type: RETRIEVE_USER_NOTIFICATIONS_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: RETRIEVE_USER_NOTIFICATIONS_FAILURE, payload: error.message })
	}
}

export const retrieveRestaurantOrders = (restaurantId, orderStatus) => async(dispatch) => {
    dispatch({ type: RETRIEVE_RESTAURANT_ORDERS_REQUEST })

	try {
		const response = await API.get(`/api/owner/orders/restaurant/${restaurantId}`,
			{
				params: { order_status: orderStatus }
			}
		)
		dispatch({ type: RETRIEVE_RESTAURANT_ORDERS_SUCCESS, payload: response.data })
	} catch (error) {
        console.log('Error', error)
		dispatch({ type: RETRIEVE_RESTAURANT_ORDERS_FAILURE, payload: error.message })
	}
}

export const updateOrderStatus = (orderId, orderStatus) => async(dispatch) => {
	dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })

	try {
		const response = await API.put(`/api/owner/order/${orderId}/update/${orderStatus}`)
		dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error.message })
	}
}
