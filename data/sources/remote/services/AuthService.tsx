import { AuthResponse } from "../../../../domain/models/AuthResponse";
import { defaultErrorResponse, ErrorResponse } from "../../../../domain/models/ErrorResponse";
import { User } from "../../../../domain/models/User";
import { ApiRequestHandler } from "../api/ApiRequestHandler";

export class AuthService {
  async login (email: string, password: string): Promise<AuthResponse | ErrorResponse> {
    try {
      //<AuthResponse> Especifica el tipo de respuesta (un objeto tipo AuthResponse)
      const response = await ApiRequestHandler.post<AuthResponse>('/auth/login', {
        email: email,
        password: password
      });
      console.log("Response: ", response.data);
      return response.data; //Resuelve la promesa con un AuthResponse
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

  async register (user: User): Promise<AuthResponse | ErrorResponse> {
    try {
      //Aprovechamos que tenemos un modelo usuario para enviar todos los campos sin necesidad de especificar C/U
      const response = await ApiRequestHandler.post<AuthResponse>('/auth/register', user);
      console.log("Response: ", response.data);
      return response.data; //Resuelve la promesa con un AuthResponse
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