export type MarkerPositionType = {
	latitude: string; 
	longitude: string;
}

export class MarkerPosition {
	readonly latitude: string;
	readonly longitude: string;

 	constructor({ latitude, longitude }: MarkerPositionType) {
		this.latitude = latitude;
		this.longitude = longitude;
  	}

	static fromPrimitives(plainData: MarkerPositionType): MarkerPosition {
	return new MarkerPosition({
		latitude: plainData.latitude,
		longitude: plainData.longitude
	});
}

	toPrimitives(): MarkerPositionType {
		return {
			latitude: this.latitude,
			longitude: this.longitude
		};
	}
}
