import { thunk } from 'redux-thunk'
import { cartReducer } from './Cart/Reducer'
import { orderReducer } from './Order/Reducer'
import { menuItemReducer } from './MenuItem/Reducer'
import { authReducer } from './Authentication/Reducer'
import { ingredientReducer } from './Ingredient/Reducer'
import { restaurantReducer } from './Restaurant/Reducer'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'

const rootReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	menu: menuItemReducer,
	ingredient: ingredientReducer,
	restaurant: restaurantReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
