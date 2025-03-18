export const TotalAmount = (items) => {
	let total = 0

	for (const item of items) {
		total += item.totalAmount
	}
	return total
}
