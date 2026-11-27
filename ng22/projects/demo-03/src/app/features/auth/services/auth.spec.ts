import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return a successful login response', () => {
      vi.useFakeTimers();
      const loginRequest = { email: 'test @example.com', password: 'password', rememberMe: true };

      service.login(loginRequest).subscribe((response) => {
        console.log(response);
        expect(response.error).toBe('');
        expect(response.token).toBeTruthy();
        expect(response.info?.email).toBe(loginRequest.email);
      });

      vi.advanceTimersByTime(1_100); // Avanzamos el tiempo simulado
    });

    it('should return a failed login response', () => {
      vi.useFakeTimers();
      const loginRequest = { email: 'test @example.com', password: 'password', rememberMe: true };

      service.login(loginRequest, { success: false }).subscribe((response) => {
        console.log(response);
        expect(response.error).toBe('Login failed');
        expect(response.token).toBe('');
      });

      vi.advanceTimersByTime(1_100); // Avanzamos el tiempo simulado
    });
  });

  describe('loginPromise', () => {
    it('should return a successful login response', async () => {
      vi.useFakeTimers();
      const loginRequest = { email: 'test @example.com', password: 'password', rememberMe: true };

      const promise = service.loginPromise(loginRequest);

      vi.advanceTimersByTime(1_100); // Avanzamos el tiempo simulado

      const response = await promise;
      console.log(response);
      expect(response.error).toBe('');
      expect(response.token).toBeTruthy();
      expect(response.info?.email).toBe(loginRequest.email);
    });

    it('should return a failed login response', async () => {
      vi.useFakeTimers();
      const loginRequest = { email: 'test @example.com', password: 'password', rememberMe: true };

      const promise = service.loginPromise(loginRequest, { success: false });

      vi.advanceTimersByTime(1_100); // Avanzamos el tiempo simulado

      const response = await promise;
      console.log(response);
      expect(response.error).toBe('Login failed');
      expect(response.token).toBe('');
    });
  });
});
