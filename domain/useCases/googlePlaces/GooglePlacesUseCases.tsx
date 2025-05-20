import { GetPlaceDetailsUseCase } from "./GetPlaceDetailsUseCase";

export class GooglePlacesUseCases {
  //No son privados porque seran accesibles desde el ViewModel
  getPlaceDetails: GetPlaceDetailsUseCase;

  constructor({
    getPlaceDetailsUseCase,
  }: {
    getPlaceDetailsUseCase: GetPlaceDetailsUseCase;
  }) {
    this.getPlaceDetails = getPlaceDetailsUseCase;
  }
}
