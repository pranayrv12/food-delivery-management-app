import { LOGOUT } from './ActionType'
import { isFavorite } from '../../Utils/isFavorite'
import { SIGN_IN_USER_REQUEST, SIGN_IN_USER_SUCCESS, SIGN_IN_USER_FAILURE } from './ActionType'
import { SIGN_UP_USER_REQUEST, SIGN_UP_USER_SUCCESS, SIGN_UP_USER_FAILURE } from './ActionType'
import { DELETE_USER_ADDRESS_REQUEST, DELETE_USER_ADDRESS_SUCCESS, DELETE_USER_ADDRESS_FAILURE } from './ActionType'
import { RETRIEVE_USER_PROFILE_REQUEST, RETRIEVE_USER_PROFILE_SUCCESS, RETRIEVE_USER_PROFILE_FAILURE } from './ActionType'
import { ADD_RESTAURANT_TO_FAVORITES_REQUEST, ADD_RESTAURANT_TO_FAVORITES_SUCCESS, ADD_RESTAURANT_TO_FAVORITES_FAILURE } from './ActionType'

const initialState = {
	jwt: null,
	user: null,
	error: null,
	favorites: [],
	success: null,
	loading: false
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN_USER_REQUEST:
        case SIGN_UP_USER_REQUEST:
		case DELETE_USER_ADDRESS_REQUEST:
		case RETRIEVE_USER_PROFILE_REQUEST:
		case ADD_RESTAURANT_TO_FAVORITES_REQUEST:
			return { ...state, error: null, loading: true, success: null }

        case SIGN_IN_USER_SUCCESS:
            return { ...state, loading: false, jwt: action.payload, success: 'Signed In Successfully!' }

		case SIGN_UP_USER_SUCCESS:
			return { ...state, loading: false, jwt: action.payload, success: 'Signed Up Successfully!' }

        case RETRIEVE_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, user: action.payload, favorites: action.payload.favorites }

		case DELETE_USER_ADDRESS_SUCCESS:
			return {
				...state,
				loading: false,
				user: { ...state.user, addresses: state.user.addresses.filter(address => address.id !== action.payload)}
			}

		case ADD_RESTAURANT_TO_FAVORITES_SUCCESS:
			return { 
				...state,
				error: null,
				loading: false,
				favorites: isFavorite(state.favorites, action.payload) ? state.favorites.filter((item) => item.id !== action.payload.id) : [action.payload, ...state.favorites] 
			}

        case SIGN_IN_USER_FAILURE:
        case SIGN_UP_USER_FAILURE:
		case DELETE_USER_ADDRESS_FAILURE:
		case RETRIEVE_USER_PROFILE_FAILURE:
		case ADD_RESTAURANT_TO_FAVORITES_FAILURE:
			return { ...state, loading: false, error: action.payload }

		case LOGOUT:
			localStorage.removeItem('jwt')
			return { ...state, jwt: null, user: null, success: 'Logged Out Successfully!' }

		default:
			return state
	}
}
