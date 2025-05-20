import { PlaceDetail } from "../../domain/models/PlaceDetail";
import { GooglePlacesRepository } from "../../domain/repository/GooglePlacesRepository";
import { GooglePlacesService } from "../sources/remote/services/GooglePlacesService";

export class GooglePlacesRepositoryImpl implements GooglePlacesRepository {
  private googlePlacesService: GooglePlacesService;
  constructor(
    {googlePlacesService} : {googlePlacesService: GooglePlacesService}
  ){
    this.googlePlacesService = googlePlacesService;
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetail | null> {
    return await this.googlePlacesService.getPlaceDetails(placeId);
  }
}