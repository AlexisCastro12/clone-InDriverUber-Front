import { LatLng } from "react-native-maps";
import { PlaceDetail } from "../../../../domain/models/PlaceDetail";
import { PlaceGeocodeDetail } from "../../../../domain/models/PlaceGeocodeDetail";
import { GoogleApiRequestHandler } from "../api/ApiRequestHandler";
import Constants from 'expo-constants';
import { GoogleDirections } from "../../../../domain/models/GoogleDirections";

export class GooglePlacesService {
  async getPlaceDetails(placeId: string): Promise<PlaceDetail | null> {
    try {
      const response = await GoogleApiRequestHandler.get<PlaceDetail>(`/place/details/json?place_id=${placeId}&key=${Constants.expoConfig!.extra!.googleApiKey}`);
      return response.data;
    } catch (error) {
      console.error('error en la peticion', error)
      return null;
    }
  }

  async getPlaceDetailsByCoords(lat: number, lng: number): Promise<PlaceGeocodeDetail | null> {
    try {
      const response = await GoogleApiRequestHandler.get<PlaceGeocodeDetail>(`/geocode/json?latlng=${lat},${lng}&key=${Constants.expoConfig!.extra!.googleApiKey}`);
      return response.data;
    } catch (error) {
      console.error('error en la peticion', error)
      return null;
    }
  }

  async getDirections( origin: LatLng, destination: LatLng): Promise< GoogleDirections | null> {
    try {
      const response = await GoogleApiRequestHandler.get<GoogleDirections>(`/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${Constants.expoConfig!.extra!.googleApiKey}`);
      return response.data;
    } catch (error) {
      console.error('error en la peticion', error)
      return null;
    }
  }
}