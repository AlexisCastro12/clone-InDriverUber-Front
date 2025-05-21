import { PlaceDetail } from "../models/PlaceDetail";
import { PlaceGeocodeDetail } from "../models/PlaceGeocodeDetail";

export interface GooglePlacesRepository {
  getPlaceDetails(placeId: string): Promise<PlaceDetail | null>;
  getPlaceDetailsByCoords(lat:number, lng:number): Promise<PlaceGeocodeDetail|null>
}