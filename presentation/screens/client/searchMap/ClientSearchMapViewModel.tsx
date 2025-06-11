import { LatLng } from "react-native-maps";
import { PlaceDetail } from "../../../../domain/models/PlaceDetail";
import { PlaceGeocodeDetail } from "../../../../domain/models/PlaceGeocodeDetail";
import { GooglePlacesUseCases } from "../../../../domain/useCases/googlePlaces/GooglePlacesUseCases";
import { GoogleDirections } from "../../../../domain/models/GoogleDirections";
import { ClientRequestUseCases } from "../../../../domain/useCases/clientRequest/ClientRequestUseCases";
import { TimeAndDistanceValues } from "../../../../domain/models/TimeAndDistanceValues";
import { ErrorResponse } from "../../../../domain/models/ErrorResponse";

export class ClientSearchMapViewModel {
  private googlePlacesUseCases: GooglePlacesUseCases;
  private clientRequestUseCases: ClientRequestUseCases;

  constructor({
    googlePlacesUseCases,
    clientRequestUseCases,
  }: {
    googlePlacesUseCases: GooglePlacesUseCases;
    clientRequestUseCases: ClientRequestUseCases;
  }) {
    this.googlePlacesUseCases = googlePlacesUseCases;
    this.clientRequestUseCases = clientRequestUseCases;
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetail | null> {
    return await this.googlePlacesUseCases.getPlaceDetails.execute(placeId);
  }

  async getPlaceDetailsByCoords(
    lat: number,
    lng: number
  ): Promise<PlaceGeocodeDetail | null> {
    return await this.googlePlacesUseCases.getPlaceDetailsByCoords.execute(
      lat,
      lng
    );
  }

  async getDirections(
    origin: LatLng,
    destination: LatLng
  ): Promise<GoogleDirections | null> {
    return await this.googlePlacesUseCases.getDirections.execute(
      origin,
      destination
    );
  }

  async getTimeAndDistance(
    origin: LatLng,
    destination: LatLng
  ): Promise<TimeAndDistanceValues | ErrorResponse> {
    return await this.clientRequestUseCases.getTimeAndDistance.execute(
      origin,
      destination
    );
  }
}
