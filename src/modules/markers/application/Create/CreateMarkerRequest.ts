export type CreateMarkerRequest = {
	name: string, 
	categories: string[],
	address: string,
	phoneNumber: string,
	position: {
		latitude: string,
		longitude: string,
	}
}