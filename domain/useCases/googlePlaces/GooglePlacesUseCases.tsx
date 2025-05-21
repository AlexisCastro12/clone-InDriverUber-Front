import { GetPlaceDetailsByCoordsUseCase } from "./GetPlaceDetailsByCoordsUseCase";
import { GetPlaceDetailsUseCase } from "./GetPlaceDetailsUseCase";

export class GooglePlacesUseCases {
  //No son privados porque seran accesibles desde el ViewModel
  getPlaceDetails: GetPlaceDetailsUseCase;
  getPlaceDetailsByCoords: GetPlaceDetailsByCoordsUseCase;

  constructor({
    getPlaceDetailsUseCase,
    getPlaceDetailsByCoordsUseCase,
  }: {
    getPlaceDetailsUseCase: GetPlaceDetailsUseCase;
    getPlaceDetailsByCoordsUseCase: GetPlaceDetailsByCoordsUseCase;
  }) {
    this.getPlaceDetails = getPlaceDetailsUseCase;
    this.getPlaceDetailsByCoords = getPlaceDetailsByCoordsUseCase;
  }
}
