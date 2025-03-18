export function isValidOrder(cartItems) {
	const restaurantId = cartItems[0].menuItem.restaurant.id

	return cartItems.every(
		(item) => item.menuItem.restaurant.id === restaurantId
	)
}
