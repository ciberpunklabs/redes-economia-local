import { Marker } from "../../domain/Marker";
import { MarkerPositionType } from "../../domain/MarkerPosition";
import { MarkerRepository } from "../../domain/MarkerRepository";


export class MarkerCreator {
  	private repository: MarkerRepository;

	constructor(repository: MarkerRepository) {
		this.repository = repository;
	}

  	async run(request: {
		id: string, name: string, categories: string[], 
		address: string, phoneNumber: string, 
		position: MarkerPositionType
	}): Promise<void> {
    	
		const marker = Marker.fromPrimitives(request);

    	return this.repository.save(marker);
  	}
}
