import { LatLng } from "react-native-maps";
import { ClientRequestRepository } from "../../repository/ClientRequestRepository";
import { TimeAndDistanceValues } from "../../models/TimeAndDistanceValues";
import { ErrorResponse } from "../../models/ErrorResponse";

export class GetTimeAndDistanceUseCase {
  private clientRequestRepository: ClientRequestRepository;
  constructor( {clientRequestRepository}: {clientRequestRepository: ClientRequestRepository}) {
    this.clientRequestRepository = clientRequestRepository;
  }
  async execute(origin: LatLng, destination: LatLng): Promise<TimeAndDistanceValues | ErrorResponse> {
    return await this.clientRequestRepository.getTimeAndDistance(origin, destination);
  }
}