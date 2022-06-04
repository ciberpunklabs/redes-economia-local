import { MarkerPositionType } from "../../domain/MarkerPosition";

export type MarkerResponse = {
	id: string, 
	name: string, 
	categories: string[], 
	address: string, 
	phoneNumber: string, 
	position: MarkerPositionType
};
  