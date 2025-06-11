import { GetTimeAndDistanceUseCase } from "./GetTimeAndDistanceUseCase";

export class ClientRequestUseCases {
  getTimeAndDistance: GetTimeAndDistanceUseCase;
  constructor({
    getTimeAndDistanceUseCase,
  }: {
    getTimeAndDistanceUseCase: GetTimeAndDistanceUseCase;
  }) {
    this.getTimeAndDistance = getTimeAndDistanceUseCase;
  }
}
