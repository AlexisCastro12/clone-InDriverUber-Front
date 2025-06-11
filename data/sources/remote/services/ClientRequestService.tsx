import { LatLng } from "react-native-maps";
import { TimeAndDistanceValues } from "../../../../domain/models/TimeAndDistanceValues";
import { ApiRequestHandler } from "../api/ApiRequestHandler";
import { defaultErrorResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";

export class ClientRequestService {
  async getTimeAndDistance(origin: LatLng, destination: LatLng): Promise<TimeAndDistanceValues | ErrorResponse> {
    try {
      const response = await ApiRequestHandler.get<TimeAndDistanceValues>(`/client-requests/${origin.latitude}/${origin.longitude}/${destination.latitude}/${destination.longitude}`);
      return response.data; //Resuelve la promesa con un TimeAndDistanceValues
    } catch (error: any) {
      if(error.response) {
        const errorData: ErrorResponse = error.response.data; //Se captura el objeto "error" recibido por el servidor
        if(Array.isArray(errorData.message)){
          console.error('Errores multiples del servidor:\n', errorData.message.join('\n'));  //Desplegamos mensajes
        }
        else{
          console.error('Error unico del servidor:\n', errorData.message);  //Desplegamos mensajes
        }
        return errorData;
      }
      else{
        console.error('Error en la peticion:\n', error.message);
        return defaultErrorResponse;
      }
    }
  }
}