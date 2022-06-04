import { Marker } from "../Marker";
import { MarkerRepository } from "../MarkerRepository";
import { NotFoundException } from "../NotFoundException";
import { FindMarkerRequest } from "./FindMarkerRequest";

export class MarkerFinder {
	private readonly repository: MarkerRepository;
  
	constructor(repository: MarkerRepository) {
	  this.repository = repository;
	}
  
	async run(request: FindMarkerRequest): Promise<Marker> {
		const patientId = request.id;
		const patient = await this.repository.findById(patientId);

		if (patient === null) throw new NotFoundException(request.id);

	  	return patient;
	}
}