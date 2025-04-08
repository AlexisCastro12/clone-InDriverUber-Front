interface ErrorResponse {
  statusCode: number,
  error: string,
  message?: string | string[],  //Puede recibirse un mensaje de error o un arreglo de mensajes de error, tambien puede que se reciba el mensaje o no
}

const defaultErrorResponse: ErrorResponse = {
  statusCode: 500,
  error: 'Error desconocido',
  message: 'Ha ocurrido un error desconocido, Intenta de nuevo'
}

export {defaultErrorResponse, ErrorResponse};