import { asClass, createContainer } from "awilix";
import { AuthService } from "../data/sources/remote/services/AuthService";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";
import { LoginViewModel } from "../presentation/screens/auth/login/LoginViewModel";
import { RegisterUseCase } from "../domain/useCases/auth/RegisterUseCase";
import { RegisterViewModel } from "../presentation/screens/auth/register/RegisterViewModel";
import { LocalStorage } from "../data/sources/local/LocalStorage";
import { SaveAuthSessionUseCase } from "../domain/useCases/auth/SaveAuthSessionUseCase";
import { GetAuthSessionUseCase } from "../domain/useCases/auth/GetAuthSessionUseCase";
import { RemoveAuthSessionUseCase } from "../domain/useCases/auth/RemoveAuthSessionUseCase";
import { AuthUseCases } from "../domain/useCases/auth/AuthUseCases";
import { GooglePlacesService } from "../data/sources/remote/services/GooglePlacesService";
import { GooglePlacesRepositoryImpl } from "../data/repository/GooglePlacesRepositoryImpl";
import { GetPlaceDetailsUseCase } from "../domain/useCases/googlePlaces/GetPlaceDetailsUseCase";
import { GooglePlacesUseCases } from "../domain/useCases/googlePlaces/GooglePlacesUseCases";
import { ClientSearchMapViewModel } from "../presentation/screens/client/searchMap/ClientSearchMapViewModel";
import { GetPlaceDetailsByCoordsUseCase } from "../domain/useCases/googlePlaces/GetPlaceDetailsByCoordsUseCase";
import { GetDirectionsUseCase } from "../domain/useCases/googlePlaces/GetDirectionsUseCase";
import { ClientRequestService } from "../data/sources/remote/services/ClientRequestService";
import { ClientRequestRepositoryImpl } from "../data/repository/ClientRequestRepositoryImpl";
import { ClientRequestUseCases } from "../domain/useCases/clientRequest/ClientRequestUseCases";
import { GetTimeAndDistanceUseCase } from "../domain/useCases/clientRequest/GetTimeAndDistanceUseCase";

const container = createContainer();

container.register({
  // SERVICES
  authService: asClass(AuthService).singleton(),
  googlePlacesService: asClass(GooglePlacesService).singleton(),
  localStorage: asClass(LocalStorage).singleton(),
  clientRequestService: asClass(ClientRequestService).singleton(),

  // REPOSITORIES
  authRepository: asClass(AuthRepositoryImpl).singleton(),
  googlePlacesRepository: asClass(GooglePlacesRepositoryImpl).singleton(),
  clientRequestRepository: asClass(ClientRequestRepositoryImpl).singleton(),

  // USE CASES
  loginUseCase: asClass(LoginUseCase).singleton(),
  registerUseCase: asClass(RegisterUseCase).singleton(),
  saveAuthSessionUseCase: asClass(SaveAuthSessionUseCase).singleton(),
  getAuthSessionUseCase: asClass(GetAuthSessionUseCase).singleton(),
  removeAuthSessionUseCase: asClass(RemoveAuthSessionUseCase).singleton(),
  authUseCases: asClass(AuthUseCases).singleton(),
  getPlaceDetailsUseCase: asClass(GetPlaceDetailsUseCase).singleton(),
  getPlaceDetailsByCoordsUseCase: asClass(GetPlaceDetailsByCoordsUseCase).singleton(),
  googlePlacesUseCases: asClass(GooglePlacesUseCases).singleton(),
  getDirectionsUseCase: asClass(GetDirectionsUseCase).singleton(),
  clientRequestUseCases: asClass(ClientRequestUseCases).singleton(),
  getTimeAndDistanceUseCase: asClass(GetTimeAndDistanceUseCase).singleton(),
  
  // VIEW MODELS
  loginViewModel: asClass(LoginViewModel).singleton(),
  registerViewModel: asClass(RegisterViewModel).singleton(),
  clientSearchMapViewModel: asClass(ClientSearchMapViewModel),
  
});

export { container };