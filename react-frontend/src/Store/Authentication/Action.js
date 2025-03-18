import axios from 'axios'
import { LOGOUT } from './ActionType'
import { API, API_BASE_URL} from '../../Components/API/APIClient'
import { SIGN_IN_USER_REQUEST, SIGN_IN_USER_SUCCESS, SIGN_IN_USER_FAILURE } from './ActionType'
import { SIGN_UP_USER_REQUEST, SIGN_UP_USER_SUCCESS, SIGN_UP_USER_FAILURE } from './ActionType'
import { DELETE_USER_ADDRESS_REQUEST, DELETE_USER_ADDRESS_SUCCESS, DELETE_USER_ADDRESS_FAILURE } from './ActionType'
import { RETRIEVE_USER_PROFILE_REQUEST, RETRIEVE_USER_PROFILE_SUCCESS, RETRIEVE_USER_PROFILE_FAILURE } from './ActionType'
import { ADD_RESTAURANT_TO_FAVORITES_REQUEST, ADD_RESTAURANT_TO_FAVORITES_SUCCESS, ADD_RESTAURANT_TO_FAVORITES_FAILURE } from './ActionType'

export const logout = () => async (dispatch) => {
	dispatch({ type: LOGOUT })
	localStorage.clear()
}

export const deleteUserAddress = (addressId) => async (dispatch) => {
	dispatch({ type: DELETE_USER_ADDRESS_REQUEST })

	try {
		await API.delete(`/api/user/address/${addressId}/delete`)
		dispatch({ type: DELETE_USER_ADDRESS_SUCCESS, payload: addressId })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: DELETE_USER_ADDRESS_FAILURE, payload: error.message })
	}
}

export const retrieveUserProfile = (jwt) => async(dispatch) => {
	dispatch({ type: RETRIEVE_USER_PROFILE_REQUEST })

	try {
		const response = await API.get(`/api/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		})
		const user = response.data

		dispatch({ type: RETRIEVE_USER_PROFILE_SUCCESS, payload: user })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: RETRIEVE_USER_PROFILE_FAILURE, payload: error.message })
	}
}

export const signInUser = (signInData, navigate) => async(dispatch) => {
    dispatch({ type: SIGN_IN_USER_REQUEST })

	try {
		const response = await axios.post(`${API_BASE_URL}/auth/signin`, signInData)
		const user = response.data

		if (user.jwt) {
            localStorage.setItem('jwt', user.jwt)
        }
		if (user.role === 'ROLE_RESTAURANT_OWNER') {
			navigate('/owner/restaurant')
		} else {
			navigate('/')
		}
		dispatch({ type: SIGN_IN_USER_SUCCESS, payload: user.jwt })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: SIGN_IN_USER_FAILURE, payload: error.message })
	}
}

export const signUpUser = (signupData, navigate) => async(dispatch) => {
    dispatch({ type: SIGN_UP_USER_REQUEST })

	try {
		const response = await axios.post(`${API_BASE_URL}/auth/signup`, signupData)
		const user = response.data

		if (user.jwt) {
            localStorage.setItem('jwt', user.jwt)
        }
		if (user.role === 'ROLE_RESTAURANT_OWNER') {
			navigate('/owner/restaurant')
		} else {
			navigate('/')
		}
		dispatch({ type: SIGN_UP_USER_SUCCESS, payload: user.jwt })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: SIGN_UP_USER_FAILURE, payload: error.message })
	}
}

export const addRestaurantToFavorites = (restaurantId) => async(dispatch) => {
	dispatch({ type: ADD_RESTAURANT_TO_FAVORITES_REQUEST })

	try {
		const response = await API.put(`api/restaurant/${restaurantId}/favorite`)
		dispatch({ type: ADD_RESTAURANT_TO_FAVORITES_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
		dispatch({ type: ADD_RESTAURANT_TO_FAVORITES_FAILURE, payload: error.message })
	}
}
