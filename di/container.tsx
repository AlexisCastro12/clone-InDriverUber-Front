import { asClass, createContainer } from "awilix";
import { AuthService } from "../data/sources/remote/services/AuthService";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";
import { LoginViewModel } from "../presentation/screens/auth/login/LoginViewModel";
import { RegisterUseCase } from "../domain/useCases/auth/RegisterUseCase";
import { RegisterViewModel } from "../presentation/screens/auth/register/RegisterViewModel";

const container = createContainer();

container.register({
  // SERVICES
  authService: asClass(AuthService).singleton(),
  
  // REPOSITORIES
  authRepository: asClass(AuthRepositoryImpl).singleton(),
  
  // USE CASES
  loginUseCase: asClass(LoginUseCase).singleton(),
  registerUseCase: asClass(RegisterUseCase).singleton(),
  
  // VIEW MODELS
  loginViewModel: asClass(LoginViewModel).singleton(),
  registerViewModel: asClass(RegisterViewModel).singleton(),
});

export { container };