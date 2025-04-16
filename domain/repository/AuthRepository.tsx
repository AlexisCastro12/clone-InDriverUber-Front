import { AuthResponse } from "../models/AuthResponse";
import { ErrorResponse } from "../models/ErrorResponse";
import { User } from "../models/User";

export interface AuthRepository {
  //Se reutiliza el model User de User.tsx
  register(user: User): Promise<AuthResponse | ErrorResponse>;
  login(email: string, password: string): Promise<AuthResponse | ErrorResponse>;
  saveAuthSession(authResponse: AuthResponse): Promise<void>;
  getAuthSession():Promise<AuthResponse>;
  removeAuthSession(): Promise<void>;
}