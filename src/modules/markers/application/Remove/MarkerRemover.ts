import { MarkerFinder } from "../../domain/Find/MarkerFinder";
import { MarkerRepository } from "../../domain/MarkerRepository";

type RemoveMarkerRequest = {
	id: string
};

export class MarkerRemover {
	private readonly finder: MarkerFinder;
	private readonly repository: MarkerRepository;

	constructor(repository: MarkerRepository) {
		this.repository = repository;
		this.finder = new MarkerFinder(repository);
	}
  
	async run(request: RemoveMarkerRequest): Promise<void> {
		await this.finder.run({ id: request.id })
		return await this.repository.remove(request.id);
	}
}