import { AuthResponse } from "../../models/AuthResponse";
import { AuthRepository } from "../../repository/AuthRepository";

export class SaveAuthSessionUseCase {
  private authRepository: AuthRepository;

  constructor({authRepository}: {authRepository: AuthRepository}) {
    this.authRepository = authRepository;
  }

  async execute(authResponse:AuthResponse): Promise<void> {
    await this.authRepository.saveAuthSession(authResponse);
  }
}