import { Component, inject, signal } from '@angular/core';
import { LoginRequest } from '../../types/auth';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  PathKind,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [FormField, FormRoot, JsonPipe],
  selector: 'ind-login-form-signals',
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
    <!-- <form (submit)="login($event)" novalidate> -->
    <!-- <form [formRoot]="loginFieldTree" (submit)="login()"> -->
    <form [formRoot]="loginFieldTree">
      <label for="email" class="form-control">
        <span>Email:</span>
        <input type="email" id="email" [formField]="loginFieldTree.email" />
      </label>

      @if (loginFieldTree.email()?.invalid() && loginFieldTree.email()?.touched()) {
        <p class="error">{{ loginFieldTree.email().errors()[0].message }}</p>
      }

      <label for="password" class="form-control">
        <span>Password:</span>
        <input type="password" id="password" [formField]="loginFieldTree.password" />
      </label>

      @if (loginFieldTree.password()?.invalid() && loginFieldTree.password()?.touched()) {
        <p class="error">{{ loginFieldTree.password().errors()[0].message }}</p>
      }

      <label for="remember" class="form-control checkbox">
        <input type="checkbox" id="remember" [formField]="loginFieldTree.rememberMe" />
        <span>Remember me</span>
      </label>

      <button type="submit" [disabled]="loginFieldTree().invalid()">Login</button>
    </form>

    <pre>
      {{ loginFieldTree().value() | json }}
    </pre>
  `,
})
export class LoginFormSignals {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);

  readonly #loginInitialState: LoginRequest = {
    email: '',
    password: '',
    rememberMe: false,
  };

  protected readonly loginModel = signal(this.#loginInitialState);

  readonly #loginSchema = (path: SchemaPathTree<LoginRequest, PathKind.Root>) => {
    required(path.email, { message: 'El correo electrónico es obligatorio' });
    email(path.email, { message: 'El correo electrónico no es válido' });
    required(path.password, { message: 'La contraseña es requerida' });
    minLength(path.password, 5, { message: 'La contraseña debe tener al menos 5 caracteres' });
  };

  protected readonly loginFieldTree = form(this.loginModel, this.#loginSchema, {
    submission: {
      action: this.#login.bind(this),
    },
  });

  // login(event: Event): void {
  //   event.preventDefault();

  async #login(): Promise<void> {
    if (this.loginFieldTree().invalid()) {
      console.log('LoginFormSignals.login() - Formulario inválido');
      return;
    }
    const request = {...this.loginFieldTree().value()};
    console.log('LoginFormSignals.login()');
    console.log('loginModel():', request);
    this.loginFieldTree().reset(this.#loginInitialState);

    const response = await this.#auth.loginPromise(request);
    this.#router.navigate(['/auth', 'login', 'post-login'], { state: response });

  }
}
