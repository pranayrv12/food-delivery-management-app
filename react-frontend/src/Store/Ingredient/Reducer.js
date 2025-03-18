import { UPDATE_INGREDIENT_AVAILABILITY, RETRIEVE_RESTAURANT_INGREDIENTS } from './ActionType'
import { CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, CREATE_INGREDIENT_FAILURE } from './ActionType'
import { CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_CATEGORY_FAILURE } from './ActionType'
import { RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_REQUEST, RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_SUCCESS, RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_FAILURE } from './ActionType'

const initialState = {
	update: null,
	category: [],
	loading: false,
	ingredients: [],
}

export const ingredientReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_INGREDIENT_REQUEST:
		case CREATE_INGREDIENT_CATEGORY_REQUEST:
		case RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_REQUEST:
			return { ...state, error: null, loading: true }

		case RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_SUCCESS:
			return { ...state, loading: false, category: action.payload }

		case RETRIEVE_RESTAURANT_INGREDIENTS:
			return { ...state, loading: false, ingredients: action.payload }

		case CREATE_INGREDIENT_CATEGORY_SUCCESS:
			return { ...state, loading: false, category: [...state.category, action.payload] }

		case CREATE_INGREDIENT_SUCCESS:
			return { ...state, loading: false, ingredients: [...state.ingredients, action.payload] }

		case UPDATE_INGREDIENT_AVAILABILITY:
			return {
				...state,
				loading: false,
				update: action.payload,
				ingredients: state.ingredients.map((item) => item.id === action.payload.id ? action.payload : item) 
			}

		case CREATE_INGREDIENT_FAILURE:
		case CREATE_INGREDIENT_CATEGORY_FAILURE:
		case RETRIEVE_RESTAURANT_INGREDIENT_CATEGORIES_FAILURE:
			return { ...state, loading: false, error: action.payload }

		default:
			return state
	}
}
