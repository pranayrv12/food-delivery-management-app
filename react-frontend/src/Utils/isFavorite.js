export const isFavorite = (favorites, restaurant) => {
	return favorites.some((item) => restaurant.id === item.id)
}
