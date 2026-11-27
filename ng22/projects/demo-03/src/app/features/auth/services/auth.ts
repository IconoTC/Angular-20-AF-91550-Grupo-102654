import { Service } from '@angular/core';
import { LoginRequest, LoginResponse } from '../types/auth';
import { delay, firstValueFrom, Observable, of, tap } from 'rxjs';

interface AuthOptions {
  success: boolean;
  delayTime: number;
}

const DEFAULT_AUTH_OPTIONS: AuthOptions = {
  success: true,
  delayTime: 1_000,
};

@Service()
export class Auth {
  #generateToken(): string {
    // Generamos un token aleatorio simulado
    // (en un caso real, esto lo haría el backend)
    return Math.random().toString(36).substring(2);
  }

  #generateId(): number {
    // Generamos un id aleatorio simulado
    // (en un caso real, esto lo haría el backend)
    return Math.floor(Math.random() * 1_000);
  }

  login(data: LoginRequest, options: Partial<AuthOptions> = {}): Observable<LoginResponse> {
    const finalOptions = { ...DEFAULT_AUTH_OPTIONS, ...options };

    // Simulación de un login
    const result: LoginResponse = finalOptions.success
      ? {
          error: '',
          token: this.#generateToken(),
          info: {
            id: this.#generateId(),
            email: data.email,
            loginDate: new Date(),
            rememberMe: data.rememberMe,
          },
        }
      : { error: 'Login failed', token: '' };

    return of(result).pipe(
      delay(finalOptions.delayTime),
      tap(() => {
        console.log('Login response:', result);
        console.log('Login request:', data);
      }),
      // Simulamos un retraso de 1 segundo
    );
  }

  loginPromise(data: LoginRequest, options: Partial<AuthOptions> = {}): Promise<LoginResponse> {
    const result = firstValueFrom(this.login(data, options));
    return result;
  }
}
