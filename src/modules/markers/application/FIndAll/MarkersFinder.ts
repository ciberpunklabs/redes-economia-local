import { MarkerType } from "../../domain/Marker";
import { MarkerRepository } from "../../domain/MarkerRepository";

export class MarkersFinder {
	private repository: MarkerRepository;
  
	constructor(repository: MarkerRepository){
		this.repository = repository;
	}
  
	async run(): Promise<MarkerType[]> {
		return this.repository.findAll();
	}
}