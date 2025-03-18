export const IngredientCategories = (ingredients) => {
	const ingredientCategories = {}

	ingredients.forEach((ingredient) => {
		const { category } = ingredient

		if (!ingredientCategories[category.name]) {
			ingredientCategories[category.name] = []
		}
		ingredientCategories[category.name].push(ingredient)
	})
	return ingredientCategories
}
