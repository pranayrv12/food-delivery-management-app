export const CloudImages = async (pics) => {
	if (pics) {
		const data = new FormData()
		data.append('file', pics)
		data.append('cloud_name', 'dhtzeoynn')
		data.append('upload_preset', 'Food Delivery Management App')

		const result = await fetch(
			`https://api.cloudinary.com/v1_1/dhtzeoynn/image/upload`,
			{
				body: data,
				method: 'post',
			}
		)
		const fileData = await result.json()
		return fileData.url.toString()
	} else {
		console.log('Error in Cloudinary.')
	}
}
