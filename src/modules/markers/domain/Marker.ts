import { MarkerPosition, MarkerPositionType } from "./MarkerPosition";

export type MarkerType = {
	id: string,
	name: string, 
	categories: string[],
	address: string,
	phoneNumber: string,
	position: MarkerPositionType,
}

export class Marker {
	readonly id: string;
	readonly name: string;
	readonly categories: string[];
	readonly address: string;
	readonly phoneNumber: string;
	readonly position: MarkerPosition;

 	constructor({ id, name, categories, address, phoneNumber, position }: MarkerType) 
	{
		this.id = id;
		this.name = name;
		this.categories = categories;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.position = new MarkerPosition(position); 
  	}

	static fromPrimitives(plainData: MarkerType): Marker {
		return new Marker({
			id: plainData.id, 
			name: plainData.name,
			categories: plainData.categories, 
			phoneNumber: plainData.phoneNumber,
			address: plainData.address, 
			position: plainData.position,
		});
	}

	toPrimitives(): MarkerType {
		return {
			id: this.id,
			name: this.name,
			categories: this.categories,
			address: this.address,
			phoneNumber: this.phoneNumber,
			position: this.position.toPrimitives()
		};
	}
}
