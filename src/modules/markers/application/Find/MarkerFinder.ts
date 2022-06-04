import { FindMarkerRequest } from "../../domain/Find/FindMarkerRequest";
import { MarkerRepository } from "../../domain/MarkerRepository";
import { MarkerResponse } from "./MarkerResponse";
import { MarkerFinder as DomainMarkerFinder } from "../../domain/Find/MarkerFinder";

export class MarkerFinder {
	private readonly finder: DomainMarkerFinder;
  
	constructor(repository: MarkerRepository){
		this.finder = new DomainMarkerFinder(repository);
	}
  
	async run(request: FindMarkerRequest): Promise<MarkerResponse> {
		const marker = await this.finder.run(request);
		return marker.toPrimitives();
	}
}