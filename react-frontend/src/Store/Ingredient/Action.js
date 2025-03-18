import { API } from '../../Components/API/APIClient'
import { UPDATE_INGREDIENT_AVAILABILITY, RETRIEVE_RESTAURANT_INGREDIENTS } from './ActionType'
import { CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, CREATE_INGREDIENT_FAILURE } from './ActionType'
import { CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_CATEGORY_FAILURE } from './ActionType'
import { RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_REQUEST, RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_SUCCESS, RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_FAILURE } from './ActionType'

export const updateIngredientAvailability = (ingredientId) => async(dispatch) => {
	try {
		const response = await API.put(`/api/owner/ingredient/${ingredientId}/update`)
		dispatch({ type: UPDATE_INGREDIENT_AVAILABILITY, payload: response.data })
	} catch (error) {
		console.log('Error', error)
	}
}

export const createIngredient = (ingredientData) => async(dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST })

	try {
		const response = await API.post(`/api/owner/ingredient/create`, ingredientData)
		dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
        dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error.message })
	}
}

export const retrieveRestaurantIngredients = (restaurantId) => async(dispatch) => {
	try {
		const response = await API.get(`/api/owner/ingredients/restaurant/${restaurantId}`)
		dispatch({ type: RETRIEVE_RESTAURANT_INGREDIENTS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
	}
}

export const retrieveRestaurantIngredientCategories = (restaurantId) => async(dispatch) => {
    dispatch({ type: RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_REQUEST })

	try {
		const response = await API.get(`/api/owner/ingredient/categories/restaurant/${restaurantId}`)
		dispatch({ type: RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
        dispatch({ type: RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_FAILURE, payload: error.message })
	}
}

export const createIngredientCategory = (ingredientCategoryData) => async(dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST })

	try {
		const response = await API.post(`/api/owner/ingredient/category/create`, ingredientCategoryData)
		dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data })
	} catch (error) {
		console.log('Error', error)
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error.message })
	}
}
