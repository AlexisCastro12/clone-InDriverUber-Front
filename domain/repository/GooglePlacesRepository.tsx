import { PlaceDetail } from "../models/PlaceDetail";

export interface GooglePlacesRepository {
  getPlaceDetails(placeId: string): Promise<PlaceDetail | null>;
}