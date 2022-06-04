import { FindMarkerRequest } from "../../domain/Find/FindMarkerRequest";
import { MarkerRepository } from "../../domain/MarkerRepository";
import { MarkerFinder as DomainMarkerFinder } from "../../domain/Find/MarkerFinder";
import { MarkerType } from "../../domain/Marker";

export class MarkerFinder {
	private readonly finder: DomainMarkerFinder;
  
	constructor(repository: MarkerRepository){
		this.finder = new DomainMarkerFinder(repository);
	}
  
	async run(request: FindMarkerRequest): Promise<MarkerType> {
		const marker = await this.finder.run(request);
		return marker.toPrimitives();
	}
}