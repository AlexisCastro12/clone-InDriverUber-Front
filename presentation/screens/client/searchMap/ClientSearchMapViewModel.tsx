import { PlaceDetail } from "../../../../domain/models/PlaceDetail";
import { GooglePlacesUseCases } from "../../../../domain/useCases/googlePlaces/GooglePlacesUseCases";

export class ClientSearchMapViewModel {
  private googlePlacesUseCases: GooglePlacesUseCases

  constructor({googlePlacesUseCases}:{googlePlacesUseCases:GooglePlacesUseCases}){
    this.googlePlacesUseCases = googlePlacesUseCases
  }

  async getPlaceDetails(placeId:string): Promise<PlaceDetail | null> {
    return await this.googlePlacesUseCases.getPlaceDetails.execute(placeId)
  }
}