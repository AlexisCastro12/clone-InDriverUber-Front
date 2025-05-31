import { LatLng } from "react-native-maps";
import { GoogleDirections } from "../../domain/models/GoogleDirections";
import { PlaceDetail } from "../../domain/models/PlaceDetail";
import { PlaceGeocodeDetail } from "../../domain/models/PlaceGeocodeDetail";
import { GooglePlacesRepository } from "../../domain/repository/GooglePlacesRepository";
import { GooglePlacesService } from "../sources/remote/services/GooglePlacesService";

export class GooglePlacesRepositoryImpl implements GooglePlacesRepository {
  private googlePlacesService: GooglePlacesService;
  constructor(
    {googlePlacesService} : {googlePlacesService: GooglePlacesService}
  ){
    this.googlePlacesService = googlePlacesService;
  }
  async getDirections(origin: LatLng, destination: LatLng): Promise<GoogleDirections | null> {
    return await this.googlePlacesService.getDirections(origin, destination);
  }
  async getPlaceDetailsByCoords(lat: number, lng: number): Promise<PlaceGeocodeDetail | null> {
    return await this.googlePlacesService.getPlaceDetailsByCoords(lat,lng);
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetail | null> {
    return await this.googlePlacesService.getPlaceDetails(placeId);
  }
}