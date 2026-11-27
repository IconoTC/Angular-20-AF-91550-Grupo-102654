import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RoutesRecognized } from '@angular/router';
import { Card } from '../../../core/design/card/card';
import { LoginFormMdRx } from '../components/login-form-md-rx/login-form-md-rx';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';
import { LoginFormTd } from '../components/login-form-td/login-form-td';
import { MenuOption } from '../../../core/types/menu-option';
import { Menu } from '../../../core/design/menu/menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginResponse } from '../types/auth';
import { JsonPipe } from '@angular/common';

type FormType = 'td' | 'md-rx' | 'signals' | 'post-login';

@Component({
  imports: [RouterLink, Card, LoginFormTd, LoginFormMdRx, LoginFormSignals, Menu, JsonPipe],
  selector: 'ind-login-page',
  styleUrls: ['../../pages.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>

    <ind-menu [options]="menuOptions()"></ind-menu>
    <ind-card>
      @if (formType() === 'td') {
        <ind-login-form-td></ind-login-form-td>
      } @else if (formType() === 'md-rx') {
        <ind-login-form-md-rx></ind-login-form-md-rx>
      } @else if (formType() === 'signals') {
        <ind-login-form-signals></ind-login-form-signals>
      } @else if (formType() === 'post-login') {
        <p>
          {{
            routerState()?.error
              ? 'Error: ' + routerState()?.error
              : 'Saludos: ' + routerState()?.info?.email
          }}
        </p>
        <pre>
          {{ routerState() | json }}
        </pre>
      }
    </ind-card>

    <p>Si no tienes cuenta, puedes registrarte <a [routerLink]="['/auth', 'register']">aquí</a>.</p>
  `,
})
export default class LoginPage {
  protected readonly formType = input<FormType>();
  protected readonly title = signal('Login');
  protected readonly routerState = signal<LoginResponse | null>(null);

  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  protected readonly menuOptions = signal<MenuOption[]>([
    { label: 'Template Driven', path: '/auth/login/td' },
    { label: 'Model Driven (Reactive)', path: '/auth/login/md-rx' },
    { label: 'Signals', path: '/auth/login/signals' },
  ]);

  constructor() {
    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const navigation = this.#router.currentNavigation();
        if (navigation && navigation.extras.state) {
          this.routerState.set(navigation.extras.state as LoginResponse);
          console.log('Navigation state:', this.routerState());
        }
      }
    });
  }
}
