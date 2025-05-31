import { LatLng } from "react-native-maps";
import { GooglePlacesRepository } from "../../repository/GooglePlacesRepository";
import { GoogleDirections } from "../../models/GoogleDirections";

export class GetDirectionsUseCase {
  private googlePlacesRepository: GooglePlacesRepository;

  constructor({
    googlePlacesRepository,
  }: {
    googlePlacesRepository: GooglePlacesRepository;
  }) {
    this.googlePlacesRepository = googlePlacesRepository;
  }

  async execute(origin: LatLng, destination: LatLng): Promise<GoogleDirections| null> {
    return await this.googlePlacesRepository.getDirections(origin,destination);
  }
}