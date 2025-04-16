import { AuthResponse } from "../../domain/models/AuthResponse";
import { ErrorResponse } from "../../domain/models/ErrorResponse";
import { User } from "../../domain/models/User";
import { AuthRepository } from "../../domain/repository/AuthRepository";
import { LocalStorage } from "../sources/local/LocalStorage";
import { AuthService } from "../sources/remote/services/AuthService";

export class AuthRepositoryImpl implements AuthRepository {
  private authService: AuthService; //Servicio para acceder a BBDD en nube(data/remote)
  private localStorage: LocalStorage; //Servicio para acceder a BBDD en local (data/local)

  constructor({
    authService,
    localStorage,
  }: {
    authService: AuthService;
    localStorage: LocalStorage;
  }) {
    this.authService = authService;
    this.localStorage = localStorage;
  }

  async saveAuthSession(authResponse: AuthResponse): Promise<void> {
    await this.localStorage.save('auth', JSON.stringify(authResponse));
  }

  async getAuthSession(): Promise<AuthResponse> {
    const data = await this.localStorage.getItem('auth');
    const authData: AuthResponse = JSON.parse(data as any);
    return authData;
  }

  async removeAuthSession(): Promise<void> {
    await this.localStorage.removeItem('auth');
  }

  async register(user: User): Promise<AuthResponse | ErrorResponse> {
    //Reutilizamos el model User de User.tsx
    return await this.authService.register(user);
  }

  async login(
    email: string,
    password: string
  ): Promise<AuthResponse | ErrorResponse> {
    return await this.authService.login(email, password);
  }
}
