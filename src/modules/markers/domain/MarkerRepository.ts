import { Marker } from "./Marker";

export interface MarkerRepository {
  save(marker: Marker): Promise<void>;
  findById(id: string): Promise<Marker | null>;
  findAll(): Promise<Marker[]>
  remove(id: string): Promise<void>;
}
