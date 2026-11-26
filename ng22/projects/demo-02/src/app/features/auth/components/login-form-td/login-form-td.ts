import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginRequest, LoginResponse } from '../../types/auth';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, JsonPipe],
  selector: 'ind-login-form-td',
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;
      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
    }
    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;
      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }
    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
  template: `
    <form #form #ngForm="ngForm" (ngSubmit)="login(ngForm)">
      <label for="email" class="form-control">
        <span>Email:</span>
        <input type="email" id="email" name="email" ngModel required email />
      </label>
      @let email = ngForm.controls['email'];
      @if(email?.invalid && email?.touched) {
        <p class="error">
          @if(email?.errors?.['required']) {
            <span>El correo es obligatorio.</span>
          } @else if(email?.errors?.['email']) {
            <span>El formato del correo es inválido.</span>
          }
        </p>
      }
      <label for="password" class="form-control">
        <span>Password:</span>
        <input type="password" id="password" name="password" ngModel required minlength="5" />
      </label>
      @let password = ngForm.controls['password'];
      @if(password?.invalid && password?.touched) {
        <p class="error">
          @if(password?.errors?.['required']) {
            <span>La contraseña es obligatoria.</span>    
      } @else if(password?.errors?.['minlength']) {
            <span>La contraseña debe tener al menos 5 caracteres.</span>
          }
        </p>
      }
      <label for="rememberMe" class="form-control checkbox">
        <input type="checkbox" id="rememberMe" name="rememberMe" [ngModel]="false" />
        <span>Remember me</span>
      </label>
      <button type="submit" [disabled]="ngForm.invalid">Login</button>
    </form>
    <pre>
      {{ ngForm.value | json }}
    </pre>
  `,
})
export class LoginFormTd {
  readonly #initialValues: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false,
  };

  readonly #auth = inject(Auth)
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router)

  protected readonly routerState = signal<LoginResponse | null>(null);

  // protected readonly form = viewChild<ElementRef<HTMLFormElement>>('form');
  // protected readonly ngForm = viewChild<NgForm>('ngForm');

  // constructor() {
  //   effect(() => {
  //     console.log('form', this.form());
  //     console.log('ngForm', this.ngForm());
  //   });
  // }


  
  protected login(ngForm: NgForm) {
    if (ngForm.invalid) {
      console.log('LoginFormTd.login: Formulario inválido', ngForm);
      return;
    }
    
    const loginRequest: LoginRequest = ngForm.value;
    console.log('LoginFormTd.login', loginRequest);
    this.#auth.login(loginRequest, {success: true})
    .pipe(takeUntilDestroyed(this.#destroyRef)  )
    .subscribe({
      next: (response) => {
        // Recibimos datos
        console.log(response)
        // this.#router.navigate(['/home'])
        this.#router.navigate(['/auth', 'login', 'post-login'], { state: response} );
      },
      error: (error) => {
        // Recibimos un error
        console.error('LoginFormTd.login: Error en la petición', error);
      },
      complete: () => {
        // Se completa el observable
        console.log('LoginFormTd.login: Petición completada');
      }
    });
    ngForm.resetForm(this.#initialValues);
  }
}
