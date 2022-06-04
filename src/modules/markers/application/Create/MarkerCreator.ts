import { Marker, MarkerType } from "../../domain/Marker";
import { MarkerRepository } from "../../domain/MarkerRepository";


export class MarkerCreator {
  	private repository: MarkerRepository;

	constructor(repository: MarkerRepository) {
		this.repository = repository;
	}

  	async run(request: MarkerType): Promise<void> {
		const marker = Marker.fromPrimitives(request);
    	return this.repository.save(marker);
  	}
}
